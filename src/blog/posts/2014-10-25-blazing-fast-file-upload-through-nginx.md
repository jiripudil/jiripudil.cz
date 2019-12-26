---
legacyId: 4
title: Blazing fast file upload through Nginx
slug: blazing-fast-file-upload-through-nginx
datetime: 2014-10-25T16:00:00Z
draft: false
cupsOfCoffee: 4
perex: Implementing a shiny new feature for one of our clients, we faced a challenging task. We needed to handle uploads of loads of files. Effectively. Without torturing the server with unnecessary stuff.
tags:
  - nettefw
  - nginx
  - php
  - upload
---
The default behavior of file uploads in what still is the standard stack for web applications - Apache and PHP - is
pretty straight-forward. The web server reads the incoming POST request, buffering the uploaded file onto the disk,
and passes the request on to the PHP backend which, in turn, reads the request and saves the file _again_ to _its_
temporary directory. Sounds like too much overhead, doesn't it?

Now imagine you need to handle tens or even hundreds of 1 to 10 MB files at once. If we send them in one request,
the overhead described above effectively blocks both a web server process and a PHP process for a long time,
rendering them unavailable to handle other requests. If we send the files one by one in separate requests, it gets
a bit better as the processes are occupied for a shorter time and can handle other requests inbetween the uploads.
But there's still plenty of room for improvement.

The improvement is called [Nginx Upload Module](http://www.grid.net.ru/nginx/upload.en.html). It simply skips the part
where the file is passed to PHP backend to be read and written once again. It saves the uploaded file to a temporary
directory and only provides //information// about the file to PHP via POST variables that you can configure. (Besides,
if you've been using Apache so far, you should get quite a performance boost just by employing Nginx.)


## Setting it up

How to set the whole thing up? First, you need to compile Nginx with the upload module, since it's not a built-in part
of the distribution. The module can be downloaded from its website or via cloning its [Github repo](https://github.com/vkholodkov/nginx-upload-module/).
(Make sure you use the `2.2` branch, `master` doesn't work with recent versions of Nginx!) You can add a module to Nginx
via a compile-time option:

```sh
$ ./configure --add-module=/path/to/upload/module
```

Then it's just a matter of configuration. First, it's necessary to raise `client_max_body_size` as its default value
is ridiculously small. This directive goes into the `server` block. (If you're not familiar with the way Nginx is
configured, you should read my [previous post](http://jiripudil.cz/blog/configuring-nginx-php-fpm-nette) and the articles
I linked from there.) Second and last, create a `location` block for the URL that should process the upload. The whole
magic then goes there:

```
server {
	# previous server configuration stays here

	client_max_body_size 100m;

	location /process-upload {
		upload_pass @upload;

		# store uploaded files in hashed directories /tmp/upload/0 through /tmp/upload/9
		upload_store /tmp/upload 1;

		# set read permissions for uploaded files
		upload_store_access user:r group:r;

		# define information that should be passed to backend
		upload_set_form_field $upload_field_name[name] "$upload_file_name";
		upload_set_form_field $upload_field_name[type] "$upload_content_type";
		upload_set_form_field $upload_field_name[path] "$upload_tmp_path";
		upload_aggregate_form_field $upload_field_name[size] "$upload_file_size";
		upload_aggregate_form_field $upload_field_name[md5] "$upload_file_md5";
		upload_pass_form_field "submit";

		# remove the uploaded files if backend returns one of these HTTP status codes
		upload_cleanup 400 404 499 500-505;
	}

	location @upload {
		rewrite ^ /index.php last;
	}
}
```

The `upload_pass` directive passes the modified request to a named location which in turn rewrites the request to
`index.php`. Now your application will receive a request for `/process-upload` with all files already uploaded via
Nginx, and with the necessary information about them in POST. You can utilize Nette (or Symfony or whatever thing
you use) routing and direct the request to an action in a presenter/controller:

```php
class UploadPresenter extends Nette\Application\UI\Presenter
{
	public function actionProcessUpload()
	{
		foreach ($this->getHttpRequest()->getPost() as $field => $file) {
			// this is just an example, do whatever you want with the files
			$fileUpload = new Nette\Http\FileUpload([
				'name' => $file['name'],
				'type' => $file['type'],
				'tmp_name' => $file['path'],
				'size' => (int) $file['size'],
				'error' => empty($file) ? UPLOAD_ERR_NO_FILE : UPLOAD_ERR_OK,
			]);

			$this->uploader->process($fileUpload);
		}
	}
}
```

The `upload_set_form_field`, `upload_aggregate_form_field`, and `upload_pass_form_field` directives allow you to
configure what the POST data that your application receives will look like. I pass them in an array as it's convenient
to process on the PHP side. Special care must be taken if you use multiple file upload via `<input type="file" multiple>`,
as the upload module and PHP in combination don't play nice with those square brackets in the field name. You should
turn on the `upload_tame_arrays` flag - which strips the brackets - and modify passed field names accordingly, adding
the file's ordinal number manually:

```
upload_tame_arrays on;

upload_set_form_field $upload_field_name[$upload_file_number][name] "$upload_file_name";
# modify the rest similarly
```

That's it. You now have everything set up for Nginx to save the uploaded files, skipping PHP's implementation altogether,
and gaining a nice performance boost. Now let the files come.

**Update 2017-02-22:** The module seems to be abandoned since 2014. You should use
[Austinb's fork](https://github.com/vkholodkov/nginx-upload-module/issues/79#issuecomment-260528628) to make it work
with latest mainline nginx (tested with 1.11.10)
