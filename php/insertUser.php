<?php
session_start();
include 'bbdd.php';
$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$sql = "";
$resultado = mysqli_query($conexio, $sql);
?>