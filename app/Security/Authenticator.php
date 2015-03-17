<?php

namespace jiripudil\Security;

use jiripudil\Entities\User\Queries\UserByEmailQuery;
use jiripudil\Entities\User\User;
use Kdyby\Doctrine\EntityDao;
use Kdyby\Doctrine\EntityManager;
use Nette\Object;
use Nette\Security\AuthenticationException;


class Authenticator extends Object
{

	/** @var EntityDao */
	private $userDao;

	/** @var IHasher */
	private $hasher;


	public function __construct(EntityManager $em, IHasher $hasher)
	{
		$this->userDao = $em->getRepository(User::class);
		$this->hasher = $hasher;
	}


	/**
	 * @param string $email
	 * @param string $password
	 * @return User
	 * @throws AuthenticationException
	 */
	function authenticate($email, $password)
	{
		/** @var User $user */
		$user = $this->userDao->fetchOne(new UserByEmailQuery($email));
		if ($user === NULL) {
			throw new AuthenticationException;
		}

		if ( ! $this->hasher->verify($password, $user->password)) {
			throw new AuthenticationException;
		}

		return $user;
	}

}
