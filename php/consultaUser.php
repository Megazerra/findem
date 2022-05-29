<?php
session_start();
include 'bbdd.php';
if ($_POST['pag'] == 'con') {
	$filtro = $_POST['filtro'];
	$sql = "SELECT * FROM usuario WHERE userName LIKE '%$filtro%'";
	$resultado = mysqli_query($conexio, $sql);
	$rows = mysqli_num_rows($resultado);
	$linies = 5;
	$inici = $_POST['num'];
	$sql = "SELECT * FROM usuario WHERE userName LIKE '%$filtro%' limit $inici, $linies";
	$resultado = mysqli_query($conexio, $sql);
	while ($fila = mysqli_fetch_assoc($resultado)) {
		$users[] = array('userName' => $fila['userName'], 'nombre' => $fila['nombre'], 'apellido' => $fila['apellido'], 'password' => $fila['password'], 'email' => $fila['email'], 'latitud' => $fila['latitud'], 'longitud' => $fila['longitud'], 'href' => $fila['href'], 'tipo' => $fila['tipo']);
	}
	foreach ($users as $indice => $valor) {
		$ficheroXML[] = "<usuario>\n<userName>" . $valor['userName'] . "</userName>\n<nombre>" . $valor['nombre'] . "</nombre>\n<apellido>" . $valor['apellido'] . "</apellido>\n<password>" . $valor['password'] . "</password>\n<email>" . $valor['email'] . "</email>\n<latitud>" . $valor['latitud'] . "</latitud>\n<longitud>" . $valor['longitud'] . "</longitud>\n<href>" . $valor['href'] . "</href>\n<tipo>" . $valor['tipo'] . "</tipo>\n</usuario>";
	}
	echo "<xml>\n" . implode("\n", $ficheroXML) . "\n<rows>$rows</rows>\n<filtro>on</filtro>\n</xml>";
} else if ($_POST['pag'] == 'sin') {
	$linies = 5;
	$inici = $_POST['num'];
	$sql = "SELECT * FROM usuario limit $inici, $linies";
	$resultado = mysqli_query($conexio, $sql);
	while ($fila = mysqli_fetch_assoc($resultado)) {
		$users[] = array('userName' => $fila['userName'], 'nombre' => $fila['nombre'], 'apellido' => $fila['apellido'], 'password' => $fila['password'], 'email' => $fila['email'], 'latitud' => $fila['latitud'], 'longitud' => $fila['longitud'], 'href' => $fila['href'], 'tipo' => $fila['tipo']);
	}
	foreach ($users as $indice => $valor) {
		$ficheroXML[] = "<usuario>\n<userName>" . $valor['userName'] . "</userName>\n<nombre>" . $valor['nombre'] . "</nombre>\n<apellido>" . $valor['apellido'] . "</apellido>\n<password>" . $valor['password'] . "</password>\n<email>" . $valor['email'] . "</email>\n<latitud>" . $valor['latitud'] . "</latitud>\n<longitud>" . $valor['longitud'] . "</longitud>\n<href>" . $valor['href'] . "</href>\n<tipo>" . $valor['tipo'] . "</tipo>\n</usuario>";
	}
	$sql = "SELECT * FROM usuario";
	$resultado = mysqli_query($conexio, $sql);
	$rows = mysqli_num_rows($resultado);
	echo "<xml>\n" . implode("\n", $ficheroXML) . "\n<rows>$rows</rows>\n<filtro>off</filtro></xml>";
}
