<?php

namespace jiripudil\Latte;

use FSHL;
use jiripudil\Caching\TexyCache;
use Nette\Object;


class TexyFilter extends Object
{

	/** @var \Texy */
	private $texy;

	/** @var FSHL\Highlighter */
	private $highlighter;

	/** @var TexyCache */
	private $cache;

	private $highlights = [
		'block/code' => TRUE,
		'block/php' => FSHL\Lexer\Php::class,
		'block/neon' => FSHL\Lexer\Neon::class,
		'block/config' => TRUE,
		'block/sh' => TRUE,
		'block/texy' => FSHL\Lexer\Texy::class,
		'block/js' => FSHL\Lexer\Javascript::class,
		'block/css' => FSHL\Lexer\Css::class,
		'block/sql' => FSHL\Lexer\Sql::class,
		'block/html' => FSHL\Lexer\Html::class,
		'block/htmlcb' => FSHL\Lexer\Html::class,
		'block/java' => FSHL\Lexer\Java::class,
	];


	public function __construct(TexyFactory $texyFactory, FSHL\Highlighter $highlighter, TexyCache $texyCache)
	{
		$this->highlighter = $highlighter;
		$this->cache = $texyCache;
		$this->texy = $texyFactory->create();

		$this->texy->addHandler('block', function (\TexyHandlerInvocation $invocation, $blockType, $content, $lang, $modifier) {
			if (isset($this->highlights[$blockType])) {
				list(, $lang) = explode('/', $blockType);

			} else {
				return $invocation->proceed($blockType, $content, $lang, $modifier);
			}

			$texy = $invocation->getTexy();
			$content = $texy::outdent($content);

			if (class_exists($lexer = $this->highlights[$blockType])) {
				$content = $this->highlighter->highlight($content, new $lexer);

			} else {
				$content = htmlspecialchars($content);
			}

			$elPre = \TexyHtml::el('pre');
			if ($modifier) $modifier->decorate($texy, $elPre);
			$elPre->create('code', $texy->protect($content, \Texy::CONTENT_MARKUP));

			return $elPre;
		});
	}


	/**
	 * @return \Texy
	 */
	public function getTexy()
	{
		return $this->texy;
	}


	/**
	 * @return FSHL\Highlighter
	 */
	public function getHighligher()
	{
		return $this->highlighter;
	}


	/**
	 * @param string $input
	 * @return string
	 */
	public function __invoke($input)
	{
		return $this->cache->load($input, function ($input) {
			return $this->texy->process($input);
		});
	}

}
