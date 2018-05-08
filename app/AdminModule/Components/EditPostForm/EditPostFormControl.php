<?php

namespace jiripudil\AdminModule\Components\EditPostForm;

use jiripudil\Entities\Blog\Tag;
use jiripudil\Forms\Controls\DateTimeInput;
use jiripudil\Forms\EntityForm;
use jiripudil\Forms\IEntityFormFactory;
use jiripudil\Latte\TexyFilter;
use jiripudil\Entities\Blog\Post;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\UI\Control;
use Nette\Application\UI\Form;
use Nette\Utils\ArrayHash;
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


	public function __construct(Post $post, EntityManager $em, TexyFilter $texy)
	{
		$this->post = $post;
		$this->em = $em;
		$this->texy = $texy;
	}


	protected function createComponentForm()
	{
		$form = new Form();

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

		$tagItems = $this->em->getRepository(Tag::class)->findPairs([], 'name', [], 'id');
		$form->addMultiSelect('tags', 'Tags', $tagItems);

		$form->addProtection('Your CSRF token has expired. Please re-submit the form.');
		$form->addSubmit('save', 'Save');

		$form->setDefaults([
			'title' => $this->post->title,
			'slug' => $this->post->slug,
			'perex' => $this->post->perex,
			'text' => $this->post->text,
			'datetime' => $this->post->datetime,
			'cupsDrunk' => $this->post->cupsDrunk,
			'published' => $this->post->published,
			'commentsAllowed' => $this->post->commentsAllowed,
			'tags' => \array_map(function (Tag $tag): int {
				return $tag->id;
			}, $this->post->tags),
		]);

		$form->onSuccess[] = function (Form $form, ArrayHash $values) {
			$this->post->title = $values->title;
			$this->post->slug = $values->slug;
			$this->post->perex = $values->perex;
			$this->post->text = $values->text;
			$this->post->datetime = $values->datetime;
			$this->post->cupsDrunk = $values->cupsDrunk;
			$this->post->published = $values->published;
			$this->post->commentsAllowed = $values->commentsAllowed;
			$this->post->setTags(\array_map(function (int $id): Tag {
				return $this->em->find(Tag::class, $id);
			}, $values->tags));

			$this->em->persist($this->post);
			$this->em->flush();
			$this->onSave($this->post);
		};

		return $form;
	}


	public function handleSlugify($title)
	{
		$slug = Strings::webalize($title);

		if ($this->presenter->isAjax()) {
			$this->presenter->payload->slug = $slug;
			$this->presenter->sendPayload();
		}
	}


	public function handlePreview($input)
	{
		$preview = call_user_func($this->texy, $input);

		if ($this->presenter->isAjax()) {
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
	function create(Post $post);
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
