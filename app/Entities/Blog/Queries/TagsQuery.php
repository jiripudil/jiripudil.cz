<?php

namespace jiripudil\Entities\Blog\Queries;

use Kdyby;
use Kdyby\Doctrine\QueryObject;


class TagsQuery extends QueryObject
{

	/**
	 * @param Kdyby\Persistence\Queryable $dao
	 * @return \Doctrine\ORM\Query|\Doctrine\ORM\QueryBuilder
	 */
	protected function doCreateQuery(Kdyby\Persistence\Queryable $dao)
	{
		return $dao->createQueryBuilder('t')
			->select('t, COUNT(p.id) AS postsCount')
			->leftJoin('t.posts', 'p')
			->orderBy('t.name', 'ASC')
			->groupBy('t.id');
	}

}
