<?php 
session_start();

if(isset($_POST['person']))

{
    $person = $_POST['person']."";
    $personuri = $_POST['personuri']."";
    $skilluri = $_POST['skilluri']."";
    //$string = file_get_contents( "../../cached_json/LASP_master_list.json" );
    $json = file_get_contents( "/var/opt/lasp/skills/cached_json/LASP_master_list.json" );
    $json = json_decode( $json );
    
    foreach( $json->results->bindings as $index=>$row ) {
    	if ( $row->Person->value === $person
			 && $row->personuri->value == $personuri
 			 && $row->skillleveluri->value == $skilluri ) {
    		unset( $json->results->bindings[$index] );
    	}
    }
	//re-index array elements
	$json->results->bindings = array_values( $json->results->bindings );
    //encode
    $json = json_encode( $json );
    //and write to file
    //file_put_contents( "../../cached_json/LASP_master_list.json", $json );
    file_put_contents( "/var/opt/lasp/skills/cached_json/LASP_master_list.json", $json );
}

?>