describe('controller: allSkillsCtrl', function(){
    
    var $httpBackend, $rootScope, $dataFactory, $controller;
       
    beforeEach(angular.mock.module('skillsmodule'));

    beforeEach(inject(function($injector) {
  		$httpBackend = $injector.get('$httpBackend');
    	$rootScope = $injector.get('$rootScope');
    	$dataFactory = $injector.get('dataFactory');
    	$controller = $injector.get('$controller');
    	
    }));
    
    it("can get an instance of dataFactory", function(){
    	expect($dataFactory).toBeDefined();
    });
 
	it("should send a POST to our SPARQL endpoint", function(){
		//expect($rootScope.queryStr).toEqual("PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#>  SELECT ?Person ?personuri ?Skill ?SkillLevel ?skillleveluri ?Office ?Email ?PhoneNumber ?Position ?Division ?Group WHERE { ?personuri a foaf:Person . ?personuri rdfs:label ?Person . ?personuri laspskills:hasSkill ?skillleveluri . ?skillleveluri rdfs:label ?SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?Skill . OPTIONAL{?personuri vivo:primaryEmail ?Email}. OPTIONAL{?personuri vivo:hasFacility ?roomuri . ?roomuri rdfs:label ?Office} . OPTIONAL{?personuri vivo:phoneNumber ?PhoneNumber} . OPTIONAL{?personuri vivo:personInPosition ?positionuri . ?positionuri rdfs:label ?Position . ?positionuri vivo:positionInOrganization ?groupuri . ?groupuri rdfs:label ?Group . ?groupuri vivo:subOrganizationWithin ?divisionuri . ?divisionuri rdfs:label ?Division }}");
		$httpBackend.expectPOST('http://lasp-db-dev:3030/VIVO/query',"query="+escape($rootScope.queryStr), {"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'}).respond(200);
		$dataFactory.getSPARQLQuery($rootScope.queryStr);
		$httpBackend.flush();
	});
    
});