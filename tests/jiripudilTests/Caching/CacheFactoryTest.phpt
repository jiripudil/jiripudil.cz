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
		$factory = new CacheFactory();

		$ns = 'CacheNS';
		$cache = $factory->create($storage, $ns);
		Assert::type(Cache::class, $cache);
		Assert::same($ns, $cache->getNamespace());
	}


	public function testNullNamespace()
	{
		$storage = \Mockery::mock(IStorage::class);
		$factory = new CacheFactory();

		$cache = $factory->create($storage);
		Assert::type(Cache::class, $cache);
		Assert::same('', $cache->getNamespace());
	}


	protected function tearDown()
	{
		\Mockery::close();
	}

}


(new CacheFactoryTest())->run();
