<?php

namespace jiripudil\Components;

use Kdyby\Autowired\AutowireComponentFactories;
use Nextras\Application\UI\SecuredLinksControlTrait;


trait TBaseControl
{

	use AutowireComponentFactories;
	use SecuredLinksControlTrait;

}
