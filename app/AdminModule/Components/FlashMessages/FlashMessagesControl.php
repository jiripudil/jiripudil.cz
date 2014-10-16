<?php

namespace jiripudil\AdminModule\Components\FlashMessages;

use Nette\Application\UI\Control;


class FlashMessagesControl extends Control
{

	const SUCCESS = 'success';
	const ERROR = 'error';
	const INFO = 'info';


	public function render()
	{
		$this->template->setFile(__DIR__ . '/FlashMessagesControl.latte');
		$this->template->render();
	}

}


interface IFlashMessagesControlFactory
{
	/** @return FlashMessagesControl */
	function create();
}


trait TFlashMessagesControlFactory
{
	protected function createComponentFlashes(IFlashMessagesControlFactory $factory)
	{
		return $factory->create();
	}
}
