<?php
	include_once('db.connection.php');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	if($request->submit){
		switch ($request->crud_type) {
			case 'create':
				newCategories($request->ct_name,$request->ct_from,$request->ct_to,$request->ct_price,$request->ct_refund,$request->ct_restrict,$request->ct_class_id,$connection);
				break;
			
			case 'update':
				updateCategories($request->ct_old_name,$request->ct_name,$request->ct_from,$request->ct_to,$request->ct_price,$request->ct_refund,$request->ct_restrict,$request->ct_class_id,$connection);
				break;

			case 'delete':
				deleteCategories($request->ct_name,$connection);
				break;

			default:
				return false;
				break;
		}
	};

	function newCategories($categoryName,$categoryFrom,$categoryTo,$categoryPrice,$categoryRefund,$categoryRestrict,$categoryClassID,$connection)
	{
		$statement = $connection->prepare('call CreatePriceCategory(?,?,?,?,?,?,?)');
			
		$statement->bindParam(1, $categoryName, PDO::PARAM_STR);
		$statement->bindParam(2, $categoryFrom, PDO::PARAM_STR);
		$statement->bindParam(3, $categoryTo, PDO::PARAM_STR);
		$statement->bindParam(4, $categoryPrice, PDO::PARAM_INT);
		$statement->bindParam(5, $categoryRefund, PDO::PARAM_INT);
		$statement->bindParam(6, $categoryRestrict, PDO::PARAM_INT);
		$statement->bindParam(7, $categoryClassID, PDO::PARAM_INT);
		
		$statement->execute();
	}

	function updateCategories($categoryOldName,$categoryName,$categoryFrom,$categoryTo,$categoryPrice,$categoryRefund,$categoryRestrict,$categoryClassID,$connection)
	{
		$statement = $connection->prepare('call UpdatePriceCategory(?,?,?,?,?,?,?,?)');
			
		$statement->bindParam(1, $categoryOldName, PDO::PARAM_STR);
		$statement->bindParam(2, $categoryName, PDO::PARAM_STR);
		$statement->bindParam(3, $categoryFrom, PDO::PARAM_STR);
		$statement->bindParam(4, $categoryTo, PDO::PARAM_STR);
		$statement->bindParam(5, $categoryPrice, PDO::PARAM_INT);
		$statement->bindParam(6, $categoryRefund, PDO::PARAM_INT);
		$statement->bindParam(7, $categoryRestrict, PDO::PARAM_INT);
		$statement->bindParam(8, $categoryClassID, PDO::PARAM_INT);
		
		$statement->execute();
	}

	function deleteCategories($categoryName,$connection)
	{
		$statement = $connection->prepare('call DeletePriceCategory(?)');
			
		$statement->bindParam(1, $categoryName, PDO::PARAM_STR);
		
		$statement->execute();
	}
?>