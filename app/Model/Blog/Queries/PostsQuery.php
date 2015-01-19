<?php

namespace jiripudil\Model\Blog\Queries;

use Doctrine\ORM\QueryBuilder;
use jiripudil\Model\Blog\Post;
use jiripudil\Model\Blog\Tag;
use Kdyby;
use Kdyby\Doctrine\QueryObject;


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
			$queryBuilder->andWhere(':tag MEMBER OF p.tags', $tag->id);
		};

		return $this;
	}


	/**
	 * @return PostsQuery
	 */
	public function onlyPublished()
	{
		$this->filters[] = function (QueryBuilder $queryBuilder) {
			$queryBuilder->andWhere('p.published = :published', TRUE)
				->andWhere('p.datetime <= :now', new \DateTime);
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
			$queryBuilder->andWhere('NOT p.id = :id', $post->id);

			if ($post->tags) {
				$tagIds = array_map(function ($tag) { return $tag->id; }, $post->tags);

				$queryBuilder->addSelect('COUNT(t.id) AS HIDDEN tagCount')
					->andWhere('t.id IN (:tags)', $tagIds)
					->orderBy('tagCount', 'DESC')
					->groupBy('p.id');
			}
		};

		return $this;
	}


	/**
	 * @return PostsQuery
	 */
	public function fetchJoinTags()
	{
		$this->filters[] = function (QueryBuilder $queryBuilder) {
			$queryBuilder->addSelect('t');
		};

		return $this;
	}


	/**
	 * @param Kdyby\Persistence\Queryable $dao
	 * @return \Doctrine\ORM\Query|QueryBuilder
	 */
	protected function doCreateQuery(Kdyby\Persistence\Queryable $dao)
	{
		$queryBuilder = $dao->createQueryBuilder('p')
			->select('p')
			->leftJoin('p.tags', 't');

		foreach ($this->filters as $filter) {
			$filter($queryBuilder);
		}

		$queryBuilder->addOrderBy('p.datetime', 'DESC');

		return $queryBuilder;
	}

}
