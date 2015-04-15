<?php

/**
 * TEST: TexyFactory
 * @testCase
 */

namespace jiripudilTests\Latte;

use jiripudil\Latte\TexyFactory;
use Tester;
use Tester\Assert;

require_once __DIR__ . '/../../bootstrap.php';


class TexyFactoryTest extends Tester\TestCase
{

	public function testTexyFactory()
	{
		$factory = new TexyFactory();
		$texy = $factory->create();

		Assert::type(\Texy::class, $texy);
		Assert::same(\Texy::HTML5, $texy->getOutputMode());
		Assert::same(\Texy::ALL, $texy->allowedTags);
		Assert::same(2, $texy->headingModule->top);
		Assert::same('en', $texy->typographyModule->locale);
	}

}


(new TexyFactoryTest())->run();
