<?php

namespace jiripudil\DoctrineForms\Controls;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use Kdyby;
use Kdyby\DoctrineForms\EntityFormMapper;
use Kdyby\DoctrineForms\IComponentMapper;
use Nette;
use Nette\ComponentModel\Component;
use Symfony\Component\PropertyAccess\PropertyAccessor;


class ToManyMultiSelect extends Nette\Object implements IComponentMapper
{

	const ITEMS_ADDER = 'adder';
	const ITEMS_REMOVER = 'remover';


	/** @var EntityFormMapper */
	private $mapper;

	/** @var EntityManager */
	private $em;

	/** @var PropertyAccessor */
	private $accessor;


	public function __construct(EntityFormMapper $mapper)
	{
		$this->mapper = $mapper;
		$this->em = $mapper->getEntityManager();
		$this->accessor = $mapper->getAccessor();
	}


	/**
	 * {@inheritdoc}
	 */
	public function load(ClassMetadata $meta, Component $component, $entity)
	{
		if ( ! $component instanceof Nette\Forms\Controls\MultiChoiceControl) {
			return FALSE;
		}

		if ( ! $meta->hasAssociation($name = $component->getOption(self::FIELD_NAME, $component->getName()))) {
			return FALSE;
		}

		if ( ! $component->getOption(self::ITEMS_ADDER)) {
			$path = $component->lookup('Nette\Application\UI\Form');
			throw new Kdyby\DoctrineForms\InvalidStateException('You must specify the adder method for ' . $path . ' via the option ' . __NAMESPACE__ . '\\' . __CLASS__ . '::ITEMS_ADDER');
		}

		if ( ! $component->getOption(self::ITEMS_REMOVER)) {
			$path = $component->lookup('Nette\Application\UI\Form');
			throw new Kdyby\DoctrineForms\InvalidStateException('You must specify the remover method for ' . $path . ' via the option ' . __NAMESPACE__ . '\\' . __CLASS__ . '::ITEMS_REMOVER');
		}

		if ( ! count($component->getItems())) {
			if ( ! $nameKey = $component->getOption(self::ITEMS_TITLE, FALSE)) {
				$path = $component->lookup('Nette\Application\UI\Form');
				throw new Kdyby\DoctrineForms\InvalidStateException(
					'Either specify items for ' . $path . ' yourself, or set the option Kdyby\DoctrineForms\IComponentMapper::ITEMS_TITLE ' .
					'to choose field that will be used as title'
				);
			}

			$criteria = $component->getOption(self::ITEMS_FILTER, array());
			$orderBy = $component->getOption(self::ITEMS_ORDER, array());

			$related = $this->relatedMetadata($entity, $name);
			$items = $this->findPairs($related, $criteria, $orderBy, $nameKey);
			$component->setItems($items);
		}

		if ($value = $this->getRelationIdentifiers($entity, $name)) {
			$component->setValue($value);
		}

		return TRUE;
	}


	/**
	 * {@inheritdoc}
	 */
	public function save(ClassMetadata $meta, Component $component, $entity)
	{
		if ( ! $component instanceof Nette\Forms\Controls\MultiChoiceControl) {
			return FALSE;
		}

		if ( ! $meta->hasAssociation($name = $component->getOption(self::FIELD_NAME, $component->getName()))) {
			return FALSE;
		}

		$repository = $this->em->getRepository($this->relatedMetadata($entity, $name)->getName());
		$currentValue = $this->getRelationIdentifiers($entity, $name) ?: [];
		$newValue = $component->getValue();

		$added = array_diff($newValue, $currentValue);
		$added = $repository->findBy([$meta->getSingleIdentifierFieldName() => $added]);

		$removed = array_diff($currentValue, $newValue);
		$removed = $repository->findBy([$meta->getSingleIdentifierFieldName() => $removed]);

		$adder = $component->getOption(self::ITEMS_ADDER);
		$remover = $component->getOption(self::ITEMS_REMOVER);

		foreach ($added as $addedEntity) {
			$entity->$adder($addedEntity);
		}

		foreach ($removed as $removedEntity) {
			$entity->$remover($removedEntity);
		}

		return TRUE;
	}


	/**
	 * @param string|object $entity
	 * @param string $name
	 * @return array|bool
	 */
	private function getRelationIdentifiers($entity, $name)
	{
		if ($relation = $this->accessor->getValue($entity, $name)) {
			$UoW = $this->em->getUnitOfWork();

			return array_map(function ($singleRelation) use ($UoW) {
				return $UoW->getSingleIdentifierValue($singleRelation);
			}, $relation);
		}

		return FALSE;
	}


	/**
	 * @param string|object $entity
	 * @param string $relationName
	 * @return ClassMetadata|Kdyby\Doctrine\Mapping\ClassMetadata
	 */
	private function relatedMetadata($entity, $relationName)
	{
		$meta = $this->em->getClassMetadata(is_object($entity) ? get_class($entity) : $entity);
		$targetClass = $meta->getAssociationTargetClass($relationName);
		return $this->em->getClassMetadata($targetClass);
	}


	/**
	 * @param ClassMetadata $meta
	 * @param array $criteria
	 * @param array $orderBy
	 * @param string|callable $nameKey
	 * @return array
	 */
	private function findPairs(ClassMetadata $meta, $criteria, $orderBy, $nameKey)
	{
		$repository = $this->em->getRepository($meta->getName());

		if ($repository instanceof Kdyby\Doctrine\EntityDao && !is_callable($nameKey)) {
			return $repository->findPairs($criteria, $nameKey, $orderBy);
		}

		$items = array();
		$idKey = $meta->getSingleIdentifierFieldName();
		foreach ($repository->findBy($criteria, $orderBy) as $entity) {
			$items[$this->accessor->getValue($entity, $idKey)] = is_callable($nameKey)
				? Nette\Utils\Callback::invoke($nameKey, $entity)
				: $this->accessor->getValue($entity, $nameKey);
		}

		return $items;
	}

}
