'use strict';

skillsmodule.controller('mapASkillCtrl', ['$scope','$filter','dataFactory','formatFactory',function ($scope, $filter,dataFactory, formatFactory){
    $scope.filteredPeople = []; 
    $scope.filteredSkills = [];
    $scope.addPersonList = [];
    $scope.addSkillList = [];
    $scope.currentPagePeople = 1;
    $scope.currentPageSkills = 1; 
   
   
        $scope.urlBase = 'http://lasp-db-dev:3030/VIVO/query';
    
    getPersonnel();
    getSkills();  
    
        function getPersonnel(){
                $scope.personQueryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT ?person ?personuri WHERE{ ?personuri a foaf:Person . ?personuri rdfs:label ?person}";
    
                dataFactory.getSPARQLQuery($scope.urlBase, $scope.personQueryStr)
                        .success(function(data){
                                $scope.error = '';
                                if(data){
                                        $scope.peoplelist = formatFactory.formatPersonnelList(data);
                                        $scope.filterPeople();
                                }
            })
            .error(function(data,status) {
                $scope.error = "Fuseki person query returned: " + status;
                });
        }
    
    function getSkills(){
        $scope.skillQueryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#> SELECT ?skill ?skilllevel ?skillleveluri WHERE{?skillleveluri a laspskills:SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?skill . ?skillleveluri rdfs:label ?skilllevel} ORDER BY asc(?skill) asc(?skilllevel)";
        dataFactory.getSPARQLQuery($scope.urlBase, $scope.skillQueryStr)
            .success(function(data){
                    $scope.error = '';
                    if(data){
                        $scope.skilllist = formatFactory.formatSkillList(data);
                        $scope.filterSkills();
               }
            })
            .error(function(data,status) {
                $scope.error = "Fuseki person query returned: " + status;
        });
    }
    
    //function to remove the skill names from the skill level dropdown options
    $scope.skillLevelDisplay = function(skill, skilllevel){
        return skilllevel.replace(skill, "");
    };
    
    $scope.filterSkills = function(){
        $scope.filteredSkills = $filter('QuickSearch')($scope.skilllist, $scope.skillquery, "skill");
        //groupToPages() does not filter input
        $scope.pagedSkills = $scope.groupToPages($scope.filteredSkills);
        return $scope.filteredSkills;
    };
    $scope.filterPeople = function(){
        $scope.filteredPeople = $filter('QuickSearch')($scope.peoplelist, $scope.personquery, "person");
        //groupToPages() does not filter input
        $scope.pagedPeople = $scope.groupToPages($scope.filteredPeople);
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
        $scope.SubmitText = "personuri,leveluri,skill\n";
        var levelSelected = 0;
        var addingNewSkill = false;
        for(var i=0; i < $scope.addPersonList.length; i++){
            for(var j=0; j < $scope.addSkillList.length; j++){
            	if($scope.addSkillList[j].levels[levelSelected].skillleveluri.indexOf("fakeuri") !== -1){
                	addingNewSkill = true;
                }
                $scope.SubmitText += $scope.addPersonList[i].uri + ",";
                levelSelected = document.getElementById($scope.addSkillList[j].skill).selectedIndex;
                $scope.SubmitText += $scope.addSkillList[j].levels[levelSelected].skillleveluri + ",";
                $scope.SubmitText += $scope.addSkillList[j].skill + "\n";
            }
        }
        if(addingNewSkill){
        	var moveon = confirm("Warning: You are about to add a new skill to the database that didn't exist before.  Only continue if you are SURE that this skill (or any alternate way of spelling it) doesn't already exist in the database.");	
			if(!moveon){
				return;
			}        
        }
        //display cute working gif even though it doesn't really know anything about anything
        document.getElementById("submitButtonDiv").innerHTML = '<img src="images/loading.gif"/><br>Working... ';
        //actually post the new skill(s), using the corresponding version of the harvester if the skill doesn't already exist
        if(addingNewSkill){
        	ajaxSubmitNewSkillMap();
        }
        else{
        	ajaxSubmitExistingSkillMap();
        }
        //wait 5 seconds and then display a success message (yes, this is a lie since the skill may or may not have actually been added by now)
        setTimeout(function(){document.getElementById("submitButtonDiv").innerHTML = 'Done. ';}, 5000);
        setTimeout(function(){alert("New skill mapping added!"); location.reload();},5000);
    };
    
    function ajaxSubmitNewSkillMap() {
        $.ajax
        ({
            type: "POST",
            url: "scripts/button_actions/submitButtonActionNewSkill.php",
            data: {SubmitText : $scope.SubmitText}, 
        });
    };
    
    function ajaxSubmitExistingSkillMap() {
        $.ajax
        ({
            type: "POST",
            url: "scripts/button_actions/submitButtonAction.php",
            data: {SubmitText : $scope.SubmitText}, 
        });
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
    $scope.addNewSkill = function(skill){
    	$scope.skilllist.push({
    		"skill": skill,
    		"levels": [
    		{"skilllevel": skill+" (unranked)",
             "skillleveluri": "fakeuri1"},
    		{"skilllevel": skill+" beginner",
             "skillleveluri": "fakeuri2"},
    		{"skilllevel": skill+" intermediate",
             "skillleveluri": "fakeuri3"},
    		{"skilllevel": skill+" advanced",
             "skillleveluri": "fakeuri4"},
    		{"skilllevel": skill+" guru",
             "skillleveluri": "fakeuri5"}]
    	});
    	$scope.searchSkills(skill);
    };

    //search functions
    $scope.searchPeople = function(person){
        if(person.length > 0){
            $scope.currentPagePeople = 1;
        }
        return $scope.filterPeople();
    };

    $scope.searchSkills = function(skill){
        if(skill.length > 0){
            $scope.currentPageSkills = 1;
        }
        return $scope.filterSkills();
    };

    //Pagination Functions 
    $scope.itemsPerPage = 15;
    $scope.maxPages = 5;
    
    //groupToPages() does not filter input
    $scope.groupToPages = function(list) {
        var pagedList = [];
        for (var i = 0; i < list.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
              pagedList[Math.floor(i/$scope.itemsPerPage)] = [ list[i] ];
          }  else {
              pagedList[Math.floor(i/$scope.itemsPerPage)].push(list[i]);
          }
        }
        return pagedList;
    };
    
    $scope.countPagedList = function(list){
        var count = 0;
        if (typeof list === 'undefined'){
            return count;
        }
        for (var i = 0; i < list.length; i++){
            count += list[i].length;
        }
        return count;
    };
}]);
