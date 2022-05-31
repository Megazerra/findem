<?php

include 'bbdd.php';
session_start();

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];

if($datos == "undefined"){
	$datos = "";
}



		$post = "SELECT li.titulo, li.fecha_inicio, li.idLista, li.fecha_inicio, li.fecha_final, li.idDiscoteca, dis.logo, dis.nombre FROM lista li JOIN discoteca dis ON (dis.idDiscoteca = li.idDiscoteca) WHERE dis.idDiscoteca LIKE '%$datos%' GROUP BY li.idDiscoteca ORDER BY fecha_inicio";
		$r2 = mysqli_query($conexio, $post);

		while($fila = mysqli_fetch_assoc($r2)){
			$amigo2[] = Array('titulo' => $fila['titulo'],'fecha_inicio' => $fila['fecha_inicio'],'fecha_final' => $fila['fecha_final'],'idDiscoteca' => $fila['idDiscoteca'], 'logo' => "data:image/png;base64," . base64_encode($fila['logo']), 'nombre' => $fila['nombre']);
			
		}

		foreach($amigo2 as $codigo => $ins){
			$todos2[] = "<lista><titulo>".$ins['titulo']."</titulo><fecha_inicio>".$ins['fecha_inicio']."</fecha_inicio><fecha_final>".$ins['fecha_final']."</fecha_final><idDiscoteca>".$ins['idDiscoteca']."</idDiscoteca><logo>".$ins['logo']."</logo><nombre>".$ins['nombre']."</nombre></lista>";
		}





		$post2 = "SELECT dis.nombre, dis.idDiscoteca FROM lista li JOIN discoteca dis ON (dis.idDiscoteca = li.idDiscoteca) GROUP BY li.idDiscoteca ORDER BY fecha_inicio";
		$r22 = mysqli_query($conexio, $post2);

		while($fila2 = mysqli_fetch_assoc($r22)){
			$amigo22[] = Array('nombre' => $fila2['nombre'], 'id' => $fila2['idDiscoteca']);
			
		}

		foreach($amigo22 as $codigo => $ins2){
			$todos22[] = "<lista2><nombreA>".$ins2['nombre']."</nombreA><id>".$ins2['id']."</id></lista2>";
		}

		echo "<listas>".implode("\n", $todos2).implode("\n", $todos22). "<datos>".$datos."</datos></listas>";
		

?>