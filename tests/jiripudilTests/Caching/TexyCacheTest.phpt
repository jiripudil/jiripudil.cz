<?php

/**
 * TEST: TexyCache
 * @testCase
 */

namespace jiripudilTests\Caching;

use jiripudil\Caching\CacheFactory;
use jiripudil\Caching\TexyCache;
use Nette\Caching\Cache;
use Nette\Caching\IStorage;
use Tester;
use Tester\Assert;

require_once __DIR__ . '/../../bootstrap.php';


class TexyCacheTest extends Tester\TestCase
{

	/** @var bool */
	private $fallbackCalled = FALSE;


	public function testCached()
	{
		$data = 'foo';

		$cache = \Mockery::mock(Cache::class);
		$cache->shouldReceive('load')
			->with(md5($data))
			->andReturn($data);

		$factory = \Mockery::mock(CacheFactory::class);
		$factory->shouldReceive('create')
			->with('Texy')
			->andReturn($cache);

		$texyCache = new TexyCache($factory);

		$result = $texyCache->load($data, function ($input) use ($data) {
			$this->fallbackCalled = TRUE;
			return $input;
		});

		Assert::false($this->fallbackCalled);
		Assert::same($data, $result);
	}


	public function testNotCached()
	{
		$data = 'foo';

		$cache = \Mockery::mock(Cache::class);
		$cache->shouldReceive('load')
			->with(md5($data))
			->andReturn(NULL);

		$cache->shouldReceive('save')
			->with(md5($data), $data, \Mockery::type('array'))
			->andReturn($data);

		$factory = \Mockery::mock(CacheFactory::class);
		$factory->shouldReceive('create')
			->with('Texy')
			->andReturn($cache);

		$texyCache = new TexyCache($factory);

		$result = $texyCache->load($data, function ($input) use ($data) {
			$this->fallbackCalled = TRUE;
			Assert::same($data, $input);
			return $input;
		});

		Assert::true($this->fallbackCalled);
		Assert::same($data, $result);
	}


	protected function tearDown()
	{
		\Mockery::close();
	}

}


(new TexyCacheTest())->run();
