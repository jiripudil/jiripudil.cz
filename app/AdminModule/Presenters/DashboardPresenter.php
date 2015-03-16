<?php

namespace jiripudil\AdminModule\Presenters;

use jiripudil\AdminModule\Components\Tags\TTagsControlFactory;
use jiripudil\FrontModule\Components\Paging\TPagingControlFactory;
use jiripudil\Model\Blog\Post;
use jiripudil\Model\Blog\Queries\PostsQuery;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\UI\Presenter;
use Nette\Utils\Paginator;


class DashboardPresenter extends Presenter
{

	use TAdminPresenter;
	use TSecuredPresenter;

	use TTagsControlFactory;
	use TPagingControlFactory;


	/** @var EntityManager */
	private $em;


	public function __construct(EntityManager $em)
	{
		$this->em = $em;
	}


	public function actionDefault()
	{
		$this['tags']->onSave[] = function () {
			$this['flashes']->flashMessage('Tag saved.', 'success');
			$this->redirect('this');
		};
		$this['tags']->onDelete[] = function () {
			$this['flashes']->flashMessage('Tag deleted.', 'success');
			$this->redirect('this');
		};
	}


	public function renderDefault()
	{
		/** @var Paginator $paginator */
		$paginator = $this['paging']->getPaginator();
		$posts = $this->em->getRepository(Post::class)->fetch((new PostsQuery())->fetchJoinTags());
		$posts->applyPaginator($paginator, 25);

		$this->template->posts = $posts;
	}

}
