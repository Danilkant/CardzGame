<?php
	include_once('db.connection.php');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	if($request->submit){
		switch ($request->ac_type) {
			case 'create':
				newAircraft($request->ac_id,$request->ac_type,$request->ac_name,$request->ac_max_seats,$request->ac_seats_row,$connection);
				break;
			
			case 'update':
				updateAircraft($request->ac_id,$request->ac_type,$request->ac_name,$connection);
				break;

			case 'delete':
				deleteAircraft($request->ac_id,$connection);
				break;

			default:
				return false;
				break;
		}
	};

	function newAircraft($aircraftID,$aircraftType,$maxPassengers,$aircraftName,$seatsRow,$connection)
	{
		$statement = $connection->prepare('call CreateAircraft(?,?,?,?,?)');
			
		$statement->bindParam(1, $aircraftID, PDO::PARAM_STR,6);
		$statement->bindParam(2, $aircraftType, PDO::PARAM_STR,35);
		$statement->bindParam(3, $aircraftName, PDO::PARAM_STR,55);
		$statement->bindParam(4, $maxPassengers, PDO::PARAM_INT);
		$statement->bindParam(5, $seatsRow, PDO::PARAM_INT);
		
		$statement->execute();
	}

	function updateAircraft($aircraftID,$aircraftType,$aircraftName,$connection)
	{
		$statement = $connection->prepare('call updateAircraft(?,?,?)');
			
		$statement->bindParam(1, $aircraftID, PDO::PARAM_STR,6);
		$statement->bindParam(2, $aircraftType, PDO::PARAM_STR,35);
		$statement->bindParam(3, $aircraftName, PDO::PARAM_STR,55);
		
		$statement->execute();
	}

	function deleteAircraft($aircraftID,$connection)
	{
		$statement = $connection->prepare('call deleteAircraft(?)');
			
		$statement->bindParam(1, $aircraftID, PDO::PARAM_STR,6);
		
		$statement->execute();
	}
?>