<?php

namespace jiripudil\DI;

use FSHL;
use jiripudil\AdminModule\Components\EditPostForm\IEditPostFormControlFactory;
use jiripudil\AdminModule\Components\LoginForm\ILoginFormControlFactory;
use jiripudil\AdminModule\Components\Tags\ITagsControlFactory;
use jiripudil\Caching\TexyCache;
use jiripudil\Console\CreateUserCommand;
use jiripudil\FrontModule\Components\ContactForm\IContactFormControlFactory;
use jiripudil\FrontModule\Components\Head\IHeadControlFactory;
use jiripudil\FrontModule\Components\Paging\IPagingControlFactory;
use jiripudil\Http\UserStorage;
use jiripudil\Latte\TexyFactory;
use jiripudil\Latte\TexyFilter;
use jiripudil\Routers\RouterFactory;
use jiripudil\Security;
use Kdyby\Console\DI\ConsoleExtension;
use Kdyby\Doctrine\DI\IEntityProvider;
use Nette\DI\CompilerExtension;


class jiripudilExtension extends CompilerExtension implements IEntityProvider
{

	public function loadConfiguration()
	{
		$builder = $this->getContainerBuilder();

		// routing
		$builder->addDefinition($this->prefix('routerFactory'))
			->setClass(RouterFactory::class);
		$builder->getDefinition('router')
			->setFactory('@' . $this->prefix('routerFactory') . '::createRouter');

		// security
		$builder->addDefinition($this->prefix('hasher'))
			->setClass(Security\NativeHasher::class);
		$builder->addDefinition($this->prefix('authenticator'))
			->setClass(Security\Authenticator::class);

		// templating
		$builder->addDefinition($this->prefix('fshlOutput'))
			->setClass(FSHL\Output\Html::class);
		$builder->addDefinition($this->prefix('fshlHighlighter'))
			->setClass(FSHL\Highlighter::class);
		$builder->addDefinition($this->prefix('texyCache'))
			->setClass(TexyCache::class);
		$builder->addDefinition($this->prefix('texyFactory'))
			->setClass(TexyFactory::class);
		$builder->addDefinition($this->prefix('texyFilter'))
			->setClass(TexyFilter::class);

		// factories
		$builder->addDefinition($this->prefix('headControl'))
			->setImplement(IHeadControlFactory::class);
		$builder->addDefinition($this->prefix('contactForm'))
			->setImplement(IContactFormControlFactory::class);
		$builder->addDefinition($this->prefix('pagingControl'))
			->setImplement(IPagingControlFactory::class);
		$builder->addDefinition($this->prefix('loginForm'))
			->setImplement(ILoginFormControlFactory::class);
		$builder->addDefinition($this->prefix('tagsControl'))
			->setImplement(ITagsControlFactory::class);
		$builder->addDefinition($this->prefix('editPostControl'))
			->setImplement(IEditPostFormControlFactory::class);

		// console
		$builder->addDefinition($this->prefix('createUserCommand'))
			->setClass(CreateUserCommand::class)
			->addTag(ConsoleExtension::COMMAND_TAG);
	}


	public function beforeCompile()
	{
		$builder = $this->getContainerBuilder();

		$builder->removeDefinition('nette.userStorage');
		$builder->addDefinition($this->prefix('userStorage'))
			->setClass(UserStorage::class);
	}


	/**
	 * @return array
	 */
	public function getEntityMappings()
	{
		return [
			'jiripudil' => __DIR__ . '/../Model',
		];
	}

}
