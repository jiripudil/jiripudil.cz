<?php

/**
 * TEST: TexyFilter
 * @testCase
 */

namespace jiripudilTests\Latte;

use FSHL;
use jiripudil\Caching\TexyCache;
use jiripudil\Latte\TexyFactory;
use jiripudil\Latte\TexyFilter;
use Tester;
use Tester\Assert;

require_once __DIR__ . '/../../bootstrap.php';


class TexyFilterTest extends Tester\TestCase
{

	/**
	 * @dataProvider getSourceFiles
	 */
	public function testTexyFilter($sourceFile)
	{
		$data = file_get_contents(__DIR__ . '/texy/' . $sourceFile . '.texy');
		$expected = file_get_contents(__DIR__ . '/texy/' . $sourceFile . '.expected');

		$texyFactory = new TexyFactory();
		$highlighter = new FSHL\Highlighter(new FSHL\Output\Html());

		$texyCache = \Mockery::mock(TexyCache::class);
		$texyCache->shouldReceive('load')
			->with($data, \Mockery::type('callable'))
			->andReturnUsing(function ($input, $fallback) {
				return call_user_func($fallback, $input);
			});

		$filter = new TexyFilter($texyFactory, $highlighter, $texyCache);
		$result = call_user_func($filter, $data);

		Assert::same($expected, $result);
	}


	public function getSourceFiles()
	{
		return [
			['basic'],
			['php'],
			['neon'],
			['html'],
			['sh'],
		];
	}


	protected function tearDown()
	{
		\Mockery::close();
	}

}


(new TexyFilterTest())->run();
