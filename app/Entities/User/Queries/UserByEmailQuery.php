<?php

namespace jiripudil\Entities\User\Queries;

use Kdyby;
use Kdyby\Doctrine\QueryObject;


class UserByEmailQuery extends QueryObject
{

	/** @var string */
	private $email;


	/**
	 * @param string $email
	 */
	public function __construct($email)
	{
		$this->email = $email;
	}


	/**
	 * @param Kdyby\Persistence\Queryable $dao
	 * @return \Doctrine\ORM\Query|\Doctrine\ORM\QueryBuilder
	 */
	protected function doCreateQuery(Kdyby\Persistence\Queryable $dao)
	{
		return $dao->createQueryBuilder('u')
			->where('u.email = :email', $this->email);
	}

}
