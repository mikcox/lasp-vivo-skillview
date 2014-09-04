<?php 
session_start();

if(isset($_POST['filePath']))

{
    $filePath = $_POST['filePath']."";
    $string = file_get_contents( $filePath );
	echo json_encode($string);
}

?>