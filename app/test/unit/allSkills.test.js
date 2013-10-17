'use strict';
 
describe('controller: allSkillsCtrl', function(){
    
    beforeEach(function(){
		module('skillsmodule');
    });
    
    beforeEach(inject(function($controller, $rootScope, dataFactory, formatFactory, $httpBackend) {
    	this.$httpBackend = $httpBackend;
    	this.scope = $rootScope.$new();
    	$controller('allSkillsCtrl', {
    		$scope: this.scope, 
    		dataFactory: dataFactory,
    		formatFactory: formatFactory
    	});
    }));
    
	describe("successfully ran SPARQL query", function(){
   		it("should give you a list of results with 11 columns", function(){
   			//arrange
   			this.$httpBackend.expectPOST('http://lasp-db-dev:3030/VIVO/query',"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#>  SELECT ?Person ?personuri ?Skill ?SkillLevel ?skillleveluri ?Office ?Email ?PhoneNumber ?Position ?Division ?Group WHERE { ?personuri a foaf:Person . ?personuri rdfs:label ?Person . ?personuri laspskills:hasSkill ?skillleveluri . ?skillleveluri rdfs:label ?SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?Skill . OPTIONAL{?personuri vivo:primaryEmail ?Email}. OPTIONAL{?personuri vivo:hasFacility ?roomuri . ?roomuri rdfs:label ?Office} . OPTIONAL{?personuri vivo:phoneNumber ?PhoneNumber} . OPTIONAL{?personuri vivo:personInPosition ?positionuri . ?positionuri rdfs:label ?Position . ?positionuri vivo:positionInOrganization ?groupuri . ?groupuri rdfs:label ?Group . ?groupuri vivo:subOrganizationWithin ?divisionuri . ?divisionuri rdfs:label ?Division }}",{headers: {"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'}}).respond(200);
   			//act
   			$controller.getPersonnel();
   			this.$httpBackend.flush();
   			//assertions
   			expect(this.scope.skills.length).toEqual('5');
   		});
	});
    
});