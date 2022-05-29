<?php
session_start();
include 'bbdd.php';
$userName = $_POST['name'];
$sql = "DELETE FROM usuario WHERE userName = '$userName'";
$resultado = mysqli_query($conexio, $sql);
?>