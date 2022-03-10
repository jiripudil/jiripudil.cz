---
title: "Beyond DateTime: a domain-driven approach to date and time"
slug: beyond-datetime-domain-driven-approach
datetime: 2021-05-21T08:30:00Z
draft: false
cupsOfCoffee: 12
perex: Time is omnipresent in software development. Pretty much every web application works with it in one way or another. Even the simplest blogging platform stores "when" a post should be published and then displays and sorts them using that information. While you might not run into any issues when developing a blogging platform, any more complex system can easily expose how complicated time actually is. Because time <em>is</em> complicated. And yet, many standard libraries in programming languages only give us a limited arsenal to tackle it.
tags:
  - domain-driven-design
  - datetime
  - php
  - software-architecture
  - time
---
> This is the first installment in a series of posts about handling date and time in web applications:
>
> 1. **Beyond DateTime: a domain-driven approach to date and time**
> 2. [Beyond Date: bulletproof date and time API in JavaScript](/blog/beyond-date)
> 3. [Storing dates and times in databases: the painless way](/blog/storing-dates-times-in-databases-painlessly)
> 4. [Your application needs a clock](/blog/your-application-needs-clock)

This post is a condensed derivation of several talks that I've given at various meetups and conferences.

## What is time, anyway?

To understand in what ways time is complicated, we first need to understand time itself. We're lucky to have it explained by one of the biggest experts, [the Doctor](https://www.bbc.co.uk/programmes/b006q2x0). The Doctor comes from the race of Time Lords, a species that has mastered time travel, and routinely travels here and there across time and space to save humanity again and again. This is what the Doctor has to say about time:

<iframe width="560" height="315" src="https://www.youtube.com/embed/cwdbLu_x0gY?controls=0&amp;start=33&amp;end=62" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Um, this wasn't particularly useful. But at least it confirms my point that time is 'complicated. Very complicated.'

Enough fun, let's take a more productive direction. Wikipedia says this about [time](https://en.wikipedia.org/wiki/Time):

> Time is the indefinite continued progress of existence and events that occur in an apparently irreversible succession from the past, through the present, into the future.

And a couple of sentences later, it adds:

> Time is often referred to as a fourth dimension.

Again quoting Wikipedia, dimension 'is informally defined as the minimum number of coordinates needed to specify any point within (a mathematical space).' Time is a single dimension, we can mentally represent it as a single axis, and we need a single coordinate to 'specify any point' in time.

For such coordinate to be meaningful, we also need a point of reference, an origin. Time has a natural origin, the Big Bang. The trouble is that we can only estimate how long ago it occurred up to a precision of billions of years. Because computing technology needs to refer to time with a slightly better precision, we use the Unix epoch (January 1, 1970, midnight UTC) as the origin, and a Unix timestamp (the number of seconds elapsed since the epoch) as the coordinate.

Unix epoch and timestamps give us the ability to precisely pinpoint a single moment in time and refer to it using a number. That makes it easier to grasp time mentally and communicate about it to arrange appointments or set deadlines. But while a modern 64-bit computer is totally oblivious to how big the timestamp is, human minds tend to be more efficient with smaller numbers. I don't know about your mind, but mine would give up if it looked at the brand new 4" ultra-wide Apple Watch on my wrist and see that the time is `1621585800`.

And the necessity to accommodate this pretty simple scientific notion of time to human minds is what makes it so complicated.


## A brief history of timekeeping

However, time wasn't always so complicated. Actually, the need to keep track of time is quite new. Just a few centuries ago, people only used the Sun as their clock. They would wake up as the sun was rising, go to work, have lunch when the sun was at its peak, work some more, and eventually go to bed when the sun was setting.

The funny thing about this is that all of this is still essentially the same today. The old sundials still show pretty accurate time, and our daily routines are still to a huge extent determined by the movements and rotations of celestial bodies. But something has changed over the centuries: the world is much more dynamic today.

The Sun only shows the _local_ solar time. Sundials are a nice demonstration of the fact: usually, they are fine-tuned to a particular longitude. You can't take the sundial with you like your regular wrist watch and expect it to show the right time – if you move a sundial by a single degree of longitude, the time will be off by about four minutes due to Earth's rotation.

In the past, it was not very common to travel or communicate over long distances. And even if you did, it would take a significant amount of time and you wouldn't have to stick to a tight schedule. But we humans have kept devising means of transport and communication that would allow us to overcome longer distances in shorter times: most importantly, the steam engine. The steam engine not only made it possible to replace manual labour with machines and kick off the industrial revolution, it also allowed people to take a train.

With timetable passenger services, it was more and more inconvenient for each location and railway operator to observe its own local time. The railway companies in Great Britain quickly transitioned to GMT which had, until then, only been used for naval navigation. Greenwich Mean Time, the mean solar time observed at the Royal Observatory in Greenwich, London, has soon become a _de facto_ – and eventually the _de iure_ – standard time for the British islands.

