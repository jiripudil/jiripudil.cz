<?php

namespace jiripudil\AdminModule\Presenters;

use jiripudil\AdminModule\Components\Tags\TTagsControlFactory;
use jiripudil\FrontModule\Components\Paging\TPagingControlFactory;
use jiripudil\Model\Blog\Post;
use jiripudil\Model\Blog\Queries\PostsQuery;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\UI\Presenter;


class DashboardPresenter extends Presenter
{

	use TAdminPresenter;
	use TSecuredPresenter;

	use TTagsControlFactory;
	use TPagingControlFactory;


	/** @var EntityManager @autowire */
	protected $em;


	public function renderDefault()
	{
		/** @var Paginator $paginator */
		$paginator = $this['paging']->getPaginator();
		$posts = $this->em->getDao(Post::class)->fetch((new PostsQuery())->fetchJoinTags());
		$posts->applyPaginator($paginator, 25);

		$this->template->posts = $posts;
	}

}
