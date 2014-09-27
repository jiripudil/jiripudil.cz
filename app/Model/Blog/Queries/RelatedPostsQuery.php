<?php

namespace jiripudil\Model\Blog\Queries;

use jiripudil\Model\Blog\Post;
use Kdyby;
use Kdyby\Doctrine\QueryObject;


class RelatedPostsQuery extends QueryObject
{

	/** @var Post */
	private $post;


	public function __construct(Post $post)
	{
		$this->post = $post;
	}


	/**
	 * @param Kdyby\Persistence\Queryable $dao
	 * @return \Doctrine\ORM\Query|\Doctrine\ORM\QueryBuilder
	 */
	protected function doCreateQuery(Kdyby\Persistence\Queryable $dao)
	{
		$qb = $dao->createQueryBuilder('p')
			->where('p.published = :published', TRUE)
			->andWhere('p.datetime <= :now', new \DateTime)
			->andWhere('NOT p.id = :id', $this->post->id);

		if ($this->post->tags) {
			$tagIds = array_map(function ($tag) { return $tag->id; }, $this->post->tags);

			$qb->addSelect('t, COUNT(t.id) AS tagCount')
				->innerJoin('p.tags', 't', Kdyby\Doctrine\Dql\Join::WITH, 't.id IN (:tags)')
				->orderBy('tagCount', 'DESC')
				->groupBy('p.id')
				->setParameter('tags', $tagIds);
		}

		return $qb->addOrderBy('p.datetime', 'DESC');
	}

}
