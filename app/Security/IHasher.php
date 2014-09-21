<?php

namespace jiripudil\Security;


interface IHasher
{

	/**
	 * @param string $password
	 * @param array $options
	 * @return string
	 */
	function hash($password, array $options = []);


	/**
	 * @param string $password
	 * @param string $hash
	 * @return bool
	 */
	function verify($password, $hash);


	/**
	 * @param string $hash
	 * @param array $options
	 * @return bool
	 */
	function needsRehash($hash, array $options = []);

}
