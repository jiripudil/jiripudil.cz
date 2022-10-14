---
title: "Your application needs a clock"
slug: your-application-needs-clock
datetime: 2022-03-10T09:00:00Z
draft: false
cupsOfCoffee: 4
perex: >-
  Previously, I've discussed working with date and time values both server- and client-side, and I've covered storing temporal data in databases. This time, we're going to talk about telling time.
tags:
- clock
- datetime
- php
- software-architecture
- time
---
> This is the last installment in a series of posts about handling date and time in web applications:
>
> 1. [Beyond DateTime: a domain-driven approach to date and time](/blog/beyond-datetime-domain-driven-approach)
> 2. [Beyond Date: bulletproof date and time API in JavaScript](/blog/beyond-date)
> 3. [Storing dates and times in databases: the painless way](/blog/storing-dates-times-in-databases-painlessly)
> 4. **Your application needs a clock**

Being able to tell the current time is necessary on many places throughout your application, whether you're just storing that an order has been submitted right now, or you need to check if an invitation hasn't expired by now, or you're evaluating if some conditions apply now (such as happy hours), you need to know the value of _now_.

If you've taken a look through the API of `brick/date-time` classes, you've probably discovered that most of them provide a method called `now()`. Let's say every branch of our restaurant chain provides a happy-hours discount between 5 and 6:30 p.m. in its respective time zone:

```php
class Branch
{
    public function __construct(
        private readonly TimeZone $timeZone,
    ) {}

    public function isHappyHours(): bool
    {
        $time = LocalTime::now($this->timeZone);
        return $time->isAfterOrEqualTo(LocalTime::of(17, 00))
            && $time->isBefore(LocalTime::of(18, 30));
    }
}
```

At first glance, there's nothing bad in this code. Except there is.

If you delve deeper, you notice that the `now()` method has an optional parameter: `$clock`. If you don't provide one, the library fetches the default one by calling `DefaultClock::get()`. `DefaultClock` is a non-instantiable class that gives back whatever you configure to be the default clock, even at runtime. It is a static global provider of a clock.

By relying on such static state in your code, you essentially give up control over the implementation and its outcome. Solely by looking at the code, you can never tell what kind of clock you get, and whether `now()` is actually _now_. The configuration of the clock is unpredictable: a single rogue `DefaultClock::set()` buried on the opposite end of the codebase can break your method if it gets called at an unfortunate time.

After all, relying on a static global provider of current time brings the exact same issue as relying on _anything_ static and global: it hides the dependency. If your code depends on a clock, it should declare the dependency, proudly and explicitly. It's the principle of dependency injection: be open about what you need, and let it be [someone else's problem to fetch it](/blog/di-services-do-not-need-names).

The method should look like this instead:

```php
class Branch
{
    public function __construct(
        private readonly TimeZone $timeZone,
    ) {}

    public function isHappyHours(Clock $clock): bool
    {
        $time = LocalTime::now($this->timeZone, $clock);
        return $time->isAfterOrEqualTo(LocalTime::of(17, 00))
            && $time->isBefore(LocalTime::of(18, 30));
    }
}
```

When you look at this code, you instantly see where the clock comes from. It is no longer hidden in a global static hellhole. You can search for the usages of the method and see that your application uses a `SystemClock`:

```php
if ($branch->isHappyHours(new SystemClock())) {
    // apply 10% discount
    $totalPrice = $totalPrice->multipliedBy('0.9');
}
```

This is not even the final form yet, but let's stop there for a while. Even this tiny change gives you an immediate benefit: the code is now much easier to cover by tests. The method now depends on an abstraction of a clock, so you can easily – and transparently – set up and use a mock implementation in the test case:

```php
final class BranchTest extends TestCase
{
    /** @dataProvider provideHappyHoursData */
    public function testHappyHours(ZonedDateTime $now, bool $expectedResult): void
    {
        $branch = new Branch($now->getTimeZone());
        $clock = FixedClock::of($now->getInstant());
        Assert::same($expectedResult, $branch->isHappyHours($clock));
    }

    protected function provideHappyHoursData(): iterable
    {
        $timeZone = TimeZone::utc();

        yield [ZonedDateTime::of(LocalDateTime::of(2021, 10, 12, 12, 0), $timeZone), false];
        yield [ZonedDateTime::of(LocalDateTime::of(2021, 10, 12, 17, 30), $timeZone), true];
        yield [ZonedDateTime::of(LocalDateTime::of(2021, 10, 12, 20, 0), $timeZone), false];
    }
}
```

We've got unit tests covered, but what if we want to add integration tests? We should go even further with the propagation of the dependency: there shouldn't even be a single `new SystemClock()` in your application code. You should declare `Clock` as a dependency everywhere you need to be able to tell time, so that you can always configure a mock when you need to test a larger unit of code.

Eventually, at the top of the chain, you should configure the clock of choice in your dependency injection container, so that your application has a single source of truth when it comes to time-telling:

```neon
services:
	- type: Brick\DateTime\Clock
	  factory: Brick\DateTime\Clock\SystemClock
```

The choice of the right implementation is yours. Most of the time, I believe it makes sense to use the current time as reported by the operating system. But if, for example, your users are competing over a limited resource on the first-come, first-served basis, you might want to use a clock fixed to `$_SERVER['REQUEST_TIME']` to eliminate any infrastructure I/O latencies and keep the game fair.

If – and only if – you make thorough use of dependency injection, it is incredibly easy to switch the implementation of the clock, or even provide different clocks to different services based on their purpose and needs.

You might even encounter various third-party packages that expect some sort of a current time provider. Almost five years ago, I've argued about why [we need a clock abstraction](/blog/clock-needs-an-interface). Unfortunately, using `brick/date-time` and its clock doesn't solve the problem from the original post: you still need to write wrappers and adapters for the clock interfaces of third-party packages.

In fact, you would need to write adapters even if there was some kind of a standard, because it would very likely be built upon PHP's standard library and its `DateTime`. The only way out of this would be if a more robust date-and-time API replaced `DateTime` in the standard library, as is going to be the case with [JavaScript](https://github.com/tc39/proposal-temporal).

But let's be grateful that despite the absence of an interoperable abstraction, more and more project maintainers are aware of the need of a clock, and that we can therefore have a truly single, reliable source of _now_ in our applications.
