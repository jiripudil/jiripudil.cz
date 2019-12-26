---
legacyId: 6
title: Filtering data by user input with Kdyby/Doctrine
slug: filtering-data-by-user-input-with-kdyby-doctrine
datetime: 2015-06-19T16:20:00Z
draft: false
cupsOfCoffee: 4
perex: Listing data is essentially the most crucial part of websites. Be it products, articles, photos or whatnots, we usually need to provide the user the way to filter and/or sort the data by some preset parameters. I'll show you how to encapsulate such filtering within an object, build a user interface (in other words, a form) upon it, and use it with Kdyby/Doctrine's query objects to actually filter the data on the database level.
tags:
  - components
  - doctrine
  - nettefw
  - php
---
## Filtering the output

Let's say we want to list photos and filter them by their author, genre and some EXIF data (let's just use shutter
speed for the sake of demonstration), and also provide two ways to sort them, by the date they'd been taken or by
their user ranking. The filter itself is nothing more than a simple value object:

```php
<?php

namespace App\Gallery;

use App;


class PhotoFilter
{

	const SORT_BY_DATE = 'newest';
	const SORT_BY_RANKING = 'best';

	/** @var App\Entities\User|NULL */
	private $author;

	/** @var App\Entities\Genre|NULL */
	private $genre;

	/** @var string */
	private $shutterSpeed;

	/** @var string */
	private $sort = self::SORT_BY_DATE;


	// ... getters and setters, possibly with input validation

}
```

