<?php

namespace jiripudil\Model\User;

use Doctrine\ORM\Mapping as ORM;
use Kdyby\Doctrine\Entities\BaseEntity;


/**
 * @ORM\Entity
 * @ORM\Table(name="user_account", indexes={@ORM\Index(name="i_email", columns="email")})
 *
 * @property-read int $id
 * @property string $email
 * @property string $password
 * @property string $name
 * @property string $website
 */
class User extends BaseEntity
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

	/**
	 * @ORM\Column(type="string", length=128)
	 * @var string
	 */
	protected $name;

	/**
	 * @ORM\Column(type="string", length=255, nullable=true)
	 * @var string
	 */
	protected $website;

}
