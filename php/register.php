<?php
include 'bbdd.php';
$lat = $_POST['lat'];
$long = $_POST['long'];
$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$separado[3] = md5($separado[3]);


$sql = "SELECT COUNT(*) FROM usuario WHERE userName = '$separado[0]' OR email = '$separado[4]'";
$r = mysqli_query($conexio, $sql);

while($fila = mysqli_fetch_assoc($r)){
	$count = $fila['COUNT(*)'];
}

if($count == 0){
	$sql = "INSERT INTO usuario (userName, nombre, apellido, password, email, latitud, longitud, tipo) VALUES ('$separado[0]', '$separado[1]', '$separado[2]', '$separado[3]', '$separado[4]', '$lat', '$long', '$separado[5]')";
	$r = mysqli_query($conexio, $sql);
	echo "1";
}else{
	echo "0";
}








?>
