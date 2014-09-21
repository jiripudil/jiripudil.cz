<?php

namespace jiripudil\FrontModule\Components\ContactForm;

use jiripudil\Components\TBaseControl;
use Nette\Application\UI\Control;
use Nette\Application\UI\Form;
use Nette\InvalidStateException;
use Nette\Mail\IMailer;
use Nette\Mail\Message;
use Nette\Mail\SmtpException;


class ContactFormControl extends Control
{

	use TBaseControl;


	/** @var IMailer */
	var $mailer;


	public function __construct(IMailer $mailer)
	{
		$this->mailer = $mailer;
	}


	public function createComponentForm()
	{
		$form = new Form;
		$form->elementPrototype->novalidate = TRUE;

		$form->addText('email', 'your e-mail')
			->setType('email')
			->setRequired('Please fill in your e-mail.')
			->addRule($form::EMAIL, 'Please fill in a valid e-mail address.');
		$form->addTextArea('text', 'message')
			->setRequired('Please fill in a message text.');
		$form->addCheckbox('cc', 'copy to self');
		$form->addSubmit('send', 'Send');

		$form->addText('url', 'please empty this field')
			->setDefaultValue('http://')
			->addRule($form::BLANK, 'You are probably a spammy robot. Sorry.');
		$form->addHidden('created', strtr(time(), '0123456789', 'jfuehqbano'))
			->addRule(function ($item) {
				$value = (int) strtr($item->value, 'jfuehqbano', '0123456789');
				return $value <= (time() - 5);
			}, 'You were too quick on sending that message. Please wait a few seconds and send it again.');

		$form->onSuccess[] = $this->processForm;
		$form->onError[] = function () {
			if ($this->presenter->ajax) {
				$this->redrawControl();
			}
		};

		return $form;
	}


	public function processForm(Form $form)
	{
		$values = $form->values;

		$message = new Message;
		$message->setFrom($values->email);
		$message->addTo('me@jiripudil.cz');
		if ($values->cc) {
			$message->addCc($values->email);
		}

		$message->setSubject('Message via jiripudil.cz');
		$message->setBody($values->text); // TODO setHtml() via Texy!

		try {
			$this->mailer->send($message);
			$this->flashMessage('Thanks for your message, I will reply as soon as possible.', 'success');
			$form->setValues([], TRUE);

		} catch (InvalidStateException $e) {
			$this->flashMessage('The message could not be sent. Please try again later.', 'error');

		} catch (SmtpException $e) {
			$this->flashMessage('The message could not be sent. Please try again later.', 'error');
		}

		if ($this->presenter->ajax) {
			$this->redrawControl();

		} else {
			$this->redirect('this#contact');
		}
	}


	public function render()
	{
		$this->template->setFile(__DIR__ . '/ContactFormControl.latte');
		$this->template->render();
	}

}


interface IContactFormControlFactory
{
	/** @return ContactFormControl */
	function create();
}


trait TContactFormControlFactory
{
	protected function createComponentContactForm(IContactFormControlFactory $factory)
	{
		return $factory->create();
	}
}
