<?php

namespace jiripudil\Presenters;

use jiripudil\FrontModule\Components\Head\HeadControl;
use jiripudil\FrontModule\Components\Head\THeadControlFactory;
use Kdyby\Autowired\AutowireComponentFactories;
use Kdyby\Autowired\AutowireProperties;
use Nextras\Application\UI\SecuredLinksPresenterTrait;


trait TBasePresenter
{

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
		$head->addFeed(HeadControl::FEED_RSS, $this->link('Blog:feed'), 'Blog – Jiří Pudil');

		$head->setFavicon('favicon.ico');

		$head->addMeta('http-equiv', 'X-UA-Compatible', 'IE=edge,chrome=1');
		$head->addMeta('viewport', 'width=device-width');
		$head->addMeta('property', 'fb:admins', '1625947532');
		$head->addMeta('google-site-verification', '7fHBkeNq7LXO24W8IjCc37NT9MX-6RJxD3Co5F-bRQw');
	}

}
