<?php
/**
Simple PHP example using the PHP Requests library - http://requests.ryanmccue.info/
*/
 
session_start();

if(isset($_POST['DeletionText'])) 

{
// Include Requests
include('/var/www/lasp-vivo-skillview/app/scripts/rmccue-Requests-5c54aaa/library/Requests.php');	

Requests::register_autoloader();
$DeletionText = $_POST['DeletionText'];
$q = 'DELETE DATA {'.
     'GRAPH <http://vitro.mannlib.cornell.edu/default/vitro-kb-2>'.
     '{<'.$DeletionText['personuri'].'> <http://webdev1.lasp.colorado.edu:57529/laspskills#hasSkill> <'.$DeletionText['skilluri'].'> .'.
     '<'.$DeletionText['skilluri'].'> <http://webdev1.lasp.colorado.edu:57529/laspskills#personWithSkill> <'.$DeletionText['personuri'].'>}'.
    '}';
 
$request = Requests::post(
    'http://lemr-dev:8080/vivo/api/sparqlUpdate',
    array(),
    array(
        'update' => $q,
        'email' => 'vivo_root@mydomain.edu',
        'password' => 'vitro123'
    )
);

// Dump response
echo $request->status_code;
}
?> 