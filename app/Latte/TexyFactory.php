<?php

namespace jiripudil\Latte;

use Nette\Object;
use Texy\Texy;


class TexyFactory extends Object
{

	/**
	 * @return Texy
	 */
	public function create()
	{
		$texy = new Texy;

		$texy->setOutputMode(Texy::HTML5);
		$texy->allowedTags = Texy::ALL;
		$texy->headingModule->top = 2;
		$texy->typographyModule->locale = 'en';

		return $texy;
	}

}