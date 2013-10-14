'use strict';

/* Controllers */
//read in a local json file
function SkillsCtrl($scope, $http){
	var queryStr = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#>  SELECT ?Person ?personuri ?Skill ?SkillLevel ?skillleveluri ?Office ?Email ?PhoneNumber ?Position ?Division ?Group WHERE { ?personuri a foaf:Person . ?personuri rdfs:label ?Person . ?personuri laspskills:hasSkill ?skillleveluri . ?skillleveluri rdfs:label ?SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?Skill . OPTIONAL{?personuri vivo:primaryEmail ?Email}. OPTIONAL{?personuri vivo:hasFacility ?roomuri . ?roomuri rdfs:label ?Office} . OPTIONAL{?personuri vivo:phoneNumber ?PhoneNumber} . OPTIONAL{?personuri vivo:personInPosition ?positionuri . ?positionuri rdfs:label ?Position . ?positionuri vivo:positionInOrganization ?groupuri . ?groupuri rdfs:label ?Group . ?groupuri vivo:subOrganizationWithin ?divisionuri . ?divisionuri rdfs:label ?Division }}";
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
		var tmpEmail = '';
		var tmpPhone = '';
		var tmpPosition = '';
		var tmpDivision = '';
		var tmpGroup = '';
		var tmpPersonURI = '';
		var tmpSkillURI = '';
		//search for duplicates in person name and skill columns and combine where both match
		//an array to store indexes of any duplicate rows
		var duplicateRows = [];
		var cursor = 0;
		for (var i=0; i < data.results.bindings.length; i++){
			//ignore the rows that have already been marked as duplicates.
			if(duplicateRows.indexOf(i) == -1){ 
				//set the temp variables to the results from each row
				tmpPerson = data.results.bindings[i].Person.value;
				tmpPersonURI = data.results.bindings[i].personuri.value;
				tmpSkill = data.results.bindings[i].SkillLevel.value;
				tmpSkillURI = data.results.bindings[i].skillleveluri.value;
				//if a person doesn't have an office or phone, that does not show up in the results JSON, so we must be careful and watch for that.
				if(data.results.bindings[i].hasOwnProperty("Office")){
					tmpOffice = data.results.bindings[i].Office.value;
				}
				else{
					tmpOffice = '';
				}
				if(data.results.bindings[i].hasOwnProperty("Email")){
					tmpEmail = data.results.bindings[i].Email.value;
				}
				else{
					tmpEmail = '';
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
							tmpOffice = tmpOffice + ', ' + data.results.bindings[cursor].Office.value;
						}
						if(data.results.bindings[i].PhoneNumber.value != data.results.bindings[cursor].PhoneNumber.value){
							tmpPhone = tmpPhone + ', ' + data.results.bindings[cursor].PhoneNumber.value;
						}
						if(data.results.bindings[i].Position.value != data.results.bindings[cursor].Position.value){
							tmpPosition = tmpPosition + ', ' + ata.results.bindings[cursor].Position.value;
						}
						if(data.results.bindings[i].Division.value != data.results.bindings[cursor].Division.value){
							tmpDivision = tmpDivision + ', ' + data.results.bindings[cursor].Division.value;
						}
						if(data.results.bindings[i].Group.value != data.results.bindings[cursor].Group.value){
							tmpGroup = tmpGroup + ', ' + data.results.bindings[cursor].Group.value;
						}
					}
				}
				//push the temp variables into our fixed list in pretty JSON format
				fixedList.push({"Person": {"type":"literal", "value": tmpPerson},
								"PersonURI": {"type":"literal", "value": tmpPersonURI},
								"Skill": {"type":"literal", "value": tmpSkill}, 
								"SkillURI": {"type":"literal", "value": tmpSkillURI},
								"Office": {"type":"literal", "value": tmpOffice},
								"Email": {"type":"literal", "value": tmpEmail},
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
	
	$scope.DeleteButtonPressed = function(name, personuri, skill, skilluri, $index){
		var moveon = confirm("Delete "+name+"'s "+skill+" skill?");
		if (moveon)
		  {
			alert("Deleting "+name+"'s "+skill+" skill.  Wait a moment and refresh your page to see the change.");
			ajaxSubmitDeletion(personuri, skilluri);
		  }
		else
		  {
		  return;
		  } 
	};
	
	function ajaxSubmitDeletion(personuri, skilluri) {
		var deletionText = "personuri,leveluri\n";
		deletionText += personuri+","+skilluri+"\n"
		//alert(deletionText);
        $.ajax
        ({
			type: "POST",
			url: "lib/removebuttonaction.php",
			data: {DeletionText : deletionText}, 
        });
	};
}

function AddSkillCtrl($scope, $http, $timeout, $filter){
	var queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT ?person ?personuri WHERE{ ?personuri a foaf:Person . ?personuri rdfs:label ?person}";
	var queryPart = "query=" + escape(queryStr);	
	var list1 = [];
	var list2 = [];
	
	$http({
		method: 'POST',
		url: 'http://lasp-db-dev:3030/VIVO/query',
		data: queryPart,
		headers: {"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'}
	}).success(function(data) {
	    //this greatly simplifies our json structure
	    for(var i=0;i<data.results.bindings.length;i++){
	        list1.push({"person": data.results.bindings[i].person.value,
	                   "uri": data.results.bindings[i].personuri.value});
	    }
	    $scope.peoplelist = list1;
		$scope.addPersonList = [];
        $scope.filterPeople();
	}).error(function(data,status) {
		$scope.error = "Fuseki person query returned: " + status;
	});

	queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#> SELECT ?skill ?skilllevel ?skillleveluri WHERE{?skillleveluri a laspskills:SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?skill . ?skillleveluri rdfs:label ?skilllevel} ORDER BY asc(?skilllevel)";
	queryPart = "query=" + escape(queryStr);
	$http({
		method: 'POST',
		url: 'http://lasp-db-dev:3030/VIVO/query',
		data: queryPart,
		headers: {"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'}
	}).success(function(data) {
	    //create empty array to build representation of all skill levels
		var levelList = [];
		//alert(JSON.stringify(data.results.bindings));
	    for(var i=0;i<data.results.bindings.length;){
			//empty the level list and prepare a cursor...
			levelList = [];
			var cursor = i+1;
			//add the first skill level
			levelList.push({"skilllevel": data.results.bindings[i].skilllevel.value,
							"skillleveluri": data.results.bindings[i].skillleveluri.value});
			//iterate down through list of results while the skill name at the cursor is still the same as the skill name at i
			while(data.results.bindings[i].skill.value == data.results.bindings[cursor].skill.value){
				//add the skill level from the cursor row to the levelList
				levelList.push({"skilllevel": data.results.bindings[cursor].skilllevel.value,
								"skillleveluri": data.results.bindings[cursor].skillleveluri.value});
				//check that another row exists
				if(cursor+1 < data.results.bindings.length){
					cursor++;
				}
				//otherwise, we're done
				else{
					break;
				}
			}

			//add the skill and all its levels into a finalized JSON object and append it to our final skill list
			list2.push({"skill": data.results.bindings[i].skill.value,
						"levels": levelList});
			//if there are more skills...
			if(cursor+1 < data.results.bindings.length){
				//move i to the cursor and continue
				i = cursor;
			}
			//otherwise, we're done
			else{
				break;
			}
        }
		//alert(JSON.stringify(list2));
		$scope.skilllist = list2;
		$scope.addSkillList = [];
		$scope.filterSkills();
	}).error(function(data,status) {
		$scope.error = "Fuseki skill query returned: " + status;
	});
	
	//function to remove the skill names from the skill level dropdown options
	$scope.skillLevelDisplay = function(skill, skilllevel){
	    return skilllevel.replace(skill, "");
	};
	//Necessary for draggable objects to return the correct index
	$scope.filteredPeople = []; 
	$scope.filteredSkills = [];
	$scope.currentPagePeople = 1;
    $scope.currentPageSkills = 1; 
	
	$scope.filterSkills = function(){
	    $scope.filteredSkills = $filter('QuickSearch')($scope.skilllist, $scope.skillquery, "skill");
	    $scope.groupToPagesSkills();
	    return $scope.filteredSkills;
	};
	$scope.filterPeople = function(){
	    $scope.filteredPeople = $filter('QuickSearch')($scope.peoplelist, $scope.personquery, "person");
        $scope.groupToPagesPeople();
        return $scope.filteredPeople;
    };
    
	//function to run when the submit button is pressed
	$scope.SubmitButtonPressed = function(){
		if($scope.addPersonList.length < 1){
			alert("Please select at least one person.");
			return;
		}
		if($scope.addSkillList.length < 1){
			alert("Please select at least one skill.");
			return;
		}
		$scope.SubmitText = "personuri,leveluri\n";
		var levelSelected = 0;
		for(var i=0; i < $scope.addPersonList.length; i++){
			for(var j=0; j < $scope.addSkillList.length; j++){
			    $scope.SubmitText += $scope.addPersonList[i].uri + ",";
				levelSelected = document.getElementById($scope.addSkillList[j].skill).selectedIndex;
				$scope.SubmitText += $scope.addSkillList[j].levels[levelSelected].skillleveluri + "\n";
			}
		}
		//alert($scope.SubmitText);
		//display cute working gif even though it doesn't matter
		document.getElementById("submitButtonDiv").innerHTML = '<img src="images/loading.gif"/><br>Working... ';
		//actually post the new skill(s)
		ajaxSubmitNewSkillMap();
		//wait 5 seconds and then display a success message (yes, this is a lie since the skill may or may not have been added by now)
		setTimeout(function(){document.getElementById("submitButtonDiv").innerHTML = 'Done. ';}, 5000);
		setTimeout(function(){alert("New skill mapping added!"); location.reload();},5000);
	};
	
	function ajaxSubmitNewSkillMap() {
        $.ajax
        ({
			type: "POST",
			url: "lib/submitbuttonaction.php",
			data: {SubmitText : $scope.SubmitText}, 
        });
		//location.reload();  ////***NOTE:  this line causes the app to no longer write the .csv or add records... not sure why, refreshing "too fast"?***
	};
	
	//Add and Remove Button Functions
	$scope.removeFromAddPerson = function(index){
	    $scope.peoplelist.push($scope.addPersonList[index]);
	    $scope.addPersonList.splice(index,1);
	    $scope.filterPeople();
	};
	$scope.addToPeople = function(person){
	    var actualIndex = $scope.peoplelist.indexOf(person);
	    $scope.addPersonList.push($scope.peoplelist[actualIndex]);
        $scope.peoplelist.splice(actualIndex,1);
        $scope.filterPeople();
	};
	$scope.removeFromAddSkill = function(index){
        $scope.skilllist.push($scope.addSkillList[index]);
        $scope.addSkillList.splice(index,1);
        $scope.filterSkills();
    };
    $scope.addToSkills = function(skill){
        var actualIndex = $scope.skilllist.indexOf(skill);
        $scope.addSkillList.push($scope.skilllist[actualIndex]);
        $scope.skilllist.splice(actualIndex,1);
        $scope.filterSkills();
    };

    //search functions
    $scope.searchPeople = function(person){
        if(person.length > 2){
            $scope.currentPagePeople = 1;
        }
        return $scope.filterPeople();
    };

    $scope.searchSkills = function(skill){
        if(skill.length > 2){
            $scope.currentPageSkills = 1;
        }
        return $scope.filterSkills();
    };

    //Pagination Functions 
    $scope.itemsPerPage = 15;
    $scope.maxPages = 5;
    
    $scope.groupToPagesPeople = function () {
        $scope.pagedPeople = [];
        for (var i = 0; i < $scope.filteredPeople.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
              $scope.pagedPeople[Math.floor(i/$scope.itemsPerPage)] = [ $scope.filteredPeople[i] ];
          }  else {
              $scope.pagedPeople[Math.floor(i/$scope.itemsPerPage)].push($scope.filteredPeople[i]);
          }
        }
    };    
    $scope.groupToPagesSkills = function () {
        $scope.pagedSkills = [];
        for (var i = 0; i < $scope.filteredSkills.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
              $scope.pagedSkills[Math.floor(i/$scope.itemsPerPage)] = [ $scope.filteredSkills[i] ];
          }  else {
              $scope.pagedSkills[Math.floor(i/$scope.itemsPerPage)].push($scope.filteredSkills[i]);
          }
        }
    };
    
    $scope.countPeople = function(){
        var count = 0;
		if (typeof $scope.pagedPeople === 'undefined'){
           return count; 
        } 
        for (var i = 0; i < $scope.pagedPeople.length; i++) {
            count += $scope.pagedPeople[i].length;
        }
        return count;
    };
    $scope.countSkills = function(){
        var count = 0;
		if (typeof $scope.pagedSkills === 'undefined'){
			return count; 
		} 
        for (var i = 0; i < $scope.pagedSkills.length; i++) {
            count += $scope.pagedSkills[i].length;
        }
        return count;
    };
}