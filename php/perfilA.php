<?php
session_start();
include 'bbdd.php';

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];
// echo "SESSION: ".$_SESSION['username'];

$sql = "SELECT * FROM usuario WHERE userName = '$datos'";
$r = mysqli_query($conexio, $sql);




while($fila = mysqli_fetch_assoc($r)){
	$amigo[] = Array('userName' => $fila['userName'],'nombre' => $fila['nombre'],'apellido' => $fila['apellido'],'foto' => "data:image/png;base64," . base64_encode($fila['foto']),'email' => $fila['email']);
	
}

foreach($amigo as $codigo => $ins){
	$todos[] = "<usuario><userName>".$ins['userName']."</userName><nombre>".$ins['nombre']."</nombre><apellido>".$ins['apellido']."</apellido><foto>".$ins['foto']."</foto><email>".$ins['email']."</email></usuario>";
}

$sql2 = "SELECT COUNT(*) FROM amigo WHERE idUsuario = '$user' AND idUsuarioAmigo = '$datos'";
$r2 = mysqli_query($conexio, $sql2);

while($fila2 = mysqli_fetch_assoc($r2)){
	$cont =  $fila2['COUNT(*)'];
}

echo "<amigos>".implode("\n", $todos). "<user>".$user."</user><cont>".$cont."</cont></amigos>";




?>