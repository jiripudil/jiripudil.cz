<?php

namespace jiripudil\FrontModule\Presenters;

use jiripudil\FrontModule\Components\Head\HeadControl;
use jiripudil\Model\Blog\Post;
use jiripudil\Model\Blog\Queries\PostsQuery;
use jiripudil\Presenters\TBasePresenter;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\UI\Presenter;


class HomepagePresenter extends Presenter
{

	use TBasePresenter {
		beforeRender as baseBeforeRender;
	}


	/** @var EntityManager @autowire */
	protected $em;


	public function renderDefault()
	{
		$this->template->latestPost = $this->em->getDao(Post::class)->fetchOne(new PostsQuery);
		$this->template->postsCounts = $this->em->getDao(Post::class)->fetch(new PostsQuery)->getTotalCount() - 1;
	}


	protected function beforeRender()
	{
		$this->baseBeforeRender();

		/** @var HeadControl $head */
		$head = $this['head'];
		$head->setTitle('Jiří Pudil – Nette-positive web developer');
	}

}
