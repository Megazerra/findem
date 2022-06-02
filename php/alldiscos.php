<?php
session_start();
include 'bbdd.php';
$user = $_SESSION['username'];


$sql = "SELECT DISTINCT * FROM discoteca dis";
$r = mysqli_query($conexio, $sql);


while($fila = mysqli_fetch_assoc($r)){
	$amigo[] = Array('nombre' => $fila['nombre'],'descripcion' => $fila['descripcion'],'logo' => "data:image/png;base64," . base64_encode($fila['logo']), 'direccion' => $fila['direccion'],'latitud' => $fila['latitud'],'longitud' => $fila['latitud'],'horario' => $fila['horario'], 'href' => $fila['href'], 'idDiscoteca' => $fila['idDiscoteca']);
	
}


foreach($amigo as $codigo => $ins){
	$todos[] = "<discoteca><nombre>".$ins['nombre']."</nombre><descripcion>".$ins['descripcion']."</descripcion><logo>".$ins['logo']."</logo><direccion>".$ins['direccion']."</direccion><latitud>".$ins['latitud']."</latitud><latitud>".$ins['latitud']."</latitud><horario>".$ins['horario']."</horario><href>".$ins['href']."</href><idDiscoteca>".$ins['idDiscoteca']."</idDiscoteca></discoteca>";
}






echo "<discotecas>\n".implode("\n", $todos)."</discotecas>";

?>