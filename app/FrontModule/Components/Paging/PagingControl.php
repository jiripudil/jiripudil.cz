<?php

namespace jiripudil\FrontModule\Components\Paging;

use jiripudil\FrontModule\Components\Head\HeadControl;
use Nette\Application\UI\Control;
use Nette\Application\UI\Presenter;
use Nette\Utils\Paginator;


class PagingControl extends Control
{

	/** @var int @persistent */
	public $page = 1;

	/** @var Paginator */
	private $paginator;


	public function __construct()
	{
		$this->paginator = new Paginator;
	}


	/**
	 * @return Paginator
	 */
	public function getPaginator()
	{
		return $this->paginator;
	}


	/**
	 * @param HeadControl $head
	 */
	public function addLinks(HeadControl $head)
	{
		if ( ! $this->paginator->first) {
			$head->addLink('prev', $this->link('this', ['page' => $this->page - 1]));
		}

		if ( ! $this->paginator->last) {
			$head->addLink('next', $this->link('this', ['page' => $this->page + 1]));
		}
	}


	protected function attached($presenter)
	{
		parent::attached($presenter);

		if ($presenter instanceof Presenter) {
			$this->paginator->setPage($this->page);
		}
	}


	public function render()
	{
		$this->template->setFile(__DIR__ . '/PagingControl.latte');
		$this->template->paginator = $this->paginator;
		$this->template->page = $this->page;
		$this->template->render();
	}

}


interface IPagingControlFactory
{
	/** @return PagingControl */
	function create();
}


trait TPagingControlFactory
{
	protected function createComponentPaging(IPagingControlFactory $factory)
	{
		return $factory->create();
	}
}
