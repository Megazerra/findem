<?php
session_start();
include 'bbdd.php';
if ($_POST['pag'] == 'con') {
	$filtro = $_POST['filtro'];
	$sql = "SELECT * FROM discoteca WHERE nombre LIKE '%$filtro%'";
	$resultado = mysqli_query($conexio, $sql);
	$rows = mysqli_num_rows($resultado);
	$inici = $_POST['num'];
	$linies = 5;
	$sql = "SELECT * FROM discoteca WHERE nombre LIKE '%$filtro%' limit $inici, $linies";
	$resultado = mysqli_query($conexio, $sql);
	while ($fila = mysqli_fetch_assoc($resultado)) {
		$users[] = array('nombre' => $fila['nombre'], 'direccion' => $fila['direccion'], 'horario' => $fila['horario'], 'href' => $fila['href'], 'descripcion' => $fila['descripcion'], 'latitud' => $fila['latitud'], 'longitud' => $fila['longitud']);
	}
	foreach ($users as $indice => $valor) {
		$ficheroXML[] = "<discoteca>\n<nombre>" . $valor['nombre'] . "</nombre>\n<direccion>" . $valor['direccion'] . "</direccion>\n<horario>" . $valor['horario'] . "</horario>\n<href>" . $valor['href'] . "</href>\n<latitud>" . $valor['latitud'] . "</latitud>\n<longitud>" . $valor['longitud'] . "</longitud>\n</discoteca>";
	}
	echo "<xml>\n" . implode("\n", $ficheroXML) . "\n<rows>$rows</rows>\n<filtro>on</filtro>\n</xml>";
} else if ($_POST['pag'] == 'sin') {
	$linies = 5;
	$inici = $_POST['num'];
	$sql = "SELECT * FROM discoteca limit $inici, $linies";
	$resultado = mysqli_query($conexio, $sql);
	while ($fila = mysqli_fetch_assoc($resultado)) {
		$users[] = array('nombre' => $fila['nombre'], 'direccion' => $fila['direccion'], 'horario' => $fila['horario'], 'href' => $fila['href'], 'descripcion' => $fila['descripcion'], 'latitud' => $fila['latitud'], 'longitud' => $fila['longitud']);
	}
	if (!empty($users)) {
		foreach ($users as $indice => $valor) {
			$ficheroXML[] = "<discoteca>\n<nombre>" . $valor['nombre'] . "</nombre>\n<direccion>" . $valor['direccion'] . "</direccion>\n<horario>" . $valor['horario'] . "</horario>\n<href>" . $valor['href'] . "</href>\n<latitud>" . $valor['latitud'] . "</latitud>\n<longitud>" . $valor['longitud'] . "</longitud>\n<longitud>" . $valor['longitud'] . "</longitud>\n</discoteca>";
		}
		$sql = "SELECT * FROM discoteca";
		$resultado = mysqli_query($conexio, $sql);
		$rows = mysqli_num_rows($resultado);
		echo "<xml>\n" . implode("\n", $ficheroXML) . "\n<rows>$rows</rows>\n<filtro>off</filtro>\n</xml>";
	}
}
