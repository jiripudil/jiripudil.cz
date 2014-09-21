<?php

namespace jiripudil\DI;

use jiripudil\Http\UserStorage;
use jiripudil\Security;
use Kdyby\Doctrine\DI\IEntityProvider;
use Nette\DI\CompilerExtension;


class jiripudilExtension extends CompilerExtension implements IEntityProvider
{

	public function loadConfiguration()
	{
		$builder = $this->getContainerBuilder();

		// security
		$builder->addDefinition($this->prefix('hasher'))
			->setClass(Security\NativeHasher::class);
		$builder->addDefinition($this->prefix('authenticator'))
			->setClass(Security\Authenticator::class);
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
