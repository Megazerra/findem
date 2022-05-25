<?php

include 'bbdd.php';
session_start();

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];
// echo "SESSION: ".$_SESSION['username'];

$sql = "SELECT * FROM usuario WHERE userName = '$user'";
$r = mysqli_query($conexio, $sql);

while($fila = mysqli_fetch_assoc($r)){
	$amigo[] = Array('userName' => $fila['userName'],'nombre' => $fila['nombre'],'apellido' => $fila['apellido'],'foto' => "data:image/png;base64," . base64_encode($fila['foto']));
	
}

foreach($amigo as $codigo => $ins){
	$todos[] = "<usuario><userName>".$ins['userName']."</userName><nombre>".$ins['nombre']."</nombre><apellido>".$ins['apellido']."</apellido><foto>".$ins['foto']."</foto></usuario>";
}

echo "<amigos>".implode("\n", $todos). "<user>".$user."</user></amigos>";

?>