<?php

namespace jiripudil\Security;

use jiripudil\Entities\User\User;
use Kdyby\Doctrine\EntityManager;
use Kdyby\Doctrine\EntityRepository;
use Nette\Security\AuthenticationException;
use Nette\Security\IAuthenticator;


class Authenticator
{

	/** @var EntityRepository */
	private $userRepository;

	/** @var IHasher */
	private $hasher;


	public function __construct(EntityManager $em, IHasher $hasher)
	{
		$this->userRepository = $em->getRepository(User::class);
		$this->hasher = $hasher;
	}


	/**
	 * @param string $email
	 * @param string $password
	 * @return User
	 * @throws AuthenticationException
	 */
	public function authenticate($email, $password)
	{
		/** @var User $user */
		$user = $this->userRepository->findOneBy(['email' => $email]);

		if ($user === NULL) {
			throw new AuthenticationException(NULL, IAuthenticator::IDENTITY_NOT_FOUND);
		}

		if ( ! $user->verifyPassword($password, $this->hasher)) {
			throw new AuthenticationException(NULL, IAuthenticator::INVALID_CREDENTIAL);
		}

		return $user;
	}

}
