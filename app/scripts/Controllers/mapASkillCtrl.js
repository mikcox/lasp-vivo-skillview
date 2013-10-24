'use strict';

skillsmodule.controller('mapASkillCtrl', ['$scope','$filter','dataFactory','formatFactory',function ($scope, $filter,dataFactory, formatFactory){
    $scope.filteredPeople = []; 
    $scope.filteredSkills = [];
    $scope.addPersonList = [];
    $scope.addSkillList = [];
    $scope.currentPagePeople = 1;
    $scope.currentPageSkills = 1; 
    
    getPersonnel();
    getSkills();  
    
    function getPersonnel(){
        var queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT ?person ?personuri WHERE{ ?personuri a foaf:Person . ?personuri rdfs:label ?person}";
        dataFactory.getSPARQLQuery(queryStr)
            .success(function(data){
                $scope.peoplelist = formatFactory.formatPersonnelList(data);
                $scope.filterPeople();
            })
            .error(function(data,status) {
                $scope.error = "Fuseki person query returned: " + status;
        });
    }
    
    function getSkills(){
        var queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#> SELECT ?skill ?skilllevel ?skillleveluri WHERE{?skillleveluri a laspskills:SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?skill . ?skillleveluri rdfs:label ?skilllevel} ORDER BY asc(?skilllevel)";
        dataFactory.getSPARQLQuery(queryStr)
            .success(function(data){
                $scope.skilllist = formatFactory.formatSkillList(data);
                $scope.filterSkills();
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
        $scope.pagedSkills = groupToPages($scope.filteredSkills);
        return $scope.filteredSkills;
    };
    $scope.filterPeople = function(){
        $scope.filteredPeople = $filter('QuickSearch')($scope.peoplelist, $scope.personquery, "person");
        $scope.pagedPeople = groupToPages($scope.filteredPeople);
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
    
    function groupToPages(list) {
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