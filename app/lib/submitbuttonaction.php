<?php 
session_start();

if(isset($_POST['SubmitText']))

{
    $SubmitText = $_POST['SubmitText']."";
	$OutputFileName = "/var/www/html/skills/outputcsv/CSV_skill_output_".round(microtime(true) * 1000).".csv";
	file_put_contents($OutputFileName, $SubmitText);
	exec('/tools/vivo-harvester/VIVOharvester/ingest_scripts/skills_csv/run-skills.sh '.$OutputFileName);
}

?>