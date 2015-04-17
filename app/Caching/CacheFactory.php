<?php

namespace jiripudil\Caching;

use Nette\Caching\Cache;
use Nette\Caching\IStorage;


class CacheFactory
{

	/** @var IStorage */
	private $storage;


	public function __construct(IStorage $storage)
	{
		$this->storage = $storage;
	}


	/**
	 * @param string|NULL $namespace
	 * @param IStorage|NULL $storage
	 * @return Cache
	 */
	public function create($namespace = NULL, IStorage $storage = NULL)
	{
		return new Cache($storage !== NULL ? $storage : $this->storage, $namespace);
	}

}
