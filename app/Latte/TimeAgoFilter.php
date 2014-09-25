<?php

namespace jiripudil\Latte;

use Nette\Object;


class TimeAgoFilter extends Object
{

	/**
	 * @param \DateTime $date
	 * @return string
	 */
	public function __invoke(\DateTime $date)
	{
		$periods = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'ages'];
		$lengths = [60, 60, 24, 7, 4.35, 12, 2, NULL];

		$diff = (new \DateTime)->format('U') - $date->format('U');

		for ($i = 0; $diff >= $lengths[$i] && $i < count($lengths) - 1; $i++) {
			$diff /= $lengths[$i];
		}

		$diff = (int) round($diff);

		if ($diff < 30 && $periods[$i] === 'second') {
			return 'a moment ago';
		}

		if ($diff === 1 && $periods[$i] === 'day') {
			return 'yesterday';
		}

		if ($periods[$i] === 'ages') {
			return 'ages ago';
		}

		if ($diff !== 1) {
			$periods[$i] .= 's';
		} else {
			$diff = 'a' . ($periods[$i] === 'hour' ? 'n' : '');
		}

		return "$diff $periods[$i] ago";
	}

}
