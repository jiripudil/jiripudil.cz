---
legacyId: 15
title: Bootstrap your integration testing database
slug: bootstrap-your-integration-testing-database
datetime: 2015-11-21T11:30:00Z
draft: false
cupsOfCoffee: 5
perex: Testing your application against a real database and pseudo-real data is quite a challenge. I'm going to show you how to automate the process of creating a test database with its schema and filling it with data, all with tools you might already be familiar with, including Nette Tester and Doctrine 2 along with Doctrine Migrations and Data Fixtures.
tags:
  - database
  - doctrine
  - migrations
  - nettefw
  - testing
---
_I've recently had a discussion about this [on Nette forum](https://forum.nette.org/cs/24829-testovani-databaze-kdyby-doctrine-connection-mock) (in Czech)
and decided to take it one step further and turn the outcome into a blog post._

Unit testing is not a silver bullet. Sometimes you need to write integration tests to make sure your code reads and
updates the state in the database exactly the way you want it to. You need to create a test database and fill it
with predictable data. But you want your tests to run effectively, in parallel, without them waiting for each other.
The best solution seems to be to create a new database for each test on the fly, prepare it, and destroy it afterwards.

Kind words of attribution: this code takes inspiration from [Kdyby\TesterExtras](https://github.com/Kdyby/TesterExtras)
package.


## Lazy setup

First of all, we need to add some laziness. As our project grows, so does the database and in an ideal case also the
number of tests. So we don't really want to setup the database in test cases in which it's not needed. We can utilize
Nette's events system and create a simple stub around the DBAL's connection class that triggers an event whenever it
actually connects to the database.

```php
/**
 * @method onConnect(ConnectionMock $self)
 */
class ConnectionMock extends Kdyby\Doctrine\Connection
{

	public $onConnect = [];


	public function connect()
	{
		if (parent::connect()) {
			$this->onConnect($this);
		}
	}

}
```

and register it in the config (e.g. `tests/tests.neon`):

```yaml
doctrine:
    wrapperClass: ConnectionMock
```


## Creating the database

A little sidenote first: it's practical to have the whole DI container at hand and just pull services out of it,
so let's put that in a trait into the `tests` directory:

```php
trait CompiledContainer
{

	/** @var Nette\DI\Container */
	private $container;


	protected function getContainer()
	{
		if ($this->container === NULL) {
			$this->container = $this->createContainer();
		}

		return $this->container;
	}


	protected function createContainer()
	{
		$configurator = new Nette\Configurator();

		$configurator->setTempDirectory(dirname(TEMP_DIR)); // shared container for performance purposes
		$configurator->setDebugMode(FALSE);

		$configurator->addParameters([
			'appDir' => __DIR__ . '/../../app',
		]);

		$configurator->addConfig(__DIR__ . '/../app/config/config.neon');
		$configurator->addConfig(__DIR__ . '/tests.neon');

		return $configurator->createContainer();
	}

}
```

Now let's write another trait with the actual database setup. It will use the `CompiledContainer` trait and override
its `createContainer` method with its own that adds a handler to the connect event we implemented in our `ConnectionMock`
above:

```php
trait DatabaseSetup
{

	use CompiledContainer {
		createContainer as parentCreateContainer;
	}


	/**
	 * @var string|NULL
	 */
	protected $databaseName;


	protected function createContainer()
	{
		$container = $this->parentCreateContainer();

		/** @var ConnectionMock $db */
		$db = $container->getByType(Doctrine\DBAL\Connection::class);
		if ( ! $db instanceof ConnectionMock) {
			throw new \LogicException("Connection service should be instance of ConnectionMock");
		}

		$db->onConnect[] = function (Doctrine\DBAL\Connection $db) use ($container) {
			if ($this->databaseName !== NULL) {
				return;
			}

			try {
				$this->setupDatabase($db);

			} catch (\Exception $e) {
				Tester\Assert::fail($e->getMessage());
			}
		};

		return $container;
	}


	private function setupDatabase(Connection $db)
	{
		$this->databaseName = 'db_tests_' . getmypid();

		$this->dropDatabase($db);
		$this->createDatabase($db);

		// TODO init schema and load data (see below)

		register_shutdown_function(function () use ($db) {
			$this->dropDatabase($db);
		});
	}

}
```

The important part is the `setupDatabase` method. It generates a new database name using the ID of the current process,
drops it if it already exists, creates a new one, and registers a shutdown function that does the cleaning after
finishing the test. As to the `dropDatabase` and `createDatabase` methods, the implementation slightly varies across
different platforms.

The problem is there is no standardized way of switching databases. While in MySQL you can just issue a `USE` query,
in PostgreSQL, for instance, you cannot switch between different databases on the fly, because you only connect to one
database at the time directly. In addition, Postgres prevents you from dropping a database if there are still open
connections to it. So employing a few hacks is, unfortunately, inevitable. This is what it looks like for PostgreSQL
(MySQL should be a bit simpler):

```php
private function createDatabase(Connection $db)
{
	$db->exec("CREATE DATABASE {$this->databaseName}");
	$this->connectToDatabase($db, $this->databaseName);
}


private function dropDatabase(Connection $db)
{
	$this->connectToDatabase($db, 'postgres'); // connect to an existing database other than $this->databaseName
	$db->exec("DROP DATABASE IF EXISTS {$this->databaseName}");
}


private function connectToDatabase(Connection $db, $databaseName)
{
	$db->close();
	$db->__construct(
		['dbname' => $databaseName] + $db->getParams(),
		$db->getDriver(),
		$db->getConfiguration(),
		$db->getEventManager()
	);
	$db->connect();
}
```


## Setting up the schema

I guess you've noticed the big TODO in the code above, saying `init schema and load data`. So let's get to the first
point and then to the other one. The direct and most simple approach to both schema and data is to have them in raw
SQL queries and simply execute them:

```php
foreach ($sqls as $file) {
	Kdyby\Doctrine\Helpers::loadFromFile($db, $file);
}
```

This might, however, add some overhead if you use [`doctrine/migrations`](http://www.doctrine-project.org/projects/migrations.html)
like me, because in addition to writing (or generating) migrations, you need to keep the whole schema in a separate
file and up-to-date. Or you could just run the migrations directly! (I use `Zenify/DoctrineMigrations` package.
If you don't, you have to get or create the `Configuration` object on your own.)

```php
$container = $this->getContainer();

/** @var Zenify\DoctrineMigrations\Configuration\Configuration $migrationsConfig */
$migrationsConfig = $container->getByType(Zenify\DoctrineMigrations\Configuration\Configuration::class);
$migrationsConfig->__construct($container, $db);
$migrationsConfig->registerMigrationsFromDirectory($migrationsConfig->getMigrationsDirectory());
$migration = new Migration($migrationsConfig);

$migration->migrate($migrationsConfig->getLatestVersion());
```

The constructor magic is not absolutely necessary but it's handy not to pass the third argument (`$outputWriter`)
to disable the output. Otherwise, you get the migrations progress thrown right into your tests console. For. Every.
Single. Test. You don't want that.


## Filling it with data

If you have your test data in SQL files, you are already good to go (see above). But I'm still going to show you
a different approach using Doctrine's Data Fixtures. Well, not just yet. Let's define a simple entity to work with
in the first place:

```php
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="user_account", uniqueConstraints={
 *   @ORM\UniqueConstraint(columns={"email"})
 * })
 */
class User
{
	
	/**
	 * @ORM\Id()
	 * @ORM\Column(type="integer")
	 * @ORM\GeneratedValue()
	 * @var int
	 */
	private $id;

	/**
	 * @ORM\Column(type="string")
	 * @var string
	 */
	private $email;


	public function __construct($email)
	{
		$this->email = $email;
	}


	public function getEmail()
	{
		return $this->email;
	}

}
```

Now to the data fixtures. As you can read in its [docs/readme](https://github.com/doctrine/data-fixtures), the package
provides a way to load data into the database. The main advantage of fixtures is that they, as well as the whole
Doctrine ORM, abstract you from the database you use and let you work with data in terms of your domain model.
You don't need to write SQL queries with things like foreign key constraints or platform-specific syntax in consideration,
you just create a new instance of your entity and persist it through the EntityManager. Like this:

```php
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\Persistence\ObjectManager;

class UserFixture extends AbstractFixture
{

	/**
	 * @param ObjectManager $manager
	 */
	public function load(ObjectManager $manager)
	{
		$user = new User('me@jiripudil.cz');

		$manager->persist($user);
		$manager->flush();
	}

}
```

In the `setupDatabase` method, you only have to load those fixtures and execute them:

```php
use Doctrine\Common\DataFixtures as Fixtures;

$fixtures = [];
$fixtures = (new Fixtures\Loader())->loadFromDirectory(__DIR__ . '/../fixtures');
$executor = new Fixtures\Executor\ORMExecutor($container->getByType(EntityManager::class));
$executor->execute($fixtures, TRUE);
```


## Testing against the database

Now that we have everything set up, we can finally write a test case that uses the database and its test data!

```php
/**
 * @testCase
 */

use Kdyby\Doctrine\EntityManager;
use Tester\Assert;


require_once __DIR__ . '/../../bootstrap.php';


class UserTest extends Tester\TestCase
{

	use DatabaseSetup;


	public function testFetchUserByEmail()
	{
		$em = $this->getContainer()->getByType(EntityManager::class);
		$user = $em->getRepository(User::class)->findOneBy(['email' => 'me@jiripudil.cz']);

		Assert::type(User::class, $user);
		Assert::same('me@jiripudil.cz', $user->getEmail());
	}

}


(new UserTest())->run();
```


## Complete example ![](https://img.shields.io/travis/jiripudil/blog-db-testing.svg)

You can find all those bits of code put into a single whole showcase [on my Github](https://github.com/jiripudil/blog-db-testing)
and see the build [on Travis](https://travis-ci.org/jiripudil/blog-db-testing). It runs both on MySQL and PostgreSQL
and you can see that there are two sets of migrations, but the fixtures are shared between both database platforms.
It's also slightly extended as I've tried to keep the code examples in this post as short and concise as possible:

- the execution of migrations and fixtures is moved into separate methods,
- [fixtures are loaded via the DI container](https://github.com/jiripudil/blog-db-testing/blob/098ae5b043a58acea5d36f637264ad490206ec35/tests/DbTests/DatabaseSetup.php#L92-L96) so that they can [have dependencies](https://github.com/jiripudil/blog-db-testing/blob/098ae5b043a58acea5d36f637264ad490206ec35/tests/fixtures/UserFixture.php#L18),
- there are [test methods](https://github.com/jiripudil/blog-db-testing/blob/098ae5b043a58acea5d36f637264ad490206ec35/tests/DbTests/Entities/UserTest.phpt#L57-L72) to prove that each test method runs in its own context, with its own database (if you use the `@testCase` annotation of course),
- the test case [runs 50 times](https://github.com/jiripudil/blog-db-testing/blob/098ae5b043a58acea5d36f637264ad490206ec35/tests/DbTests/Entities/UserTest.phpt#L5), spawning 200 databases in total to provide a hint about the performace. I'm quite surprised that PostgreSQL is considerably slower than MySQL (see builds on [Travis](https://travis-ci.org/jiripudil/blog-db-testing)).

What about you? Do you test against a live database? Or are you going to now that you see it's this easy? Share your
thoughts in the comments section below.
