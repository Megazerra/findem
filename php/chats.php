<?php
include 'bbdd.php';
session_start();

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];
echo "SESSION: ".$_SESSION['username'];
$sql = "SELECT * FROM usuario WHERE userName = '$user'";
$r = mysqli_query($conexio, $sql);
echo $sql;

while($fila = mysqli_fetch_assoc($r)){
	echo $fila['nombre'];
	echo $fila['apellido'];
	echo $fila['userName'];
}
?>