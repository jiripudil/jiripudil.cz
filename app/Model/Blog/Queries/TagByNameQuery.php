<?php

namespace jiripudil\Model\Blog\Queries;

use Kdyby;
use Kdyby\Doctrine\QueryObject;


class TagByNameQuery extends QueryObject
{

	/** @var string */
	private $name;


	/**
	 * @param string $name
	 */
	public function __construct($name)
	{
		$this->name = $name;
	}


	/**
	 * @param Kdyby\Persistence\Queryable $dao
	 * @return \Doctrine\ORM\Query|\Doctrine\ORM\QueryBuilder
	 */
	protected function doCreateQuery(Kdyby\Persistence\Queryable $dao)
	{
		return $dao->createQueryBuilder('t')
			->where('t.name = :name', $this->name);
	}

}
