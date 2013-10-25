describe('Unit Tests - controller: allSkillsCtrl', function(){
    
    var $httpBackend, $http, $scope, $rootScope, $dataFactory, $formatFactory, $controller;
    var ctrl = null;  
       
    beforeEach(angular.mock.module('skillsmodule'));
	
	beforeEach(inject(function($httpBackend, $http, $rootScope, dataFactory, formatFactory, $controller){
		$httpBackend = $httpBackend;
		$http = $http;
		$scope = $rootScope.$new();
		$dataFactory = dataFactory;
		$formatFactory = formatFactory;
		$httpBackend.expectPOST("http://lasp-db-dev:3030/VIVO/query",
								"query="+escape("PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#>  SELECT ?Person ?personuri ?Skill ?SkillLevel ?skillleveluri ?Office ?Email ?PhoneNumber ?Position ?Division ?Group WHERE { ?personuri a foaf:Person . ?personuri rdfs:label ?Person . ?personuri laspskills:hasSkill ?skillleveluri . ?skillleveluri rdfs:label ?SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?Skill . OPTIONAL{?personuri vivo:primaryEmail ?Email}. OPTIONAL{?personuri vivo:hasFacility ?roomuri . ?roomuri rdfs:label ?Office} . OPTIONAL{?personuri vivo:phoneNumber ?PhoneNumber} . OPTIONAL{?personuri vivo:personInPosition ?positionuri . ?positionuri rdfs:label ?Position . ?positionuri vivo:positionInOrganization ?groupuri . ?groupuri rdfs:label ?Group . ?groupuri vivo:subOrganizationWithin ?divisionuri . ?divisionuri rdfs:label ?Division }}"),
								{"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'})
								.respond(200);
    	/* Below runs our controller code.  Note that it won't actually send its http request to the real server, but it will send it instead to
    	 * our httpBackend, so it won't actually return any JSON from the endpoint.  
    	 */
    	ctrl = $controller('allSkillsCtrl', {
			$scope: $scope,
			$dataFactory: dataFactory,
			$formatFactory: formatFactory,
			$http: $http
		});
    	$httpBackend.flush();
    }));
   
	/* Format for tests:
	it("did something correctly", function(){
		//arrange: code that sets up a scenario on which to run a unit test, i.e:
		$scope.variableA = 2;
		$scope.variableB = 4;
		
		//act: code that runs the function that we're testing on our test scenario above, i.e:
		var testAnswer = $scope.addFunctionToBeTested($scope.variableA, $scope.variableB);
		
		//assert: check that our tested function returns what we'd expect given our test scenario, i.e:
		expect(testAnswer).toEqual(6);	 
	});
	*/
   
    it("can get an instance of dataFactory", function(){
    	//all assertions since $dataFactory was set up in our beforeEach above
    	expect($dataFactory).toBeDefined();
    });
 
 	it("can get an instance of formatFactory", function(){
 		//all assertions since $dataFactory was set up in our beforeEach above
    	expect($formatFactory).toBeDefined();
    });
    
    it("can find dataFactory.getSPARQLQuery()", function(){
    	//all assertions since $dataFactory was set up in our beforeEach above
    	expect($dataFactory.getSPARQLQuery).toBeDefined();
    });
   
    it("sent the correct SPARQL query tp the correct place", function(){
    	//all assertion since $scope has already been created by the controller in beforeEach above
    	expect($scope.urlBase).toBe("http://lasp-db-dev:3030/VIVO/query");
    	expect($scope.queryStr).toBe("PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#>  SELECT ?Person ?personuri ?Skill ?SkillLevel ?skillleveluri ?Office ?Email ?PhoneNumber ?Position ?Division ?Group WHERE { ?personuri a foaf:Person . ?personuri rdfs:label ?Person . ?personuri laspskills:hasSkill ?skillleveluri . ?skillleveluri rdfs:label ?SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?Skill . OPTIONAL{?personuri vivo:primaryEmail ?Email}. OPTIONAL{?personuri vivo:hasFacility ?roomuri . ?roomuri rdfs:label ?Office} . OPTIONAL{?personuri vivo:phoneNumber ?PhoneNumber} . OPTIONAL{?personuri vivo:personInPosition ?positionuri . ?positionuri rdfs:label ?Position . ?positionuri vivo:positionInOrganization ?groupuri . ?groupuri rdfs:label ?Group . ?groupuri vivo:subOrganizationWithin ?divisionuri . ?divisionuri rdfs:label ?Division }}");
    });
    
    /*  To be written soon...
    it("can get results from the real SPARQL endpoint", function(){
    	//arrange
    	//var urlBase = 'http://lasp-db-dev:3030/VIVO/query';
    	//var queryStr = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#>  SELECT ?Person ?personuri ?Skill ?SkillLevel ?skillleveluri ?Office ?Email ?PhoneNumber ?Position ?Division ?Group WHERE { ?personuri a foaf:Person . ?personuri rdfs:label ?Person . ?personuri laspskills:hasSkill ?skillleveluri . ?skillleveluri rdfs:label ?SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?Skill . OPTIONAL{?personuri vivo:primaryEmail ?Email}. OPTIONAL{?personuri vivo:hasFacility ?roomuri . ?roomuri rdfs:label ?Office} . OPTIONAL{?personuri vivo:phoneNumber ?PhoneNumber} . OPTIONAL{?personuri vivo:personInPosition ?positionuri . ?positionuri rdfs:label ?Position . ?positionuri vivo:positionInOrganization ?groupuri . ?groupuri rdfs:label ?Group . ?groupuri vivo:subOrganizationWithin ?divisionuri . ?divisionuri rdfs:label ?Division }}";
	   
	   //act
	   //$dataFactory.getSPARQLQuery(urlBase, queryStr);
	   
   		//assert
   		//expect('what it returned).toBe('what we expected');
	*/
});