<?php

namespace jiripudil\Entities\User;

use Doctrine\ORM\Mapping as ORM;
use jiripudil\Security\IHasher;
use Nette\Security\AuthenticationException;
use Nette\Security\IAuthenticator;
use Nette\Security\IIdentity;


/**
 * @ORM\Entity
 * @ORM\Table(name="user_account", indexes={@ORM\Index(name="i_email", columns="email")})
 *
 * @property-read int $id
 * @property string $email
 * @property string $password
 */
class User implements IIdentity
{

	/**
	 * @ORM\Column(type="integer")
	 * @ORM\GeneratedValue
	 * @ORM\Id
	 * @var int
	 */
	private $id;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @var string
	 */
	private $email;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @var string
	 */
	private $password;


	/**
	 * @param string $email
	 * @param string $password
	 * @param IHasher $hasher
	 */
	public function __construct($email, $password, IHasher $hasher)
	{
		$this->email = $email;
		$this->password = $hasher->hash($password);
	}


	/**
	 * @return int
	 */
	public function getId()
	{
		return $this->id;
	}


	/**
	 * @return array
	 */
	public function getRoles()
	{
		return [];
	}


	/**
	 * @return string
	 */
	public function getEmail()
	{
		return $this->email;
	}


	/**
	 * @param string $oldPassword
	 * @param string $newPassword
	 * @param IHasher $hasher
	 * @throws AuthenticationException
	 */
	public function changePassword($oldPassword, $newPassword, IHasher $hasher)
	{
		if ( ! $hasher->verify($oldPassword, $this->password)) {
			throw new AuthenticationException(NULL, IAuthenticator::INVALID_CREDENTIAL);
		}

		$this->password = $hasher->hash($newPassword);
	}


	/**
	 * @param string $password
	 * @param IHasher $hasher
	 * @return bool
	 */
	public function verifyPassword($password, IHasher $hasher)
	{
		return $hasher->verify($password, $this->password);
	}

}
