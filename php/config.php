<?php
session_start();
include 'bbdd.php';


$user = $_SESSION['username'];
// echo "SESSION: ".$_SESSION['username'];

if(!empty($_POST['name'])){
	$name  = $_POST['name'];
	echo $name;
	$sql = "UPDATE usuario SET nombre = '$name' WHERE userName = '$user'";
	$r = mysqli_query($conexio, $sql);
	echo $sql;
}

if(!empty($_POST['username'])){
	$username  = $_POST['username'];
	echo $username;
	$sql = "UPDATE usuario SET userName = '$username' WHERE userName = '$user'";
	$r = mysqli_query($conexio, $sql);
}

if(!empty($_POST['password'])){
	$password  = $_POST['password'];
	echo $password;
	$sql = "UPDATE usuario SET password = '$password' WHERE userName = '$user'";
	$r = mysqli_query($conexio, $sql);
}

if(!empty($_POST['gmail'])){
	$gmail  = $_POST['gmail'];
	echo $gmail;
	$sql = "UPDATE usuario SET gmail = '$gmail' WHERE userName = '$user'";
	$r = mysqli_query($conexio, $sql);

}

if(!empty($_FILES['image']['tmp_name'])){
	$image = $_FILES['image']['tmp_name'];
	$imgContenido = addslashes(file_get_contents($image));
	$sql = "UPDATE usuario SET foto = '$imgContenido' WHERE userName = '$user'";
	$r = mysqli_query($conexio, $sql);

}
// $image = $_FILES['image']['tmp_name'];
// 



?>