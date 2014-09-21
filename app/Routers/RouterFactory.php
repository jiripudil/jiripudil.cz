<?php

namespace jiripudil\Routers;

use Nette\Application\IRouter;
use Nette\Application\Routers\Route;
use Nette\Application\Routers\RouteList;
use Nette\Object;


class RouterFactory extends Object
{

	/**
	 * @return IRouter
	 */
	public function createRouter()
	{
		$router = new RouteList;

		$router[] = new Route('<presenter>[/<action>[/<id>]]', 'Front:Homepage:default');
		$router[] = new Route('index.php', 'Front:Homepage:default', Route::ONE_WAY);

		return $router;
	}

}
