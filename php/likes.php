<?php
session_start();
include 'bbdd.php';

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];


	$select = "SELECT COUNT(*) FROM likes WHERE idUsuario = '$user' and idPost = '$separado[0]'";
	$r2 = mysqli_query($conexio, $select);
	
	while($fila = mysqli_fetch_assoc($r2)){
		$id = $fila['COUNT(*)'];
	}


	$select2 = "SELECT COUNT(*) FROM likes WHERE idPost = '$separado[0]'";
	$r22 = mysqli_query($conexio, $select);
	
	while($fila = mysqli_fetch_assoc($r22)){
		$total = $fila['COUNT(*)'];
	}


	if($id == 0){
		$insert = "INSERT INTO likes (idUsuario, idPost) VALUES ('$user', '$separado[0]')";
		$r = mysqli_query($conexio, $insert);
	

		$estado = "in";
	}else if($id == 1){
		$select = "SELECT idLike FROM likes WHERE idUsuario = '$user' and idPost = '$separado[0]'";
		$r2 = mysqli_query($conexio, $select);


		while($fila = mysqli_fetch_assoc($r2)){
			$id2 = $fila['idLike'];
		}

		$delete = "DELETE FROM likes WHERE idLike = '$id2'";
		$r = mysqli_query($conexio, $delete);
	
		$estado = "out";

	}
	
	
	echo $estado."-".$total;
	
	




?>