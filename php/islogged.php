<?php
session_start();
if(empty($_SESSION['username'])){
    echo 'no';
}else{
    echo 'si';
}
?>