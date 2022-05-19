<?php
include 'bbdd.php';
session_start();

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];
// echo "SESSION: ".$_SESSION['username'];

$sql = "SELECT * FROM usuario WHERE userName IN (SELECT am.idUsuarioAmigo FROM usuario us LEFT JOIN amigo am ON (am.idUsuario = us.userName) WHERE am.idUsuario = '$user')";
$r = mysqli_query($conexio, $sql);


while($fila = mysqli_fetch_assoc($r)){
	$amigo[] = Array('userName' => $fila['userName'],'nombre' => $fila['nombre'],'apellido' => $fila['apellido'],'foto' => $fila['foto']);
}


foreach($amigo as $codigo => $ins){
	$todos[] = "<userName>".$ins['userName']."</userName><nombre>".$ins['nombre']."</nombre><apellido>".$ins['apellido']."</apellido><user>".$user."</user><foto>".$ins['foto']."</foto>";
}


echo "<maps>\n".implode("\n", $todos). "</maps>";
?>