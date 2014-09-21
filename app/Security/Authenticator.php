<?php

namespace jiripudil\Security;

use jiripudil\Model\User\Queries\UserByEmailQuery;
use jiripudil\Model\User\User;
use Kdyby\Doctrine\EntityDao;
use Kdyby\Doctrine\EntityManager;
use Nette\Object;
use Nette\Security\AuthenticationException;
use Nette\Security\User as NUser;


class Authenticator extends Object
{

	/** @var EntityDao */
	private $userDao;

	/** @var IHasher */
	private $hasher;

	/** @var NUser */
	private $user;


	public function __construct(EntityManager $em, IHasher $hasher, NUser $user)
	{
		$this->userDao = $em->getDao(User::class);
		$this->hasher = $hasher;
		$this->user = $user;
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

		$this->user->login($user);

		return $user;
	}

}