As for applying the filter to the database query, I took inspiration from Filip Procházka's
[query objects](https://github.com/Kdyby/Doctrine/blob/master/docs/en/resultset.md#queryobject), especially from their
fluent, self-explaining interfaces, like this:

```php
$query = (new App\Gallery\PhotoQuery())
	->byAuthor($author)
	->inGenre($genre)
	->sortByRanking();
$data = $repository->fetch($query);
```


With filter objects like the one above that encapsulate the actual applied filters, it can become even simpler:

```php
$query = (new App\Gallery\PhotoQuery())->filtered($filter);
$data = $repository->fetch($query);
```

And the whole filtering logic is subtly hidden where it belongs, in the query object itself:

```php
<?php

namespace App\Gallery;

use Doctrine;
use Kdyby;


class PhotoQuery extends Kdyby\Doctrine\QueryObject
{

	/** @var callable[] */
	private $filters = [];


	public function filtered(PhotoFilter $filter)
	{
		$this->filters[] = function (Doctrine\ORM\QueryBuilder $builder) use ($filter) {
			if ($author = $filter->getAuthor()) {
				$builder->andWhere('p.author = :author', $author);
			}

			if ($genre = $filter->getGenre()) {
				$builder->andWhere('p.genre = :genre', $genre);
			}

			if ($shutterSpeed = $filter->getShutterSpeed()) {
				$builder->andWhere('p.shutterSpeed = :shutterSpeed', $shutterSpeed);
			}

			switch ($filter->getSort()) {
				case $filter::SORT_BY_RANKING:
					$builder->innerJoin('p.rankings', 'r')
						->orderBy('AVG(r.ranking)', 'DESC')
						->groupBy('p.id');
					break;

				case $filter::SORT_BY_DATE:
				default:
					$builder->orderBy('p.date', 'DESC');
			}
		};

		return $this;
	}


	protected function doCreateQuery(Kdyby\Persistence\Queryable $repository)
	{
		$qb = $repository->createQueryBuilder('p')
			->select('p');

		foreach ($this->filters as $filter) {
			call_user_func($filter, $qb);
		}

		return $qb;
	}

}
```


## Getting the input

We are now able to filter the photos in an elegant way, but the users have yet no means to tell us what filters
they'd like to apply. That's where a Nette's component system kicks in. Three key things are going on there:

- Persistent parameters (`@persistent`-annotated public properties) ensure that the filter settings are preserved
    across different requests to the photos listing (e.g. pagination, etc.).
- In `attached()` method, i.e. after the component is attached to the presenter, we can access the values of the
    parameters and both set up the filter object and set the default values for the filter form. Which leads me to:
- The component has another component in it, which is the actual filter form. It's very straight-forward and only
    does redirect after submission, setting the filter parameters to values chosen by the user.

```php
<?php

namespace App\FrontModule\Components;

use App;
use Kdyby;
use Nette;


class PhotoFilterForm extends Nette\Application\UI\Control
{
	/** @var int|NULL @persistent */
	public $author;

	/** @var int|NULL @persistent */
	public $genre;

	/** @var string|NULL @persistent */
	public $shutterSpeed;

	/** @var string @persistent */
	public $sort;

	/** @var App\Gallery\PhotoFilter */
	private $filter;

	/** @var Kdyby\Doctrine\EntityManager */
	private $em;


	public function __construct(Kdyby\Doctrine\EntityManager $em)
	{
		$this->em = $em;
	}


	protected function attached($parent)
	{
		parent::attached($parent);

		if ($parent instanceof Nette\Application\IPresenter) {
			$this->filter = new App\Gallery\PhotoFilter();

			if ($this->author !== NULL) {
				$this['filterForm-author']->setDefaultValue($this->author);
				$this->filter->setAuthor($this->em->find(App\Entities\User::class, $this->author));
			}

			if ($this->genre !== NULL) {
				$this['filterForm-genre']->setDefaultValue($this->genre);
				$this->filter->setGenre($this->em->find(App\Entities\Genre::class, $this->genre));
			}

			if ($this->shutterSpeed !== NULL) {
				$this['filterForm-shutterSpeed']->setDefaultValue($this->shutterSpeed);
				$this->filter->setShutterSpeed($this->shutterSpeed);
			}

			$this['filterForm-sort']->setDefaultValue($this->sort);
			$this->filter->setSort($this->sort);
		}
	}


	public function getFilter()
	{
		return $this->filter;
	}


	protected function createComponentFilterForm()
	{
		$form = new Nette\Application\UI\Form();

		$users = $this->em->getRepository(App\Entities\User::class)
			->fetchPairs([], 'name', ['name' => 'ASC'], 'id');
		$form->addSelect('author', 'Author', $users);

		$genres = $this->em->getRepository(App\Entities\Genre::class)
			->fetchPairs([], 'name', ['name' => 'ASC'], 'id');
		$form->addSelect('genre', 'Genre', $genres);

		$form->addText('shutterSpeed', 'Shutter speed');

		$form->addRadioList('sort', 'Sort by', [
			App\Gallery\PhotoFilter::SORT_BY_DATE    => 'date taken',
			App\Gallery\PhotoFilter::SORT_BY_RANKING => 'ranking',
		]);

		$form->addSubmit('filter', 'Filtrovat');

		$form->onSuccess[] = function ($_, $values) {
			$this->redirect('this', [
				'author'       => $values->author,
				'genre'        => $values->genre,
				'shutterSpeed' => $values->shutterSpeed,
				'sort'         => $values->sort,
			]);
		};

		return $form;
	}


	public function render()
	{
		$this['filterForm']->render();
	}
}


interface IPhotoFilterFormFactory
{
	/** @return PhotoFilterForm */
	function create();
}
```

There's also an interface for a factory that Nette generates for us, so don't forget to register it in the config:

```yaml
services:
    - App\FrontModule\Components\IPhotoFilterFormFactory
```

Look how neat and tidy the presenter is! It only fetches the filter from the component and provides it to the newly
created query object, which is in turn passed to Kdyby/Doctrine's repository:

```php
<?php

namespace App\FrontModule\Presenters;

use App;
use Kdyby;
use Nette;


class GalleryPresenter extends Nette\Application\UI\Presenter
{

	private $em;
	private $filterFormFactory;


	public function __construct(
		Doctrine\ORM\EntityManager $em,
		App\FrontModule\Components\IPhotoFilterFormFactory $filterFormFactory
	)
	{
		$this->em = $em;
		$this->filterFormFactory = $filterFormFactory;
	}


	public function renderDefault()
	{
		$query = (new App\Gallery\PhotoQuery())
			->filtered($this['filter']->getFilter());
		$this->template->photos = $this->em->getRepository(App\Gallery\Photo::class)->fetch($query);
	}


	protected function createComponentFilter()
	{
		return $this->filterFormFactory->create();
	}

}
```

So this is how I provide users a way to filter data. I've used this approach on several projects already and it suits
me just fine. How about you? Share your thoughts and ideas in the discussion below :)
