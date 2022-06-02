<?php
session_start();
include 'bbdd.php';
$user = $_SESSION['username'];
$datos = trim($_POST["i"]);
$separado = explode("-", $datos);


$insert = "INSERT INTO valoracion (titulo, nota, descripcion, idUsuario, idDiscoteca) VALUES ('$separado[0]', '$separado[1]', '$separado[2]', '$user', '$separado[3]')";
$r = mysqli_query($conexio, $insert);
echo $insert;
?>