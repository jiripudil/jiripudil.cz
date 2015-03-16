<?php

namespace jiripudil\AdminModule\Components\LoginForm;

use jiripudil\Security\Authenticator;
use Nette\Application\UI\Control;
use Nette\Application\UI\Form;
use Nette\Security\AuthenticationException;
use Nette\Security\User;


class LoginFormControl extends Control
{

	/** @var Authenticator */
	private $authenticator;

	/** @var User */
	private $userContext;


	public function __construct(Authenticator $authenticator, User $userContext)
	{
		$this->authenticator = $authenticator;
		$this->userContext = $userContext;
	}


	protected function createComponentForm()
	{
		$form = new Form;

		$form->addText('email', 'E-mail')
			->setType('email')
			->setRequired('Please enter your e-mail.')
			->addRule($form::EMAIL, 'Please enter a valid e-mail address.');
		$form->addPassword('password', 'Password')
			->setRequired('Please enter your password.');

		$form->addSubmit('login', 'Login');
		$form->onSuccess[] = $this->process;

		return $form;
	}


	public function process(Form $form)
	{
		$values = $form->values;

		try {
			$identity = $this->authenticator->authenticate($values->email, $values->password);
			$this->userContext->login($identity);
			$this->presenter->redirect('Dashboard:');

		} catch (AuthenticationException $e) {
			$form->addError('Invalid credentials.');
		}
	}


	public function render()
	{
		$this->template->setFile(__DIR__ . '/LoginFormControl.latte');
		$this->template->render();
	}

}


interface ILoginFormControlFactory
{
	/** @return LoginFormControl */
	function create();
}


trait TLoginFormControlFactory
{
	protected function createComponentLoginForm(ILoginFormControlFactory $factory)
	{
		return $factory->create();
	}
}
