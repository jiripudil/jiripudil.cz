<?php

namespace jiripudil\AdminModule\Components\Tags;

use jiripudil\Components\TBaseControl;
use jiripudil\Entities\Blog\Queries\TagsQuery;
use jiripudil\Entities\Blog\Tag;
use Kdyby\Doctrine\EntityDao;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\UI\Control;
use Nette\Application\UI\Form;


class TagsControl extends Control
{

	use TBaseControl;


	/** @var callable[] */
	public $onSave = [];

	/** @var callable[] */
	public $onDelete = [];

	/** @var EntityManager */
	private $em;

	/** @var EntityDao */
	private $dao;


	public function __construct(EntityManager $em)
	{
		$this->em = $em;
		$this->dao = $em->getRepository(Tag::class);
	}


	/** @secured */
	public function handleDelete($id)
	{
		$tag = $this->em->find(Tag::class, $id);

		if ($tag) {
			foreach ($tag->posts as $post) {
				$post->removeTag($tag);
			}

			$this->em->remove($tag);
			$this->em->flush();
		}

		$this->onDelete();
	}


	protected function createComponentAddForm()
	{
		$form = new Form;

		$form->addText('name', 'Name')
			->setRequired('Please enter tag name.');
		$form->addSubmit('save', 'Save');

		$form->addProtection('Your CSRF token has expired. Please re-submit the form.');
		$form->onSuccess[] = [$this, 'processAddForm'];

		return $form;
	}


	public function processAddForm(Form $form)
	{
		$values = $form->values;

		$tag = new Tag($values->name);
		$this->em->persist($tag);
		$this->em->flush();

		$this->onSave($tag);
	}


	public function render()
	{
		$this->template->setFile(__DIR__ . '/TagsControl.latte');
		$this->template->tags = $this->dao->fetch(new TagsQuery);
		$this->template->render();
	}

}


interface ITagsControlFactory
{
	/** @return TagsControl */
	function create();
}


trait TTagsControlFactory
{
	protected function createComponentTags(ITagsControlFactory $factory)
	{
		return $factory->create();
	}
}
