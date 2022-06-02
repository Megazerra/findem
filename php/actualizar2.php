<?php
session_start();
include 'bbdd.php';
$user = $_SESSION['username'];
// $friend = $_POST['idamigo'];
$datos = trim($_POST["i"]);


// $sql = "SELECT COUNT(*) FROM amigo WHERE idUsuario = '$user' AND idUsuarioAmigo = '$friend'";
// $r = mysqli_query($conexio, $sql);

$update = "DELETE FROM amigo WHERE idUsuario = '$user' AND idUsuarioAmigo = '$datos'";
$r2 = mysqli_query($conexio, $update);

$update2 = "DELETE FROM amigo WHERE idUsuario = '$datos' AND idUsuarioAmigo = '$user'";
$r22 = mysqli_query($conexio, $update2);
echo $update2;



?>