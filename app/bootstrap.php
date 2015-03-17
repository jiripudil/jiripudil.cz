<?php

return call_user_func(function () {
	require_once __DIR__ . '/../vendor/autoload.php';

	$configurator = new \Nette\Configurator;

	$configurator->setTempDirectory(__DIR__ . '/../temp');
	$configurator->enableDebugger(__DIR__ . '/../log');

	$configurator->addConfig(__DIR__ . '/config/config.neon');
	$configurator->addConfig(__DIR__ . '/config/local.neon');

	return $configurator->createContainer();
});
