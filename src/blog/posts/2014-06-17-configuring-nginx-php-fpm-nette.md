---
legacyId: 2
title: Configuring Nginx and PHP-FPM (and Nette)
slug: configuring-nginx-php-fpm-nette
datetime: 2014-06-17T17:30:00Z
draft: false
cupsOfCoffee: 6
perex: This text provides a comprehensive guide on how to configure Nginx and PHP-FPM and make it run smoothly with Nette framework.
tags:
  - nettefw
  - nginx
  - php
  - server
---
Apache has been the most proliferated webserver for ages. But it has its limitations. Once the number of concurrent
requests reaches certain heights (which can be [as little as tens](http://www.theorganicagency.com/apache-vs-nginx-performance-comparison/)),
it starts to fall behind. That's when Nginx comes to the rescue with its event-driven, asynchronous, single-threaded
architecture. Let's get started right away.


## Installation

Nginx comes [prepackaged](http://nginx.org/en/linux_packages.html) for most Linux distros and can be of course [built
from source](http://nginx.org/en/docs/configure.html). Since Nginx, unlike Apache, doesn't have any PHP module, you
also need to have PHP built with the `--enable-fpm` option, so that the FPM (FastCGI Process Manager) SAPI is installed.
Alternatively, various distros have FPM bundled in an easy-to-install package (e.g. `php5-fpm` in Debian's `apt`).


## Configuring the web server

Nginx has a very expressive configuration syntax and very powerful and easy-to-master rewrite module. Now, before
moving on, you should read thoroughly through Martin Fjordvald's [primer](http://blog.martinfjordvald.com/2010/07/nginx-primer/)
and the documentation entry on the [`location` directive](http://nginx.org/en/docs/http/ngx_http_core_module.html#location).
It should give you the gist of the location-based way Nginx is configured and the hierarchy of its configuration contexts.

The main configuration file resides in `/etc/nginx/nginx.conf` and contains lots of directives. I'll just pin-point
the options which configure how many concurrent connections Nginx can handle - the actual number is the product
of `worker_processes` and `worker_connections`. I recommend setting `worker_processes` to the number of CPU cores
to prevent Nginx from getting locked waiting for slow I/O operations. As for `worker_connections`, I'd stick with 1024,
as it keeps a good balance between performance and effective resource usage. You can raise the number though if your
needs are more demanding.


### Setting up a virtual host

Now, one of the most important lines in the config file is this:

```
	include /etc/nginx/sites-enabled/*;
```

It includes all virtual hosts configurations from given folder - a concept with which you might be familiar from Apache.
And as in Apache, it is a good practice to keep all configurations in `sites-available` directory and only symlink
to them in `sites-enabled`. Without further jibber-jabber, here's my `/etc/nginx/sites-available/jiripudil.cz`
virtual host definition:

```
server {
	server_name	*.jiripudil.cz;
	rewrite		^(.*)	http://jiripudil.cz$1 permanent;
}

server {
	server_name	jiripudil.cz;

	root		/var/www/jiripudil.cz/www;

	access_log	/var/www/jiripudil.cz/log/access.log;
	error_log	/var/www/jiripudil.cz/log/error.log;

	include		common.conf;
	include		php.conf;
	include		nette.conf;
}
```

As you can see, there are two server definitions. The first one is fair easy. It listens for all requests for any
subdomain and redirects them to the second-level domain URL. Which is, in turn, what the second server listens for.
It sets up the document root and some logging files, and includes three cryptic configurations.

`common.conf` (which gets expanded to `/etc/nginx/common.conf`) contains some common options:

```
# sets up index file
index index.html index.htm;

# hide Nginx server tokens and version number
server_tokens off;

# set max post size (for file upload)
client_max_body_size 16m;
client_body_buffer_size 128k;

# deny access to hidden files
location ~ /\.|^\. {
	deny all;
}

# cache static files
location ~* \.(jpe?g|gif|png|css|js|ico|xml)$ {
	access_log off;
	log_not_found off;
	expires max;
}

# allow server-side includes for combined files
location ~ \.combined\.(js|css)$ {
	ssi on;
	ssi_types text/css text/javascript application/x-javascript;
}
```

`/etc/nginx/nette.conf` contains three lines that forward all non-file and non-directory requests to Nette's front
controller so that it can handle routing on its own. As you can see, Nginx has a mechanism that allows you to write
this in three lines, as opposed to Apache's mod_rewrite beast:

```
location / {
	try_files $uri $uri/ index.php$is_args$args;
}
```


## Connecting to FPM

Well, we've got our web server set up. But how does PHP know what to do? FPM runs as a separate process after all.
That's where the third file, `/etc/nginx/php.conf`, comes to play. In my case, it contains this code:

```
index index.php index.html index.htm;

location ~ \.php$ {
	include fastcgi_params;
	fastcgi_pass unix:/var/run/php-fpm/$server_name.socket;
	fastcgi_index $document_root/index.php;

	fastcgi_split_path_info ^((?U).+\.php)(/?.+)$;
	fastcgi_param SCRIPT_FILENAME $document_root/$fastcgi_script_name;
	fastcgi_param PATH_TRANSLATED $document_root/$fastcgi_path_info;
	fastcgi_param PATH_INFO $fastcgi_path_info;
}
```

This sets the directory index to `index.php` and makes sure that PHP files are passed to the FPM through a Unix socket.
The `fastcgi_params` file populates the `$_SERVER` variable. The trick with `fastcgi_split_path_info` is a prevention
to a possible security flaw which allows an attacker to execute their own PHP code supplied e.g. via file upload. (You
can read more on this issue [here](http://blog.martinfjordvald.com/2011/06/why-path-info-is-the-worst-php-feature-since-register-globals/).)

We've configured Nginx to communicate with PHP over Unix socket. Now we need to make PHP listen on that socket. Head
to `/etc/php5/fpm` directory and open `php-fpm.conf` file. Make sure there is a line that contains

```
include=/etc/php5/fpm/pool.d/*.conf
```

It includes all pool definitions. If you're running multiple websites on one server, always have a separate FPM pool
for a each virtual host. You can even go deeper and keep separate pools for different parts of a single website, e.g.
store and forum. Here's my `/etc/php5/fpm/pool.d/jiripudil.cz.conf`:

```
[jiripudil.cz]

listen = /var/run/php-fpm/jiripudil.cz.socket
listen.backlog = -1

user = jiripudil
group = www-data

pm = dynamic
pm.max_children = 5
pm.min_spare_servers = 2
pm.max_spare_servers = 4
```

Let's focus on the `pm` part. It tells FPM to use dynamic process management, which means that the daemon will control
the number of child processes on its own, based on the other directives. In this rather basic setup, it cannot start
more than 5 processes, i.e. it cannot handle more than five concurrent requests. Low values can lead to bottlenecks
when processes are waiting for I/O operations, while high numbers will most certainly increase the memory usage.
Find the right value for you by measuring the average memory consumption of your website.

The `pm.min_spare_servers` and `pm.max_spare_servers` determine how many idle processes FPM can keep and use when needed.
There're also `pm.start_servers` option which tells how many processes FPM should create on startup (in this setup it
defaults to 2), and `pm.max_requests` option which can limit the number of requests one process can handle in its lifetime.
It defaults to 0 (unlimited), but can be set to an exact number to prevent memory leaks.

With PHP-FPM ready, there is still a thing that needs to be pointed out. As `/var/run` is often mounted onto a temporary
filesystem, you need to ensure that the `php-fpm` directory in which you store the Unix sockets for different websites
is created after each server reboot. Luckily, this can be done in as little as a single line of shell code. Put the
following script into `/etc/init.d/` directory and don't forget to make it executable.

```
#!/bin/sh
[ -d /var/run/php-fpm ] || install -m 755 -o www-data -g root -d /var/run/php-fpm
```


## The end... and the beginning

You should now have everything set up, where by *everything* I mean *just the tip of the iceberg*. Nginx is really
flexible and lets you set up almost everything that comes to your mind, ranging from common tasks including
[authentication](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html),
[SSL encryption](http://nginx.org/en/docs/http/ngx_http_ssl_module.html),
[gzip compression](http://nginx.org/en/docs/http/ngx_http_gzip_module.html),
or [request rate restrictions](http://nginx.org/en/docs/http/ngx_http_limit_req_module.html),
to really cool stuff like [image filtering](http://nginx.org/en/docs/http/ngx_http_image_filter_module.html)
or even [direct file upload](http://wiki.nginx.org/HttpUploadModule) without the need to pass the whole thing
through PHP backend (and block a PHP process).

There're dozens of other topics that this post doesn't cover, but I'll leave that to your googling skills. So go on
and tweak your Nginx and PHP-FPM installation, and don't forget to share your tips in the comments.
