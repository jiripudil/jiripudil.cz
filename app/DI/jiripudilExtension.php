<?php

namespace jiripudil\DI;

use jiripudil\FrontModule\Components\ContactForm\IContactFormControlFactory;
use jiripudil\FrontModule\Components\Head\IHeadControlFactory;
use jiripudil\Http\UserStorage;
use jiripudil\Routers\RouterFactory;
use jiripudil\Security;
use Kdyby\Doctrine\DI\IEntityProvider;
use Nette\DI\CompilerExtension;


class jiripudilExtension extends CompilerExtension implements IEntityProvider
{

	public function loadConfiguration()
	{
		$builder = $this->getContainerBuilder();

		// routing
		$builder->addDefinition($this->prefix('routerFactory'))
			->setClass(RouterFactory::class);
		$builder->removeDefinition('router');
		$builder->addDefinition($this->prefix('router'))
			->setFactory('@' . $this->prefix('routerFactory') . '::createRouter');

		// security
		$builder->addDefinition($this->prefix('hasher'))
			->setClass(Security\NativeHasher::class);
		$builder->addDefinition($this->prefix('authenticator'))
			->setClass(Security\Authenticator::class);

		// factories
		$builder->addDefinition($this->prefix('headControl'))
			->setImplement(IHeadControlFactory::class);
		$builder->addDefinition($this->prefix('contactForm'))
			->setImplement(IContactFormControlFactory::class);
	}


	public function beforeCompile()
	{
		$builder = $this->getContainerBuilder();

		$builder->removeDefinition('nette.userStorage');
		$builder->addDefinition($this->prefix('userStorage'))
			->setClass(UserStorage::class);
	}


	/**
	 * @return array
	 */
	public function getEntityMappings()
	{
		return [
			'jiripudil' => __DIR__ . '/../Model',
		];
	}

}
