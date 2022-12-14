---
title: "The case for contravariant template types"
slug: contravariant-template-types
datetime: 2022-12-14T09:30:00Z
draft: false
perex: >-
  PHPStan has only supported invariant and covariant template types because they are so prevalent in real-world applications. But contravariant template types also have their use cases, and the latest release of PHPStan adds support for them, among other small improvements to generics.
tags:
- generics
- php
- phpstan
- static-analysis
---
If used correctly, generics are an awesome tool of abstraction. They've been one of the most requested PHP features, and while it's complicated to introduce them into PHP itself, thanks to PHPStan, we have been allowed to use them for [over two years](https://phpstan.org/blog/generics-in-php-using-phpdocs).

It's been a blast, and now they are getting even more powerful in [the latest patch release](https://github.com/phpstan/phpstan/releases/tag/1.9.3).

For a long time, PHPStan has only supported invariant and covariant template types. Mainly because for a long time, nobody has asked for contravariant templates. But they have their use cases too, a typical one being comparison. Imagine we have a collection and want to sort it using a `Comparator`:

```php
/**
 * @template T
 */
interface Collection
{
    /**
     * @param Comparator<T> $comparator
     */
    public function sort(Comparator $comparator): void;
}
```

The comparator is a simple functional interface that accepts two values of the same type and, well, compares them.

```php
/**
 * @template T
 */
interface Comparator
{
    /**
     * @param T $a
     * @param T $b
     */
    public function compare(mixed $a, mixed $b): int;
}
```

Now let's say we have a collection of dogs (in other words, `Collection<Dog>`), and a comparator that is able to compare _any_ pair of animals based on their weight:

```php
/**
 * @implements Comparator<Animal>
 */
class AnimalByWeightComparator implements Comparator
{
    public function compare($a, $b): int
    {
        return $a->weight() <=> $b->weight();
    }
}
```

You'll be surprised that you cannot use this comparator to sort dogs. PHPStan will adamantly report the following error:

```
Parameter #1 $comparator of method Collection<Dog>::sort() expects Comparator<Dog>, AnimalByWeightComparator given.
```

But why shouldn't you be able to use this comparator? It compares animals by their weight, and dogs _are_ animals and all dogs _weigh_ something. Logically, there is no reason why this shouldn't be able to work out.

Type-wise, there is: generics are invariant by default, which means that `Comparator<Animal>` and `Comparator<Dog>` are two _entirely_ different, distinct types. Which is quite impractical.

What we want is to establish a relationship in which `Comparator<Animal>` is a subtype of `Comparator<Dog>` – even though it's the other way around for the inner types (`Dog` is a subtype of `Animal`). This kind of reversed relationship is called contravariance, and is now supported by PHPStan. All it takes is a tiny change in the interface:

```php
/**
 * @template-contravariant T
 */
interface Comparator
{
    /**
     * @param T $a
     * @param T $b
     */
    public function compare(mixed $a, mixed $b): int;
}
```

Now PHPStan will be absolutely fine with sorting a `Collection<Dog>` using the aforementioned `AnimalByWeightComparator`.


## The cost of variance

As many nice things, covariant and contravariant template types come with a trade-off. To ensure type safety, PHPStan locates all places where template types are referenced and checks whether they are used in accordance with their declared variance.

In the previous example, We could make the `Comparator` contravariant in its template type `T` because it only occurs in it in the position of a parameter (which is inherently contravariant).

This is often more of a limitation for covariant template types:

```php
/**
 * @template-covariant T of object
 */
interface Collection
{
    /** @param T $item */
    public function add(object $item): void;
}
```

The template type `T` is declared as covariant, which allows us to treat `Collection<Dog>` as a subtype of `Collection<Animal>`. However, we know that for the subtype to be type-safe, all method parameters must be contravariant – you can only widen their type in the subtype, not narrow it. This requirement is violated in the code above, and PHPStan reports it.

It gets more complicated with complex types, such as arrays, callables, or generic classes. Consider the `Collection` interface from above – we could easily make it covariant in its template type:

```php
/**
 * @template-covariant T
 */
interface Collection
{
    /**
     * @param Comparator<T> $comparator
     */
    public function sort(Comparator $comparator): void;
}
```

After what's been said before, you might be surprised to find out that this code is correct. Even though parameters are contravariant, the template type occurs within a complex type, and thus its positional variance must be composed. In this case, it's in the parameter of the `sort()` method, but going further, it's also in the _contravariant_ type argument of the `Comparator` interface. That makes it _two_ contravariant positions in a sequence, and contravariance composed with contravariance actually produces covariance.

The rules for variance composition are in fact pretty simple, and [grounded in type theory](https://yanniss.github.io/variance-pldi11.pdf) (see section 3.1): 'invariance transforms everything into invariance, (...), covariance transforming a variance leaves it the same, and contravariance reverses it.'


## Fixes in variance composition

It turns out that PHPStan hasn't really observed _all_ these rules, and the latest release amends that:

```php
/**
 * @template-covariant T
 */
interface Collection
{
    /**
     * @return Comparator<T> 
     */
    public function getComparator(): Comparator;
}
```

Like above, the template type is used in the contravariant position of the `Comparator` interface. But this time the comparator is _returned_ from the method, i.e. it appears in a covariant position. Given the rules above, covariance composed with contravariance should turn into contravariance. It did not, and it was a bug, which is now fixed and the code above reports an error. Ondřej Mirtes, PHPStan's maintainer, decided that this was safe to release as is in a patch version, because we don't expect you to run into many new issues due to this.

Unfortunately, the same cannot be said about the [other fix I contributed](https://github.com/phpstan/phpstan-src/pull/2054): invariance did _not_ transform anything into invariance as it was supposed to. In composition, invariance simply returned the other composed variance. PHPStan's wide range of integration tests quickly discovered use cases where this fix would report new errors, like this (simplified but genuine) example from doctrine/collections:

```php
/**
 * @template-covariant T
 */
interface Collection
{
    /**
     * @param callable(T): bool $predicate
     * @return array{0: Collection<T>, 1: Collection<T>}
     */
    public function partition(callable $predicate): array;
}
```

The `partition` method returns a tuple of collections, with all items split based on the value returned from the `$predicate`. The problem is that the tuple (array-shape type) is naturally invariant, because while it allows you to fetch data from it (which is a covariant position), it also doesn't prevent you from writing into it (which is a contravariant position).

Previously, PHPStan was fine with this, because the invariance of the array type was composed with – and overridden by – the covariance of the `Collection`'s type parameter. This has been remedied and PHPStan is now able to correctly resolve the usage of the template type as invariant, and report it:

```
Template type T is declared as covariant, but occurs in invariant position in return type of method Collection::partition().
```

This is indeed a fix for a long-standing bug, and allows PHPStan to pinpoint many scenarios where generic types are currently used in a way that is not perfectly type-safe. However, the remedy requires some careful thought on a case-to-case basis. In this particular example, it would help to introduce an immutable tuple type.

Understandably, PHPStan cannot afford to start reporting such new errors in a patch release because it would probably break builds for a lot of projects. Therefore, this ~~new~~ fixed behaviour is only enabled in the [bleeding edge](https://phpstan.org/blog/what-is-bleeding-edge) configuration. You can also enable it individually by turning the respective feature toggle in your PHPStan configuration file:

```yaml
parameters:
	featureToggles:
		invarianceComposition: true
```


## What's mine is none of PHPStan's business

There is one more [tiny enhancement](https://github.com/phpstan/phpstan-src/pull/2064) in the latest release: I found out PHPStan was sometimes too pedantic in enforcing all the aforementioned rules about template type usages. I came to the realization that it doesn't really make sense to check generic variance in _private_ methods. Variance is all about subtyping, and private class members do not really come into play in that context.

PHP doesn't force its variance rules onto private members in standard subtyping, and from now on, neither does PHPStan in generic subtyping. Generic variance rules are only enforced in public and protected methods.


## This doesn't end here

I believe generics are tremendously useful. At the same time, having worked with them in Kotlin, I find generics in PHPStan lacking in some ways, and I'm now slowly working on patching these imperfections. The aforementioned changes introduced in the latest patch release are only the first batch, but more are brewing 🤞 until then, I wish you all the best!
