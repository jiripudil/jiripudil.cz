---
title: "Seal your classes with PHPStan"
slug: seal-your-classes-with-phpstan
datetime: 2022-11-03T09:20:00Z
draft: false
perex: >-
  Sealed classes are a useful feature of Kotlin: they allow you to specify which classes are allowed to extend a sealed class (or implement a sealed interface). With the recently released PHPStan 1.9.0, you can now introduce sealed classes to your PHP codebase too!
tags:
- open-source
- php
- phpstan
- sealed-classes
- static-analysis
---
Quoting Kotlin's [documentation](https://kotlinlang.org/docs/sealed-classes.html):

> Sealed classes and interfaces represent restricted class hierarchies that provide more control over inheritance. All direct subclasses of a sealed class are known at compile time. No other subclasses may appear after a module with the sealed class is compiled. For example, third-party clients can't extend your sealed class in their code. Thus, each instance of a sealed class has a type from a limited set that is known when this class is compiled.

While PHP is not a compiled language, the point remains the same. You don't get any runtime guarantees, of course, but you can use static analysis to get these 'compile-time' checks. I love [PHPStan](https://phpstan.org), and I've made a little extension for it that adds support for sealed classes and interfaces:

```shell
composer require --dev jiripudil/phpstan-sealed-classes
```

It requires PHP 8.0 and above because it uses an attribute to mark sealed class hierarchies:

```php
<?php

use JiriPudil\SealedClasses\Sealed;

#[Sealed(permits: [AllowedImplementation::class, AnotherImplementation::class])]
interface SealedInterface {}

class AllowedImplementation implements SealedInterface {} 
class AnotherImplementation implements SealedInterface {} 
class DisallowedImplementation implements SealedInterface {} 
```

While the first two classes will be allowed, PHPStan will report an error for the third:

```
------ -----------------------------------------------------------------------------
 Line   sealed-interface.php
------ -----------------------------------------------------------------------------
 10     DisallowedImplementation is not allowed to be a subtype of SealedInterface.
------ -----------------------------------------------------------------------------
```


## What good does it do

Besides this artificial example, sealed classes and interfaces have interesting use cases in the real world, one of them being library code. Kotlin's aforementioned docs also mention this: a library's API is 'likely to contain error classes to let the library users handle errors that it can throw' but library code can only handle errors that it knows can occur. Making the error hierarchy sealed prevents the end user from creating a new error class that the library code cannot consistently handle.

Result objects are another great example. In a PSR-7-based router, matching an incoming request usually only has one of three possible outcomes: either the request didn't match any route, or it did but the HTTP method is unsupported, or there is a good match. But each of these outcomes carries different details, and requires different treatment. If you seal a `RouteMatchResult` interface over these three outcomes, you can be sure that wherever you expect that interface, you can only get one of the three known implementations.

You might argue that you could simply replace the interface with a union type of the three result classes. Yes, that would work. But I find this tedious to write, especially in multiple places. (This could be remediated by introducing type aliases into PHP, but that's nowhere near yet.)

Also, while the interface might be empty in this case, you can sometimes benefit from having a known common interface, even more so in domain code, where sealing class hierarchies can be useful too: personally, I find sealed classes and interfaces particularly handy for representing states of a process. There is always a limited set of states the process can be in, some of which can hold specific details, and they often need to know about one another.

Consider an appointment-planning application: you can _request_ an appointment on a given day, the other party _offers_ you a set of times they are available, you _pick_ one of them, and the other party eventually _confirms_ the appointment, or _offers_ you a new set of times in case the one you've chosen is no longer available. Each of these states has its own, specific data, and there are rules concerning which transitions between states are allowed and under what circumstances: for example, when you _pick_ a time of the appointment, the state machine must make sure that it is actually one of the _offered_ times. Otherwise, the state transition is invalid.

Finally, introducing a new state into the mix, such as _canceled_, alters all these rules and often requires non-trivial changes in code. When you make the hierarchy of these states sealed, adding a new, previously unknown state produces an error. You need to go and explicitly add it to the list of permitted descendants. This forces you to take a while and think about where the state is used and how.


## Let's get exhaustive

And the most recent version of PHPStan can help you even with that! I've [taught it to understand](https://github.com/phpstan/phpstan-src/pull/1477) restricted inheritance hierarchies and take them into consideration when specifying types in conditions, similarly to what it does for enum cases. Thanks to this, PHPStan should be better equipped to locate the places where you've forgotten to handle a newly added state.

```php
#[Sealed([
    RequestedAppointment::class,
    OfferedAppointment::class,
    ProposedAppointment::class,
    ConfirmedAppointment::class,
])]
interface AppointmentState {}

class RequestedAppointment implements AppointmentState { /* ... */ }
class OfferedAppointment implements AppointmentState { /* ... */ }
class ProposedAppointment implements AppointmentState { /* ... */ }
class ConfirmedAppointment implements AppointmentState { /* ... */ }
```

With this code, wherever you expect an `AppointmentState` in a method, you can be sure that you will only ever get one of the four permitted implementations, and PHPStan will know that too.


## Conclusion

In a way, sealed classes are like enumerations, but unlike enums which are singletons, sealed classes can have their own instance-bound state. The eventual plans for enums were to evolve them into [tagged unions](https://wiki.php.net/rfc/tagged_unions) which would allow the same kind of thing for them. But until we have tagged unions in PHP ([or native sealed classes](https://wiki.php.net/rfc/sealed_classes), for that matter), we can only try and make the best of what we have at our disposal.

This little extension strives to make the best of the awesome PHPStan, and I hope you'll like it and find it useful.

Happy sealing!
