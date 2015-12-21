<?php

namespace jiripudil\Presenters;

use jiripudil\FrontModule\Components\Head\THeadControlFactory;
use Kdyby\Autowired\AutowireComponentFactories;
use Nette\Application\BadRequestException;
use Nette\Application\UI\Presenter;
use Tracy\Debugger;


class ErrorPresenter extends Presenter
{

	use TBasePresenter;


	public function renderDefault(\Exception $exception)
	{
		if ($this->isAjax()) {
			$this->payload->error = TRUE;
			$this->terminate();

		} elseif ($exception instanceof BadRequestException) {
			$code = $exception->getCode();
			$this->setView(in_array($code, [403, 404, 410, 500]) ? $code : '4xx');

			$this['head']->setTitle('Oops, an error! – Jiří Pudil');

			Debugger::log("HTTP code $code: {$exception->getMessage()} in {$exception->getFile()}:{$exception->getLine()}", 'access');

		} else {
			$this->setView('500');

			$this['head']->addMeta('robots', 'noindex');
			$this['head']->setTitle('Oops, an error! – Jiří Pudil');

			Debugger::log($exception, Debugger::ERROR);
		}
	}

}
