<?php

namespace jiripudil\Latte;

use FSHL;
use Nette\Object;
use Texy;


class TexyFilter extends Object
{

	/** @var Texy\Texy */
	private $texy;

	/** @var FSHL\Highlighter */
	private $highlighter;

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
	];


	public function __construct(TexyFactory $texyFactory, FSHL\Highlighter $highlighter)
	{
		$this->highlighter = $highlighter;
		$this->texy = $texyFactory->create();

		$this->texy->addHandler('block', function (Texy\HandlerInvocation $invocation, $blockType, $content, $lang, $modifier) {
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

			$elPre = Texy\HtmlElement::el('pre');
			if ($modifier) $modifier->decorate($texy, $elPre);
			$elPre->create('code', $texy->protect($content, Texy::CONTENT_MARKUP));

			return $elPre;
		});
	}


	/**
	 * @return Texy\Texy
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
		return $this->texy->process($input);
	}

}
