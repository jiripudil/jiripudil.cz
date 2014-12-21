<?php

namespace jiripudil\DI;

use FSHL;
use jiripudil\Security;
use Kdyby\Doctrine\DI\IEntityProvider;
use Nette\DI\CompilerExtension;


class jiripudilExtension extends CompilerExtension implements IEntityProvider
{

	public function loadConfiguration()
	{
		$builder = $this->getContainerBuilder();

		$config = $this->loadFromFile(__DIR__ . '/jiripudil.neon');
		$this->compiler->parseServices($builder, $config);
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
