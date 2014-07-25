<?php 
session_start();

if(isset($_POST['SubmitTextPublic']))

{
    $SubmitTextPublic = $_POST['SubmitTextPublic']."";
	file_put_contents("./output.txt", $SubmitTextPublic);
}

?>