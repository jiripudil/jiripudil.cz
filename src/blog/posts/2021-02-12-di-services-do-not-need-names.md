---
title: Services don't need names
slug: di-services-do-not-need-names
datetime: 2021-02-12T12:02:00Z
draft: false
cupsOfCoffee: 5
perex: >-
  I love Nette Framework's dependency injection solution. I really do. This post is here to share this passion,
  explaining why I think it is the best DI solution in today's PHP ecosystem.
tags:
  - dependency-injection
  - design-patterns
  - nettefw
  - php
  - software-architecture
---
Software development is an endless iterative process of abstraction. We find appropriate abstractions of the real
world in domain modeling. In object-oriented programming, we use abstractions to describe and enforce contracts
between various actors within the system. We introduce new classes into the system to encapsulate responsibilities
and define their boundaries, and then use composition to build the whole system.

I'm talking about the urge to extract the authentication logic from the following controller:

```php
final class SignInController extends Best\Framework\Controller
{
    public function action(string $username, string $password): Best\Framework\Response
    {
        if ($username !== 'admin' || $password !== 'p4ssw0rd!') {
            return $this->render(__DIR__ . '/error.latte');
        }

        $this->signIn(new Identity($username));
        return $this->redirect(HomepageController::class);
    }
}
```

You can probably tell that the credentials check doesn't belong there. It is not the responsibility of the controller
to tell what credentials are valid — following the single responsibility principle, the controller should only have
a single reason to change, and that reason should be within the user interface of the application, not the process
of authentication.

Let's take the obvious way out of this and extract the condition into an `Authenticator` class:

```php
final class Authenticator
{
    public function authenticate(string $username, string $password): bool
    {
        return $username === 'admin' && $password === 'p4ssw0rd!';
    }
}
```

Now all we need to do is to delegate from the controller to this authenticator. We have made the authenticator
a *dependency* of the controller, and suddenly the controller needs to get it somewhere:

```php
final class SignInController extends Best\Framework\Controller
{
    public function action(string $username, string $password): Best\Framework\Response
    {
        $authenticator = new Authenticator(); // <== easy, I'll just create a new one!
        if ( ! $authenticator->authenticate($username, $password)) {
            return $this->render(__DIR__ . '/error.latte');
        }

        $this->signIn(new Identity($username));
        return $this->redirect(HomepageController::class);
    }
}
```

This naive way will work. But only until a more robust authentication is implemented, requiring the authenticator
to query a database table of users. The `Authenticator` suddenly has a dependency of its own, say a `UserRepository`,
which in turn depends on a `Connection` instance, which is dependent on the parameters of the specific environment.
That escalated quickly!

Creating instances by hand everywhere is not a sustainable way of managing dependencies. That's why we have the dependency
injection pattern, which allows the controller to merely declare its dependency on an `Authenticator`, and let it be someone
else's problem to actually provide an instance. And that someone else is called a dependeny injection *container*.

Dependency injection container is the application's supreme architect — it knows how to resolve dependencies of any service
within the system and is responsible for creating them. DI containers are so common nowadays that pretty much every major
web framework has its own container implementation, and there are even stand-alone packages dedicated to dependency injection,
such as PHP-DI.


## Burning the peppers

The abundance of options has eventually motivated a group of developers to seek an abstraction to make them interoperable.
The common interface has been polished over time and eventually proposed to PHP-FIG in the following form:

```php
interface ContainerInterface
{
    public function get(string $id): mixed;
    public function has(string $id): bool;
}
```

This interface illustrates one very important attribute of DI containers: **they are like fire.** They are a good servant
but can easily become a bad master. They are tremendously useful as long as you know how to use them, but if you use them
incorrectly, they burn you. Consider the following container:

```php
final class Container implements ContainerInterface
{
    private array $factories = [];
    public function __construct(array $parameters)
    {
        $this->factories['authenticator'] = fn() => new Authenticator($this->get('userRepository'));
        $this->factories['userRepository'] = fn() => new UserRepository($this->get('connection'));
        $this->factories['connection'] = fn() => new Connection($parameters['database']);
    }

    public function get(string $id): mixed { /* . . . */ }
    public function has(string $id): bool { /* . . . */ }
}
```

So far so good. The implementation seems good by the standard we've set: it does indeed know how to create every service
in the application, recursively resolving its dependencies. Everything is managed in a single place, and the container
even accepts parameters, so that the database connection is easily configurable. Nice!

But now, seeing the only two methods of the `ContainerInterface`, you might be tempted to use the container like this:

```php
final class SignInController extends Best\Framework\Controller
{
    public function __construct(
        private ContainerInterface $container,
    ) {}
    
    public function action(string $username, string $password): Best\Framework\Response
    {
        $authenticator = $this->container->get('authenticator');
        // ...
    }
}
```

