<?php

namespace jiripudil\Entities\Blog\Queries;

use Doctrine\ORM\QueryBuilder;
use jiripudil\Entities\Blog\Post;
use jiripudil\Entities\Blog\Tag;
use Kdyby;
use Kdyby\Doctrine\QueryObject;
use Kdyby\Persistence\Queryable;


class PostsQuery extends QueryObject
{

	/** @var callable[] */
	protected $filters = [];


	/**
	 * @param Tag $tag
	 * @return PostsQuery
	 */
	public function withTag(Tag $tag)
	{
		$this->filters[] = function (QueryBuilder $queryBuilder) use ($tag) {
			$queryBuilder->andWhere(':tag MEMBER OF p.tags')
				->setParameter('tag', $tag->id);
		};

		return $this;
	}


	/**
	 * @return PostsQuery
	 */
	public function onlyPublished()
	{
		$this->filters[] = function (QueryBuilder $queryBuilder) {
			$queryBuilder->andWhere('p.published = TRUE')
				->andWhere('p.datetime <= :now')
				->setParameter('now', new \DateTime());
		};

		return $this;
	}


	/**
	 * @param Post $post
	 * @return PostsQuery
	 */
	public function relatedTo(Post $post)
	{
		$this->filters[] = function (QueryBuilder $queryBuilder) use ($post) {
			$queryBuilder->andWhere('NOT p.id = :id')
				->setParameter('id', $post->id);

			if ($post->tags) {
				$tagIds = array_map(function ($tag) { return $tag->id; }, $post->tags);

				$queryBuilder->addSelect('COUNT(t.id) AS HIDDEN tagCount')
					->andWhere('t.id IN (:tags)')->setParameter('tags', $tagIds)
					->orderBy('tagCount', 'DESC')
					->groupBy('p.id');
			}
		};

		return $this;
	}


	/**
	 * @param Kdyby\Persistence\Queryable $dao
	 * @return \Doctrine\ORM\Query|QueryBuilder
	 */
	protected function doCreateQuery(Kdyby\Persistence\Queryable $dao)
	{
		$queryBuilder = $dao->createQueryBuilder('p', 'p.id')
			->select('p')
			->leftJoin('p.tags', 't');

		foreach ($this->filters as $filter) {
			$filter($queryBuilder);
		}

		$queryBuilder->addOrderBy('p.datetime', 'DESC');

		return $queryBuilder;
	}


	public function postFetch(Queryable $repository, \Iterator $iterator)
	{
		$ids = array_keys(iterator_to_array($iterator, TRUE));

		$repository->createQueryBuilder('p')
			->select('PARTIAL p.{id}, t')
			->leftJoin('p.tags', 't')
			->andWhere('p.id IN (:ids)')->setParameter('ids', $ids)
			->getQuery()->getResult();
	}

}
