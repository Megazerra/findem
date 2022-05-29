<?php
session_start();
include 'bbdd.php';
$id = $_POST['i'];
$sql = "DELETE FROM discoteca WHERE idDiscoteca = '$id'";
$resultado = mysqli_query($conexio, $sql);
?>