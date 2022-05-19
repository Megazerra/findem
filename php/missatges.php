<?php
include 'bbdd.php';
session_start();

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];
// echo "SESSION: ".$_SESSION['username'];

$sql = "SELECT * FROM chat WHERE idEmisor = '$user')";
$r = mysqli_query($conexio, $sql);


while($fila = mysqli_fetch_assoc($r)){
	$amigo[] = Array('idEmisor' => $fila['idEmisor'],'idRemitente' => $fila['idRemitente'],'mensaje' => $fila['mensaje']);
}


foreach($amigo as $codigo => $ins){
	$todos[] = "<idEmisor>".$ins['idEmisor']."</idEmisor><idRemitente>".$ins['idRemitente']."</idRemitente><mensaje>".$ins['mensaje']."</mensaje>";
}


echo "<maps>\n".implode("\n", $todos). "</maps>";
?>