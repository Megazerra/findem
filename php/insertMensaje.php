<?php

include 'bbdd.php';
session_start();

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];



$sql = "INSERT INTO chat (idEmisor, idRemitente, mensaje) VALUES ('$user','$separado[0]', '$separado[1]')";
$r = mysqli_query($conexio, $sql);
echo $sql;


?>