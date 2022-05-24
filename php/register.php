<?php
include 'bbdd.php';
$lat = $_POST['lat'];
$long = $_POST['long'];
$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$separado[3] = md5($separado[3]);

$dades_imatge = file_get_contents('../imgs/profile.png');
$dades_imatge = mysqli_real_escape_string($conexio, $dades_imatge);

$sql = "SELECT COUNT(*) FROM usuario WHERE userName = '$separado[0]' OR email = '$separado[4]'";
$r = mysqli_query($conexio, $sql);

while($fila = mysqli_fetch_assoc($r)){
	$count = $fila['COUNT(*)'];
}

if($count == 0){
	$check = $_POST['link'];
	if($check == "si"){
		$sql = "INSERT INTO usuario (userName, nombre, apellido, password, email, latitud, longitud, tipo, href) VALUES ('$separado[0]', '$separado[1]', '$separado[2]', '$separado[3]', '$separado[4]', '$lat', '$long', '$separado[5]', '$separado[6]')";

	}else{
		$sql = "INSERT INTO usuario (userName, nombre, apellido, password, email, latitud, longitud, tipo, foto) VALUES ('$separado[0]', '$separado[1]', '$separado[2]', '$separado[3]', '$separado[4]', '$lat', '$long', '$separado[5]', '../imgs/profile.png')";
	}
	$r = mysqli_query($conexio, $sql);
	$_SESSION['username'] = $separado[0];
	echo "1";
}else{
	echo "0";
}

?>
