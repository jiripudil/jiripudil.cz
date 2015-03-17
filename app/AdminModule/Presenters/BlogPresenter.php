<?php

namespace jiripudil\AdminModule\Presenters;

use jiripudil\AdminModule\Components\EditPostForm\TEditPostFormControlFactory;
use jiripudil\Entities\Blog\Post;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\UI\Presenter;


class BlogPresenter extends Presenter
{

	use TAdminPresenter;
	use TSecuredPresenter;

	use TEditPostFormControlFactory;


	/** @var EntityManager */
	private $em;


	public function __construct(EntityManager $em)
	{
		$this->em = $em;
	}


	public function actionEdit($id = NULL)
	{
		$this->post = $id !== NULL ? $this->em->find(Post::class, $id) : new Post;

		$this['editPostForm']->onSave[] = function () {
			$this['flashes']->flashMessage('Saved.', 'success');
			$this->redirect('Dashboard:');
		};
	}


	public function renderDelete($id)
	{
		$post = $this->em->find(Post::class, $id);

		if ($post === NULL) {
			$this->redirect('Dashboard:');
		}

		$this->template->post = $post;
	}


	/** @secured */
	public function handleDelete($id)
	{
		$post = $this->em->find(Post::class, $id);

		if ($post !== NULL) {
			foreach ($post->tags as $tag) {
				$tag->removePost($post);
			}

			$this->em->remove($post);
			$this->em->flush();
		}

		$this['flashes']->flashMessage('This post is history.', 'success');
		$this->redirect('Dashboard:');
	}

}
