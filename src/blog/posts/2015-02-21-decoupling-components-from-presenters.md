---
legacyId: 7
title: Decoupling components from presenters
slug: decoupling-components-from-presenters
datetime: 2015-02-21T20:30:00Z
draft: false
cupsOfCoffee: 1
perex: In order for components in Nette to be as reusable as possible, it is necessary to decouple them from presenters. The cleanest way out of this is to <em>invert</em> the dependency. After all, it's the presenter that requires the component, not vice versa.
tags:
  - components
  - nettefw
  - php
---
Let's start with a simple component for adding posts to a discussion thread. It encapsulates a form, displays a flash
message after successful submission, and does a [PRG redirection](http://en.wikipedia.org/wiki/Post/Redirect/Get).

```php
class NewPostControl extends Nette\Application\UI\Control
{
	protected function createComponentForm()
	{
		$form = new Nette\Application\UI\Form();
		$form->addText('name', 'Your name')
			->setRequired();
		$form->addTextArea('text', 'Message')
			->setRequired();

		$form->addProtection();
		$form->addSubmit('save', 'Save');
		$form->onSuccess[] = [$this, 'processForm'];
		return $form;
	}

	public function processForm($_, $values)
	{
		// somehow save the values
		// and get the new $post entity
		$this->presenter->flashMessage('Post ' . $post->id . ' saved.');
		$this->presenter->redirect('this');
	}
}
```

The dependency is clear there: the component depends on the presenter to display a flash message and redirect. We'll
now make use of Nette's events system to invert the dependency: the presenter will then be able to register listeners
that e.g. display flash messages or redirect the user. The component will simply trigger the event, unaware of and,
more importantly, unconcerned with what the presenter does.

Let's start with adding the event itself. It has to be a public property whose name starts with `on`:

```php
class NewPostControl extends Nette\Application\UI\Control
{
	/** @var callable[] */
	public $onSave = [];

	// ... the rest of the component's code
}
```

Now, modify the `processForm` method. Nette uses `__call()` to automagically trigger an event when you call an
eponymous method, passing provided arguments to the registered listeners:

```php
public function processForm($_, $values)
{
	// somehow save the values
	// and get the new $post entity
	$this->onSave($post);
}
```

And register a listener in the presenter:

```php
protected function createComponentNewPost()
{
	$control = new NewPostControl();
	$control->onSave[] = function (Post $post) {
		$this->flashMessage('Post ' . $post->id . ' saved.');
		$this->redirect('this');
	};
	return $control;
}
```

The next time a new post is submitted, the component will fire its `onSave` event and the listener registered in the
presenter will take care of flash messages and redirects. The component is decoupled from the presenter and can be
easily reused at some other place that may require a slightly different behavior.

Last words of wisdom: to make the code more understandable, it's a good practice to annotate the event with the
signature of its listeners (and also provide doc for the magic `@method` if you want your IDE to autocomplete it):

```php
/**
 * @method void onSave(Post $post)
 */
class NewPostControl extends Nette\Application\UI\Control
{
	/** @var callable[] array of function(Post $post) */
	public $onSave = [];

	// ... the rest of the component's code
}
```
