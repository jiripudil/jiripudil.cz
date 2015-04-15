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
use Nette\Security\AuthenticationException;
use Tester;
use Tester\Assert;

require_once __DIR__ . '/../../bootstrap.php';


class AuthenticatorTest extends Tester\TestCase
{

	public function testSuccess()
	{
		$dao = \Mockery::mock(EntityDao::class);
		$dao->shouldReceive('fetchOne')
			->with(\Mockery::type(UserByEmailQuery::class))
			->andReturn($user = new User('john.doe@example.com', 'originalPassword'));

		$em = \Mockery::mock(EntityManager::class);
		$em->shouldReceive('getRepository')
			->with(User::class)
			->andReturn($dao);

		$hasher = \Mockery::mock(IHasher::class);
		$hasher->shouldReceive('verify')
			->with('password', 'originalPassword')
			->andReturn(TRUE);

		$authenticator = new Authenticator($em, $hasher);

		$identity = $authenticator->authenticate('john.doe@example.com', 'password');
		Assert::same($user, $identity);
	}


	public function testInvalidPassword()
	{
		$dao = \Mockery::mock(EntityDao::class);
		$dao->shouldReceive('fetchOne')
			->with(\Mockery::type(UserByEmailQuery::class))
			->andReturn(new User('john.doe@example.com', 'originalPassword'));

		$em = \Mockery::mock(EntityManager::class);
		$em->shouldReceive('getRepository')
			->with(User::class)
			->andReturn($dao);

		$hasher = \Mockery::mock(IHasher::class);
		$hasher->shouldReceive('verify')
			->with('password', 'originalPassword')
			->andReturn(FALSE);

		$authenticator = new Authenticator($em, $hasher);

		Assert::throws(function () use ($authenticator) {
			$authenticator->authenticate('john.doe@example.com', 'password');
		}, AuthenticationException::class);
	}


	public function testNoMatchingEmail()
	{
		$dao = \Mockery::mock(EntityDao::class);
		$dao->shouldReceive('fetchOne')
			->with(\Mockery::type(UserByEmailQuery::class))
			->andReturn(NULL);

		$em = \Mockery::mock(EntityManager::class);
		$em->shouldReceive('getRepository')
			->with(User::class)
			->andReturn($dao);

		$hasher = \Mockery::mock(IHasher::class);

		$authenticator = new Authenticator($em, $hasher);

		Assert::throws(function () use ($authenticator) {
			$authenticator->authenticate('john.doe@example.com', 'password');
		}, AuthenticationException::class);
	}


	protected function tearDown()
	{
		\Mockery::close();
	}

}


(new AuthenticatorTest())->run();
