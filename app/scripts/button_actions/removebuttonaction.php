<?php 
session_start();

if(isset($_POST['DeletionText']))

{
    $DeletionText = $_POST['DeletionText']."";
	$OutputFileName = "CSV_skill_delete_".round(microtime(true) * 1000).".csv";
	file_put_contents("../../outputcsv/".$OutputFileName, $DeletionText);
	exec('cp ../../outputcsv/'.$OutputFileName.' /tools/vivo-harvester/VIVOharvester/ingest_scripts/skills_csv');
	exec('/tools/vivo-harvester/VIVOharvester/ingest_scripts/skills_csv/run-skills.sh '.$OutputFileName);
	exec('/tools/vivo-harvester/VIVOharvester/ingest_scripts/skills_csv/upload_to_vivo.sh -m');
	exec('rm -rf /tools/vivo-harvester/VIVOharvester/ingest_scripts/skills_csv/'.$OutputFileName);
}

?>