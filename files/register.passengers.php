<?php
	include_once('db.connection.php');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	if($request->submit){
		Book($request->booking_flight_num,$request->booking_flight_date,
			$request->booking_class_id,$request->booking_card_name,
			$request->booking_card_issue,$request->booking_passengers,$connection);
	};

	function Book($flightNumber,$flightDate,$classID,$cardHoldersName,$cardIssuer,$passengerInfo,$connection)
	{
		$statement = $connection->prepare('call FlightBooker(?,?,?,?,?,?)');
			
		$statement->bindParam(1, $flightNumber, PDO::PARAM_STR);
		$statement->bindParam(2, $flightDate, PDO::PARAM_STR);
		$statement->bindParam(3, $classID, PDO::PARAM_INT);
		$statement->bindParam(4, $cardHoldersName, PDO::PARAM_STR);
		$statement->bindParam(5, $cardIssuer, PDO::PARAM_STr);
		$statement->bindParam(6, $passengerInfo, PDO::PARAM_STR);
		
		$statement->execute();
	}
?>