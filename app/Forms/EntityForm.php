<?php

namespace jiripudil\Forms;

use Nette\Application\UI\Form;


class EntityForm extends Form
{
	use \Kdyby\DoctrineForms\EntityForm;
}


interface IEntityFormFactory
{
	/** @return EntityForm */
	function create();
}
