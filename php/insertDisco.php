<?php
session_start();
include 'bbdd.php';
$img = $_FILES['image']['tmp_name'];
$nombre = $_POST['nombre'];
$dir = $_POST['dir'];
$horario = $_POST['horario'];
$descripcion = $_POST['descripcion'];
$lat = $_POST['lat'];
$long = $_POST['long'];
$url = $_POST['url'];
$dades_imatge = addslashes(file_get_contents($img));


$sql = "SELECT COUNT(*) FROM discoteca WHERE nombre = '$nombre'";
$r = mysqli_query($conexio, $sql);

while($fila = mysqli_fetch_assoc($r)){
	$count = $fila['COUNT(*)'];
}

if($count == 0){
    $sql = "INSERT INTO discoteca (nombre, direccion, horario, href, descripcion, latitud, longitud, logo) VALUES ('$nombre', '$dir', '$horario', '$url', '$descripcion', $lat, $long, '$dades_imatge')";
    $r = mysqli_query($conexio, $sql);
    echo $sql;
}else{
    echo "0";
}

?>