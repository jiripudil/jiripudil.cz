<?php

namespace jiripudil\Model\Blog;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Kdyby\Doctrine\Entities\BaseEntity;


/**
 * @ORM\Entity
 * @ORM\Table(indexes={
 *   @ORM\Index(name="i_slug", columns="slug"),
 *   @ORM\Index(name="i_datetime", columns="datetime"),
 *   @ORM\Index(name="i_published", columns="published")
 * })
 *
 * @property-read int $id
 * @property string $title
 * @property string $slug
 * @property string $perex
 * @property string $text
 * @property \DateTime $datetime
 * @property int $cupsDrunk
 * @property bool $published
 * @property bool $commentsAllowed
 * @property Tag[]|ArrayCollection $tags
 */
class Post extends BaseEntity
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
	protected $title;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @var string
	 */
	protected $slug;

	/**
	 * @ORM\Column(type="text")
	 * @var string
	 */
	protected $perex;

	/**
	 * @ORM\Column(type="text")
	 * @var string
	 */
	protected $text;

	/**
	 * @ORM\Column(type="datetime")
	 * @var \DateTime
	 */
	protected $datetime;

	/**
	 * @ORM\Column(type="smallint")
	 * @var int
	 */
	protected $cupsDrunk;

	/**
	 * @ORM\Column(type="boolean")
	 * @var bool
	 */
	protected $published;

	/**
	 * @ORM\Column(type="boolean")
	 * @var bool
	 */
	protected $commentsAllowed;

	/**
	 * @ORM\ManyToMany(targetEntity="jiripudil\Model\Blog\Tag", inversedBy="posts")
	 * @var Tag[]|ArrayCollection
	 */
	protected $tags;


	public function __construct()
	{
		$this->tags = new ArrayCollection;
	}


	/**
	 * @param Tag[] $tags
	 */
	public function setTags(array $tags)
	{
		foreach ($this->tags as $tag) {
			$this->removeTag($tag);
			$tag->removePost($this);
		}

		foreach ($tags as $tag) {
			$this->addTag($tag);
			$tag->addPost($this);
		}
	}

}
