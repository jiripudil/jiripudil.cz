---
legacyId: 33
title: Clock needs an interface
slug: clock-needs-an-interface
datetime: 2017-05-23T15:50:00Z
draft: false
cupsOfCoffee: 4
perex: "Almost every application needs to work with time: if not for some greater purpose like expiring access credentials, entities usually store information about when they were created or generally when something happened. Telling time is indeed a crucial responsibility, and being able to rely on the mechanism across the whole codebase is really important. But it can get problematic."
tags:
  - clock
  - interop
  - php
  - testing
---
I've been using Luís Cobucci's [JWT library](https://github.com/lcobucci/jwt) and I'm excitedly looking forward to its
next major release. One of the issues that needed to be done for the new version, however, caught my attention: it
[wires a time provider](https://github.com/lcobucci/jwt/pull/180) into time-based validation so that you can easily mock
the current time in tests. That's definitely a good thing and a step forward from the timestamp integer it used to
require before.

However, it introduces a new dependency on `lcobucci/clock`, which
[openly describes itself](https://github.com/lcobucci/clock) as a "Yet another clock abstraction...". Um. Do we really
need "yet another one"? Searching packagist for "clock" gives you several viable alternatives – and I haven't bothered
with those that use different names – and they all do the one same thing.

What differs, though, is the exposed interface. While yes, it has one job, which is to return the current time, the
nomenclature varies from casual `getDateTime()` to fancy `now()`, and even the interface itself is `Clock` or
`TimeProvider` or `DateTimeProvider`. The time providers also differ in the way they are configured and instantiated.
And the worst bit is that _there just are two different things that do the same thing_.

Now, why is this bad? Imagine the following situation: you already use one time provider implementation and it reliably
tells time across your whole codebase. Then, you upgrade the JWT library to a long-anticipated new release, and... oops,
turns out it has its own way of passing time to it. Now you have two choices:

1. Configure and use its time provider - and introduce a second source of truth when it comes to what time it is.
    This has some implications: e.g. if you wanted to use one frozen time for the whole request, you would have to make
    sure they are both called at the exact same microsecond, because PHP's `DateTime` now has microseconds precision.
    So you choose to
2. Write an adapter that implements the library's interface and internally uses your well-known time provider,
    and hope the interfaces don't break in future releases. I guess that's pretty unlikely to happen, so this sounds
    like the lesser evil of the two.

But then, a new task comes up: implement a two-factor authentication. This is usually done using TOTP codes, and the
thing with TOTP codes is that *the first T stands for 'time-based'*. So you plug in another library: I've
[written one](https://github.com/o2ps/TotpAuthenticator) myself in the past, and it suffers from the same problem:
it depends on its own `TimeProvider`. Things are getting serious quickly.

The purpose of the time provider interface is, obviously, to abstract the current system time. At the same time,
I believe it's practical to have that aforementioned *single source of truth*, therefore the abstraction should
be _application-wide_. You could as well go around passing the same `DateTimeImmutable` as an argument everywhere,
but that's a lot of boilerplate. And while replacing this boilerplate with another boilerplate of configuring three
different time providers to tell the same time is an option, it doesn't sound appealing.

What would help, I believe you've guessed it by now, is **a common interface,** provided by some clock-interop package.
Libraries that need to work with current time should depend on that interface and leave it to the developer to configure
and distribute a single implementation across their whole application.

We have PSRs for everything, proposed or accepted, and lots of them aim for interoperability by extracting interfaces
for common problems. Throughout this post, I've argued why I think clock calls for a standard interface as well:
to easily wire time-dependent third-party classes together. How does this proposal sound to you? Please share your
thoughts in the discussion.
