<?php

/**
 * TEST: CacheFactory
 * @testCase
 */

namespace jiripudilTests\Caching;

use jiripudil\Caching\CacheFactory;
use Nette\Caching\Cache;
use Nette\Caching\IStorage;
use Tester;
use Tester\Assert;

require_once __DIR__ . '/../../bootstrap.php';


class CacheFactoryTest extends Tester\TestCase
{

	public function testWithNamespace()
	{
		$storage = \Mockery::mock(IStorage::class);
		$factory = new CacheFactory($storage);

		$ns = 'CacheNS';
		$cache = $factory->create($ns);
		Assert::type(Cache::class, $cache);
		Assert::same($storage, $cache->getStorage());
		Assert::same($ns, $cache->getNamespace());
	}


	public function testNullNamespace()
	{
		$storage = \Mockery::mock(IStorage::class);
		$factory = new CacheFactory($storage);

		$cache = $factory->create();
		Assert::type(Cache::class, $cache);
		Assert::same($storage, $cache->getStorage());
		Assert::same('', $cache->getNamespace());
	}


	public function testWithCustomStorage()
	{
		$storage = \Mockery::mock(IStorage::class);
		$storage2 = \Mockery::mock(IStorage::class);
		$factory = new CacheFactory($storage);

		$ns = 'CacheNS';
		$cache = $factory->create($ns, $storage2);
		Assert::type(Cache::class, $cache);
		Assert::notSame($storage, $cache->getStorage());
		Assert::same($storage2, $cache->getStorage());
		Assert::same($ns, $cache->getNamespace());
	}


	public function testNullNamespaceWithCustomStorage()
	{
		$storage = \Mockery::mock(IStorage::class);
		$storage2 = \Mockery::mock(IStorage::class);
		$factory = new CacheFactory($storage);

		$cache = $factory->create(NULL, $storage2);
		Assert::type(Cache::class, $cache);
		Assert::notSame($storage, $cache->getStorage());
		Assert::same($storage2, $cache->getStorage());
		Assert::same('', $cache->getNamespace());
	}


	protected function tearDown()
	{
		\Mockery::close();
	}

}


(new CacheFactoryTest())->run();
