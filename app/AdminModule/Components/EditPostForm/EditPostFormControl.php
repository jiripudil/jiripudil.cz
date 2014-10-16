<?php

namespace jiripudil\AdminModule\Components\EditPostForm;

use jiripudil\Model\Blog\Post;
use jiripudil\Model\Blog\Queries\TagsQuery;
use jiripudil\Model\Blog\Tag;
use Kdyby\Doctrine\EntityManager;
use Nette\Application\UI\Control;
use Nette\Application\UI\Form;
use Nette\Utils\DateTime;
use Nette\Utils\Strings;


class EditPostFormControl extends Control
{

	/** @var callable[] */
	public $onSave = [];

	/** @var EntityManager */
	private $em;


	public function __construct(EntityManager $em)
	{
		$this->em = $em;
	}


	protected function createComponentForm()
	{
		$form = new Form;

		$form->addText('title', 'Title')
			->setRequired('Please enter title.');
		$form->addText('slug', 'Slug')
			->setRequired('Please enter slug.');
		$form->addTextArea('perex', 'Perex')
			->setRequired('Please enter perex.');
		$form->addTextArea('text', 'Text')
			->setRequired('Please enter text.');
		$form->addText('datetime', 'Published on')
			->setType('datetime')
			->setRequired('Please enter date of publishing.');
		$form->addText('cupsDrunk', 'Cups of coffee')
			->setType('number');
		$form->addCheckbox('published', 'Published');
		$form->addCheckbox('commentsAllowed', 'Allow comments');

		$items = [];
		$tags = $this->em->getDao(Tag::class)->fetch(new TagsQuery());
		foreach ($tags as $tag) {
			$items[$tag[0]->id] = $tag[0]->name;
		}
		$form->addMultiSelect('tags', 'Tags', $items);

		$form->addHidden('id');
		$form->addProtection('Your CSRF token has expired. Please re-submit the form.');
		$form->addSubmit('save', 'Save');
		$form->onSuccess[] = $this->processForm;

		return $form;
	}


	public function processForm(Form $form)
	{
		$values = $form->values;

		$post = $values->id === NULL ? new Post : $this->em->getReference(Post::class, $values->id);
		$post->title = $values->title;
		$post->slug = $values->slug;
		$post->perex = $values->perex;
		$post->text = $values->text;
		$post->datetime = DateTime::from($values->datetime);
		$post->cupsDrunk = $values->cupsDrunk;
		$post->published = $values->published;
		$post->commentsAllowed = $values->commentsAllowed;
		$post->tags = array_map(function ($tagId) {
			return $this->em->getReference(Tag::class, $tagId);
		}, $values->tags);

		$this->em->persist($post);
		$this->em->flush();

		$this->onSave($post);
	}


	public function setPost(Post $post)
	{
		$this['form']->setDefaults([
			'id' => $post->id,
			'title' => $post->title,
			'slug' => $post->slug,
			'perex' => $post->perex,
			'text' => $post->text,
			'datetime' => $post->datetime->format('Y-m-d G:i:s'),
			'cupsDrunk' => $post->cupsDrunk,
			'published' => $post->published,
			'commentsAllowed' => $post->commentsAllowed,
			'tags' => array_map(function ($tag) { return $tag->id; }, $post->tags),
		]);
	}


	public function handleSlugify($title)
	{
		$slug = Strings::webalize($title);

		if ($this->presenter->ajax) {
			$this->presenter->payload->slug = $slug;
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
	/** @return EditPostFormControl */
	function create();
}


trait TEditPostFormControlFactory
{
	protected function createComponentEditPostForm(IEditPostFormControlFactory $factory)
	{
		return $factory->create();
	}
}
