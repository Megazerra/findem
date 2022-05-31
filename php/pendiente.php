<?php
include 'bbdd.php';
session_start();
$user = $_SESSION['username'];
// $friend = $_POST['idamigo'];
// $datos = trim($_POST["i"]);


        $sql = "SELECT * FROM amigo ami JOIN usuario us ON(us.userName = ami.idUsuarioAmigo) WHERE ami.idUsuario = '$user' AND pendiente = '0'";
        $r = mysqli_query($conexio, $sql);

	    while($fila = mysqli_fetch_assoc($r)){
			$amigo[] = Array('username' => $fila['userName'], 'foto' => "data:image/png;base64," . base64_encode($fila['foto']));
			
		}

		foreach($amigo as $codigo => $ins){
			$todos[] = "<pendiente><username>".$ins['username']."</username><foto>".$ins['foto']."</foto></pendiente>";
		}

        
		echo "<pendientes>".implode("\n", $todos). "</pendientes>";
	

?>