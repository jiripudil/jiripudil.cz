<?php

namespace jiripudil\Caching;

use Nette\Caching\Cache;
use Nette\Caching\IStorage;


class CacheFactory
{

	/**
	 * @param IStorage $storage
	 * @param string|NULL $namespace
	 * @return Cache
	 */
	public function create(IStorage $storage, $namespace = NULL)
	{
		return new Cache($storage, $namespace);
	}

}
