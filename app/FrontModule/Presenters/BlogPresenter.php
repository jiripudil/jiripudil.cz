<?php

namespace jiripudil\FrontModule\Presenters;

use jiripudil\FrontModule\Components\Head\HeadControl;
use jiripudil\FrontModule\Components\Paging\TPagingControlFactory;
use jiripudil\Latte\TexyFilter;
use jiripudil\Latte\TimeAgoFilter;
use jiripudil\Model\Blog\Post;
use jiripudil\Model\Blog\Queries\PostsQuery;
use jiripudil\Model\Blog\Queries\RelatedPostsQuery;
use jiripudil\Model\Blog\Tag;
use jiripudil\Presenters\TBasePresenter;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\UI\Presenter;
use Nette\Utils\Paginator;


class BlogPresenter extends Presenter
{

	use TBasePresenter {
		beforeRender as baseBeforeRender;
	}

	use TPagingControlFactory;


	/** @var EntityManager @autowire */
	protected $em;

	/** @var TexyFilter @autowire */
	protected $texyFilter;


	public function actionDefault(Tag $tag = NULL)
	{
		/** @var Paginator $paginator */
		$paginator = $this['paging']->getPaginator();
		$posts = $this->em->getDao(Post::class)->fetch((new PostsQuery())->setTag($tag));
		$posts->applyPaginator($paginator, 10);

		$this['paging']->addLinks($this['head']);

		$this->template->posts = $posts;
		$this->template->tag = $tag;
	}


	public function renderDefault(Tag $tag = NULL)
	{
		/** @var HeadControl $head */
		$head = $this['head'];
		$head->addTitlePart('Blog');
		if ($tag !== NULL) {
			$head->addTitlePart('#' . $tag->name);
		}
	}


	public function renderPost(Post $post)
	{
		/** @var HeadControl $head */
		$head = $this['head'];
		$head->addTitlePart('Blog');
		$head->addTitlePart($post->title);

		$this->template->post = $post;

		$relatedPost = $this->em->getDao(Post::class)->fetchOne(new RelatedPostsQuery($post));

		if ($relatedPost) {
			$this->template->relatedPost = $relatedPost instanceof Post ? $relatedPost : $relatedPost[0];
			$this->template->postsCount = $this->em->getDao(Post::class)->fetch(new PostsQuery)->getTotalCount() - 2;
		}
	}


	protected function beforeRender()
	{
		$this->baseBeforeRender();

		$this->template->addFilter('ago', new TimeAgoFilter);
		$this->template->addFilter('texy', $this->texyFilter);
	}

}
