<?php

namespace jiripudil\Caching;

use Nette\Caching\Cache;
use Nette\Caching\IStorage;
use Nette\Object;


class TexyCache extends Object
{

	/** @var Cache */
	private $cache;


	public function __construct(CacheFactory $cacheFactory, IStorage $cacheStorage)
	{
		$this->cache = $cacheFactory->create($cacheStorage, 'Texy');
	}


	/**
	 * @param string $input
	 * @param callable $fallback
	 * @return string
	 */
	public function load($input, callable $fallback)
	{
		$key = md5($input);
		$result = $this->cache->load($key);
		if ($result === NULL) {
			$result = $this->cache->save($key, call_user_func($fallback, $input), [
				Cache::EXPIRATION => '1 week',
				Cache::SLIDING => TRUE,
			]);
		}

		return $result;
	}

}
