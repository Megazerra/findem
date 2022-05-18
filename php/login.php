<?php
include 'bbdd.php';
session_start();
$lat = $_POST['lat'];
$long = $_POST['long'];
$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$separado[1] = md5($separado[1]);

$sql = "SELECT COUNT(*) FROM usuario WHERE (userName = '$separado[0]' OR email = '$separado[0]') AND password = '$separado[1]'";
$r = mysqli_query($conexio, $sql);


while($fila = mysqli_fetch_assoc($r)){
	$count = $fila['COUNT(*)'];
}

if($count > 0){
    $sql = "UPDATE usuario SET latitud = '$lat', longitud= '$long' WHERE userName = '$separado[0]'";
    $r = mysqli_query($conexio, $sql);
    $_SESSION['username'] = $separado[0];
    echo "1";
}else{
    echo "0";
}


?>