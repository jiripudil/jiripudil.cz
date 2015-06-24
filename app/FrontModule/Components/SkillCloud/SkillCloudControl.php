<?php

namespace jiripudil\FrontModule\Components\SkillCloud;

use jiripudil\Components\TBaseControl;
use Nette\Application\UI\Control;
use Nette\Utils\Html;


class SkillCloudControl extends Control
{

	use TBaseControl;


	private function createSkillCloud()
	{
		return [
			'gulp' => [
				'weight' => 0.4,
				'color' => '#CF4646',
			],
			'doctrine2' => [
				'weight' => 0.8,
				'color' => '#FC6A31',
			],
			'nettefw' => [
				'weight' => 0.8,
				'color' => '#3484D2',
			],
			'rabbitmq' => [
				'weight' => 0.4,
				'color' => '#F26822',
			],
			'linux' => [
				'weight' => 0.4,
				'color' => '#D70751',
			],
			'php' => [
				'weight' => 1.0,
				'color' => '#8892BF',
			],
			'redis' => [
				'weight' => 0.4,
				'color' => '#D82C20',
			],
			'postgresql' => [
				'weight' => 0.6,
				'color' => '#336791',
			],
			'git' => [
				'weight' => 0.8,
				'color' => '#F14E32',
			],
			'mysql' => [
				'weight' => 0.8,
				'color' => '#E48E00',
			],
			'elasticsearch' => [
				'weight' => 0.4,
				'color' => '#5E8830',
			],
			'javascript' => [
				'weight' => 0.6,
				'color' => '#F0DB4F',
			],
			'nginx' => [
				'weight' => 0.8,
				'color' => '#009900',
			],
		];
	}


	public function render()
	{
		$el = Html::el('div');
		$el->class[] = 'skillCloud';

		foreach ($this->createSkillCloud() as $skill => $info) {
			$item = Html::el('div', [
				'class' => ['skillCloud-item'],
				'style' => [
					'font-size' => $info['weight'] . 'em',
					'color' => $info['color'],
				]
			])->setText($skill);

			$el->add($item);
		}

		echo $el;
	}

}
