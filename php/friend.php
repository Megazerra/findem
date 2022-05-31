<?php
include 'bbdd.php';
session_start();
$user = $_SESSION['username'];
$friend = $_POST['idamigo'];
// $datos = trim($_POST["i"]);


$sql = "SELECT COUNT(*) FROM amigo WHERE idUsuario = '$user' AND idUsuarioAmigo = '$friend'";
$r = mysqli_query($conexio, $sql);

$insert = "INSERT INTO amigo (idUsuario, idUsuarioAmigo, pendiente) VALUES ('$user','$friend', '1')";
$r2 = mysqli_query($conexio, $insert);

$insert = "INSERT INTO amigo (idUsuario, idUsuarioAmigo, pendiente) VALUES ('$friend','$user', '0')";
$r2 = mysqli_query($conexio, $insert);

?>