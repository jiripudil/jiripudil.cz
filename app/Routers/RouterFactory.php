<?php

namespace jiripudil\Routers;

use jiripudil\Entities\Blog\Post;
use jiripudil\Entities\Blog\Queries\PostBySlugQuery;
use jiripudil\Entities\Blog\Queries\TagByNameQuery;
use jiripudil\Entities\Blog\Tag;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\IRouter;
use Nette\Application\Routers\Route;
use Nette\Application\Routers\RouteList;
use Nette\Object;


class RouterFactory extends Object
{

	/** @var EntityManager */
	private $em;


	public function __construct(EntityManager $em)
	{
		$this->em = $em;
	}


	/**
	 * @return IRouter
	 */
	public function createRouter()
	{
		$router = new RouteList;
		Route::$defaultFlags = Route::SECURED;

		// blog/tag/<tag>
		$router[] = new Route('blog[/tag/<tag>]', [
			'module' => 'Front',
			'presenter' => 'Blog',
			'action' => 'default',
			'tag' => [
				Route::FILTER_IN => function ($tag) {
					return $this->em->getRepository(Tag::class)->fetchOne(new TagByNameQuery($tag));
				},
				Route::FILTER_OUT => function ($tag) {
					return $tag instanceof Tag ? $tag->name : $tag;
				}
			]
		]);

		// blog/rss
		$router[] = new Route('blog/rss', 'Front:Blog:feed');

		// blog/<slug>
		$router[] = new Route('blog/<post>', [
			'module' => 'Front',
			'presenter' => 'Blog',
			'action' => 'post',
			'post' => [
				Route::FILTER_IN => function ($post) {
					return $this->em->getRepository(Post::class)->fetchOne(new PostBySlugQuery($post));
				},
				Route::FILTER_OUT => function ($post) {
					return $post->slug;
				}
			]
		]);


		// admin
		$router[] = new Route('admin[/<presenter>[/<action>[/<id>]]]', [
			'module' => 'Admin',
			'presenter' => 'Dashboard',
			'action' => 'default',
		]);

		$router[] = new Route('<presenter>[/<action>[/<id>]]', 'Front:Homepage:default');
		$router[] = new Route('index.php', 'Front:Homepage:default', Route::ONE_WAY);

		return $router;
	}

}
