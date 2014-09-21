<?php

namespace jiripudil\DI;

use Kdyby\Doctrine\DI\IEntityProvider;
use Nette\DI\CompilerExtension;


class jiripudilExtension extends CompilerExtension implements IEntityProvider
{

	public function loadConfiguration()
	{
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
