<?php

	include_once('db.connection.php');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	if($request->submit){
		switch ($request->type) {
			case 'aircrafts':
				getAircraftList($connection);
				break;
			
			case 'destinations':
				getDestinationList($connection);
				break;

			case 'airports':
				getAirportsList($connection);
				break;

			case 'categories':
				getPriceCategoryList($connection);
				break;
			case 'flightSchedule':
				getFlightSchedule($request->aircraft_id, $request->port_loc, $connection);
				break;
			default:
				return false;
				break;
		}
	};

	function getAircraftList($connection)
		{
			$data = array();			
			$statement = $connection->prepare('call GetAircrafts()');
			$statement->execute();

			foreach ($statement->fetchAll(PDO::FETCH_CLASS) as $row)
			{
				$data[] = $row;
			}
			printf(json_encode($data));
		}

	function getDestinationList($connection)
		{
			$data = array();			
			$statement = $connection->prepare('call GetDestinations()');
			$statement->execute();

			foreach ($statement->fetchAll(PDO::FETCH_CLASS) as $row)
			{
				$data[] = $row;
			}

			echo json_encode($data);

		}

	function getAirportsList($connection)
		{
			$data = array();
			
			$statement = $connection->prepare('call GetAirports()');
			$statement->execute();

			foreach ($statement->fetchAll(PDO::FETCH_CLASS) as $row)
			{
				$data[] = $row;
			}
			echo json_encode($data);
		}

	function getPriceCategoryList($connection)
		{
			$data = array();
			
			$statement = $connection->prepare('call GetPriceCategories()');
			
			$statement->execute();

			foreach ($statement->fetchAll(PDO::FETCH_CLASS) as $row)
			{
				$data[] = $row;
			}
			echo json_encode($data);
		}

	function getFlightSchedule($id, $oa, $connection)
		{
			$data = array();
			
			$statement = $connection->prepare('call AircraftSchedule(?,?)');
			$statement->bindParam(1, $id, PDO::PARAM_STR,6);
			$statement->bindParam(2, $oa, PDO::PARAM_STR,3);
			$statement->execute();

			foreach ($statement->fetchAll(PDO::FETCH_CLASS) as $row)
			{
				$data[] = $row;
			}
			echo json_encode($data);
		}
?>