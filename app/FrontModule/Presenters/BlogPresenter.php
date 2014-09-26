<?php

namespace jiripudil\FrontModule\Presenters;

use jiripudil\FrontModule\Components\Head\HeadControl;
use jiripudil\Latte\TimeAgoFilter;
use jiripudil\Model\Blog\Post;
use jiripudil\Model\Blog\Queries\PostsQuery;
use jiripudil\Model\Blog\Tag;
use jiripudil\Presenters\TBasePresenter;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\UI\Presenter;


class BlogPresenter extends Presenter
{

	use TBasePresenter {
		beforeRender as baseBeforeRender;
	}


	/** @var EntityManager @autowire */
	protected $em;


	public function actionDefault(Tag $tag = NULL)
	{
		/** @var HeadControl $head */
		$head = $this['head'];
		$head->addTitlePart('Blog');
		if ($tag !== NULL) {
			$head->addTitlePart('#' . $tag->name);
		}

		$posts = $this->em->getDao(Post::class)->fetch((new PostsQuery())->setTag($tag));

		$this->template->posts = $posts;
		$this->template->tag = $tag;
	}


	public function actionPost(Post $post)
	{
		/** @var HeadControl $head */
		$head = $this['head'];
		$head->addTitlePart('Blog');
		$head->addTitlePart($post->title);

		$this->template->post = $post;
	}


	protected function beforeRender()
	{
		$this->baseBeforeRender();

		$this->template->addFilter('ago', new TimeAgoFilter);
	}

}
