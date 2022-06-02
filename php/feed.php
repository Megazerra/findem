<?php
session_start();
include 'bbdd.php';

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];

$select = "SELECT COUNT(*) FROM post po JOIN usuario us ON (us.userName = po.idUsuario) WHERE idUsuario IN (SELECT idUsuarioAmigo FROM amigo WHERE idUsuario = '$user')";
$r2 = mysqli_query($conexio, $select);
while($fila = mysqli_fetch_assoc($r2)){
	$cont = $fila['COUNT(*)'];
}

$i = 0;
if($cont == 0){
	echo "0";
}else if($cont > 0){

	
	


	$post = "SELECT * FROM post po JOIN usuario us ON (us.userName = po.idUsuario) WHERE idUsuario IN (SELECT idUsuarioAmigo FROM amigo WHERE idUsuario = '$user')";
	$r2 = mysqli_query($conexio, $post);
	
	
	
	while($fila = mysqli_fetch_assoc($r2)){
		$amigo2[] = Array('descripcion' => $fila['descripcion'],'lugar' => $fila['lugar'],'archivo' => "data:image/png;base64," . base64_encode($fila['archivo']),'idPost' => $fila['idPost'],'idUsuario' => $fila['idUsuario'], 'foto' => "data:image/png;base64," . base64_encode($fila['foto']), 'likes' => $fila['likes']);
		
	}
	
	foreach($amigo2 as $codigo => $ins){
		$todos2[] = "<publi><descripcion>".$ins['descripcion']."</descripcion><lugar>".$ins['lugar']."</lugar><archivo>".$ins['archivo']."</archivo><idPost>".$ins['idPost']."</idPost><idUsuario>".$ins['idUsuario']."</idUsuario><foto>".$ins['foto']."</foto><likes>".$ins['likes']."</likes></publi>";
	}
	// echo sizeof($todos2);

	$selectxunga = "SELECT * FROM post po JOIN usuario us ON (us.userName = po.idUsuario) WHERE idUsuario IN (SELECT idUsuarioAmigo FROM amigo WHERE idUsuario = '$user')";
	$result = mysqli_query($conexio, $selectxunga);

		while($fila9 = mysqli_fetch_assoc($result)){

			$select = "SELECT count(*) from likes where idPost = '$fila9[idPost]' AND idUsuario = '$user'";
			$r22 = mysqli_query($conexio, $select);
			while($fila10 = mysqli_fetch_assoc($r22)){
				
			
				$todos2[$i] = $todos2[$i]."<realizado>".$fila10['count(*)']."</realizado>";
				
				$i++;
			} 
		}

	echo "<fotos>".implode("\n", $todos2). "</fotos>";
}


?>