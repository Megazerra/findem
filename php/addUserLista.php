<?php
session_start();
include 'bbdd.php';
$user = $_SESSION['username'];
$lista = $_POST['i'];
$sql = "SELECT COUNT(*) FROM listausuario WHERE idUsuario = '$user' AND idLista = '$lista'";
$resultado = mysqli_query($conexio, $sql);
while ($fila = mysqli_fetch_assoc($resultado)) {
    $cont = $fila['COUNT(*)'];
}
if ($cont == 0) {
    $sql = "INSERT INTO listausuario(idUsuario, idLista) VALUES('$user', $lista)";
    $resultado = mysqli_query($conexio, $sql);
    echo "1";

}else{
    echo "0";
}
?>