Similar processes led to the standardization of time in almost all inhabited parts of the world by the turn of the 20th century. Lots of the early time zones used to observe time at some local observatory, but eventually all time zones have settled on some standard offset from UTC – a worldwide standard time that observes the mean solar time at 0° longitude. Not all of the offsets are whole hours, though!

Important thing to notice is that time zones are more of a geopolitical concept rather than a purely geographical one. While so-called nautical time zones provide a perfect division by 15 degrees, the boundaries of terrestrial time zones are skewed in many ways, and not only to follow international borders: for instance, France and Spain chose to observe the Central European Time although they lie within the GMT or West European Time region. Also, the whole China observes a single time zone despite spanning at least four of them geographically.

As if this wasn't difficult enough, perhaps the most complicated piece of this whole puzzle is daylight savings time. Introduced during the World War I to conserve coal, the practice of advancing the clock by an hour during the summer is still commonplace today, mainly in Europe and North America. The tricky part is that DST is a political matter too: the exact dates and times of transitions tend to vary by country, and some countries even have different DST rules in different regions. On top of that, any country can at any time decide to change their DST rules, or a time zone (or time zones), or even [the side of the international date line](https://en.wikipedia.org/wiki/UTC%2B14:00#History). These things _do_ indeed happen every now and then.

Thanks to all these complexities, the timezone identified as Europe/Prague is not the same thing as CET or UTC+1. The latter is a fixed offset from UTC, whereas the former carries the whole baggage of historical timezone changes and DST transition rules, and therefore its value largely depends on "when" you use it.


## The hammer and the nail

I hope you now believe me that time is very complicated, and have a better understanding of why it is so. With that, we can now finally discuss why many programming languages fail to provide appropriate tools to represent and compute time.

I have shown you a lot of temporal concepts. On the absolute, scientific side, we have timestamps as unique, unambiguous coordinates in time. On the fuzzy, humane side, we have calendars and clocks, dates and times, years, months, days, hours, minutes, seconds, and on top of that, all kinds of time zones.

Each of these concepts has its own specific properties, requirements, limitations, interactions and, most importantly, use cases: You would use a timestamp to store when a blog post should be published, and then compare it to the current timestamp to hide not-yet-published posts. However, to display the publication timestamp to the reader, you might prefer a date and time, ideally in the reader's local time zone. In many cases, you need to represent sole dates like a date of birth, or sole times of day such as opening hours of a restaurant.

PHP only gives you `DateTime` to tackle all this. A `DateTime` is basically a date-and-time value with a time zone. Even if you don't specify a time zone when constructing a `DateTime`, it uses the configured default time zone. So it is there even if you don't want it to. (As a side effect of that, `DateTime` can also act as a coordinate pointing to a specific moment in time.)

To represent anything else, developers often have to resort to workarounds, like using midnight to represent a sole date. Which is so wrong – `2021-05-21 00:00:00 Europe/Prague (+02:00)` is not the same thing as `2021-05-21`. There are extraneous bits of information that just don't belong to the concept of a calendar date, and they might potentially shoot you in the foot when you least expect it. There are also extraneous _operations_ available that don't belong to a calendar date.

The assumption that this specific value represents a calendar date is only in your head. Or, in best case, in a comment somewhere. A comment might easily get overlooked: it's not enough to stop you from doing something that breaks the assumption, like adding or subtracting a few hours, or changing the time zone. Neither of these operations makes sense in the context of a calendar date, and yet, `DateTime` allows you to do them, possibly even altering the date value.

You have probably heard a variation on the famous quote by American psychologist Abraham Maslow:

> I suppose it is tempting, if the only tool you have is a hammer, to treat everything as if it were a nail.

`DateTime` is the hammer. A date and time with a time zone is a nail. They fit together. However, all the other concepts I've described above are a fine selection of screws: a timestamp is a slotted head, a date is a Phillips head, a time is a Torx, a _local_ date and time without the time zone component is an Allen head. You can use a hammer to nail the screws in, but you'll likely break something in the process and it won't hold that well anyway.


## The multi-bit screwdriver

I like domain-driven design a lot. It's an approach to software development that focuses on representing reality the way people think and communicate about it. You base the code on mental models derived from a thorough understanding of the domain, using the same vocabulary and language as your users.

In the lead paragraph, I've mentioned a blogging platform: you can imagine there are 'posts' and 'comments' and 'authors' and 'editors' in the system, and that a 'post' can probably be 'created', but also more specifically 'drafted,' or 'proofread,' or 'published.' In a rich, domain-driven model, your classes and their methods would use these words.

In practice, domain-driven design is more complex than that, involving actual conversations with actual people. But even this simple modelling exercise that I've done in my head shows that we often apply some of the domain-driven design principles without much consideration.

If we do this — often so intuitively and routinely — to the core domains of our applications, why not do the same to something as complicated as time? We could introduce a `Date` and a `Time`, maybe even a `Timestamp`, each with a custom tailored API that makes sure that a date stays a date. How does that sound?

If you like the thought of that, you'll probably be even happier to hear that these classes already exist. Back in 2014, Java 8 has introduced a brand new Date and Time API, codenamed JSR-310. Building upon years of previous community efforts, this new API brings a well-thought set of classes, each designed to represent a single temporal concept and provide only methods that make sense in the context of the concept.

