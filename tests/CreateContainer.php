<?php

namespace jiripudilTests;

use Nette;


trait CreateContainer
{

	protected function createContainer()
	{
		$configurator = new Nette\Configurator;

		$configurator->setTempDirectory(dirname(TEMP_DIR)); // shared container for performance purposes
		$configurator->setDebugMode(FALSE);

		$configurator->addParameters([
			'appDir' => __DIR__ . '/../app',
		]);

		$configurator->addConfig(__DIR__ . '/../app/config/config.neon');
		$configurator->addConfig(__DIR__ . '/tests.neon');

		return $configurator->createContainer();

	}

}
