<?php
session_start();
include 'bbdd.php';
$user = $_SESSION['username'];
$friend = $_POST['idamigo'];
// $datos = trim($_POST["i"]);


$sql = "SELECT COUNT(*) FROM amigo WHERE idUsuario = '$user' AND idUsuarioAmigo = '$friend'";
$r = mysqli_query($conexio, $sql);

$update = "UPDATE amigo SET pendiente = '1' WHERE idUsuario = '$user'";
$r2 = mysqli_query($conexio, $update);



?>