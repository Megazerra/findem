<?php
session_start();
include 'bbdd.php';
$datos = trim($_POST["i"]);
$user = $_SESSION['username'];

if($datos != ''){
	$sql = "SELECT * FROM usuario WHERE LOWER(userName) like LOWER('".$datos."%')";
	$r = mysqli_query($conexio, $sql);
}



while($fila = mysqli_fetch_assoc($r)){
	$amigo[] = Array('userName' => $fila['userName'],'nombre' => $fila['nombre'],'apellido' => $fila['apellido'],'foto' => $fila['foto']);
}


foreach($amigo as $codigo => $ins){
	$todos[] = "<usuario><userName>".$ins['userName']."</userName><nombre>".$ins['nombre']."</nombre><apellido>".$ins['apellido']."</apellido></usuario>";
}


echo "<amigos>\n".implode("\n", $todos). "<user>".$user."</user></amigos>";
?>