<?php
include 'bbdd.php';
session_start();

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];




$sql2 = "SELECT * FROM chat WHERE idEmisor = '$user' AND idRemitente = '$datos' OR idEmisor = '$datos' AND idRemitente = '$user'";
$r2 = mysqli_query($conexio, $sql2);


while($fila = mysqli_fetch_assoc($r2)){
	$amigo2[] = Array('idChatA' => $fila['idChat'],'idEmisorA' => $fila['idEmisor'],'idRemitenteA' => $fila['idRemitente'],'mensajeA' => $fila['mensaje']);
}


foreach($amigo2 as $codigo => $ins2){
	$todos2[] = "<msg><idChatA>".$ins2['idChatA']."</idChatA><idEmisorA>".$ins2['idEmisorA']."</idEmisorA><idRemitenteA>".$ins2['idRemitenteA']."</idRemitenteA><mensajeA>".$ins2['mensajeA']."</mensajeA></msg>";
}

echo "<mensajes>\n".implode("\n", $todos2). "<usuario>".$user."</usuario></mensajes>";

?>