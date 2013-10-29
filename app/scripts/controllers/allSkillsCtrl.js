'use strict';

skillsmodule.controller('allSkillsCtrl', ['$scope','dataFactory','formatFactory',function ($scope, dataFactory, formatFactory){      
    
    	$scope.urlBase = 'http://lasp-db-dev:3030/VIVO/query';
    	$scope.queryStr = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#>  SELECT ?Person ?personuri ?Skill ?SkillLevel ?skillleveluri ?Office ?Email ?PhoneNumber ?Position ?Division ?Group WHERE { ?personuri a foaf:Person . ?personuri rdfs:label ?Person . ?personuri laspskills:hasSkill ?skillleveluri . ?skillleveluri rdfs:label ?SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?Skill . OPTIONAL{?personuri vivo:primaryEmail ?Email}. OPTIONAL{?personuri vivo:hasFacility ?roomuri . ?roomuri rdfs:label ?Office} . OPTIONAL{?personuri vivo:phoneNumber ?PhoneNumber} . OPTIONAL{?personuri vivo:personInPosition ?positionuri . ?positionuri rdfs:label ?Position . ?positionuri vivo:positionInOrganization ?groupuri . ?groupuri rdfs:label ?Group . ?groupuri vivo:subOrganizationWithin ?divisionuri . ?divisionuri rdfs:label ?Division }}";
	    $scope.getPersonnel = function(){
	        dataFactory.getSPARQLQuery($scope.urlBase, $scope.queryStr)
	            .success(function(data){
	            	$scope.error = '';
	            	if(data){
	                	$scope.skills = formatFactory.formatMasterList(data);
	               }
	            })
	            .error(function(data,status) {
	                $scope.error = "Fuseki returned: " + status;
	        	});
	    };	
	    
	    $scope.getPersonnel();
	    	
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
	        deletionText += personuri+","+skilluri+"\n";
	        $.ajax
	        ({
	            type: "POST",
	            url: "scripts/button_actions/removebuttonaction.php",
	            data: {DeletionText : deletionText}, 
	        });
	    };
}]);
