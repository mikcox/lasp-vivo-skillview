describe('controller: allSkillsCtrl', function(){
    
    var $httpBackend, $rootScope, $dataFactory, $formatFactory, $controller;
       
    beforeEach(angular.mock.module('skillsmodule'));

    beforeEach(inject(function($injector) {
  		$httpBackend = $injector.get('$httpBackend');
    	$rootScope = $injector.get('$rootScope');
    	$dataFactory = $injector.get('dataFactory');
    	$formatFactory = $injector.get('formatFactory');
    	$controller = $injector.get('$controller');
    	
    }));
    
    it("can get an instance of dataFactory", function(){
    	expect($dataFactory).toBeDefined();
    });
 
 	it("can get an instance of formatFactory", function(){
    	expect($formatFactory).toBeDefined();
    });
    
    it("can find dataFactory.getSPARQLQuery()", function(){
    	expect($dataFactory.getSPARQLQuery).toBeDefined();
    });
 
	it("should send a POST to our SPARQL endpoint", function(){
		//for testing against the real database (instead of below):
		$httpBackend.expectPOST("http://lasp-db-dev:3030/VIVO/query","query="+escape($rootScope.queryStr), {"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'}).respond(200);
		
		//for testing against your local MySQL install (instead of above):
		//$httpBackend.expectPOST("http://localhost:3030/VIVO/query","query="+escape($rootScope.queryStr), {"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'}).respond(200);

		$dataFactory.getSPARQLQuery($rootScope.queryStr);
		$httpBackend.flush();
	});
    
});