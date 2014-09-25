<?php

/**
 * Test: TimeAgoFilter test
 */

namespace jiripudilTests\Latte;

use jiripudil\Latte\TimeAgoFilter;
use Tester;
use Tester\Assert;

$container = require_once __DIR__ . '/../../bootstrap.php';


class TimeAgoFilterTest extends Tester\TestCase
{

	public function testTimeAgoFilter()
	{
		$timeAgoFilter = new TimeAgoFilter;

		Assert::same('a moment ago', $timeAgoFilter(new \DateTime('-15 seconds')));
		Assert::same('a minute ago', $timeAgoFilter(new \DateTime('-1 minute -12 seconds')));
		Assert::same('2 minutes ago', $timeAgoFilter(new \DateTime('-1 minute -45 seconds')));
		Assert::same('an hour ago', $timeAgoFilter(new \DateTime('-1 hour -2 minutes')));
		Assert::same('3 hours ago', $timeAgoFilter(new \DateTime('-3 hours -12 minutes')));
		Assert::same('yesterday', $timeAgoFilter(new \DateTime('-1 day -7 hours')));
		Assert::same('4 days ago', $timeAgoFilter(new \DateTime('-4 days -3 hours')));
		Assert::same('2 weeks ago', $timeAgoFilter(new \DateTime('-2 weeks -2 days')));
		Assert::same('3 months ago', $timeAgoFilter(new \DateTime('-3 months -4 days')));
		Assert::same('ages ago', $timeAgoFilter(new \DateTime('-4 years')));
	}

}


(new TimeAgoFilterTest())->run();
