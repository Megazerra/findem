<?php
session_start();
include 'bbdd.php';
$sql = "SELECT * FROM discoteca";
$resultado = mysqli_query($conexio, $sql);
while ($fila = mysqli_fetch_assoc($resultado)) {
    $discoSimple[] = $fila;
}
foreach ($discoSimple as $indice => $valor) {
    $ficheroXML[] = "<discoteca>\n<nombre>" . $valor['nombre'] . "</nombre>\n<id>" . $valor['idDiscoteca'] . "</id>\n</discoteca>";
}

echo "<xml>" . implode($ficheroXML). "</xml>";