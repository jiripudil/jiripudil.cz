<?php

/**
 * TEST: NativeHasher
 * @testCase
 */

namespace jiripudilTests\Security;

use jiripudil\Security\NativeHasher;
use Tester;
use Tester\Assert;

require_once __DIR__ . '/../../bootstrap.php';


class NativeHasherTest extends Tester\TestCase
{

	/** @var IHasher */
	private $hasher;


	protected function setUp()
	{
		$this->hasher = new NativeHasher();
	}


	public function testHash()
	{
		$password = 'trulyR4ndom5tring';
		$hash = $this->hasher->hash($password);

		Assert::match('~^\$2y\$\d{2}\$[a-zA-Z0-9/.]{53}$~', $hash);
	}


	public function testVerify()
	{
		$password = 'trulyR4ndom5tring';
		$hash = $this->hasher->hash($password);

		Assert::true($this->hasher->verify($password, $hash));
		Assert::false($this->hasher->verify('someOtherP455word', $hash));
	}


	public function testNeedsRehash()
	{
		$password = 'trulyR4ndom5tring';
		$hash = $this->hasher->hash($password);

		Assert::false($this->hasher->needsRehash($hash));
		Assert::true($this->hasher->needsRehash($hash, ['cost' => 12]));
	}

}


(new NativeHasherTest())->run();
