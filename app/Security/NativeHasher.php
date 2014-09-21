<?php

namespace jiripudil\Security;


class NativeHasher implements IHasher
{

	/**
	 * @param string $password
	 * @param array $options
	 * @return string
	 */
	function hash($password, array $options = [])
	{
		return password_hash($password, PASSWORD_BCRYPT, $options);
	}


	/**
	 * @param string $password
	 * @param string $hash
	 * @return bool
	 */
	function verify($password, $hash)
	{
		return password_verify($password, $hash);
	}


	/**
	 * @param string $hash
	 * @param array $options
	 * @return bool
	 */
	function needsRehash($hash, array $options = [])
	{
		return password_needs_rehash($hash, PASSWORD_BCRYPT, $options);
	}

}
