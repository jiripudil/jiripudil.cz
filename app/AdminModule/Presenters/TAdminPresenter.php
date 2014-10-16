<?php

namespace jiripudil\AdminModule\Presenters;

use jiripudil\AdminModule\Components\FlashMessages\TFlashMessagesControlFactory;
use jiripudil\FrontModule\Components\Head\HeadControl;
use jiripudil\FrontModule\Components\Head\THeadControlFactory;
use Kdyby\Autowired\AutowireComponentFactories;
use Kdyby\Autowired\AutowireProperties;
use Nextras\Application\UI\SecuredLinksPresenterTrait;


trait TAdminPresenter
{

	use AutowireProperties;
	use AutowireComponentFactories;
	use SecuredLinksPresenterTrait;

	use THeadControlFactory;
	use TFlashMessagesControlFactory;


	protected function beforeRender()
	{
		parent::beforeRender();

		/** @var HeadControl $head */
		$head = $this['head'];

		$head->setTitle('Jiří Pudil');
		$head->addTitlePart('Admin');
		$head->setTitleReversed(TRUE);
		$head->addStyle('static/css/admin.css');
		$head->addScript('static/js/scripts.js');

		$head->setFavicon('favicon.ico');

		$head->addMeta('http-equiv', 'X-UA-Compatible', 'IE=edge,chrome=1');
		$head->addMeta('viewport', 'width=device-width');
	}

}
