<?php
session_start();
include 'bbdd.php';

$datos = trim($_POST["i"]);
$separado = explode("-", $datos);
$user = $_SESSION['username'];
// echo "SESSION: ".$_SESSION['username'];

$sql = "SELECT * FROM usuario WHERE userName IN (SELECT am.idUsuarioAmigo FROM usuario us LEFT JOIN amigo am ON (am.idUsuario = us.userName) WHERE am.idUsuario = '$user')";
$r = mysqli_query($conexio, $sql);


while($fila = mysqli_fetch_assoc($r)){
	$amigo[] = Array('userName' => $fila['userName'],'nombre' => $fila['nombre'],'apellido' => $fila['apellido'],'foto' => "data:image/png;base64," . base64_encode($fila['foto']));
	
}
// $sqlF = "SELECT foto FROM usuario WHERE userName IN (SELECT am.idUsuarioAmigo FROM usuario us LEFT JOIN amigo am ON (am.idUsuario = us.userName) WHERE am.idUsuario = '$user')";
// $result = mysqli_query($conexio, $sqlF);

// 	$a= "<fotos>";
//     if($result->num_rows > 0){

//         while($imgDatos = $result->fetch_assoc()) {
//             $a = $a  . "<foto>data:image/png;base64," . base64_encode($imgDatos['foto']) . "</foto>";         
//          }
       
//         $a = $a . "</fotos>";
        
        
//     }else{
      
//     }


foreach($amigo as $codigo => $ins){
	$todos[] = "<usuario><userName>".$ins['userName']."</userName><nombre>".$ins['nombre']."</nombre><apellido>".$ins['apellido']."</apellido><foto>".$ins['foto']."</foto></usuario>";
}






echo "<amigos>\n".implode("\n", $todos). "<user>".$user."</user></amigos>";

?>