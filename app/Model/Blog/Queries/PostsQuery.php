<?php

namespace jiripudil\Model\Blog\Queries;

use jiripudil\Model\Blog\Tag;
use Kdyby;
use Kdyby\Doctrine\QueryObject;


/**
 * @method void setTag(Tag $tag)
 */
class PostsQuery extends QueryObject
{

	/** @var Tag */
	protected $tag;


	/**
	 * @param Kdyby\Persistence\Queryable $dao
	 * @return \Doctrine\ORM\Query|\Doctrine\ORM\QueryBuilder
	 */
	protected function doCreateQuery(Kdyby\Persistence\Queryable $dao)
	{
		$queryBuilder = $dao->createQueryBuilder('p')
			->leftJoin('p.tags', 't')
			->where('p.published = :published', TRUE)
			->andWhere('p.datetime <= :now', new \DateTime)
			->orderBy('p.datetime', 'DESC');

		if ($this->tag !== NULL) {
			$queryBuilder->andWhere('t.id = :tag', $this->tag->id);
		}

		return $queryBuilder;
	}

}
