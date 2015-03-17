<?php

namespace jiripudil\Entities\Blog\Queries;

use Kdyby;
use Kdyby\Doctrine\QueryObject;


class PostBySlugQuery extends QueryObject
{

	/** @var string */
	private $slug;


	/**
	 * @param string $slug
	 */
	public function __construct($slug)
	{
		$this->slug = $slug;
	}


	/**
	 * @param Kdyby\Persistence\Queryable $dao
	 * @return \Doctrine\ORM\Query|\Doctrine\ORM\QueryBuilder
	 */
	protected function doCreateQuery(Kdyby\Persistence\Queryable $dao)
	{
		return $dao->createQueryBuilder('p')
			->select('p')
			->leftJoin('p.tags', 't')
			->where('p.slug = :slug', $this->slug);
	}

}
