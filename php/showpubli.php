<?php
session_start();
include 'bbdd.php';

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];


$post = "SELECT * FROM usuario us JOIN post po ON (po.idUsuario = us.userName) WHERE us.userName = '$user'";
$r2 = mysqli_query($conexio, $post);

while($fila = mysqli_fetch_assoc($r2)){
	$amigo2[] = Array('descripcion' => $fila['descripcion'],'lugar' => $fila['lugar'],'archivo' => "data:image/png;base64," . base64_encode($fila['archivo']),'idPost' => $fila['idPost'], 'username' => $fila['userName']);
	
}

foreach($amigo2 as $codigo => $ins){
	$todos2[] = "<publi><descripcion>".$ins['descripcion']."</descripcion><lugar>".$ins['lugar']."</lugar><archivo>".$ins['archivo']."</archivo><idPost>".$ins['idPost']."</idPost><user>".$ins['username']."</user></publi>";
}

echo "<fotos>".implode("\n", $todos2). "</fotos>";

?>