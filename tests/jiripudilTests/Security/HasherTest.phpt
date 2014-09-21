<?php

/**
 * Test: Hasher test
 */

namespace jiripudilTests\Security;

use jiripudil\Security\IHasher;
use Nette\DI\Container;
use Tester;
use Tester\Assert;

$container = require_once __DIR__ . '/../../bootstrap.php';


class HasherTest extends Tester\TestCase
{

	/** @var Container */
	private $container;

	/** @var IHasher */
	private $hasher;


	public function __construct(Container $container)
	{
		$this->container = $container;
	}


	public function setUp()
	{
		$this->hasher = $this->container->getByType(IHasher::class);
	}


	public function testHasher()
	{
		$password = 'trulyR4ndom5tring';
		$hash = $this->hasher->hash($password);

		Assert::match('~^\$2y\$\d{2}\$[a-zA-Z0-9/.]{53}$~', $hash);

		Assert::true($this->hasher->verify($password, $hash));
		Assert::false($this->hasher->verify('someOtherP455word', $hash));

		Assert::false($this->hasher->needsRehash($hash));
		Assert::true($this->hasher->needsRehash($hash, ['cost' => 12]));
	}

}


(new HasherTest($container))->run();
