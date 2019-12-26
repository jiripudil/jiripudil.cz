---
legacyId: 12
title: "CacheFactory: for better testing of cache integration"
slug: cachefactory-for-better-testing-of-cache-integration
datetime: 2015-06-26T21:00:00Z
draft: false
cupsOfCoffee: 3
perex: Unit testing a class that uses Nette's cache can be a pain in the you-know-what. I've found myself writing a very simple cache factory to solve this and make testing classes depending on cache a pleasing experience, so I've decided to make an extension out of it.
tags:
  - caching
  - nettefw
  - open-source
  - php
  - testing
---
The motivation is simple: when unit testing a class that depends on cache, you either need to mock the storage and
go through `Cache` code to find what methods are called upon the storage, or use some wibbly wobbly
[autoloading magic](http://docs.mockery.io/en/latest/cookbook/mocking_hard_dependencies.html). I don't think either
way is a good one to go.

The thing is really straight-forward with [Oops/CacheFactory](https://github.com/o2ps/CacheFactory). You can get it
going in just two steps. First, install it via Composer:

```sh
$ composer require oops/cache-factory:~1.0
```

Second, register the extension in your config:

```yaml
extensions:
    cacheFactory: Oops\CacheFactory\DI\CacheFactoryExtension
```

That's pretty much it. Now you can replace occurrences of direct `Cache` instantiation with call to the factory,
so that this:

```php
class CachedFoo
{
	private $cache;

	public function __construct(Nette\Caching\IStorage $cacheStorage)
	{
		$this->cache = new Nette\Caching\Cache($cacheStorage, 'namespace');
	}
}
```

becomes this:

```php
class CachedFoo
{
	private $cache;

	public function __construct(Oops\CacheFactory\Caching\CacheFactory $cacheFactory)
	{
		$this->cache = $cacheFactory->create('namespace');
	}
}
```

The factory automatically uses the storage registered in the config. To provide backwards compatibility, you can
also pass to the factory an arbitrary storage, should you need it:

```php
$cacheFactory->create('namespace', new Nette\Caching\Storages\DevNullStorage());
```

Notice how it streamlined mocking cache as a dependency in unit tests:

```php
$cacheMock = \Mockery::mock('Nette\Caching\Cache');
$cacheMock->shouldReceive('load')->once()->andReturnNull();
// other expectations

$cacheFactoryMock = \Mockery::mock('Oops\CacheFactory\Caching\CacheFactory');
$cacheFactoryMock->shouldReceive('create')
	->with('namespace')
	->andReturn($cacheMock);

$foo = new CachedFoo($cacheFactoryMock);
```

Handy, isn't it?
