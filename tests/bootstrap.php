<?php

/** @var \Composer\Autoload\ClassLoader $composer */
$composer = require_once __DIR__ . '/../vendor/autoload.php';
$composer->add('jiripudilTests', __DIR__);

if ( ! class_exists('Tester\Assert')) {
	echo 'Install Nette Tester using `composer update --dev`';
	exit(1);
}

$tempDir = __DIR__ . '/temp';

Tester\Environment::setup();
Tester\Helpers::purge($tempDir);

$configurator = new Nette\Configurator;

$configurator->setTempDirectory($tempDir);
$configurator->setDebugMode(FALSE);

$robotLoader = $configurator->createRobotLoader()
	->addDirectory(__DIR__ . '/../app')
	->register();
$composer->addClassMap($robotLoader->getIndexedClasses());

$configurator->addConfig(__DIR__ . '/../app/config/config.neon');
$configurator->addConfig(__DIR__ . '/tests.neon');

return $configurator->createContainer();
