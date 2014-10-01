<?php

namespace jiripudil\Model\User;

use Doctrine\ORM\Mapping as ORM;
use Kdyby\Doctrine\Entities\BaseEntity;
use Nette\Security\IIdentity;


/**
 * @ORM\Entity
 * @ORM\Table(name="user_account", indexes={@ORM\Index(name="i_email", columns="email")})
 *
 * @property-read int $id
 * @property string $email
 * @property string $password
 */
class User extends BaseEntity implements IIdentity
{

	/**
	 * @ORM\Column(type="integer")
	 * @ORM\GeneratedValue
	 * @ORM\Id
	 * @var int
	 */
	protected $id;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @var string
	 */
	protected $email;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @var string
	 */
	protected $password;


	public function __construct($email, $password)
	{
		$this->email = $email;
		$this->password = $password;
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

}
