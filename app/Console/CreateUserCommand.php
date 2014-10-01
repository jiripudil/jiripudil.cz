<?php

namespace jiripudil\Console;

use jiripudil\Model\User\Queries\UserByEmailQuery;
use jiripudil\Model\User\User;
use jiripudil\Security\IHasher;
use Kdyby\Doctrine\EntityManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;


class CreateUserCommand extends Command
{

	/** @var EntityManager */
	private $em;

	/** @var IHasher */
	private $hasher;


	public function __construct(EntityManager $em, IHasher $hasher)
	{
		parent::__construct();
		$this->em = $em;
		$this->hasher = $hasher;
	}


	protected function configure()
	{
		$this->setName('jiripudil:create-user')
			->addArgument('email', InputArgument::REQUIRED, 'E-mail address');
	}


	protected function execute(InputInterface $input, OutputInterface $output)
	{
		// 1) exit with error if e-mail is already taken
		$user = $this->em->getDao(User::class)->fetchOne(new UserByEmailQuery($email = $input->getArgument('email')));
		if ($user !== NULL) {
			$output->writeln('<error>A user with given e-mail already exists.</error>');
			exit(1);
		}

		// 2) prompt for password
		$question = (new Question('Enter the desired password of the new user: '))
			->setHidden(TRUE)
			->setHiddenFallback(FALSE)
			->setValidator(function ($value) {
				if (trim($value) === '') {
					throw new \InvalidArgumentException('The password cannot be empty!');
				}

				return $value;
			});
		$helper = $this->getHelper('question');
		$password = $helper->ask($input, $output, $question);

		// 3) save
		$user = new User($email, $this->hasher->hash($password));
		$this->em->persist($user);
		$this->em->flush();

		// 4) done
		$output->writeln('<info>User successfully created.</info>');
	}

}
