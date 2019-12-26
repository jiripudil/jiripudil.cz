---
legacyId: 6
title: Introduction to Kdyby/DoctrineForms
slug: introduction-to-kdyby-doctrineforms
datetime: 2015-02-28T10:00:00Z
draft: false
cupsOfCoffee: 6
perex: Last December, I implemented smart forms via Kdyby/DoctrineForms on this blog. Since the documentation of the package seems to be quite lacking in its scope, I decided to share with you how to overcome the pitfalls I had encountered and make it work.
tags:
  - components
  - nettefw
  - php
---
[Kdyby/DoctrineForms](https://github.com/Kdyby/DoctrineForms) is a library that integrates
[nette/forms](https://github.com/nette/forms) with Doctrine 2 in a rather handy way. It maps entity fields onto form
fields and vice versa and also integrates the whole thing with Symfony's validation component.

First of all, a disclaimer: Since this website is also my development sandbox (and also quite simple), I recklessly
implemented DoctrineForms despite the fact that it is still in development and considered unstable. Think twice before
you do that on a larger project.

Secondly, a note on how to read this post: it contains lots of lines of code and only a bare minimum of comments and
explanations, since I believe the code doesn't differ that much from what you might be used to with Nette, and is
self-explanatory (or at least I believe so) in parts that implement `DoctrineForms` features. If anything remains
unclear after you've read the post enough times, feel free to ask in the comments below.


## Installation and configuration

Kdyby/DoctrineForms is available via Composer as `kdyby/doctrine-forms`. Due to some issues with backwards compatibility
in Symfony Validation, you should also explicitly require the `dev-master` branch of `kdyby/validator`. Add these to
your `composer.json`'s `require` section:

```
"kdyby/validator": "dev-master",
"kdyby/doctrine-forms": "dev-master"
```

Now register the related extensions in your configuration file:

```yaml
extensions:
    translation: Kdyby\Translation\DI\TranslationExtension
    validator: Kdyby\Validator\DI\ValidatorExtension
    forms: Kdyby\DoctrineForms\DI\FormsExtension
```


## EntityForm

First of all, Kdyby/DoctrineForms provides a trait with the basic behavior for entity-bound forms. Let's make
an `EntityForm` class encapsulating this behavior and a respective generated factory.

```php
namespace App\Forms;

use Kdyby;
use Nette;

class EntityForm extends Nette\Application\UI\Form
{
	use Kdyby\DoctrineForms\EntityForm;
}

interface IEntityFormFactory
{
	/** @return EntityForm */
	function create();
}
```

And register the factory in config. Enabling injects is necessary since the form needs access to its dependencies
while its being created, just before it's attached to the component tree. Thus, the dependencies must be passed other
way than via presenter. It's also a good idea to add CSRF protection by default, since entity forms are obviously meant
to modify application data, and this way, you cannot accidentally forget to add it in the code.

```yaml
services:
    -
        implement: App\Forms\IEntityFormFactory
        inject: yes
        setup:
            - addProtection
```


## Behold a blog post!

Take a glimpse at the `Post` and `User` entities that we will use in the following examples. They are both mapped
using annotations and also have validation constraints attached to their attributes. `Post` has a unidirectional
many-to-one association with `User`.

```php
namespace App\Entities;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity()
 */
class Post
{
	/**
	 * @ORM\Id()
	 * @ORM\GeneratedValue()
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 * @Assert\Length(max=80)
	 */
	private $title;

	/**
	 * @ORM\ManyToOne(targetEntity="User")
	 * @Assert\Valid()
	 */
	private $author;

	/**
	 * @ORM\Column(type="datetime")
	 * @Assert\NotNull()
	 * @Assert\DateTime()
	 */
	private $publishedOn;

	/**
	 * @ORM\Column(type="boolean")
	 * @Assert\NotNull()
	 */
	private $published;

	/**
	 * @ORM\Column(type="text")
	 * @Assert\NotBlank()
	 */
	private $text;


	public function __construct($title)
	{
		$this->title = $title;
	}

	// ...
}


/**
 * @ORM\Entity()
 */
class User
{
	/**
	 * @ORM\Id()
	 * @ORM\GeneratedValue()
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
	private $name;

	/**
	 * @ORM\Column(type="boolean")
	 * @Assert\NotNull()
	 */
	private $active;

	// ...
}
```


## Editing the post

Let's create a component that will encapsulate the form itself. The code goes first, the explanation is below:

```php
namespace App\Components;

use App;
use Kdyby;
use Nette;


/**
 * @method void onSave(App\Entities\Post $post)
 */
class EditPostControl extends Nette\Application\UI\Control
{
	/** @var callable[] */
	public $onSave = [];

	private $em;

	private $formFactory;

	private $post;


	public function __construct(App\Entities\Post $post, Kdyby\Doctrine\EntityManager $em, App\Forms\IEntityFormFactory $formFactory)
	{
		$this->post = $post;
		$this->em = $em;
		$this->formFactory = $formFactory;
	}


	protected function createComponentForm()
	{
		$form = $this->formFactory->create();

		$form->addText('title', 'Title');
		$form->addTextArea('text', 'Text');
		$form->addCheckbox('published', 'Published');
		$form->addComponent(new App\Forms\Controls\DateTimeInput('Published on'), 'publishedOn');

		$form->addSelect('author', 'Author')
			->setPrompt('(choose author)')
			->setOption(Kdyby\DoctrineForms\IComponentMapper::ITEMS_TITLE, 'name')
			->setOption(Kdyby\DoctrineForms\IComponentMapper::ITEMS_FILTER, ['active' => TRUE])
			->setOption(Kdyby\DoctrineForms\IComponentMapper::ITEMS_ORDER, ['name' => 'ASC']);

		$form->addSubmit('save', 'Save');
		$form->onSuccess[] = function (App\Forms\EntityForm $form) {
			$this->em->persist($post = $form->getEntity())->flush();
			$this->onSave($post);
		};

		$form->bindEntity($this->post);
		return $form;
	}


	public function render()
	{
		$this['form']->render();
	}
}


interface IEditPostControlFactory
{
	/**
	 * @param App\Entities\Post $post
	 * @return EditPostControl
	 */
	function create(App\Entities\Post $post);
}
```

In the `createComponentForm` method, we let the factory create our `EntityForm`. The we add some input fields to the
form that are mapped from and onto the entity fields based on their names. The `DateTimeInput` is a simple class that
works with `DateTime` instances as a value:

```php
namespace App\Forms\Controls;

use Nette;


class DateTimeInput extends Nette\Forms\Controls\BaseControl
{
	/** @var \DateTimeInterface */
	private $date;


	public function setValue($value = NULL)
	{
		if ($value === NULL) {
			$this->date = NULL;

		} elseif ($value instanceof \DateTimeInterface) {
			$this->date = $value;

		} else {
			throw new \InvalidArgumentException();
		}

		return $this;
	}


	public function getValue()
	{
		return $this->date;
	}


	public function loadHttpData()
	{
		$this->date = Nette\Utils\DateTime::from($this->getHttpData(Nette\Forms\Form::DATA_LINE));
	}


	public function getControl()
	{
		$control = Nette\Utils\Html::el('input', [
			'type' => 'datetime-local',
			'name' => $this->getHttpName(),
			'value' => $this->date !== NULL ? $this->date->format('Y-m-d\TH:i') : NULL,
			'disabled' => $this->isDisabled(),
		]);

		return $control;
	}


	public function isFilled()
	{
		return $this->date !== NULL;
	}
}
```

The interesting one is the select box for the post's author. DoctrineForms will detect that the `author` property holds
an association, and query the database for possible options. You have to set the `ITEMS_TITLE` option stating which
property of the target entity should be used for the displayed label. (It can also be a callback that receives the
whole entity as its argument.) You can also optionally set up filtering and ordering of the collection.

In the form's success event, we just save the entity and flush the entity manager, and fire the component's `onSave`
event that we will utilize later in the presenter (I've [covered this earlier](/blog/decoupling-components-from-presenters)).
The last and very important step is to bind the actual Doctrine entity to the form.

We have also created an interface for a generated factory, so let's register it in the configuration now:

```yaml
services:
    - App\Components\IEditPostControlFactory
```

Nette 2.3 can automatically detect the factory's arguments and pass them accordingly. In 2.2 and earlier, you have
to list them explicitly:

```yaml
services:
    -
        implement: App\Components\IEditPostControlFactory
        parameters: [App\Entities\Post post]
        arguments: [%post%]
```


## Using the component

Let's make use of the component in our `App\AdminModule\BlogPresenter`.

```php
namespace App\AdminModule;

use App;
use Kdyby;
use Nette;


class BlogPresenter extends Nette\Application\UI\Presenter
{
	private $controlFactory;
	private $em;
	private $post;


	public function __construct(App\Components\IEditPostControlFactory $controlFactory, Kdyby\Doctrine\EntityManager $em)
	{
		$this->controlFactory = $controlFactory;
		$this->em = $em;
	}


	public function actionEdit($id = NULL)
	{
		$this->post = $id !== NULL
			? $this->em->getReference(App\Entities\Post::class, $id)
			: new App\Entities\Post('Untitled');

		$this['editPost']->onSave[] = function (App\Entities\Post $post) {
			$this->flashMessage('Post saved.', 'success');
			$this->redirect('this', ['id' => $post->id]);
		};
	}


	protected function createComponentEditPost()
	{
		return $this->controlFactory->create($this->post);
	}
}
```

This is basically all we have to do. The form is automatically mapped onto the entity. Thanks to the way `actionEdit`
is implemented, we can use the same page and same component for both editing already created posts and adding new ones.
`DoctrineForms` will also take care of form validation and displaying error messages, based on constraints imposed on
the entity's fields via annotations (see above).

Keep in mind that `DoctrineForms` is not a silver bullet. It's not stable (though I haven't run into any issues).
It's not tested (though it seems to work for me). It's not documented (though this post takes you at least through
the basics). Hence, it's not used much out there, in real world. It doesn't support loads of things (e.g. I wrote my
own [mapper for many-to-many associations](https://github.com/jiripudil/jiripudil.cz/blob/eae0eaf5be6a2ace54777d8ed61cca5d281923f4/app/DoctrineForms/Controls/ToManyMultiSelect.php)
like between blog posts and tags).

But despite all these, it's still a useful piece of software and, now that you know how, you should give it a shot.
