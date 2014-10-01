<?php

namespace jiripudil\AdminModule\Presenters;

use jiripudil\AdminModule\Components\LoginForm\TLoginFormControlFactory;
use Nette\Application\UI\Presenter;


class SignPresenter extends Presenter
{

	use TAdminPresenter;
	use TLoginFormControlFactory;


	public function handleOut()
	{
		$this->user->logout(TRUE);
		$this->redirect('this');
	}

}
