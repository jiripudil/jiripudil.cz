<?php

namespace jiripudil\AdminModule\Components\EditPostForm;

use jiripudil\DoctrineForms\Controls\ToManyMultiSelect;
use jiripudil\Forms\Controls\DateTimeInput;
use jiripudil\Forms\EntityForm;
use jiripudil\Forms\IEntityFormFactory;
use jiripudil\Latte\TexyFilter;
use jiripudil\Model\Blog\Post;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\UI\Control;
use Nette\Utils\Strings;


class EditPostFormControl extends Control
{

	/** @var callable[] */
	public $onSave = [];

	/** @var Post */
	private $post;

	/** @var EntityManager */
	private $em;

	/** @var TexyFilter */
	private $texy;

	/** @var IEntityFormFactory */
	private $formFactory;


	public function __construct(Post $post, EntityManager $em, TexyFilter $texy, IEntityFormFactory $entityFormFactory)
	{
		$this->post = $post;
		$this->em = $em;
		$this->texy = $texy;
		$this->formFactory = $entityFormFactory;
	}


	protected function createComponentForm()
	{
		$form = $this->formFactory->create();

		$form->addText('title', 'Title')
			->setRequired('Please enter title.');
		$form->addText('slug', 'Slug')
			->setRequired('Please enter slug.');
		$form->addTextArea('perex', 'Perex')
			->setRequired('Please enter perex.');
		$form->addTextArea('text', 'Text')
			->setRequired('Please enter text.');

		$dateInput = (new DateTimeInput('Published on'))
			->setRequired('Please enter date of publishing.');
		$form->addComponent($dateInput, 'datetime');

		$form->addText('cupsDrunk', 'Cups of coffee')
			->setType('number');
		$form->addCheckbox('published', 'Published');
		$form->addCheckbox('commentsAllowed', 'Allow comments');

		$form->addMultiSelect('tags', 'Tags')
			->setOption(ToManyMultiSelect::ITEMS_TITLE, 'name')
			->setOption(ToManyMultiSelect::ITEMS_ADDER, 'addTag')
			->setOption(ToManyMultiSelect::ITEMS_REMOVER, 'removeTag');

		$form->addProtection('Your CSRF token has expired. Please re-submit the form.');
		$form->addSubmit('save', 'Save');
		$form->onSuccess[] = function (EntityForm $form) {
			$this->em->persist($post = $form->getEntity());
			$this->em->flush();
			$this->onSave($post);
		};

		$form->bindEntity($this->post);

		return $form;
	}


	public function handleSlugify($title)
	{
		$slug = Strings::webalize($title);

		if ($this->presenter->ajax) {
			$this->presenter->payload->slug = $slug;
			$this->presenter->sendPayload();
		}
	}


	public function handlePreview($input)
	{
		$preview = call_user_func($this->texy, $input);

		if ($this->presenter->ajax) {
			$this->presenter->payload->preview = $preview;
			$this->presenter->sendPayload();
		}
	}


	public function render()
	{
		$this->template->setFile(__DIR__ . '/EditPostFormControl.latte');
		$this->template->render();
	}

}


interface IEditPostFormControlFactory
{
	/**
	 * @param Post $post
	 * @return EditPostFormControl
	 */
	function create($post);
}


trait TEditPostFormControlFactory
{
	/** @var Post */
	protected $post;

	protected function createComponentEditPostForm(IEditPostFormControlFactory $factory)
	{
		return $factory->create($this->post);
	}
}
