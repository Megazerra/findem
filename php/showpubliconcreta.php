<?php

include 'bbdd.php';
session_start();

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];




$post = "SELECT * FROM usuario us JOIN post po ON (po.idUsuario = us.userName) WHERE us.userName = '$separado[1]' AND  idPost = '$separado[0]'";
$r2 = mysqli_query($conexio, $post);


$s = "SELECT COUNT(*) FROM likes WHERE idUsuario = '$user' AND idPost = '$datos'";
$r3 = mysqli_query($conexio, $s);




while($fila = mysqli_fetch_assoc($r2)){
	$amigo2[] = Array('descripcion' => $fila['descripcion'],'lugar' => $fila['lugar'],'archivo' => "data:image/png;base64," . base64_encode($fila['archivo']),'idPost' => $fila['idPost']);
	
}

while($fila2 = mysqli_fetch_assoc($r3)){
	$count = $fila2['COUNT(*)'];

}

$ss = "SELECT COUNT(*) FROM likes WHERE idPost = '$separado[0]'";
$r4 = mysqli_query($conexio, $ss);

while($fila3 = mysqli_fetch_assoc($r4)){
	$con = $fila3['COUNT(*)'];

}


foreach($amigo2 as $codigo => $ins){
	$todos2[] = "<publi><descripcion>".$ins['descripcion']."</descripcion><lugar>".$ins['lugar']."</lugar><archivo>".$ins['archivo']."</archivo><idPost>".$ins['idPost']."</idPost><like>".$count."</like><total>".$con."</total></publi>";
}

echo "<fotos>".implode("\n", $todos2). "</fotos>";

?>