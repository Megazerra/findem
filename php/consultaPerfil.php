<?php
session_start();
include 'bbdd.php';
$id = $_SESSION['username'];
$tipo = $_POST['i'];
if ($tipo =="pub") {
    $sql = "SELECT COUNT(*) FROM post where idUsuario = '$id'";
    $resultado = mysqli_query($conexio, $sql);
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $array = $fila['COUNT(*)'];
    }
    echo $array;
} else if ($tipo == "friends") {
    $sql = "SELECT COUNT(*) FROM amigo where idUsuario = '$id'";
    $resultado = mysqli_query($conexio, $sql);
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $array = $fila['COUNT(*)'];
    }
    echo $array;
}else{
    echo 'error';
}
