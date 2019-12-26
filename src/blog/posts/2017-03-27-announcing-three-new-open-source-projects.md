---
legacyId: 29
title: Announcing three new open-source projects
slug: announcing-three-new-open-source-projects
datetime: 2017-03-27T08:00:00Z
draft: false
cupsOfCoffee: 5
perex: "I've had a really productive couple of weeks and (mostly) weekends recently. I've worked extensively on one of my side projects using modern JS stack including Webpack, faced issues here and there, and found a way to solve them. In the end, I proudly announce three new open-source packages: a modern AJAX library for Nette Framework, Neon loader for Webpack, and a library integrating the Webpack build process into Nette-powered applications."
tags:
  - ajax
  - frontend
  - javascript
  - naja
  - neon
  - nettefw
  - open-source
  - php
  - reactjs
  - webpack
---
First of all, some context: in a part of my free time, I am a singer-songwriter. I've had this website,
[herecsrymy.cz](https://herecsrymy.cz), for about two years. The main thing I use it for is uploading my songs there
so that people can listen to them. But the user experience was suboptimal: songs were on separate pages which you had
to navigate to and then play the `<audio>` thing there. When the song finished, you hit the Back button, chose another
one, and repeated the process. It seemed somewhat annoying.

In recent months, I've been working on the website in my free time, and there it is, anew! My primary focus was to
improve the UX of listening to songs, but I couldn't miss the opportunity, so I completely redesigned the website,
and also vastly cleaned and upgraded the whole codebase. In short, it now feels more like it's 2017.

If I should pinpoint one thing, it would be the audio player, obviously. It's a micro-application written in React
using [Howler.js](https://github.com/goldfire/howler.js) that handles the audio playback. Although it's not a standalone
package, the whole website's source code is open so you can take a look
[at the code](https://github.com/jiripudil/herecsrymy.cz/tree/05b616bdab9d3c47c109a699c0e1e5845f85d7e5/client/player).


## A modern AJAX library for Nette Framework

Hand in hand with the player goes AJAX navigation through the site. With any browser navigation, the seamless playlist
player wouldn't really make sense, so I needed a solid AJAX library. I evaluated the available options:
[nette.ajax.js](https://github.com/vojtech-dobes/nette.ajax.js) depends on jQuery which is unnecessary, and
[Nittro](https://www.nittro.org) seems too opinionated. I've had a hard time trying to customize some aspect of it
half a year ago, and it seemed that its learning curve hadn't got any more pleasant since then for someone used to
the plug-and-play nature of ES6 modules.

So I decided to write my own library with two goals in mind: first, to use modern vanilla JS APIs while maintaining
compatibility with IE 10 and above, and second, to make it as easy to use but also extend as is nette.ajax.js.
The result is called [Naja](https://github.com/jiripudil/Naja). It integrates nicely with the modern JavaScript
ecosystem, is [thoroughly](https://codecov.io/gh/jiripudil/Naja) [tested](https://travis-ci.org/jiripudil/Naja)
and [easily](https://github.com/jiripudil/Naja#extension-implementation)
[extensible](https://github.com/jiripudil/herecsrymy.cz/tree/05b616bdab9d3c47c109a699c0e1e5845f85d7e5/client/app/scripts).
Feel free to give it a go:

```sh
$ npm install naja
```

```js
import naja from 'naja';
document.addEventListener('DOMContentLoaded', naja.initialize.bind(naja));
````


## Webpack integration

Both on the aforementioned site and on one of my work projects, I have used Webpack to bundle the application assets.
This resulted in two more packages. First is the [`neon-loader`](https://github.com/jiripudil/neon-loader) that allows
you to load Neon files easily into the Webpack-built application so that you can e.g. share some configuration between
Nette and JS:

```js
import config from 'neon-loader!./common.config.neon';
```

Second is [`WebpackNetteAdapter`](https://github.com/o2ps/WebpackNetteAdapter) that provides a solution to the problems
you face when having a React application inside a standard Nette application, like _what the hell should I write into
the `<script>` tag if I sometimes use webpack-dev-server (and sometimes not) and if file names contain cache-busting
hashes_. The adapter takes care of all this and exposes a handy little Latte macro for you:

```html
<script src="{webpack asset.js}"></script>
```

You can read more on the configuration of the adapter in its README on [Github](https://github.com/o2ps/WebpackNetteAdapter).


## Tada!

The neon-loader is stable at 1.0.0 since it's really simple when it comes to code. Naja and WebpackNetteAdapter are, at
the time of writing, in alpha and RC stages, respectively, as I'd like to get some user feedback and catch the bugs I've
missed before releasing stable versions.

Naja and neon-loader are released under the MIT license and WebpackNetteAdapter under the New BSD license. All three
of them are already used in production, so feel free to try them, submit issues and contribute via pull requests :)
