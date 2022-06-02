<?php
session_start();
include 'bbdd.php';
$user = $_SESSION['username'];
$datos = trim($_POST["i"]);


$todas = "SELECT * FROM discoteca WHERE idDiscoteca = '$datos'";
$r = mysqli_query($conexio, $todas);


while($fila = mysqli_fetch_assoc($r)){
	$amigo[] = Array('nombre' => $fila['nombre'],'descripcion' => $fila['descripcion'],'logo' => "data:image/png;base64," . base64_encode($fila['logo']), 'direccion' => $fila['direccion'],'latitud' => $fila['latitud'],'longitud' => $fila['latitud'],'horario' => $fila['horario'], 'href' => $fila['href']);
	
}


foreach($amigo as $codigo => $ins){
	$todos[] = "<discoteca><nombre>".$ins['nombre']."</nombre><descripcion>".$ins['descripcion']."</descripcion><logo>".$ins['logo']."</logo><direccion>".$ins['direccion']."</direccion><latitud>".$ins['latitud']."</latitud><latitud>".$ins['latitud']."</latitud><horario>".$ins['horario']."</horario><href>".$ins['href']."</href></discoteca>";
}

$valoraciones = "SELECT * FROM valoracion val JOIN usuario us ON(us.userName = val.idUsuario) WHERE idDiscoteca = '$datos'";
$r2 = mysqli_query($conexio, $valoraciones);

while($fila2 = mysqli_fetch_assoc($r2)){
	$amigo2[] = Array('titulo' => $fila2['titulo'],'descripcion' => $fila2['descripcion'],'idUsuario' => $fila2['descripcion'],'nota' => $fila2['nota'],'username' => $fila2['userName'],'foto' => "data:image/png;base64," . base64_encode($fila2['foto']));
	
}


foreach($amigo2 as $codigo => $ins2){
	$todos2[] = "<valoracion><titulo>".$ins2['titulo']."</titulo><descripcionn>".$ins2['descripcion']."</descripcionn><nota>".$ins2['nota']."</nota><username>".$ins2['username']."</username><foto>".$ins2['foto']."</foto></valoracion>";
}


echo "<xml><discotecas>\n".implode("\n", $todos)."</discotecas><valoraciones>\n".implode("\n", $todos2)."</valoraciones></xml>";
// echo "<valoraciones>\n".implode("\n", $todos2)."</valoraciones>";

?>