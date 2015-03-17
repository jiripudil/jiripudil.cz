<?php

namespace jiripudil\DI;

use jiripudil\DoctrineForms\Controls\ToManyMultiSelect;
use Kdyby\Doctrine\DI\IEntityProvider;
use Nette\DI\CompilerExtension;
use Nette\PhpGenerator as Code;


class jiripudilExtension extends CompilerExtension implements IEntityProvider
{

	public function loadConfiguration()
	{
		$builder = $this->getContainerBuilder();

		$config = $this->loadFromFile(__DIR__ . '/jiripudil.neon');
		$this->compiler->parseServices($builder, $config);

		// doctrine forms
		$builder->addDefinition($this->prefix('toManyMultiSelectMapper'))
			->setClass(ToManyMultiSelect::class);
	}


	public function afterCompile(Code\ClassType $class)
	{
		/** @var Code\Method $initialize */
		$initialize = $class->methods['initialize'];

		$initialize->addBody('$this->getService(?)->registerMapper($this->getService(?));', [
			'forms.entityFormMapper',
			$this->prefix('toManyMultiSelectMapper'),
		]);
	}


	/**
	 * @return array
	 */
	public function getEntityMappings()
	{
		return [
			'jiripudil' => __DIR__ . '/../Entities',
		];
	}

}
