<?php

namespace jiripudil\Http;

use jiripudil\Model\User\User;
use Kdyby\Doctrine\EntityManager;
use Nette\Http\Session;
use Nette\Http\UserStorage as NUserStorage;
use Nette\Security\Identity;
use Nette\Security\IIdentity;


class UserStorage extends NUserStorage
{

	/** @var EntityManager */
	private $em;


	public function __construct(Session $session, EntityManager $em)
	{
		parent::__construct($session);
		$this->em = $em;
	}


	public function setIdentity(IIdentity $identity = NULL)
	{
		return parent::setIdentity($identity === NULL ? NULL : new Identity($identity->getId()));
	}


	/**
	 * @return IIdentity|NULL
	 */
	public function getIdentity()
	{
		$identity = parent::getIdentity();

		if ($identity !== NULL) {
			return $this->em->getReference(User::class, $identity->getId());
		}

		return NULL;
	}

}
