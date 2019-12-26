---
legacyId: 1
title: Shared component factories using traits
slug: shared-component-factories-using-traits
datetime: 2013-09-07T21:40:00Z
draft: false
cupsOfCoffee: 3
perex: Do components shared across multiple presenters bloat your BasePresenter? Well, PHP 5.4 comes with a solution to this, with these snippets of reusable code called traits.
tags:
  - components
  - nettefw
  - php
---
A trait is a block of code similar to a class, but not instantiable on its own. Classes can then declare to use specific
traits. The methods and properties defined in the trait then become available in the class.

The good thing is that classes treat methods and properties of used traits as their own, and so do class reflections.
Thus, `createComponent()` will still be able to find the factory method from the trait, and DI container will work fine
with trait's `inject*()` methods or `@inject`-annotated properties. Also, [RobotLoader](http://doc.nette.org/en/auto-loading)
can handle traits as well.

Using all this knowledge, we can now rewrite our contact form into a trait and store it in a separate file:

```php
<?php

namespace MyApp\Components;

use Nette\Application\UI\Form;
use Nette\Mail\Message;


trait ContactFormComponent
{

    /** @var \Nette\Mail\IMailer @inject */
    public $mailer;


    protected function createComponentContactForm()
    {
        $form = new Form;
        // add some form controls
        $form->onSuccess[] = $this->processContactForm;
        return $form;
    }

    public function processContactForm(Form $form)
    {
        $message = new Message();
        // fill message with form data
        $this->mailer->send($message);
        $this->flashMessage('Your message has been sent. Thanks.');
        $this->redirect('this');
    }

}
```

Then, you just use this trait in presenters. Note that it doesn't necessarily mean BasePresenter. If you have components
that are shared across multiple, _but not all_ presenters, a cleaner approach would be to specifically use that trait
only in the presenters that really need it.

```php
<?php

namespace MyApp\FrontModule;

use MyApp\Components;


class ContactPresenter extends BasePresenter
{

    use Components\ContactFormComponent;

    // the rest of your presenter's code

}
```

Et voilà! It works!

Just a few notes on working with traits: methods and properties of the same name defined in a class take precedence
over those added by a trait. However, inherited members are overridden by the trait. Keep that in mind.

Let's sum it up. We've managed to decouple component factories into separate traits and saved ourselves some lines of code
in presenters and BasePresenter in particular. We could now refactor all our components into traits. This way, we can tell
what components the given Presenter or Control needs by a single glimpse at the beginning of the class.

(A reminder: the code presented in this post requires PHP 5.4. Also, `@inject` annotations are not part of stable Nette
release.)
