---
title: "Beyond Date: bulletproof date and time API in JavaScript"
slug: beyond-date
datetime: 2021-10-30T19:00:00Z
draft: false
cupsOfCoffee: 4
perex: >-
  I've talked about date and time not being easy in PHP, and it's not easier in JavaScript either. Luckily, similarly to
  the PHP ecosystem, the community has provided better solutions to date and time than the native <code>Date</code>. Let's discuss them.
tags:
- domain-driven-design
- datetime
- javascript
- nodejs
- software-architecture
- time
---
> This is the second installment in a series of posts about handling date and time in web applications:
>
> 1. [Beyond DateTime: a domain-driven approach to date and time](/blog/beyond-datetime-domain-driven-approach)
> 2. **Beyond Date: bulletproof date and time API in JavaScript**
> 3. [Storing dates and times in databases: the painless way](/blog/storing-dates-times-in-databases-painlessly)

As I've outlined in [the previous post](/blog/beyond-datetime-domain-driven-approach), working with date and time doesn't end with PHP. Nowadays more than ever, apps heavily rely on client-side execution. And let's be honest: JavaScript's `Date` is perhaps even a larger mess than PHP's `DateTime`.

I could stop the argument there at the point I made in the previous post: `Date` is a single class used to represent many different temporal concepts, and as such it can hardly represent either of them properly. And it adds a bunch of other issues on top of that, including:

- **It has a terrible API.** For any modification, you have to construct abominable method call chains such as `date.setHours(date.getHours() + 2)`, which even returns a number (of milliseconds since the epoch) instead of an instance of `Date`.
- **It is mutable.** Even if you manage to `setHours()` correctly, it modifies the original instance in-place. This can easily shoot you in the foot. Temporal data are value objects, and value objects should be immutable.
- **It only works in the local time zone.** It also supports UTC, but through a separate set of methods (such as `getUTCHours()` and `setUTCHours()`). This is a very limiting factor if you're writing an application that users access from different time zones.

There are some popular wrappers over `Date` available, perhaps the most notable one being [Moment](https://momentjs.com/). Although it provides a significantly more pleasant API and even has a timezone-aware plugin, it suffers from the same other issues too: it is mutable, and it only provides a single class to represent various temporal concepts.

Then there's [Luxon](https://moment.github.io/luxon/#/), a de facto successor to Moment. It finally brings immutability into the game, yay. It also 'abuses the Intl API horribly to provide time zone support,' which comes at the cost of some parts of the Intl API (and thus also Luxon) being browser-dependent. Moreover, the main class in Luxon has a more fitting name of `DateTime`.

But the name doesn't change the fact that **it is still a single class.** If you kindly let me borrow the toolbox metaphor from my previous post: you need a wide selection of screwdriver bits but all you get from any `Date`-based solution is a hammer.

We have to step away from `Date` entirely.


## The multi-bit screwdriver, once again

My package of choice for working with date and time is [`js-joda`](https://js-joda.github.io/js-joda/). It too draws a lot of inspiration from Java's Date and Time API and its preceding efforts, and provides all the familiar concepts and classes including `Instant`s, `LocalDate`s, `LocalTime`s and `LocalDateTime`s, `ZonedDateTime`s with distinct `ZoneRegion` and `ZoneOffset` implementations, `Duration`s and `Period`s, all immutable and each with a fine-tuned set of methods that prevent you from shooting yourself in the foot.

This is your go-to solution for JavaScript. There are only a few caveats you need to know about:

First, to my disappointment, the package is not widely adopted. Pretty much any date-time widget or component, ranging from date pickers, to calendars, to time-ago formatting helpers, etc., works with `Date` or Moment. If you choose to use `js-joda`, you have to do conversions on all these edge spots. Luckily, the package provides simple conversion functions, but you still need to be careful with it. 

Second, if you want to work with time zones client-side, it's heavy. The Intl API still doesn't provide much information about time zones (unless you 'abuse it horribly' like Luxon does), so for `js-joda` to be able to support other time zones than the user's local time, it needs to bring along a substantial portion of timezonedb (in fact, funnily enough, extracted from Moment's timezone plugin). You should limit the number of places where you need to work with multiple time zones, and make use of techniques like code splitting to lighten the resulting bundle.

Third, basically the same applies to localization. For the lack of support in the Intl API, `js-joda` ships with its own localization packages, prebuilt for the most common locales, and available with a more complex setup for any locale included in `cldr-data`. Again, you can take measures to minimize the resulting bundle size, or convert `js-joda` objects to native `Date` and use the `Intl.DateTimeFormat` API directly.

Apart from those three issues, `js-joda` is an amazing tool with great value.


## Talking to the server

Another huge part of working with date and time client-side is the information exchange with the server. You need appropriate formats to be able to send temporal values to the server and receive them back. This is not always straightforward with `Date` (or `Date`-based libraries, for that matter), for all the reasons I've listed above: it only supports local time and UTC, and it's a single class used to represent multiple concepts, naturally forcing you to use a single _format_ to represent values of different kinds and purposes.

Using `js-joda` makes this effortless. Assuming that you're already using `brick/date-time` server-side, any temporal data you need to send from the client can be mapped onto a matching PHP class, and vice versa. Since both packages offer very good support for ISO 8601, a widely adopted international standard that prescribes information interchange formats for time-related data, there is nothing left for you to worry about.


## A glimpse of a better tomorrow?

Quite unsurprisingly, I'm not alone in my objections to JavaScript's `Date`, and thus, a proposal of a [more robust Temporal API](https://github.com/tc39/proposal-temporal) has made it all the way to TC39 and is currently at Stage 3, which means it could be included in the ECMAScript specification within a couple of years. We'll probably need to include a polyfill for Safari for another few years, but I'm looking forward to it regardless.

Until then, `js-joda` is as good as it gets!
