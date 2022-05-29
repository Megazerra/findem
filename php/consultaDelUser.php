<?php
session_start();
include 'bbdd.php';
$filtro = $_POST['filtro'];
$tipo = $_POST['tipo'];
$sql = "SELECT * FROM usuario WHERE userName LIKE '%$filtro%' AND tipo = '$tipo'";
$resultado = mysqli_query($conexio, $sql);
while ($fila = mysqli_fetch_assoc($resultado)) {
    $users[] = array('userName' => $fila['userName']);
}
foreach ($users as $indice => $valor) {
    $ficheroXML[] = "<usuario>\n<userName>" . $valor['userName'] . "</userName></usuario>";
}
echo "<xml>\n" . implode("\n", $ficheroXML)."\n</xml>";
?>