<?php
	$connection;

	$server = '127.0.0.1';
	$database = 'freshair_international';
	$user = 'root';
	$password = '';

	try
	{
		$connection = new PDO("mysql:host=$server;dbname=$database;charset=utf8", $user, $password);
	}
	catch (PDOException $e)
	{
		die();
	}
?>