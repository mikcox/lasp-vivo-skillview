<?php 
session_start();
//this should be changed to point to the new harvester that can handle a skilllevel object's uri being 'fakeuri'
if(isset($_POST['SubmitText']))

{
    $SubmitText = $_POST['SubmitText']."";
	$OutputFileName = "CSV_skill_output_".round(microtime(true) * 1000).".csv";
	file_put_contents("../outputcsv/".$OutputFileName, $SubmitText);
	exec('cp ../outputcsv/'.$OutputFileName.' /tools/vivo-harvester/VIVOharvester/ingest_scripts/skills_csv');
	exec('/tools/vivo-harvester/VIVOharvester/ingest_scripts/skills_csv/run-skills.sh '.$OutputFileName);
	exec('/tools/vivo-harvester/VIVOharvester/ingest_scripts/skills_csv/upload_to_vivo.sh');
	exec('rm -rf /tools/vivo-harvester/VIVOharvester/ingest_scripts/skills_csv/'.$OutputFileName);
}

?>