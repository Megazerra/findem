<?php

include 'bbdd.php';
session_start();

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];


$post = "SELECT * FROM listaUsuario li JOIN usuario us ON(us.userName =  li.idUsuario) where idLista = '$datos'";
$r2 = mysqli_query($conexio, $post);

while($fila = mysqli_fetch_assoc($r2)){
	$amigo2[] = Array('username' => $fila['userName'],'foto' => "data:image/png;base64," . base64_encode($fila['foto']));
	
}

foreach($amigo2 as $codigo => $ins){
	$todos2[] = "<participante><username>".$ins['username']."</username><foto>".$ins['foto']."</foto></participante>";
}

echo "<participantes>".implode("\n", $todos2). "</participantes>";

?>