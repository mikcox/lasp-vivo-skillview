<?php 
session_start();
//this should be changed to point to the new harvester that can handle a skilllevel object's uri being 'fakeuri'
if(isset($_POST['SubmitText']))

{
    $SubmitText = $_POST['SubmitText']."";
	$OutputFileName = "CSV_new_skill_output_".round(microtime(true) * 1000).".csv";
	file_put_contents("../../outputcsv/".$OutputFileName, $SubmitText);
	exec('cp ../../outputcsv/'.$OutputFileName.' /tools/vivo-harvester/VIVOharvester/ingest_scripts/new_skill_csv/skills_csv');
	exec('/tools/vivo-harvester/VIVOharvester/ingest_scripts/new_skill_csv/skills_csv/run-skills.sh '.$OutputFileName);
	exec('rm -rf /tools/vivo-harvester/VIVOharvester/ingest_scripts/new_skill_csv/skills_csv/'.$OutputFileName);
	$emailString = 'The new CSV generated was:   ' . $SubmitText;
	mail ( 'michael.cox@lasp.colorado.edu', 'New skill added via LEMR webapp' , $emailString);
}

?>