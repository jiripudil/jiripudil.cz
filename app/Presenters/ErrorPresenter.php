<?php

namespace jiripudil\Presenters;

use jiripudil\FrontModule\Components\Head\THeadControlFactory;
use Nette\Application\BadRequestException;
use Nette\Application\UI\Presenter;
use Tracy\Debugger;


class ErrorPresenter extends Presenter
{

	use THeadControlFactory;


	public function renderDefault(\Exception $e)
	{
		if ($this->isAjax()) {
			$this->payload->error = TRUE;
			$this->terminate();

		} elseif ($e instanceof BadRequestException) {
			$code = $e->getCode();
			$this->setView(in_array($code, [403, 404, 500]) ? $code : '4xx');

			$this['head']->setTitle('Oops, an error! – Jiří Pudil');

			Debugger::log("HTTP code $code: {$e->getMessage()} in {$e->getFile()}:{$e->getLine()}", 'access');

		} else {
			$this->setView('500');

			$this['head']->addMeta('robots', 'noindex');
			$this['head']->setTitle('Oops, an error! – Jiří Pudil');

			Debugger::log($e, Debugger::ERROR);
		}
	}

}
