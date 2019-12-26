---
legacyId: 14
title: Gracefully degrading webfonts
slug: gracefully-degrading-webfonts
datetime: 2015-09-27T11:15:00Z
draft: false
cupsOfCoffee: 3
perex: Webfonts have become quite a common sight on websites. They give designers the flexibility to choose the perfect type without having to worry about the availability of the chosen fonts. But, on the other hand, they may be a real problem especially on slow connections. Luckily, there is a tool that solves this.
tags:
  - frontend
  - javascript
  - less
  - performance
  - webfonts
---
The tool is called [Web Font Loader](https://github.com/typekit/webfontloader) and is developed and maintained by
Typekit and Google. It works smoothly with Google Webfonts, Typekit, Fonts.com, Fontdeck, as well as any self-hosted
webfont. The basic idea is that you use a tiny JS library to load the fonts asynchronously and re-style the page using
special classes that it adds to and removes from the `html` element.

The setup is rather easy. When I first started experimenting with the library, the code looked like this:

```js
var WebFontConfig = {
	google: {
		families: [
			'PT Sans:400,700:latin,latin-ext',
			'Lora:400,700:latin,latin-ext'
		]
	},
	custom: {
		families: 'FontAwesome',
		urls: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'
	}
};

(function(d) {
	var wf = d.createElement('script'), s = d.scripts[0];
	wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
	s.parentNode.insertBefore(wf, s);
})(document);
```

The bottom part asynchronously loads the library (which ships at circa 6.5 kilobytes gzipped), while the top part
prepares the configuration. It tells the loader to fetch PT Sans and Lora from Google Webfonts, along with what styles
and character sets to load, and Font Awesome from bootstrapcdn.com. Now to the styling part. I use LESS which makes
this process quite simple as compared to pure CSS. I made use of LESS's parent selector (`&`) and created mixins for
both sans-serif and serif fonts.

```css
.serif {
	font-family: Georgia, Times, serif;

	.wf-active & {
		font-family: 'Lora', Georgia, Times, serif;
	}
}

.sans {
	font-family: Arial, Helvetica, sans-serif;

	.wf-active & {
		font-family: 'PT Sans', Arial, Helvetica, sans-serif;
	}
}

body {
	.serif();
	// ...
}

h1 {
	.sans();
	// ...
}
```

As you see, at first I tried to progressively enhance the experience. I started with basic fonts and replaced them
with webfonts once they'd been loaded. It turned out to be a wrong approach, because even if your browser had those
fonts already cached, you'd still have to wait for the webfonts _loader_ to load and do its job. This was not the
best thing. I believe that's because I added the `async` attribute to the site's JS file. If it had been loaded and
processed synchronously, the whole experience would probably be much smoother. But I wanted to preserve the
asynchronicity, so in the end, I decided to gracefully degrade the experience instead by adding a two-second timeout,
so that if the webfonts took longer to load, the Arial and Georgia fallbacks would come to the rescue:

```js
var WebFontConfig = {
	// ...
	timeout: 2000
};
```

And I also accordingly switched the logic in the mixins:

```css
.serif {
	font-family: 'Lora', Georgia, Times, serif;

	.wf-lora-n4-inactive & {
		font-family: Georgia, Times, serif;
	}
}

.sans {
	font-family: 'PT Sans', Arial, Helvetica, sans-serif;

	.wf-ptsans-n4-inactive & {
		font-family: Arial, Helvetica, sans-serif;
	}
}
```

On the same note, I put back the `@import` statement for Font Awesome icon font into the LESS file. It's not so
critical for this site – it's actually quite usable without the icons – so it's not a big deal if it doesn't load
in reasonable time. But it'd be a big deal if everyone had to wait every time until the font loader loads.

I'm pretty satisfied with the outcome now. The Chrome Dev Tools Network panel allows you to simulate low-bandwidth
networks, so you can play with it a bit and see how the site behaves on slower connections. And you can of course
share your thoughts on Web Font Loader in the comments, or go and try it yourself.
