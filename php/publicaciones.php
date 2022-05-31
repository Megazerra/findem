<?php
session_start();
include 'bbdd.php';

// $datos = trim($_POST["i"]);
// $separado = explode("-", $datos);
$user = $_SESSION['username'];
$descripcion  = $_POST['descripcion'];
$lugar  = $_POST['lugar'];


$image = $_FILES['image']['tmp_name'];
echo $image;
    $imgContenido = addslashes(file_get_contents($image));
echo $imgContenido;
$sql = "INSERT INTO post (descripcion, lugar, archivo, idUsuario) VALUES ('$descripcion','$lugar', '$imgContenido', '$user')";
$r = mysqli_query($conexio, $sql);
echo $sql;


?>