Congratulations, you've just burnt your peppers. In other words, the container has become the bad master. Why is that?

First, you're relying on an arbitrary service identifier: `'authenticator'`. Dependency injection is all about being
transparent about one's dependencies, and using an artificial identifier goes straight against that notion: it makes
the code silently depend on the definition of the container. If you ever happen to rename the service in the container,
you have to find this reference and update it.

And what's worse, that dependency is hidden: at first glance from the outside, the controller only depends on an abstraction
of a container. But as a developer, *you* must have the knowledge of how services are named in the container, and that
a service called `authenticator` is, in fact, an instance of `Authenticator`. Your new colleague has to learn all that.
Unnecessarily.

Luckily, we can resort to a much more natural identifier: the service type. After all, that's all you care about as
a developer. You don't need to know what random string is associated to the service in the container. I believe this
code is much easier to both write and read:

```php
final class SignInController extends Best\Framework\Controller
{
    public function __construct(
        private ContainerInterface $container,
    ) {}

    public function action(string $username, string $password): Best\Framework\Response
    {
        $authenticator = $this->container->get(Authenticator::class);
        // ...
    }
}
```

Unfortunately, we haven't tamed the flames yet. Not a tiny bit. The larger issue is that you're demeaning the container
into the role of a service locator, which is a huge anti-pattern. It's like bringing someone the whole fridge so that they
can fetch a single snack from it — it's much more reasonable to get them just the snack.

Again, dependency injection is about transparency, and this controller still isn't transparent about its dependencies.
The dependency on an authenticator is entirely hidden from the outside world, behind the dependency on the container.
This makes the code more difficult to read. Or use. Or test! Mocking the authenticator in a unit test now requires you
to create a whole container around it.

And by the way, the controller still depends on the container's definition, and does so in a pretty bad way. If the
authenticator service doesn't exist in the container, the code doesn't fail until in the `action()` method, which is
a pretty late feedback.


## Cooking something delicious

