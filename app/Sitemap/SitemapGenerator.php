<?php

namespace jiripudil\Sitemap;

use jiripudil\Entities\Blog\Post;
use jiripudil\Entities\Blog\Queries\PostsQuery;
use jiripudil\Entities\Blog\Queries\TagsQuery;
use jiripudil\Entities\Blog\Tag;
use Kdyby\Doctrine\EntityDao;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\LinkGenerator;
use Nette\Object;
use Nette\Utils\Html;


class SitemapGenerator extends Object
{

	/** @var string */
	private $fileName;

	/** @var EntityDao */
	private $tagsDao;

	/** @var EntityDao */
	private $postsDao;

	/** @var LinkGenerator */
	private $linkGenerator;


	public function __construct($fileName, EntityManager $em, LinkGenerator $linkGenerator)
	{
		$this->fileName = $fileName;
		$this->linkGenerator = $linkGenerator;
		$this->tagsDao = $em->getRepository(Tag::class);
		$this->postsDao = $em->getRepository(Post::class);
	}


	public function generateSitemap()
	{
		$sitemap = fopen($this->fileName, 'wb');
		fwrite($sitemap, '<?xml version="1.0" encoding="utf-8"?>' . PHP_EOL . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL);

		$posts = $this->postsDao->fetch((new PostsQuery())->onlyPublished());
		$latestPost = $posts->getIterator()->current();
		$tags = $this->tagsDao->fetch(new TagsQuery());

		$home = Html::el('url');
		$home->create('loc')->setText($this->linkGenerator->link('Front:Homepage:'));
		$home->create('lastmod')->setText($latestPost->datetime->format('Y-m-d'));
		$home->create('changefreq')->setText('monthly');
		$home->create('priority')->setText('0.5');
		fwrite($sitemap, $home . PHP_EOL);

		$blog = Html::el('url');
		$blog->create('loc')->setText($this->linkGenerator->link('Front:Blog:'));
		$blog->create('lastmod')->setText($latestPost->datetime->format('Y-m-d'));
		$blog->create('changefreq')->setText('monthly');
		$blog->create('priority')->setText('0.8');
		fwrite($sitemap, $blog . PHP_EOL);

		foreach ($tags as list($tag,)) {
			$tagPage = Html::el('url');
			$tagPage->create('loc')->setText($this->linkGenerator->link('Front:Blog:', ['tag' => $tag]));
			$tagPage->create('lastmod')->setText($latestPost->datetime->format('Y-m-d'));
			$tagPage->create('changefreq')->setText('monthly');
			$tagPage->create('priority')->setText('0.7');
			fwrite($sitemap, $tagPage . PHP_EOL);
		}

		foreach ($posts as $post) {
			$postPage = Html::el('url');
			$postPage->create('loc')->setText($this->linkGenerator->link('Front:Blog:post', ['post' => $post]));
			$postPage->create('lastmod')->setText($post->datetime->format('Y-m-d'));
			$postPage->create('changefreq')->setText('monthly');
			$postPage->create('priority')->setText('1.0');
			fwrite($sitemap, $postPage . PHP_EOL);
		}

		fwrite($sitemap, '</urlset>');
		fclose($sitemap);
	}

}
