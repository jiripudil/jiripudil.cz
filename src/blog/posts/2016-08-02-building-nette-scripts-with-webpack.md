---
legacyId: 20
title: Building Nette scripts with Webpack
slug: building-nette-scripts-with-webpack
datetime: 2016-08-02T18:45:00Z
draft: false
cupsOfCoffee: 4
perex: Recently, in my bachelor's thesis, I've used extensively the whole Node.js and JavaScript ecosystem, including Webpack for bundling modules. And I love it. So there's no wonder I've tried setting it up in a classic Nette web application as well. Here goes a simple step-by-step example.
tags:
  - ajax
  - forms
  - frontend
  - gulp
  - javascript
  - nettefw
  - webpack
---
If you wonder what Webpack is and what kind of cool tricks it can do for you, start by reading
[this post](http://blog.andrewray.me/webpack-when-to-use-and-why/).

## Basic setup

The whole stack uses Webpack to build modules together and Gulp to run the tasks. Also, if you don't have Node.js
(and NPM) installed, now is the best time to do it, we will need it right away, to get the build dependencies
(run this in the project's root directory):

```sh
npm init -y && npm install --save gulp gulp-util webpack
```

Create `gulpfile.js` with a single Webpack task:

```js
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('default', ['webpack']);
gulp.task('webpack', function (callback) {
	webpack(webpackConfig, function (err, stats) {
		if (err) {
			throw new gutil.PluginError('webpack', err);
		}

		gutil.log('[webpack]', stats.toString({colors: true}));
		callback();
	});
});
```

and also a minimal `webpack.config.js` that configures some filesystem paths which you should change according to
your directory structure:

```js
var path = require('path');

module.exports = {
	cache: true,
	entry: [path.join(__dirname, 'www/js/index.js')],
	output: {
		path: path.join(__dirname, 'www/dist'),
		publicPath: '/dist/',
		filename: 'bundle.js'
	}
};
```

That's the basic setup. If you

1. create the `www/js/index.js` file,
2. put a `window.alert` into it,
3. run `gulp webpack`, and
4. load the generated `dist/bundle.js` script into your page,

it should greet you with an alert popup.


## Nette libraries

Now let's wire some JS libraries commonly used with Nette: nette.ajax.js and nette-forms's script. Here comes the first
problem: neither of them is available as an NPM package. We will have to use [Bower](https://bower.io) to fetch them,
and `bower-webpack-plugin` to wire them into the build. The `bower.json` file is pretty simple:

```json
{
	"name": "my-project",
	"dependencies": {
		"nette.ajax.js": "~2.1.0",
		"nette-forms": "~2.4.0"
	}
}
```

Now run `bower install` in the project's root directory (assuming you have Bower installed). Also,
`npm install --save bower-webpack-plugin`, and add the plugin to the Webpack config:

```js
var BowerWebpackPlugin = require('bower-webpack-plugin');

// ...

module.exports = {
	// ...
	plugins: [
		new BowerWebpackPlugin()
	]
	// ...
};
```

The second problem is that `nette.ajax.js` wires into the rest of the code <del>like shit</del> with little care about
any modular system and just expects jQuery to be in the global scope - same as the majority of jQuery plugins anyway :(
Luckily Webpack comes with a simple solution, its `ProvidePlugin`, which exposes modules as if they were global
variables. Add it into `webpack.config.js` with the following setup:

```js
var webpack = require('webpack');

module.exports = {
	// ...
	plugins: [
		// ...
		new webpack.ProvidePlugin({
			'window.Nette': 'nette-forms',
			'window.jQuery': 'jquery',
			jQuery: 'jquery',
			$: 'jquery'
		})
	]
	// ...
};
```

And you're almost done; the last piece is `www/js/index.js`, which is actually pretty straightforward - it just loads
and initializes jQuery and both libraries:

```js
require('jquery');
require('nette.ajax.js');
var Nette = require('nette-forms');

Nette.initOnLoad();

$(function () {
	$.nette.init();
});
```

Now if you run `gulp webpack` again, the `dist/bundle.js` should give you all the functionality - `.ajax` links and
forms work asynchronously, and forms should be validated client-side via `nette-forms` script.


## Final thoughts

And this, my friend, is only the beginning. Webpack is a very, very powerful tool; you can use it to load not only
scripts (and not only in vanilla JS) but all kinds of assets - stylesheets, images, webfonts, etc.; you can transpile
CoffeeScript, ES6, JSX, LESS, SASS and pretty much anything you think of; you can create dev build tasks utilizing
Gulp's file watchers or Webpack's development server, and much more. I believe
[Webpack's documentation](https://webpack.github.io/docs/) has a lot of resources for inspiration.

Don't forget to share your thoughts, experiences and questions in the comments below!
