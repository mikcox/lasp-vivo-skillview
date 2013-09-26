'use strict';

/* Controllers */
//read in a local json file
function SkillsCtrl($scope, $http){
	var queryStr = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#>  SELECT ?Person ?Skill ?SkillLevel ?Office ?PhoneNumber ?Position ?Division ?Group WHERE { ?personuri a foaf:Person . ?personuri rdfs:label ?Person . ?personuri laspskills:hasSkill ?skillleveluri . ?skillleveluri rdfs:label ?SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?Skill . OPTIONAL{?personuri vivo:hasFacility ?roomuri . ?roomuri rdfs:label ?Office} . OPTIONAL{?personuri vivo:phoneNumber ?PhoneNumber} . OPTIONAL{?personuri vivo:personInPosition ?positionuri . ?positionuri rdfs:label ?Position . ?positionuri vivo:positionInOrganization ?groupuri . ?groupuri rdfs:label ?Group . ?groupuri vivo:subOrganizationWithin ?divisionuri . ?divisionuri rdfs:label ?Division }}"
	var queryPart = "query=" + escape(queryStr);	
	
	$http({
		method: 'POST',
		url: 'http://lasp-db-dev:3030/VIVO/query',
		data: queryPart,
		headers: {"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'}
	}).success(function(data) {
		//Create a list in which to combine duplicate entries from SPARQL query into one cell
		var fixedList = [];
		var tmpPerson = '';
		var tmpSkill = '';
		var tmpOffice = '';
		var tmpPhone = '';
		var tmpPosition = '';
		var tmpDivision = '';
		var tmpGroup = '';
		//search for duplicates in person name and skill columns and combine where both match
		//an array to store indexes of any duplicate rows
		var duplicateRows = [];
		var cursor = 0;
		for (var i=0; i < data.results.bindings.length; i++){
			//ignore the rows that have already been marked as duplicates.
			if(duplicateRows.indexOf(i) == -1){ 
				//set the temp variables to the results from each row
				tmpPerson = data.results.bindings[i].Person.value;
				tmpSkill = data.results.bindings[i].SkillLevel.value;
				//if a person doesn't have an office or phone, that does not show up in the results JSON, so we must be careful and watch for that.
				if(data.results.bindings[i].hasOwnProperty("Office")){
					tmpOffice = data.results.bindings[i].Office.value;
				}
				else{
					tmpOffice = '';
				}
				if(data.results.bindings[i].hasOwnProperty("PhoneNumber")){
					tmpPhone = data.results.bindings[i].PhoneNumber.value;
				}
				else{
					tmpPhone = '';
				}
				tmpPosition = data.results.bindings[i].Position.value;
				tmpDivision = data.results.bindings[i].Division.value;
				tmpGroup = data.results.bindings[i].Group.value;
				//send a cursor looking through the rest of the list for duplicates
				for(cursor = i+1; cursor < data.results.bindings.length; cursor++){
					//if we find a match between the current person/skill and the cursor's person/skill...
					if((data.results.bindings[i].Person.value == data.results.bindings[cursor].Person.value) && (data.results.bindings[i].SkillLevel.value == data.results.bindings[cursor].SkillLevel.value)){
						//add the cursor's row to the list of duplicate indexes
						duplicateRows.push(cursor);
						//concatenate the results from the duplicate row with the temp variable
						if(data.results.bindings[i].Office.value != data.results.bindings[cursor].Office.value){
							tmpOffice = tmpOffice + ', ' + data.results.bindings[cursor].Office.value
						}
						if(data.results.bindings[i].PhoneNumber.value != data.results.bindings[cursor].PhoneNumber.value){
							tmpPhone = tmpPhone + ', ' + data.results.bindings[cursor].PhoneNumber.value
						}
						if(data.results.bindings[i].Position.value != data.results.bindings[cursor].Position.value){
							tmpPosition = tmpPosition + ', ' + ata.results.bindings[cursor].Position.value
						}
						if(data.results.bindings[i].Division.value != data.results.bindings[cursor].Division.value){
							tmpDivision = tmpDivision + ', ' + data.results.bindings[cursor].Division.value
						}
						if(data.results.bindings[i].Group.value != data.results.bindings[cursor].Group.value){
							tmpGroup = tmpGroup + ', ' + data.results.bindings[cursor].Group.value
						}
					}
				}
				//push the temp variables into our fixed list in pretty JSON format
				fixedList.push({"Person": {"type":"literal", "value": tmpPerson},
								"Skill": {"type":"literal", "value": tmpSkill}, 
								"Office": {"type":"literal", "value": tmpOffice},
								"PhoneNumber": {"type":"literal", "value": tmpPhone},
								"Position": {"type":"literal", "value": tmpPosition},
								"Division": {"type":"literal", "value": tmpDivision},
								"Group": {"type":"literal", "value":tmpGroup}});
			}
		}
		//set the results to be our entire fixed list rather than the raw SPARQL results
		data.results.bindings = fixedList;
		$scope.skills = data;
	}).error(function(data,status) {
		$scope.error = "Fuseki returned: " + status;
	});
	
	$scope.orderProp = "Person.value";

}
function AddSkillCtrl($scope, $http){
	$scope.itemsPerPage = 10;
	$scope.currentPage = 0;
	var queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT ?person ?personuri WHERE{ ?personuri a foaf:Person . ?personuri rdfs:label ?person}";
	var queryPart = "query=" + escape(queryStr);	
	
	$http({
		method: 'POST',
		url: 'http://lasp-db-dev:3030/VIVO/query',
		data: queryPart,
		headers: {"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'}
	}).success(function(data) {
		$scope.peoplelist = data.results.bindings;
		$scope.addPersonList = [];
	}).error(function(data,status) {
		$scope.error = "Fuseki person query returned: " + status;
	});
	
	queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#> SELECT ?skill ?skilluri WHERE{?skilluri a laspskills:SkillLevel . ?skilluri rdfs:label ?skill} ORDER BY desc(?skill)";
	queryPart = "query=" + escape(queryStr);
	$http({
		method: 'POST',
		url: 'http://lasp-db-dev:3030/VIVO/query',
		data: queryPart,
		headers: {"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'}
	}).success(function(data) {
		$scope.skilllist = data.results.bindings;
		$scope.addSkillList = [];
	}).error(function(data,status) {
		$scope.error = "Fuseki skill query returned: " + status;
	});

}