<?php

namespace jiripudil\FrontModule\Components\Head;

use Nette\Application\UI\Control;
use Nette\Http\IRequest;
use Nette\Utils\Html;


/**
 * @method string getTitleSeparator()
 * @method setTitleSeparator(string)
 * @method bool isTitleReversed()
 * @method setTitleReversed(bool)
 * @method string getTitleSnippetName()
 * @method setTitleSnippetName(string)
 */
class HeadControl extends Control
{

	const FEED_ATOM = 'atom';
	const FEED_RSS = 'rss';


	/** @var string[] */
	private $titleParts = [];

	/** @var string */
	private $titleSeparator = ' – ';

	/** @var bool */
	private $titleReversed = FALSE;

	/** @var string */
	private $titleSnippetName;

	/** @var Html[] */
	private $meta = [];

	/** @var Html[] */
	private $styles = [];

	/** @var Html[] */
	private $scripts = [];

	/** @var Html[] */
	private $links = [];

	/** @var Html|NULL */
	private $favicon;

	/** @var IRequest */
	private $httpRequest;


	public function __construct(IRequest $request)
	{
		$this->httpRequest = $request;
	}


	/**
	 * @param string $part
	 */
	public function addTitlePart($part)
	{
		$this->titleParts[] = $part;
	}


	/**
	 * @param string $title
	 */
	public function setTitle($title)
	{
		$this->titleParts = [$title];
	}


	/**
	 * @return string
	 */
	public function getTitle()
	{
		$parts = $this->titleReversed ? array_reverse($this->titleParts) : $this->titleParts;
		return implode($this->titleSeparator, $parts);
	}


	/**
	 * <code>
	 * $head->addMeta('http-equiv', 'X-UA-Compatible', 'IE=edge,chrome=1'); // <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	 * $head->addMeta('viewport', 'width=device-width'); // <meta name="viewport" content="width=device-width">
	 * </code>
	 *
	 * @param string $propName
	 * @param string $name
	 * @param string|NULL $content
	 */
	public function addMeta($propName, $name, $content = NULL)
	{
		if ($content === NULL) {
			$content = $name;
			$name = $propName;
			$propName = 'name';
		}

		$this->meta[] = Html::el('meta', [
			$propName => $name,
			'content' => $content,
		]);
	}


	/**
	 * @param string $href
	 */
	public function addStyle($href)
	{
		$this->styles[] = Html::el('link', [
			'rel' => 'stylesheet',
			'href' => $this->prependBasePath($href),
		]);
	}


	/**
	 * @param string $src
	 * @param bool $async
	 */
	public function addScript($src, $async = FALSE)
	{
		$this->scripts[] = Html::el('script', [
			'src' => $this->prependBasePath($src),
			'async' => $async,
		]);
	}


	/**
	 * @param string $type
	 * @param string $href
	 * @param string|NULL $title
	 */
	public function addFeed($type, $href, $title = NULL)
	{
		switch ($type) {
			case self::FEED_ATOM:
				$type = 'application/atom+xml';
				break;

			case self::FEED_RSS:
			default:
				$type = 'application/rss+xml';
				break;
		}

		$this->links[] = Html::el('link', [
			'rel' => 'alternate',
			'type' => $type,
			'href' => $this->prependBasePath($href),
		]);
	}


	/**
	 * @param string $href
	 */
	public function setFavicon($href)
	{
		$this->favicon = Html::el('link', [
			'rel' => 'shortcut icon',
			'href' => $this->prependBasePath($href),
		]);
	}


	/**
	 * @param string $rel
	 * @param string $href
	 * @param string|NULL $type
	 */
	public function addLink($rel, $href, $type = NULL)
	{
		$this->links[] = Html::el('link', [
			'rel' => $rel,
			'href' => $this->prependBasePath($href),
			'type' => $type,
		]);
	}


	public function render()
	{
		$head = Html::el('head');

		// meta tags
		$head->create('meta', ['charset' => 'utf-8']);
		foreach ($this->meta as $meta) {
			$head->add($meta);
		}

		// title
		$head->create('title', [
			'id' => $this->titleSnippetName,
		])->setText($this->getTitle());

		// favicon
		if ($this->favicon !== NULL) {
			$head->add($this->favicon);
		}

		// links
		foreach ($this->links as $link) {
			$head->add($link);
		}

		// styles
		foreach ($this->styles as $style) {
			$head->add($style);
		}

		// scripts
		foreach ($this->scripts as $script) {
			$head->add($script);
		}

		echo $head;
	}


	/**
	 * @param string $path
	 * @return string
	 */
	private function prependBasePath($path)
	{
		return $path[0] === '/' ? $path : $this->httpRequest->getUrl()->basePath . $path;
	}

}


interface IHeadControlFactory
{
	/** @return HeadControl */
	function create();
}


trait THeadControlFactory
{
	protected function createComponentHead(IHeadControlFactory $factory)
	{
		return $factory->create();
	}
}
