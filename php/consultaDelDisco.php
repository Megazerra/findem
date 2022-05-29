<?php
session_start();
include 'bbdd.php';
$filtro = $_POST['filtro'];
$sql = "SELECT * FROM discoteca WHERE nombre LIKE '%$filtro%'";
$resultado = mysqli_query($conexio, $sql);
while ($fila = mysqli_fetch_assoc($resultado)) {
    $discos[] = array('id' => $fila['idDiscoteca'], 'nombre' => $fila['nombre']);
}
foreach ($discos as $indice => $valor) {
    $ficheroXML[] = "<discoteca>\n<id>" . $valor['id'] . "</id>\n<nombre>" . $valor['nombre'] . "</nombre>\n</discoteca>";
}
echo "<xml>\n" . implode("\n", $ficheroXML)."\n</xml>";
?>