In `java.time`, you have an `Instant` that represents a specific point in time as a timestamp. You have a `LocalDate` and a `LocalTime` that represent a sole date and a sole time, respectively. Unsurprisingly, there is a `LocalDateTime` that combines both of these pieces together. Finally, there is a `ZonedDateTime` that adds the time zone component into the mix, and there are different implementations of different kinds of time zones: a `ZoneOffset` for a fixed-offset time zone such as UTC+1, and a `ZoneId` for an identifier-based time zone such as Europe/Prague.

On top of these basic concepts, there is a `Duration` to represent a deterministic time-based interval such as 2.5 hours, and also a `Period` to represent a calendar-based interval such as 2 months. There are tools for other more or less common use cases too, including date and time ranges, a week in a year, a day and a month _without_ a year to store dates like birthdays, and various singular components of a date-time such as a month or a year. The Date and Time API is a screwdriver with a huge, versatile set of bits for every possible screw head you can think of.

At first, you might feel this API is quite binding. It forces you to stop and think about every single temporal value in your application and determine which concept it is, and thus which class would be best to encapsulate it. But in the end, it is incredibly liberating to know exactly which concept each and every value represents. It is so reassuring to be able to distinguish it just from looking at the value's type, and to know that the carefully designed API and the language's type system won't let you do anything stupid.

You will also be pleasantly surprised to learn that you often don't need to deal with the time zone insanities at all. From my experience, you can use instants and local dates and times most of the time, and only include the time zone when absolutely necessary. And even then the API is there to force you to think and then guide you.


## ~~Good~~ ol' `DateTime`

Now you're probably thinking, 'Yeah, that's good for Java to have this API, but how does that help my PHP codebase?' Don't worry. My advice is not to rewrite your application in Java. Seriously, I would never say something like that. If you want to explore in this direction, go straight for Kotlin.

But you don't have to do that either. There are ports of the JSR-310 API to other languages including PHP, so if you'd prefer to stick with PHP, I recommend using [brick/date-time](https://github.com/brick/date-time). 

It is heavily inspired by Java's Date and Time API and provides a similar set of tools (or screwdriver bits, if you're keeping up with the metaphor): there is an `Instant`, there are `LocalDate`s and `LocalTime`s and `LocalDateTime`s, there's a `ZonedDateTime`, it has a `TimeZoneOffset` and a `TimeZoneRegion` to distinguish between the two types of time zones. It gives you a `Duration` and a `Period` and ranges and weeks and months and years. As a nice added bonus, all of the classes are immutable, so you don't have to worry about breaking a computation because you've changed some value elsewhere by accident.

In the end, you only have to learn to determine which kind of screw you have before you. Once you identify the screw, the right screwdriver will just pop out of the toolbox and tell you what you can and cannot do with it. It might take some practice at first, but soon it'll come naturally in most cases. And you'll appreciate that the API forces you to carefully think about the more complex cases, instead of making you smash them with a hammer.

The type safety and having a sensible set of methods are good things, obviously, but I believe this _thinking_ part is actually the greatest benefit of this approach. This thorough date and time API gives you a whole new mental framework to argue about time and all its peculiarities – a mental framework that feels so natural once you start using it, because it is, in a truly domain-driven way, based on how our human minds think about time.


## Conclusion

It can be confusing to see the exact moment of publication of a blog post represented by a `DateTime`, when all you care about is the coordinate of the `Instant` in time so that you can compare it to other coordinates. It's confusing to see the date of birth represented by a `DateTime`, when you in fact don't care about the specific time and you only need a `LocalDate` of birth. It's confusing to see opening hours represented by a pair of `DateTime`s, when it's a couple of `LocalTime`s that's actually written on the restaurant door.

Using a proper date and time API clears that confusion. It helps both when writing _and_ reading the code: it makes it easier for you to explicitly express the intent of the code, for your colleagues to argue about the solution in code review, and for a new developer to understand what's going on with time in your codebase. In fact, even a non-technical person could take a look at the code and probably figure out what it is about.

It might feel overwhelming to go and rewrite the whole application to use this API. Approach it as any other refactoring: use it in newly introduced code, and gradually refactor the old code as you delve into it to do other changes there.

In the long run, it's going to be for the benefit of everyone.

---

My obsession with time in software development stems from an off-by-one-hour error I've introduced to an application a few years back. Turns out JavaScript's `Date` has perhaps even stranger quirks than PHP's `DateTime`.

This only goes to show that this post, despite being tremendously long already, has merely scratched the surface: we could further talk about working with time client-side. I could discuss exchange formats for sending date-and-time values back and forth between browsers and servers. I could tell horror stories about storing temporal data in databases. I could argue about why you should use a [clock](/blog/clock-needs-an-interface) in your application.

I guess those topics will have to wait for now, but I'd like to revisit them soon™ in a few shorter follow-ups. So stay tuned!

If you have a burning question in need of an answer, or a story to share about your experience with dates and times in software development, feel free to join the discussion below!
