<?php

namespace jiripudil\Caching;

use jiripudil\Model\Blog\Post;
use Nette\Caching\Cache;
use Nette\Caching\IStorage;
use Nette\Object;


class TexyCache extends Object
{

	/** @var Cache */
	private $cache;


	public function __construct(IStorage $cacheStorage)
	{
		$this->cache = new Cache($cacheStorage, 'Texy');
	}


	/**
	 * @param string $input
	 * @param callable $fallback
	 * @return string
	 */
	public function load($input, callable $fallback)
	{
		$key = md5($input);
		return $this->cache->load($key, $fallback);
	}


	public function invalidate(Post $post)
	{
		$key = md5($post->text);
		$this->cache->remove($key);
	}

}
