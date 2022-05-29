<?php
session_start();
include 'bbdd.php';
$id = $_POST['i'];
$sql = "DELETE FROM post WHERE idPost = '$id'";
$resultado = mysqli_query($conexio, $sql);
?>