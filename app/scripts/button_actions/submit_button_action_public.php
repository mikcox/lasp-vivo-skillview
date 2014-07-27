<?php 
session_start();

if(isset($_POST['SubmitTextPublic']))

{
    $SubmitTextPublic = $_POST['SubmitTextPublic']."";
    $string = file_get_contents( "../../cached_json/LASP_master_list.json" );
    $json = json_decode( $string );
    $oldList = rtrim( json_encode($json->results->bindings), "]" );
    $newList = $SubmitTextPublic;
    
    $finalList = $oldList.",".$newList;
    
    $json->results->bindings = json_decode( $finalList );
    
    $outputString = json_encode( $json );
	file_put_contents( "../../cached_json/LASP_master_list.json", $outputString );
}

?>