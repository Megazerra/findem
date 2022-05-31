<?php
session_start();
include 'bbdd.php';
$tit = $_POST['tit'];
$inicio = $_POST['inicio'];
$final = $_POST['final'];
$id = $_POST['discoteca'];
$sql = "INSERT INTO lista(titulo, fecha_inicio, fecha_final, idDiscoteca) VALUES('$tit', '$inicio', ' $final', '$id')";
$resultado = mysqli_query($conexio, $sql);
?>