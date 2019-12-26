---
legacyId: 39
title: What's new in Naja 1.1.0
slug: what-is-new-in-naja-1-1-0
datetime: 2017-10-27T19:08:00Z
draft: false
cupsOfCoffee: 7
perex: In the course of the last few weeks, I have invested some time into Naja. You might recall my previous announcement in which I stated that there was still one big thing left to do. Well, now it is done!
tags:
  - ajax
  - frontend
  - javascript
  - naja
  - nettefw
  - open-source
  - testing
---
## The small steps

But let me first go through the list of small changes that I've done:

### Proper promise resolution/rejection

While `makeRequest()` _did_ return a promise, it was somewhat useless, as it carried no information about the
request; not even whether it was successful. That is no longer true: the returned promise is now resolved with
the parsed response body, or rejected with the thrown error.

Now if you dispatch the request manually, you can chain custom behavior after the response is processed by Naja:

```js
naja.makeRequest(method, url)
	.then((response) => {
		// ...
	})
	.catch((error) => {
		// ...
	});
```

### Aborted request is not an error

Another change concerns aborted requests. Naja used to (mistakenly) trigger the error handling for aborted requests,
whereas the circumstances that lead to aborting the request do only rarely indicate an erroneous state. Usually it's
just the user navigating away, or Naja's UniqueExtension kicking in because another request was dispatched.

Therefore aborted requests no longer trigger `error` event, and should be processed – if ever needed – in a
specific `abort` event. Note that aborted requests also trigger the `complete` event.

### History under your control

`HistoryHandler`, a core component responsible for modifying the browser's history, can now be configured on the
front-end side via a `history` key in the `options` object or `data-naja-history` attribute on the AJAXified element.
By default, Naja pushes a new state to the history, but you can instruct it:

- to replace the current state instead of pushing a new one, by setting `options.history` to 'replace'` or
    `data-naja-history="replace"`, or
- to keep the request off-the-record and not modify the history state at all, by setting `options.history`
    to `false` or `data-naja-history="off"`.

### Custom selector

Last but not least, the bound selector was hard-coded to `.ajax`, a default taken from nette.ajax.js library.
To accommodate for a wider range of use cases, the selector can now be changed:

```js
naja.uiHandler.selector = '[data-naja]';
naja.uiHandler.selector = ':not(.synchronous)';
naja.uiHandler.selector = '';
```

As you can see, you can easily switch the scheme from opt-in asynchronicity to _opt-out_ asynchronicity, which
gives you far more opportunities to shoot yourself in the foot by dispatching cross-origin AJAX requests (and
believe me, those are tricky).

To alleviate this, UIHandler now checks the target URL and does not dispatch the request asynchronously if it
points to an external resource with a disallowed origin. You can of course configure the allowed origins:

```js
naja.uiHandler.allowedOrigins.push('https://trusted.origin.com:4000');
```

The current origin is allowed by default, so you can point asynchronous links to absolute URLs as well.


## The big leap

Now to the big change. It's funny because it does not much affect the code of Naja itself, but still has a lot
of practical implications: **the tests now run in the browser.**

Yes, in the end I've managed to make them run in the browser instead of Node. I've used
[Karma](https://karma-runner.github.io) and set up an OSS account on [SauceLabs](https://saucelabs.com) so that
the whole test suite is executed on a wide range of browsers including Internet Explorer and mobile device
simulators, for every push.

I've invested a tremendous amount of time into it – something close to a whole weekend and a half – but the benefits
have already outweighed the cost: it has helped me discover a few incompatibilities in quite critical sections
of the code; surprisingly not only with old Internet Explorers, but also recent versions of Safari.

Besides, I've learnt so much in the process, which is always a good thing!

I'm really excited about this new release and I hope you will enjoy it as much as I do. Go and give it a try,
it's just one `npm update` away :)
