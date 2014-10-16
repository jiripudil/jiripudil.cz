<?php

namespace jiripudil\Model\Blog;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Kdyby\Doctrine\Entities\BaseEntity;


/**
 * @ORM\Entity
 * @ORM\Table(indexes={@ORM\Index(name="i_name", columns="name")})
 *
 * @property-read int $id
 * @property string $name
 * @property Post[]|ArrayCollection $posts
 */
class Tag extends BaseEntity
{

	/**
	 * @ORM\Column(type="integer")
	 * @ORM\GeneratedValue
	 * @ORM\Id
	 * @var int
	 */
	protected $id;

	/**
	 * @ORM\Column(type="string", length=32)
	 * @var string
	 */
	protected $name;

	/**
	 * @ORM\ManyToMany(targetEntity="jiripudil\Model\Blog\Post", mappedBy="tags")
	 * @var Post[]|ArrayCollection
	 */
	protected $posts;


	public function __construct($name)
	{
		$this->name = $name;
		$this->posts = new ArrayCollection;
	}

}
