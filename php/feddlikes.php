<?php
session_start();
include 'bbdd.php';
$user = $_SESSION['username'];


$post = "SELECT * FROM post po JOIN usuario us ON (us.userName = po.idUsuario) WHERE idUsuario IN (SELECT idUsuarioAmigo FROM amigo WHERE idUsuario = '$user')";
$r2 = mysqli_query($conexio, $post);

while($fila = mysqli_fetch_assoc($r2)){
    $id = $fila['idPost'];
    $select = "SELECT count(*) from likes where idPost = '$fila[idPost]' AND idUsuario = '$user'";
    $r3 = mysqli_query($conexio, $select);
    while($fila = mysqli_fetch_assoc($r3)){
        echo $fila['count(*)'];     
     } 
}


?>