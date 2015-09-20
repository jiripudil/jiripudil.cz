<?php

/**
 * TEST: Authenticator
 * @testCase
 */

namespace jiripudilTests\Security;

use jiripudil\Entities\User\Queries\UserByEmailQuery;
use jiripudil\Entities\User\User;
use jiripudil\Security\Authenticator;
use jiripudil\Security\IHasher;
use jiripudil\Security\NativeHasher;
use Kdyby\Doctrine\EntityDao;
use Kdyby\Doctrine\EntityManager;
use Kdyby\Doctrine\EntityRepository;
use Mockery;
use Mockery\MockInterface;
use Nette\Security\AuthenticationException;
use Nette\Security\IAuthenticator;
use Tester;
use Tester\Assert;

require_once __DIR__ . '/../../bootstrap.php';


class AuthenticatorTest extends Tester\TestCase
{

	public function testSuccess()
	{
		$hasher = Mockery::mock(IHasher::class);
		$hasher->shouldReceive('hash')
			->with('originalPassword')
			->andReturn('foo');
		$hasher->shouldReceive('verify')
			->with('verifiedPassword', 'foo')
			->andReturn(TRUE);

		$repository = Mockery::mock(EntityRepository::class);
		$repository->shouldReceive('findOneBy')
			->with(['email' => 'john.doe@example.com'])
			->andReturn($user = new User('john.doe@example.com', 'originalPassword', $hasher));

		$em = Mockery::mock(EntityManager::class);
		$em->shouldReceive('getRepository')
			->with(User::class)
			->andReturn($repository);

		$authenticator = new Authenticator($em, $hasher);

		$identity = $authenticator->authenticate('john.doe@example.com', 'verifiedPassword');
		Assert::same($user, $identity);
	}


	public function testInvalidPassword()
	{
		$hasher = Mockery::mock(IHasher::class);
		$hasher->shouldReceive('hash')
			->with('originalPassword')
			->andReturn('foo');
		$hasher->shouldReceive('verify')
			->with('verifiedPassword', 'foo')
			->andReturn(FALSE);

		$repository = Mockery::mock(EntityRepository::class);
		$repository->shouldReceive('findOneBy')
			->with(['email' => 'john.doe@example.com'])
			->andReturn($user = new User('john.doe@example.com', 'originalPassword', $hasher));

		$em = Mockery::mock(EntityManager::class);
		$em->shouldReceive('getRepository')
			->with(User::class)
			->andReturn($repository);

		$authenticator = new Authenticator($em, $hasher);

		Assert::throws(function () use ($authenticator) {
			$authenticator->authenticate('john.doe@example.com', 'verifiedPassword');
		}, AuthenticationException::class, NULL, IAuthenticator::INVALID_CREDENTIAL);
	}


	public function testNoMatchingEmail()
	{
		$hasher = Mockery::mock(IHasher::class);
		$hasher->shouldReceive('hash')
			->with('originalPassword')
			->andReturn('foo');
		$hasher->shouldReceive('verify')
			->never();

		$repository = Mockery::mock(EntityRepository::class);
		$repository->shouldReceive('findOneBy')
			->with(['email' => 'john.doe@example.com'])
			->andReturnNull();

		$em = Mockery::mock(EntityManager::class);
		$em->shouldReceive('getRepository')
			->with(User::class)
			->andReturn($repository);

		$authenticator = new Authenticator($em, $hasher);

		Assert::throws(function () use ($authenticator) {
			$authenticator->authenticate('john.doe@example.com', 'verifiedPassword');
		}, AuthenticationException::class, NULL, IAuthenticator::IDENTITY_NOT_FOUND);
	}


	protected function tearDown()
	{
		Mockery::close();
	}

}


(new AuthenticatorTest())->run();
