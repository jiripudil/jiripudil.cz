<?php

/** @var \Composer\Autoload\ClassLoader $composer */
$composer = require_once __DIR__ . '/../vendor/autoload.php';
$composer->add('jiripudilTests', __DIR__);

if ( ! class_exists('Tester\Assert')) {
	echo 'Install Nette Tester using `composer update --dev`';
	exit(1);
}

Tester\Environment::setup();
date_default_timezone_set('Europe/Prague');

define('TEMP_DIR', __DIR__ . '/temp/' . (isset($_SERVER['argv']) ? md5(serialize($_SERVER['argv'])) : getmypid()));
Tester\Helpers::purge(TEMP_DIR);
