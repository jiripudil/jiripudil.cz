<?php

namespace jiripudil\FrontModule\Presenters;

use jiripudil\FrontModule\Components\Head\HeadControl;
use jiripudil\Latte\TimeAgoFilter;
use jiripudil\Entities\Blog\Post;
use jiripudil\Entities\Blog\Queries\PostsQuery;
use jiripudil\Presenters\TBasePresenter;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\UI\Presenter;


class HomepagePresenter extends Presenter
{

	use TBasePresenter {
		beforeRender as baseBeforeRender;
	}


	/** @var EntityManager */
	private $em;


	public function __construct(EntityManager $em)
	{
		$this->em = $em;
	}


	public function renderDefault()
	{
		$this->template->latestPost = $this->em->getRepository(Post::class)->fetchOne((new PostsQuery)->onlyPublished());
		$this->template->postsCount = $this->em->getRepository(Post::class)->fetch((new PostsQuery)->onlyPublished())->getTotalCount() - 1;
	}


	protected function beforeRender()
	{
		$this->baseBeforeRender();

		/** @var HeadControl $head */
		$head = $this['head'];
		$head->setTitle('Jiří Pudil – Nette-positive web developer');

		$this->template->addFilter('ago', new TimeAgoFilter);
	}

}
