<?php
session_start();
include 'bbdd.php';
$id = $_SESSION['username'];
$sql = "SELECT * FROM usuario WHERE userName = '$id'";
$resultado = mysqli_query($conexio, $sql);
while ($fila = mysqli_fetch_assoc($resultado)) {
    $geo = array('latitud' => $fila['latitud'], 'longitud' => $fila['longitud']);
}
echo $geo['latitud'].'%'.$geo['longitud'];
?>