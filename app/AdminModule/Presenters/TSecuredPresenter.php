<?php

namespace jiripudil\AdminModule\Presenters;


trait TSecuredPresenter
{

	public function startup()
	{
		parent::startup();

		if ( ! $this->user->loggedIn) {
			$this->flashMessage('You need to sign in to proceed with this action.', 'error');
			$this->redirect(':Admin:Sign:in');
		}
	}

}
