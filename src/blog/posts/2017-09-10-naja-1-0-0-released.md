---
legacyId: 32
title: Naja 1.0.0 released
slug: naja-1-0-0-released
datetime: 2017-09-10T16:50:00Z
draft: false
cupsOfCoffee: 4
perex: Almost six months ago, I have released an alpha version of a new, modern AJAX library for Nette Framework named Naja. Now, after half a year in the wild production environment, I guess the time has come for a stable version.
tags:
  - ajax
  - frontend
  - javascript
  - naja
  - nettefw
  - open-source
  - testing
---
## Naja 1.0.0

There are little to no changes from the latest alpha release. I have been running Naja in production for six months
and no issue caused by it or related to it has appeared, neither have I stumbled upon a missing feature. I just thought
it would be good to finally release a stable version, and there was nothing standing in the way.

The only difference is that alpha still allowed for some possible experimenting with new features and API breaks;
this is no longer possible. Now that there is a stable 1.0.0 release, Naja is going to follow
[semantic versioning](http://semver.org/).


## The extensibility

Naja's philosophy is to be the centerpoint of the client-side part of your Nette application. Thanks to its powerful,
event-based extension system (that took inspiration in [nette.ajax.js](https://github.com/vojtech-dobes/nette.ajax.js)),
you can attach pretty much anything to its lifecycle. And you should - you will probably have tens of extensions in
a rather complex application. I have a rather small one, and it has eleven of them already, each one with its own
little single responsibility :)

You can find the events reference and a sample extension
[down in the project's README](https://github.com/jiripudil/Naja#custom-extensions). If you prefer to learn by example,
I've [implemented a few extensions](https://github.com/jiripudil/herecsrymy.cz/tree/2f4a456f78a074aa7797f618eb7741600993b440/client/app/scripts)
myself for my singer-songwriter website; some of them are tied to the website's features, but others are rather universal,
like those that load and reload [social](https://github.com/jiripudil/herecsrymy.cz/blob/2f4a456f78a074aa7797f618eb7741600993b440/client/app/scripts/FacebookExtension.js)
[media](https://github.com/jiripudil/herecsrymy.cz/blob/2f4a456f78a074aa7797f618eb7741600993b440/client/app/scripts/TwitterExtension.js)
widgets and [Disqus threads](https://github.com/jiripudil/herecsrymy.cz/blob/2f4a456f78a074aa7797f618eb7741600993b440/client/app/scripts/DisqusExtension.js)
on the page, or the one that [sends AJAX page loads to Google Analytics](https://github.com/jiripudil/herecsrymy.cz/blob/2f4a456f78a074aa7797f618eb7741600993b440/client/app/scripts/GoogleAnalyticsExtension.js).


## Roadmap for future development

I'm not really sure if Naja requires any future development at the moment. I consider all its core features complete,
and pretty much anything else can be implemented using extensions, as described above. So the future development might
only include fixing bugs and maintaining compatibility with future releases of Nette Framework.

There is only one big goal that still remains unmet: to rewrite the tests from the command line (a habit that I've
brought from my PHP background) to the browser, and then set up Browserstack or a similar service to evaluate the build
on all browsers that Naja promises to support.

I thought this would be much easier than it actually is: Naja, as the unit under test, needs to be able to access and
modify the DOM and other APIs including Location and History, and also send and mock XMLHttpRequests. How to isolate
the test *environment* from the test *runtime* in the browser is a hard nut to crack, and any help would be
appreciated :)


## Conclusion

Naja 1.0.0 is out there. You can install it, extend it, use it, be happy about it, and even contribute to its
development. If you need any help setting it up, want to report a bug, request a feature or just have a chat,
feel free to hit me up on [Twitter](https://twitter.com/jiripudil) or open an issue on
[Github](https://github.com/jiripudil/Naja).
