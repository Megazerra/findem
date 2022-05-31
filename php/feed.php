<?php

include 'bbdd.php';
session_start();

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];


$post = "SELECT * FROM post po JOIN usuario us ON (us.userName = po.idUsuario) WHERE idUsuario IN (SELECT idUsuarioAmigo FROM amigo WHERE idUsuario = '$user')";
$r2 = mysqli_query($conexio, $post);

while($fila = mysqli_fetch_assoc($r2)){
	$amigo2[] = Array('descripcion' => $fila['descripcion'],'lugar' => $fila['lugar'],'archivo' => "data:image/png;base64," . base64_encode($fila['archivo']),'idPost' => $fila['idPost'],'idUsuario' => $fila['idUsuario'], 'foto' => "data:image/png;base64," . base64_encode($fila['foto']));
	
}

foreach($amigo2 as $codigo => $ins){
	$todos2[] = "<publi><descripcion>".$ins['descripcion']."</descripcion><lugar>".$ins['lugar']."</lugar><archivo>".$ins['archivo']."</archivo><idPost>".$ins['idPost']."</idPost><idUsuario>".$ins['idUsuario']."</idUsuario><foto>".$ins['foto']."</foto></publi>";
}

echo "<fotos>".implode("\n", $todos2). "</fotos>";

?>