To be fair, nobody can really blame you for getting into this dead end. After all, you've just followed the interface
designed and proven by clever developers. The thing is that all dependency injection containers are by definition service
locators too, and it turns out the pattern is really the only common interface among them. But that doesn't mean you
*should* use them as service locators. In fact, the PSR itself [warns about that](https://www.php-fig.org/psr/psr-11/meta/#4-recommended-usage-container-psr-and-the-service-locator).

This is how you can use a DI container as a good servant:

```php
final class SignInController extends Best\Framework\Controller
{
    public function __construct(
        private Authenticator $authenticator,
    ) {}

    public function action(string $username, string $password): Best\Framework\Response
    {
        $areCredentialsValid = $this->authenticator->authenticate($username, $password);
        // ...
    }
}
```

The controller declares the dependency explicitly, clearly, transparently in the constructor. The dependencies are no
longer hidden scattered around the class. They are also enforced: the container is not able to create an instance of
`SignInController` without providing the necessary `Authenticator`. If there is no authenticator in the container, the
execution fails early, not in the `action()` method. Testing this class has become so much easier too, because you only
have to mock the authenticator service without any container boilerplate.

And there is one last tiny, but very important detail: we have sneaked in the information about the service's type. The
fact that it is an instance of `Authenticator` — previously implied and unknown to the IDE, static analysis tools, or even
a developer unaware of the container definition — is now statically carved into the promoted parameter's typehint.

The only step that's left is to teach the container how to create the controller as well:

```php
final class Container implements ContainerInterface
{
    private array $factories = [];
    public function __construct(array $parameters)
    {
        $this->factories[SignInController::class] = fn() => new SignInController($this->get(Authenticator::class));
        $this->factories[Authenticator::class] = fn() => new Authenticator($this->get(UserRepository::class));
        $this->factories[UserRepository::class] = fn() => new UserRepository($this->get(Connection::class));
        $this->factories[Connection::class] = fn() => new Connection($parameters['database']);
    }

    public function get(string $id): mixed { /* . . . */ }
    public function has(string $id): bool { /* . . . */ }
}
```

You might notice that the container still internally uses the service locator approach. But that's okay, as long as it
is contained (pun intended). The only place outside of the container where calling the `get` method is acceptable, is
in the `index.php`, in the application's entrypoint where you need to create the container itself and then fetch and run
the application:

```php
$container = bootstrap();

$application = $container->get(Best\Framework\Application::class);
$application->run();
```


## The hidden gem

But let's not stop there, allow me to take the statement further: the *only* place where calling the `get` method is
acceptable, is in the entrypoint.

The code of the container is just wiring, it's assembly instructions. It's not executive code. It's not *important*, in
a way. While yes, it is crucial to the application, that's only from the developer's perspective. It doesn't really bring
any direct value to the user, and should be treated with that in mind.

Take a look at the container again:

```php
final class Container implements ContainerInterface
{
    private array $factories = [];
    public function __construct(array $parameters)
    {
        $this->factories[SignInController::class] = fn() => new SignInController($this->get(Authenticator::class));
        $this->factories[Authenticator::class] = fn() => new Authenticator($this->get(UserRepository::class));
        $this->factories[UserRepository::class] = fn() => new UserRepository($this->get(Connection::class));
        $this->factories[Connection::class] = fn() => new Connection($parameters['database']);
    }

    public function get(string $id): mixed { /* . . . */ }
    public function has(string $id): bool { /* . . . */ }
}
```

This only covers a very small and simple segment of the application. As the application grows, hand-writing the container
gets incredibly tedious. As I've said before, the container is just assembly manual — but it's an overly complicated one,
with many pages, countless cross-references and lots of small-print warnings. We want to turn it into an IKEA-style manual,
graphic, concise, and with illustrations of people smiling when they lay the ÅUTHENTICATÖR onto the carpet during assembly
so that it doesn't break.

This is where [Nette Framework](https://nette.org) comes into play.

Nette Framework's [DI solution](https://github.com/nette/di) utilizes [Neon](https://ne-on.org), a configuration file format
similar to YAML, but on steroids. This is how you would define the same container, using Neon configuration:

```neon
services:
    - SignInController
    - Authenticator
    - UserRepository
    - Connection(%database%)
```

Let me point out two noteworthy things: first, the list of services is truly a list, not a hash map — there are no keys,
no artificial service identifiers. There is no `authenticator`, and neither is `Authenticator::class`. Second, you don't
need to explicitly list any dependencies anywhere, apart from the database connection parameters.

That's because Nette Framework relies on autowiring. Remember how, thanks to dependency injection, we have been able
to express the type of the dependency in a native typehint? The DI container uses that information, so that when you
require an instance of `Authenticator`, it entirely bypasses any names and finds the right service solely by its type.

You might argue that autowiring is not a unique feature. And you'd be right. What makes Nette Framework's container unique
is the utilization of PHP's type system, whereas in many other frameworks, autowiring is still built upon service names
internally. There are scenarios where other containers fall short. This is how you'd define the authenticator service
in Symfony's DI container using YAML:

```yaml
services:
  Authenticator: ~
```

The `services` section is a hash map and the `Authenticator` bit is a service identifier. The tilde stands for `null`
in YAML, which Symfony interprets as "use the service identifier as its type".

But soon, business requirements change, and you need to support authentication through LDAP in addition to a local database
lookup. As the first step, you turn the `Authenticator` class into an interface and extract the original implementation
into a `LocalAuthenticator` class:

```yaml
services:
  LocalAuthenticator: ~
```

Suddenly, Symfony is clueless. That's because Symfony works with service names instead of types. The controller still
correctly relies on the abstraction and lists the `Authenticator` interface as its dependency, but there is no service
*named* `Authenticator` in the container. You need to give Symfony a hint, for example using a *service name* alias:

```yaml
services:
  LocalAuthenticator:
    alias: Authenticator
```

Nette Framework, on the other hand, doesn't need service names or hints. It doesn't force you to duplicate in configuration
the information that is already expressed in code (via the `implements` clause). It sits right on top of PHP's type system.
It knows that `LocalAuthenticator` *is* of type `Authenticator`, and as long as it is the only service that implements
the interface, it happily autowires it where the interface is requested, given just this line of configuration:

```neon
services:
    - LocalAuthenticator
```

I admit that if you're not familiar with autowiring, it might feel a bit magical and you might need some time to learn
to trust it. Fortunately, it works transparently and deterministically: when the container cannot unambiguously resolve
dependencies, it throws a compile-time exception that helps you fix the situation. That way, you can have two different
implementations and still be in good control of where each of them is used.

As a whole, autowiring puts less cognitive load on you as a developer. After all, you only care about types and abstractions,
so why should a DI container force you to also care about implementations and service identifiers? More importantly, why
should you even care about some container in the first place? In the spirit of dependency injection, you want to be able
to just declare the dependencies and be it somebody else's problem to provide them. You want to fully focus on the application
code and forget about the wiring. And Nette Framework's DI allows you to do that.

In my eyes, this makes Nette Framework's DI solution the best one out there in the PHP world. It gives you a container
that is reliable and enforces good architectural patterns, but at the same time is so easy to configure and maintain that
you don't have to think about it at all.

I hope this post has managed to pique your curiosity. Be sure to check out the Github [repository](https://github.com/nette/di)
and the [docs](https://doc.nette.org/en/3.1/dependency-injection) — hopefully you'll learn that I've only shown you
the tip of the iceberg and that the whole package is far more powerful.
