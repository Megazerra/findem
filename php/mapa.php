<?php
session_start();
include 'bbdd.php';
$sql = "SELECT * FROM discoteca";
$r = mysqli_query($conexio, $sql);
while($fila = mysqli_fetch_assoc($r)){
    $discotecas[] = Array('id' => $fila['idDiscoteca'],'horario' => $fila['horario'], 'nombre' => $fila['nombre'],'descripcion' => $fila['descripcion'],'logo' => "data:image/png;base64," . base64_encode($fila['logo']),'lat' => $fila['latitud'],'long' => $fila['longitud']);
}
foreach($discotecas as $key => $value){
    $ficheroXML[] = "<discoteca><id>".$value['id']."</id><nombre>".$value['nombre']."</nombre><descripcion>".$value['descripcion']."</descripcion><logo>".$value['logo']."</logo><lat>".$value['lat']."</lat><long>".$value['long']."</long><horario>".$value['horario']."</horario></discoteca>";
}
echo "<xml>\n" . implode("\n", $ficheroXML). "</xml>";

//$dades_imatge = mysqli_real_escape_string($conexio, $dades_imatge);
?>