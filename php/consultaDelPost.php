<?php
session_start();
include 'bbdd.php';
$filtro = $_POST['i'];
$tipo = $_POST['t'];
if ($tipo == 'consulta') {
    $sql = "SELECT * FROM usuario WHERE userName LIKE '%$filtro%'";
    $resultado = mysqli_query($conexio, $sql);
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $usuario[] = array('id' => $fila['userName']);
    }
    foreach ($usuario as $indice => $valor) {
        $ficheroXML[] = "<usuario>\n<id>" . $valor['id'] . "</id>\n<nombre>" . $valor['id'] . "</nombre>\n</usuario>";
    }
    echo "<xml>\n" . implode("\n", $ficheroXML) . "\n</xml>";
}else{
    $sql = "SELECT * FROM post WHERE idUsuario = '$filtro'";
    $resultado = mysqli_query($conexio, $sql);
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $post[] = array('id' => $fila['idPost']);
    }
    foreach ($post as $indice => $valor) {
        $ficheroXML[] = "<post>\n<id>" . $valor['id'] . "</id>\n</post>";
    }
    echo "<xml>\n" . implode("\n", $ficheroXML) . "\n</xml>";
}

