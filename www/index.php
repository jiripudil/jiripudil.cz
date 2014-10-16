<?php

if (file_exists(__DIR__ . '/maintenance.html')) {
	header('HTTP/1.1 307 Temporary Redirect');
	header('Location: /maintenance.html');
	exit;
}

/** @var \Nette\DI\Container $container */
$container = require_once __DIR__ . '/../app/bootstrap.php';
$container->getByType(\Nette\Application\Application::class)->run();
