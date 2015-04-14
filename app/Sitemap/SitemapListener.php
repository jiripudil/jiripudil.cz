<?php

namespace jiripudil\Sitemap;

use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use jiripudil\Entities\Blog\Post;
use jiripudil\Entities\Blog\Tag;
use Kdyby\Events\Subscriber;
use Nette\Object;


class SitemapListener extends Object implements Subscriber
{

	/** @var SitemapGenerator */
	private $generator;


	public function __construct(SitemapGenerator $generator)
	{
		$this->generator = $generator;
	}


	public function getSubscribedEvents()
	{
		return [
			Events::postPersist,
		];
	}


	public function postPersist(LifecycleEventArgs $args)
	{
		if ($args->getObject() instanceof Post || $args->getObject() instanceof Tag) {
			$this->generator->generateSitemap();
		}
	}

}
