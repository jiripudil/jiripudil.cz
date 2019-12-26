---
legacyId: 3
title: Brand new jiripudil.cz
slug: brand-new-jiripudil-cz
datetime: 2014-10-18T12:30:00Z
draft: false
cupsOfCoffee: 2
perex: Earlier this week, I launched a brand new version of this website. It is written in PHP using Nette and Doctrine, uses Bower and Gulp to build assets, and strives to follow current best practices. And, last but definitely not least, its source code is open.
tags:
  - nettefw
  - php
---
I use it not only as my website and blog, but also as a development sandbox. I try to keep up with current trends in web
app development, following state-of-the-art best practices and using bleeding edge PHP, Nette, Doctrine (incl. migrations),
various Kdyby packages, NPM, Bower, Gulp, and other tools.

I decided to open-source the whole thing so that it can also be a learning material for newcomers to Nette. It is
licensed under the New BSD license and you can get the source code at [Github](https://github.com/jiripudil/jiripudil.cz)
or directly by cloning the repository:

```sh
$ git clone https://github.com/jiripudil/jiripudil.cz
```

The initial setup requires you to create, run and install loads of things. You need to have [Composer](https://getcomposer.org)
and [Node.js](http://nodejs.org/) installed, as well as the following NPM packages: `gulp`, `bower`, and `coffee-script`
(if not, install them via `sudo npm install -g <package>`). You also need PHP >= 5.5.

Then create `app/config/local.neon` file storing credentials to your database as in the following example:

```yaml
doctrine:
  host: 127.0.0.1
  user: jiripudil
  password: youwishyouknew
  dbname: jiripudil.cz
```

Last, run these commands to install PHP and front-end dependencies and run database migrations:

```sh
$ composer install
$ npm install
$ gulp bower
$ gulp build
$ php www/index.php migrations:migrate
```

Also be aware that the website is running on Nginx (see [my previous post](/blog/configuring-nginx-php-fpm-nette)
to get to know Nginx and the basics of its configuration). That's why there are no `.htaccess`es. You will have to add
them (e.g. those from [nette/sandbox](https://github.com/nette/sandbox)) to make it run on Apache.

You can see the development process in the [commit history](https://github.com/jiripudil/jiripudil.cz/commits/master),
report bugs and issues in the [issue tracker](https://github.com/jiripudil/jiripudil.cz/issues), open pull requests
if you feel this website lacks something, you can even try and hack it. Enjoy!
