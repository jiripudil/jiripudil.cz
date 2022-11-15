---
title: "The true power of sealed classes"
slug: true-power-of-sealed-classes
datetime: 2022-11-15T09:30:00Z
draft: false
perex: >-
  In my recent post, I've introduced a PHPStan extension that brings support for sealed classes and interfaces to statically analyzed PHP. Looking back, I feel I haven't stressed the main benefit enough, so here I am doing it justice.
tags:
- php
- phpstan
- sealed-classes
- static-analysis
---
First of all, I'd kindly ask you to go read [the announcement](/blog/seal-your-classes-with-phpstan) if you haven't already. Late in the post, I have shown an example of a sealed interface hierarchy. Let's build up on that example:

> Consider an appointment-planning application: you can _request_ an appointment on a given day, the other party _offers_ you a set of times they are available, you _pick_ one of them, and the other party eventually _confirms_ the appointment, or _offers_ you a new set of times in case the one you've chosen is no longer available.

This is an approximation of one way we could model such concept in domain code:

```php
interface AppointmentState {}

class RequestedAppointment implements AppointmentState { /* ... */ }
class OfferedAppointment implements AppointmentState { /* ... */ }
class ProposedAppointment implements AppointmentState { /* ... */ }
class ConfirmedAppointment implements AppointmentState { /* ... */ }
```

But applications aren't all domain code. On top of the core business logic, there is always an API or a UI layer, a part of which might be this tiny function that converts the appointment state into a short, human-readable description:

```php
function describe(AppointmentState $state): string
{
    return match (true) {
        $state instanceof RequestedAppointment => 'requested',
        $state instanceof OfferedAppointment => 'times offered',
        $state instanceof ProposedAppointment => 'time proposed',
        $state instanceof ConfirmedAppointment => 'confirmed',
    };
}
```

If we let PHPStan analyze this code, we'll get a cryptic error:

```
------ --------------------------------------------------------
 Line   describe.php
------ --------------------------------------------------------
 5      Match expression does not handle remaining value: true
------ --------------------------------------------------------

[ERROR] Found 1 error
```

The message is only cryptic due to how I've chosen to write the `match`. All it's saying is that the `match` doesn't cover all possible situations. As far as PHPStan is concerned, any other implementation of the `AppointmentState` interface can make its way into the codebase and, in turn, the `describe` function. And we're forgetting to handle it.

The fix is simple, yet tedious:

```php
function describe(AppointmentState $state): string
{
    return match (true) {
        $state instanceof RequestedAppointment => 'requested',
        $state instanceof OfferedAppointment => 'times offered',
        $state instanceof ProposedAppointment => 'time proposed',
        $state instanceof ConfirmedAppointment => 'confirmed',
        default => throw new ThisShouldNotHappen(),
    };
}
```

Or we could instruct PHPStan to ignore this error. It's all the same. We're doing this only for the sake of PHPStan. Just to make it happy. Just to make it shut up. Just because it doesn't understand the code in as much depth as we developers do. Well, with sealed classes and interfaces, turns out it _can_ understand the code better:

```php
#[Sealed(permits: [
    RequestedAppointment::class,
    OfferedAppointment::class,
    ProposedAppointment::class,
    ConfirmedAppointment::class,
])]
interface AppointmentState {}
```

With the interface marked as sealed over the four known implementations, we can safely remove the `default` case from the `match` expression, and PHPStan will be satisfied with it. In fact, we _must_ remove the `default` case because if we don't, we'll get an error:

```
------ ----------------------------------------------------------------------
 Line   describe.php
------ ----------------------------------------------------------------------
 5      Match arm is unreachable because previous comparison is always true.
------ ----------------------------------------------------------------------

[ERROR] Found 1 error
```

By this, PHPStan is trying to tell us we no longer need the `default` because all possibilites are already accounted for. So let's remove it:

```php
function describe(AppointmentState $state): string
{
    return match (true) {
        $state instanceof RequestedAppointment => 'requested',
        $state instanceof OfferedAppointment => 'times offered',
        $state instanceof ProposedAppointment => 'time proposed',
        $state instanceof ConfirmedAppointment => 'confirmed',
    };
}
```

We're back at where we were with this function. The difference is that PHPStan now knows that there won't ever be any other implementation of the `AppointmentState` interface. We've removed the shut-up-for-once-I-know-what-I-am-doing `default`, and replaced it with a wink-wink-we-both-understand-what-is-going-on awareness of the situation.

We've managed to give PHPStan the same knowledge we have, **and more:** PHPStan now has our back covered.

Let me revisit my original post:

> Finally, introducing a new state into the mix, such as _canceled_, alters all these rules and often requires non-trivial changes in code.

I'm pretty sure that in our appointment-planning application, this business requirement will come sooner rather than later. And when it does, PHPStan is ready to help us:

```php
class CanceledAppointment implements AppointmentState { /* ... */ }
```

This code alone will produce an error:

```
------ ------------------------------------------------------------------------------
 Line   canceled.php
------ ------------------------------------------------------------------------------
 3      Type CanceledAppointment is not allowed to be a subtype of AppointmentState.
------ ------------------------------------------------------------------------------

[ERROR] Found 1 error
```

Of course. We have to add this new implementation to the list of permitted subtypes of the sealed interface:

```php
#[Sealed(permits: [
    RequestedAppointment::class,
    OfferedAppointment::class,
    ProposedAppointment::class,
    ConfirmedAppointment::class,
    CanceledAppointment::class,
])]
interface AppointmentState {}
```

As soon as we do this, our cryptic error message from before makes a comeback:

```
------ --------------------------------------------------------
 Line   describe.php
------ --------------------------------------------------------
 5      Match expression does not handle remaining value: true
------ --------------------------------------------------------

[ERROR] Found 1 error
```

However, while the wording is the same, the meaning is different now. We're not forgetting to handle just _any_ old case that we can remedy by throwing in an artificial exception in the `default` branch of the `match`; this time, we're forgetting to handle the one specific case that we've just added: `CanceledAppointment`.

This is what I meant by 'PHPStan now has our back covered.' It will tirelessly analyze our whole codebase and pinpoint every single place where we're expecting `AppointmentState` and neglecting to handle the eventuality of the appointment getting canceled. We can go through the report, error by error, and fix it the right way:

```php
function describe(AppointmentState $state): string
{
    return match (true) {
        $state instanceof RequestedAppointment => 'requested',
        $state instanceof OfferedAppointment => 'times offered',
        $state instanceof ProposedAppointment => 'time proposed',
        $state instanceof ConfirmedAppointment => 'confirmed',
        $state instanceof CanceledAppointment => 'canceled',
    };
}
```

This is the true power of sealed classes and interfaces.
