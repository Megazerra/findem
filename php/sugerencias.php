<?php
session_start();
include 'bbdd.php';
$id = $_SESSION['username'];
// $id = 'c';
$sql = 'SELECT uami2.userName, uami2.nombre, uami2.apellido, uami2.email, uami2.foto, am2.idUsuario as "prop", prop.foto as "propImg" FROM usuario us
JOIN amigo am ON(us.userName = am.idUsuario)
JOIN amigo am2 ON(am2.idUsuario = am.idUsuarioAmigo)
JOIN usuario uami2 ON(am2.idUsuarioAmigo = uami2.userName)
JOIN usuario prop ON(am2.idUsuario = prop.userName)
WHERE us.userName = "'.$id.'"
GROUP BY uami2.userName';
$resultado = mysqli_query($conexio, $sql);
while ($fila = mysqli_fetch_assoc($resultado)) {
    $new[] = array('userName' => $fila['userName'], 'nombre' => $fila['nombre'], 'apellido' => $fila['apellido'], 'email' => $fila['email'], 'foto' => "data:image/png;base64," . base64_encode($fila['foto']), 'foto2' => "data:image/png;base64," . base64_encode($fila['propImg']), 'prop' => $fila['prop']);
}
foreach ($new as $indice => $valor) {
    $ficheroXML[] = "<amigo>\n<userName>" . $valor['userName'] . "</userName>\n<nombre>" . $valor['nombre'] . "</nombre>\n<apellido>" . $valor['apellido'] . "</apellido>\n<email>" . $valor['email'] . "</email>\n<prop>" . $valor['prop'] . "</prop>\n<foto>" . $valor['foto'] . "</foto>\n<foto2>" . $valor['foto2'] . "</foto2>\n</amigo>";
}
echo "<xml>\n" . implode("\n", $ficheroXML) ."\n</xml>";