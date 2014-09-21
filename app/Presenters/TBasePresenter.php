<?php

namespace jiripudil\Presenters;

use jiripudil\FrontModule\Components\Head\HeadControl;
use jiripudil\FrontModule\Components\Head\THeadControlFactory;
use Kdyby\Autowired\AutowireComponentFactories;
use Kdyby\Autowired\AutowireProperties;
use Nextras\Application\UI\SecuredLinksPresenterTrait;


trait TBasePresenter
{

	use AutowireProperties;
	use AutowireComponentFactories;
	use SecuredLinksPresenterTrait;

	use THeadControlFactory;


	protected function beforeRender()
	{
		parent::beforeRender();

		/** @var HeadControl $head */
		$head = $this['head'];

		$head->setTitle('Jiří Pudil');
		$head->setTitleReversed(TRUE);
		$head->addStyle('static/css/styles.css');
		$head->addScript('static/js/scripts.js');
	}

}
