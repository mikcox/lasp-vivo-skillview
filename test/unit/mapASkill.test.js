//unit tests used by the allSkillsCtrl controller
describe('Unit Tests: mapASkillCtrl', function(){
    
    var $httpBackend, $http, $scope, $rootScope, $dataFactory, $formatFactory, $controller;
    var ctrl = null;  
       
    beforeEach(angular.mock.module('skillsmodule'));
	
	beforeEach(inject(function($httpBackend, $http, $rootScope, dataFactory, formatFactory, $controller){
		$httpBackend = $httpBackend;
		$http = $http;
		$scope = $rootScope.$new();
		$dataFactory = dataFactory;
		$formatFactory = formatFactory;
		$httpBackend.expectPOST('http://lasp-db-dev:3030/VIVO/query',
								"query="+escape("PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT ?person ?personuri WHERE{ ?personuri a foaf:Person . ?personuri rdfs:label ?person}"),
								{"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'})
								.respond(200);
		$httpBackend.expectPOST('http://lasp-db-dev:3030/VIVO/query',
								"query="+escape("PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#> SELECT ?skill ?skilllevel ?skillleveluri WHERE{?skillleveluri a laspskills:SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?skill . ?skillleveluri rdfs:label ?skilllevel} ORDER BY asc(?skilllevel)"),
								{"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'})
								.respond(200);
    	/* Below runs our controller code.  Note that it won't actually send its http request to the real server, but it will send it instead to
    	 * our httpBackend, so it won't actually return any JSON from the endpoint.  
    	 */
    	ctrl = $controller('mapASkillCtrl', {
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
   
    it("sent the SPARQL queries to the correct place", function(){
    	//all assertion since $scope has already been created by the controller in beforeEach above
    	expect($scope.urlBase).toBe("http://lasp-db-dev:3030/VIVO/query");
    	expect($scope.personQueryStr).toBe("PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT ?person ?personuri WHERE{ ?personuri a foaf:Person . ?personuri rdfs:label ?person}");
		expect($scope.skillQueryStr).toBe("PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#> SELECT ?skill ?skilllevel ?skillleveluri WHERE{?skillleveluri a laspskills:SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?skill . ?skillleveluri rdfs:label ?skilllevel} ORDER BY asc(?skilllevel)");
    });
    
    it("SPARQL query returned without errors", function(){
    	//all assertions since $scope was set up in our beforeEach above
    	expect($scope.error).toBe('');
    });
    
    it("formatFactory.formatPersonnelList returns what we expect", function(){
    	//arrange
	    	//given these fake SPARQL results...
	    	var fakeSPARQLResults = {
  "head": {
    "vars": [ "person" , "personuri" ]
  } ,
  "results": {
    "bindings": [
      {
        "person": { "type": "literal" , "value": "Rosenshein, Miriam" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1953572127" }
      } ,
      {
        "person": { "type": "literal" , "value": "Beckman, Shawn" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n400097966" }
      } ,
      {
        "person": { "type": "literal" , "value": "Collette, Andrew" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012646325" }
      } ,
      {
        "person": { "type": "literal" , "value": "Pyke, Bryan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n295572919" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Baragiola, R A" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7999" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kaufhold, Alexandra" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890225154" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Lykke, K R" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3229" }
      } ,
      {
        "person": { "type": "literal" , "value": "Letourneau, Hannah" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n442363424" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "MacKinnon, A L" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3603" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kempf, Sascha" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1611913402" }
      } ,
      {
        "person": { "type": "literal" , "value": "Steg, Steve" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1580269363" }
      } ,
      {
        "person": { "type": "literal" , "value": "Myers, Casey" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1263641634" }
      } ,
      {
        "person": { "type": "literal" , "value": "Woodraska, Don" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n626213350" }
      } ,
      {
        "person": { "type": "literal" , "value": "LaClair, Jason" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907464116" }
      } ,
      {
        "person": { "type": "literal" , "value": "Burrows, Spenser" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n902811839" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ma, Huikang" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n557026557" }
      } ,
      {
        "person": { "type": "literal" , "value": "McGrath, Mike" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85999019" }
      } ,
      {
        "person": { "type": "literal" , "value": "Mason, Carolyn" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1092945436" }
      } ,
      {
        "person": { "type": "literal" , "value": "Jilek, Lisa" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207320044" }
      } ,
      {
        "person": { "type": "literal" , "value": "Smith, Dona" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n256748745" }
      } ,
      {
        "person": { "type": "literal" , "value": "Sturner, Andrew" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n975471748" }
      } ,
      {
        "person": { "type": "literal" , "value": "O'Malia, Kasandra" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308336345" }
      } ,
      {
        "person": { "type": "literal" , "xml:lang": "en-US" , "value": "Schneider, Nick" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917838557" }
      } ,
      {
        "person": { "type": "literal" , "value": "Vertovec, Audrey" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914550976" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Young, D T" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5764" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bershenyi, Gabe" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n93921936" }
      } ,
      {
        "person": { "type": "literal" , "value": "Emmett, Jeremy" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n279164454" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kohnert, Rick" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1029083323" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kien, Mark" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453839589" }
      } ,
      {
        "person": { "type": "literal" , "value": "Farneth, Don" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n939895236" }
      } ,
      {
        "person": { "type": "literal" , "value": "Stewart, Colin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474554423" }
      } ,
      {
        "person": { "type": "literal" , "value": "Guneratne, Gabriella" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n371682424" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hillier, Jonathan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532250141" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Henderson, M G" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5693" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Judge, D" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3730" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Tokar, R L" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7508" }
      } ,
      {
        "person": { "type": "literal" , "value": "Holsclaw, Greg" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000533497" }
      } ,
      {
        "person": { "type": "literal" , "value": "Califf, Samuel" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n717941184" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bryant, Karen" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n839305267" }
      } ,
      {
        "person": { "type": "literal" , "value": "Heath, Caitlin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115716969" }
      } ,
      {
        "person": { "type": "literal" , "value": "Judd, Dave" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2140532425" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kittredge, Camden" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460254225" }
      } ,
      {
        "person": { "type": "literal" , "value": "Harvey, Lynn" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1476646248" }
      } ,
      {
        "person": { "type": "literal" , "value": "Brakebusch, Matthias" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n88429468" }
      } ,
      {
        "person": { "type": "literal" , "value": "Chaffin, Michael" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489093530" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Brian, Dave" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1880" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Huang, J" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Labrosse, N" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5614" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Masters, A" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701" }
      } ,
      {
        "person": { "type": "literal" , "value": "Springfield, Karen" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n713855563" }
      } ,
      {
        "person": { "type": "literal" , "value": "Horanyi, Mihaly" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1121953972" }
      } ,
      {
        "person": { "type": "literal" , "value": "Craft, James" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961894036" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bramer, Shelley" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n686469069" }
      } ,
      {
        "person": { "type": "literal" , "value": "Yoo, Kenny" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845055650" }
      } ,
      {
        "person": { "type": "literal" , "value": "Loche, Richard" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4559796" }
      } ,
      {
        "person": { "type": "literal" , "value": "Forsyth, Sasha" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1013371228" }
      } ,
      {
        "person": { "type": "literal" , "value": "Gurst, Scott" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861896580" }
      } ,
      {
        "person": { "type": "literal" , "value": "James, David" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n363350498" }
      } ,
      {
        "person": { "type": "literal" , "value": "Sparn, Tom" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428120649" }
      } ,
      {
        "person": { "type": "literal" , "value": "Stawarz, Julia" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n78726096" }
      } ,
      {
        "person": { "type": "literal" , "value": "Riesberg, Lon" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057" }
      } ,
      {
        "person": { "type": "literal" , "value": "Espejo, Joey" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n924628617" }
      } ,
      {
        "person": { "type": "literal" , "value": "Rutkowski, Joel" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n412512658" }
      } ,
      {
        "person": { "type": "literal" , "value": "Sawyer, Christopher" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2115528787" }
      } ,
      {
        "person": { "type": "literal" , "value": "Pryor, Wayne" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1521316899" }
      } ,
      {
        "person": { "type": "literal" , "value": "Eldridge, Gary" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292718971" }
      } ,
      {
        "person": { "type": "literal" , "value": "Nuding, Danielle" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648108589" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Sittler, E C" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Del Zanna, G" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2386" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Thomsen, M F" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3367" }
      } ,
      {
        "person": { "type": "literal" , "value": "Harder, Jerry" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1079014435" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Weber, M" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5279" }
      } ,
      {
        "person": { "type": "literal" , "value": "Stewart, Ian" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1672736625" }
      } ,
      {
        "person": { "type": "literal" , "value": "Himpsel, Carl" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1576768257" }
      } ,
      {
        "person": { "type": "literal" , "xml:lang": "en-US" , "value": "Woods, Tom" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031294282" }
      } ,
      {
        "person": { "type": "literal" , "value": "Heuerman, Karl" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142912025" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bonnici, Michael" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1261402531" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Pagaran, J" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3697" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wise, Peter" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n691938741" }
      } ,
      {
        "person": { "type": "literal" , "value": "Song, Shi" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1483702429" }
      } ,
      {
        "person": { "type": "literal" , "value": "Whitman, Dylan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1640855746" }
      } ,
      {
        "person": { "type": "literal" , "value": "Knapp, Barry" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Vial, J C" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7086" }
      } ,
      {
        "person": { "type": "literal" , "xml:lang": "en-US" , "value": "Bagenal, Fran" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1078482970" }
      } ,
      {
        "person": { "type": "literal" , "value": "Robbins, Mark" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1250170131" }
      } ,
      {
        "person": { "type": "literal" , "value": "Jouchoux, Alain" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844208077" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ucker, Greg" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971611210" }
      } ,
      {
        "person": { "type": "literal" , "value": "Yehle, Alan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2096276531" }
      } ,
      {
        "person": { "type": "literal" , "value": "Brown, Pat" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1663284208" }
      } ,
      {
        "person": { "type": "literal" , "value": "Himes, Caroline" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1205373967" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Mathioudaki, Mihalis" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2823" }
      } ,
      {
        "person": { "type": "literal" , "value": "May, Andrew" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540607559" }
      } ,
      {
        "person": { "type": "literal" , "value": "Redick, Tyler" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1133614131" }
      } ,
      {
        "person": { "type": "literal" , "value": "Costello, Christopher" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127780985" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ali, Ashar" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n499931381" }
      } ,
      {
        "person": { "type": "literal" , "value": "Giorgi, Ariana" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n259579485" }
      } ,
      {
        "person": { "type": "literal" , "value": "George, Vanessa" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n807406679" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Keenan, Francis P" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4089" }
      } ,
      {
        "person": { "type": "literal" , "value": "Allison, Gregg" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490733197" }
      } ,
      {
        "person": { "type": "literal" , "value": "Flemer, James" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987913665" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wrigley, Ray" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1585441073" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Lewis, G R" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2118" }
      } ,
      {
        "person": { "type": "literal" , "value": "Randall, Cora" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n109031017" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kindel, Bruce" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1069407984" }
      } ,
      {
        "person": { "type": "literal" , "value": "Martin, John" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n457505183" }
      } ,
      {
        "person": { "type": "literal" , "value": "Yaptengco, Jonnie Lynn" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n850764044" }
      } ,
      {
        "person": { "type": "literal" , "value": "Renfrow, Stephanie" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796849613" }
      } ,
      {
        "person": { "type": "literal" , "value": "Cole, Wes" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1225522401" }
      } ,
      {
        "person": { "type": "literal" , "value": "Parsons, Kaitlyn" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1347690092" }
      } ,
      {
        "person": { "type": "literal" , "value": "Randall, Emily" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n768867105" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "McBride, K M" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6234" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Steffl, A J" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6059" }
      } ,
      {
        "person": { "type": "literal" , "value": "Taylor, Scott" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n716030637" }
      } ,
      {
        "person": { "type": "literal" , "value": "Nammari, Aref" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n936762217" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Unruh, Y C" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2086" }
      } ,
      {
        "person": { "type": "literal" , "value": "Braun, David" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n423648172" }
      } ,
      {
        "person": { "type": "literal" , "value": "Min, Clifford" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1820576034" }
      } ,
      {
        "person": { "type": "literal" , "value": "Sternovsky, Zoltan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465061973" }
      } ,
      {
        "person": { "type": "literal" , "value": "Larson, Erik" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428163578" }
      } ,
      {
        "person": { "type": "literal" , "value": "Larsen, Kristopher" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1306378180" }
      } ,
      {
        "person": { "type": "literal" , "value": "Asmus, Heiner" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861075396" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Graham, D" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4314" }
      } ,
      {
        "person": { "type": "literal" , "value": "Barcilon, Cristina" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2034181570" }
      } ,
      {
        "person": { "type": "literal" , "value": "Roughton, Steve" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wilder, Frederick" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n754212791" }
      } ,
      {
        "person": { "type": "literal" , "value": "McTague, Lindsay" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1345402132" }
      } ,
      {
        "person": { "type": "literal" , "value": "Beaty, Nicholaus" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n976701326" }
      } ,
      {
        "person": { "type": "literal" , "xml:lang": "en-US" , "value": "Baker, Dan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205444746" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Fontenla, J M" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1740" }
      } ,
      {
        "person": { "type": "literal" , "value": "Laumbach, David" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1944328695" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Hill, T W" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6642" }
      } ,
      {
        "person": { "type": "literal" , "value": "Dorey, Mike" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764" }
      } ,
      {
        "person": { "type": "literal" , "value": "Otzinger, Glen" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1255830498" }
      } ,
      {
        "person": { "type": "literal" , "value": "Dozier, Melissa" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n175766494" }
      } ,
      {
        "person": { "type": "literal" , "value": "Behner, Ryan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n894769667" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Desroche, Mariel" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n140" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "White, Oran R" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3911" }
      } ,
      {
        "person": { "type": "literal" , "value": "Jones, Andrew" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050657630" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ames, William" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995808836" }
      } ,
      {
        "person": { "type": "literal" , "value": "Zhao, Hong" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1496019964" }
      } ,
      {
        "person": { "type": "literal" , "value": "Molaverdikhani, Karan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127503713" }
      } ,
      {
        "person": { "type": "literal" , "value": "Newcomb, Greg" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21578080" }
      } ,
      {
        "person": { "type": "literal" , "value": "Haugen, Cheryl" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n480038164" }
      } ,
      {
        "person": { "type": "literal" , "value": "Seidel, Durbin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1617731339" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hand, Molly" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023583009" }
      } ,
      {
        "person": { "type": "literal" , "value": "Gosling, John" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1962822057" }
      } ,
      {
        "person": { "type": "literal" , "value": "O'Connor, Darren" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1139384165" }
      } ,
      {
        "person": { "type": "literal" , "value": "Peck, Courtney" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301530484" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wade, Stacy" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1473474892" }
      } ,
      {
        "person": { "type": "literal" , "value": "Lindholm, Chris" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741489759" }
      } ,
      {
        "person": { "type": "literal" , "value": "Keiser, Brad" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ogden, Tammie" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583658483" }
      } ,
      {
        "person": { "type": "literal" , "value": "Spivey, Jerry" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2053763554" }
      } ,
      {
        "person": { "type": "literal" , "value": "Moore, Christopher" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1267979694" }
      } ,
      {
        "person": { "type": "literal" , "value": "Worel, Shana" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n804667043" }
      } ,
      {
        "person": { "type": "literal" , "value": "Rast, Mark" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n760843983" }
      } ,
      {
        "person": { "type": "literal" , "value": "Szalay, Jamey" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916260001" }
      } ,
      {
        "person": { "type": "literal" , "value": "Street, Dave" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205732767" }
      } ,
      {
        "person": { "type": "literal" , "value": "Siler, Scott" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823187793" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Richard, E C" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3595" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wood, Erin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1184521804" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ziegler, Stephen" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815934722" }
      } ,
      {
        "person": { "type": "literal" , "value": "Aberle, Nicholas" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255311939" }
      } ,
      {
        "person": { "type": "literal" , "value": "Reiter, Jennifer" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753914660" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Kurth, W S" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3385" }
      } ,
      {
        "person": { "type": "literal" , "value": "Annett, Graham" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n63860692" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ajello, Joe" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588676707" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bearden, Lauren" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273282227" }
      } ,
      {
        "person": { "type": "literal" , "value": "Osborne, Darren" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1582851040" }
      } ,
      {
        "person": { "type": "literal" , "value": "Miller, Colin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n715993936" }
      } ,
      {
        "person": { "type": "literal" , "value": "Rottman, Gary" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1708643326" }
      } ,
      {
        "person": { "type": "literal" , "value": "Tolea, Alin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n884210681" }
      } ,
      {
        "person": { "type": "literal" , "value": "Castleman, Zach" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n646814721" }
      } ,
      {
        "person": { "type": "literal" , "value": "Fletcher, Kathleen" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649163029" }
      } ,
      {
        "person": { "type": "literal" , "value": "Lord, Jesse" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1340836925" }
      } ,
      {
        "person": { "type": "literal" , "value": "Thomas, Gary" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n320506707" }
      } ,
      {
        "person": { "type": "literal" , "value": "Barratt, Edward" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n404394851" }
      } ,
      {
        "person": { "type": "literal" , "value": "Toon, Brian" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845246448" }
      } ,
      {
        "person": { "type": "literal" , "value": "Esposito, Larry" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1210903869" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hoxie, Vaughn" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1404677880" }
      } ,
      {
        "person": { "type": "literal" , "value": "DeWolfe, Alex" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178" }
      } ,
      {
        "person": { "type": "literal" , "value": "Buckhannon, Linda" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1066918532" }
      } ,
      {
        "person": { "type": "literal" , "value": "Dewey, Ryan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575426137" }
      } ,
      {
        "person": { "type": "literal" , "value": "Solomon, David" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n383047709" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Persoon, A M" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5493" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hansen, Doug" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1814290075" }
      } ,
      {
        "person": { "type": "literal" , "value": "Eparvier, Frank" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1414522112" }
      } ,
      {
        "person": { "type": "literal" , "value": "Knappmiller, Scott" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446589790" }
      } ,
      {
        "person": { "type": "literal" , "value": "Merkow, Mat" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530345758" }
      } ,
      {
        "person": { "type": "literal" , "value": "Janiczek, John" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19700812" }
      } ,
      {
        "person": { "type": "literal" , "value": "Jakosky, Bruce" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1313577318" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Mitchell, D G" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1186" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ranquist, Drake" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1154848063" }
      } ,
      {
        "person": { "type": "literal" , "value": "Triplett, Matt" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1386835492" }
      } ,
      {
        "person": { "type": "literal" , "value": "Eden, Thomas" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014923244" }
      } ,
      {
        "person": { "type": "literal" , "value": "Gagnard, Samuel" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n228305227" }
      } ,
      {
        "person": { "type": "literal" , "value": "Marcus, Holly" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n522816235" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Brown, S W" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1400" }
      } ,
      {
        "person": { "type": "literal" , "value": "Parenteau, Scarlet" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1659685056" }
      } ,
      {
        "person": { "type": "literal" , "value": "Gabbert, Jason" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2111487135" }
      } ,
      {
        "person": { "type": "literal" , "value": "DeNeen, Mathew" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n875589346" }
      } ,
      {
        "person": { "type": "literal" , "value": "Williams, Ethan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310654820" }
      } ,
      {
        "person": { "type": "literal" , "value": "Smith, Pat" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523165414" }
      } ,
      {
        "person": { "type": "literal" , "value": "Geiger, Tess" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n953545550" }
      } ,
      {
        "person": { "type": "literal" , "value": "Baker, Kirsten" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1488098331" }
      } ,
      {
        "person": { "type": "literal" , "value": "Coddington, Odele" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070007600" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ortiz, Sean" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896094121" }
      } ,
      {
        "person": { "type": "literal" , "value": "Templeman, Brian" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Pontias Jr., D W" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3564" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Johnson, R E" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4997" }
      } ,
      {
        "person": { "type": "literal" , "value": "Luebke, Anna" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657335496" }
      } ,
      {
        "person": { "type": "literal" , "value": "McClintock, Bill" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n571959716" }
      } ,
      {
        "person": { "type": "literal" , "value": "Lawrence, George" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1315804720" }
      } ,
      {
        "person": { "type": "literal" , "value": "Mueller, Steven" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013" }
      } ,
      {
        "person": { "type": "literal" , "value": "Elkington, Scot" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n553631097" }
      } ,
      {
        "person": { "type": "literal" , "value": "Gurgel, Jason" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301690009" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Su, Y J" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7203" }
      } ,
      {
        "person": { "type": "literal" , "value": "Brown, Jeff" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417348364" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hartnett, Edward" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512122452" }
      } ,
      {
        "person": { "type": "literal" , "value": "Costner, Jacob" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367854519" }
      } ,
      {
        "person": { "type": "literal" , "value": "McCabe, Deb" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1966385563" }
      } ,
      {
        "person": { "type": "literal" , "value": "Cohn-Cort, Bronwen" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n103589832" }
      } ,
      {
        "person": { "type": "literal" , "value": "Motz, Brooklyn" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927000766" }
      } ,
      {
        "person": { "type": "literal" , "value": "Blum, Lauren" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523754547" }
      } ,
      {
        "person": { "type": "literal" , "value": "LeBlanc, Samuel" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907419030" }
      } ,
      {
        "person": { "type": "literal" , "value": "Blunck, Jeffrey" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382538298" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Solanki, S K" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7362" }
      } ,
      {
        "person": { "type": "literal" , "value": "Avallone, Linnea" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1454781079" }
      } ,
      {
        "person": { "type": "literal" , "value": "Linden, Keita" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1889784291" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Chamberlin, Phillip C" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n8187" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Krivova, N A" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4043" }
      } ,
      {
        "person": { "type": "literal" , "value": "Sheiko, Nathan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624617909" }
      } ,
      {
        "person": { "type": "literal" , "value": "Davis, Nina" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n408500045" }
      } ,
      {
        "person": { "type": "literal" , "value": "Williamson, Eleanor" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1118370667" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Elrod, M K" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2507" }
      } ,
      {
        "person": { "type": "literal" , "value": "Evans, Brian" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1479837765" }
      } ,
      {
        "person": { "type": "literal" , "value": "Pachhai, Kiran" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255283506" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wright, Greg" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532824368" }
      } ,
      {
        "person": { "type": "literal" , "value": "Mason, James" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n132879659" }
      } ,
      {
        "person": { "type": "literal" , "value": "Vanderburgh, Abraham" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281302864" }
      } ,
      {
        "person": { "type": "literal" , "value": "Mcgill, Sean" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1967605763" }
      } ,
      {
        "person": { "type": "literal" , "value": "Osterloo, Mikki" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424673248" }
      } ,
      {
        "person": { "type": "literal" , "value": "Schmidt, Sebastian" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330547662" }
      } ,
      {
        "person": { "type": "literal" , "value": "Thiede, Jon" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n107799568" }
      } ,
      {
        "person": { "type": "literal" , "value": "Belting, Chris" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513891097" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hynek, Brian" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1628438375" }
      } ,
      {
        "person": { "type": "literal" , "value": "Madhusudhanan, Prasanna" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050483258" }
      } ,
      {
        "person": { "type": "literal" , "value": "Werdel, Brandon" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653143342" }
      } ,
      {
        "person": { "type": "literal" , "value": "Carton, Matthew" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n721510310" }
      } ,
      {
        "person": { "type": "literal" , "value": "Salcido, Crystal" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490162473" }
      } ,
      {
        "person": { "type": "literal" , "value": "Patton, Thomas" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1685525735" }
      } ,
      {
        "person": { "type": "literal" , "value": "McGilvray, Beth" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n177902987" }
      } ,
      {
        "person": { "type": "literal" , "value": "Murphy, Joshua" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1688610058" }
      } ,
      {
        "person": { "type": "literal" , "value": "Mclaughlin, Pattilyn" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753508281" }
      } ,
      {
        "person": { "type": "literal" , "value": "Rider, Mary" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1501051647" }
      } ,
      {
        "person": { "type": "literal" , "value": "Slipski, Marek" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850769182" }
      } ,
      {
        "person": { "type": "literal" , "value": "Welch, Dave" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115139280" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Delory, G T" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n275" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wehner, Zachary" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1397764181" }
      } ,
      {
        "person": { "type": "literal" , "value": "Shu, Anthony" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2081552666" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wilson, Rob" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n220165430" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Schuehle, U" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Wahlund, J E" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4697" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Wieman, S" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3791" }
      } ,
      {
        "person": { "type": "literal" , "value": "Schelz, Jason" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n340499533" }
      } ,
      {
        "person": { "type": "literal" , "value": "Sicken, Patti" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1507994595" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Young, D T" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3668" }
      } ,
      {
        "person": { "type": "literal" , "value": "Osborne, Morgan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801786743" }
      } ,
      {
        "person": { "type": "literal" , "value": "Egan, Andrea" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115491601" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Lean, Judith L" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6638" }
      } ,
      {
        "person": { "type": "literal" , "value": "Fenz-Trimble, Kaiti" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n659278552" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Lemaire, P" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4371" }
      } ,
      {
        "person": { "type": "literal" , "value": "King, Michael" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2130392723" }
      } ,
      {
        "person": { "type": "literal" , "value": "Flynn, Sierra" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1536335847" }
      } ,
      {
        "person": { "type": "literal" , "value": "Albin, Joel" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1286655618" }
      } ,
      {
        "person": { "type": "literal" , "value": "Pilinski, Emily" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1631975500" }
      } ,
      {
        "person": { "type": "literal" , "value": "Van Orden, William" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n183811506" }
      } ,
      {
        "person": { "type": "literal" , "value": "O'brien, Leela" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5234329" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Schrijver, C J" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2311" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Coates, A J" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n14458" }
      } ,
      {
        "person": { "type": "literal" , "value": "Haskins, Jessica" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n911013275" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kalnajs, Lars" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1854309916" }
      } ,
      {
        "person": { "type": "literal" , "value": "Snow, Marty" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n429119084" }
      } ,
      {
        "person": { "type": "literal" , "value": "Abdulhamid, Ramsey" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912875884" }
      } ,
      {
        "person": { "type": "literal" , "value": "Boschert, Nicholas" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1178406628" }
      } ,
      {
        "person": { "type": "literal" , "value": "Panneton, Russell" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578196712" }
      } ,
      {
        "person": { "type": "literal" , "value": "King, Matthew" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649468078" }
      } ,
      {
        "person": { "type": "literal" , "value": "Holmes, Justin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851684395" }
      } ,
      {
        "person": { "type": "literal" , "value": "Lalonde, Jean-Francois" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159233084" }
      } ,
      {
        "person": { "type": "literal" , "value": "Boyle, Brian" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036313819" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Richards, P G" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801" }
      } ,
      {
        "person": { "type": "literal" , "value": "Reedy, Lee" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1817223813" }
      } ,
      {
        "person": { "type": "literal" , "value": "Flaherty, Tim" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1395635868" }
      } ,
      {
        "person": { "type": "literal" , "value": "Methlie, Jennifer" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2147322495" }
      } ,
      {
        "person": { "type": "literal" , "value": "Cassidy, Timothy" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062620213" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wescott, David" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n798247984" }
      } ,
      {
        "person": { "type": "literal" , "value": "Villabona, Timothy" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1116996073" }
      } ,
      {
        "person": { "type": "literal" , "value": "Moreira Hooks, Joao" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n346540776" }
      } ,
      {
        "person": { "type": "literal" , "value": "Liner, Samantha" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1112572230" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hsu, Sean" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n477177479" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Fletcher, Lindsay" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5034" }
      } ,
      {
        "person": { "type": "literal" , "value": "Thiemann, Ed" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070599412" }
      } ,
      {
        "person": { "type": "literal" , "value": "Young, Jason" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912403582" }
      } ,
      {
        "person": { "type": "literal" , "value": "Rasca, Anthony" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607749756" }
      } ,
      {
        "person": { "type": "literal" , "value": "Klapetzky, Michael" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906366491" }
      } ,
      {
        "person": { "type": "literal" , "value": "Pettit, Joshua" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n35200622" }
      } ,
      {
        "person": { "type": "literal" , "value": "Brugman, Karalee" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n92857531" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bonney, Donovan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507734015" }
      } ,
      {
        "person": { "type": "literal" , "value": "Rogers, Susan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107685763" }
      } ,
      {
        "person": { "type": "literal" , "value": "Barth, Charles" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1803353333" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bela, Megan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91624444" }
      } ,
      {
        "person": { "type": "literal" , "value": "Jacobson, Ross" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n374781680" }
      } ,
      {
        "person": { "type": "literal" , "value": "Perish, Norm" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1700784405" }
      } ,
      {
        "person": { "type": "literal" , "value": "Cox, Michael" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hotard, Bonnie" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027471498" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bolton, Mary" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540886314" }
      } ,
      {
        "person": { "type": "literal" , "value": "Troxel, Kathy" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242954374" }
      } ,
      {
        "person": { "type": "literal" , "value": "Schiller, Quintin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052186645" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bode, Marc" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1798748915" }
      } ,
      {
        "person": { "type": "literal" , "value": "Krahe, Margaux" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1353991561" }
      } ,
      {
        "person": { "type": "literal" , "value": "Eriksson, Stefan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n125517773" }
      } ,
      {
        "person": { "type": "literal" , "value": "Smith, Paul" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n658738358" }
      } ,
      {
        "person": { "type": "literal" , "value": "Lankton, Mark" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1043347675" }
      } ,
      {
        "person": { "type": "literal" , "value": "Howes, Calvin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633595791" }
      } ,
      {
        "person": { "type": "literal" , "value": "Dewoina, Dave" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2779032" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bunnell, Emma" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438372251" }
      } ,
      {
        "person": { "type": "literal" , "value": "Haynes, Andrew" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n161684617" }
      } ,
      {
        "person": { "type": "literal" , "value": "Holler, Bryan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2009987779" }
      } ,
      {
        "person": { "type": "literal" , "value": "Spurgeon, Justin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014728592" }
      } ,
      {
        "person": { "type": "literal" , "value": "Dols, Vincent" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599462975" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ryan, Sean" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1188565226" }
      } ,
      {
        "person": { "type": "literal" , "value": "Passe, Heather" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1234648683" }
      } ,
      {
        "person": { "type": "literal" , "value": "Plesha, Rachel" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1228806873" }
      } ,
      {
        "person": { "type": "literal" , "value": "Drake, Ginger" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n71958169" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Ray, L C" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5341" }
      } ,
      {
        "person": { "type": "literal" , "value": "Lamprecht, Bret" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n739599306" }
      } ,
      {
        "person": { "type": "literal" , "value": "Summers, David" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115343616" }
      } ,
      {
        "person": { "type": "literal" , "value": "Erickson, Darren" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n765907129" }
      } ,
      {
        "person": { "type": "literal" , "value": "Jones, Gayle" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n57504821" }
      } ,
      {
        "person": { "type": "literal" , "value": "Dinkel, Kevin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n613953723" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wanamaker, Isaac" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799142869" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ruske, Tim" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n62569024" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kreisher, John" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n612686962" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kern, Josh" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653826283" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Tseng, W L" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6708" }
      } ,
      {
        "person": { "type": "literal" , "value": "Simons-Brown, Erin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159306400" }
      } ,
      {
        "person": { "type": "literal" , "value": "Fox, Tyler" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896505121" }
      } ,
      {
        "person": { "type": "literal" , "value": "Tighe, Wayne" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1537989152" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hoskins, Alan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1025386724" }
      } ,
      {
        "person": { "type": "literal" , "value": "Negus, James" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n964782842" }
      } ,
      {
        "person": { "type": "literal" , "value": "Vincent, Tracy" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1191377000" }
      } ,
      {
        "person": { "type": "literal" , "value": "Gruen, Eberhard" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1822827997" }
      } ,
      {
        "person": { "type": "literal" , "value": "Taylor, Trent" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507926942" }
      } ,
      {
        "person": { "type": "literal" , "value": "Stone, Jordan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382272449" }
      } ,
      {
        "person": { "type": "literal" , "xml:lang": "en-US" , "value": "Elsborg, Don" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911" }
      } ,
      {
        "person": { "type": "literal" , "value": "Lewis, Ryan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n472262787" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Yau, A W" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3676" }
      } ,
      {
        "person": { "type": "literal" , "value": "Soto Hoffmann, Patricia" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1971283737" }
      } ,
      {
        "person": { "type": "literal" , "value": "Gathright, David" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1719236045" }
      } ,
      {
        "person": { "type": "literal" , "value": "Karlsson, Magnus" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1544450972" }
      } ,
      {
        "person": { "type": "literal" , "value": "Merkel, Aimee" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n406773472" }
      } ,
      {
        "person": { "type": "literal" , "value": "Yu, Pengfei" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n362772828" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wilson, Anne" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1869681270" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Curdt, W" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Thuillier, G" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1553" }
      } ,
      {
        "person": { "type": "literal" , "value": "Collins, Rachael" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732618065" }
      } ,
      {
        "person": { "type": "literal" , "value": "Stearns, John" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1089353141" }
      } ,
      {
        "person": { "type": "literal" , "value": "Beland, Stephane" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123" }
      } ,
      {
        "person": { "type": "literal" , "value": "French, Bryan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439300069" }
      } ,
      {
        "person": { "type": "literal" , "value": "Samaripa, Byron" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1993740978" }
      } ,
      {
        "person": { "type": "literal" , "value": "Soukhovei, Vladislav" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1373936880" }
      } ,
      {
        "person": { "type": "literal" , "value": "Reukauf, Randy" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n276714883" }
      } ,
      {
        "person": { "type": "literal" , "value": "Mason, Tom" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1653020773" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Hess, S L G" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1972" }
      } ,
      {
        "person": { "type": "literal" , "value": "Stewart, Glen" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1314757256" }
      } ,
      {
        "person": { "type": "literal" , "value": "Gritzmacher, Don" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583161727" }
      } ,
      {
        "person": { "type": "literal" , "value": "Barrett, Rory" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n357449403" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bryant, Chelsey" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n867120482" }
      } ,
      {
        "person": { "type": "literal" , "value": "Andersson, Laila" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907618201" }
      } ,
      {
        "person": { "type": "literal" , "value": "Popescu, Radu" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ericksen, Steve" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n523846245" }
      } ,
      {
        "person": { "type": "literal" , "value": "Dischner, Zachary" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229679033" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Lace, George" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3812" }
      } ,
      {
        "person": { "type": "literal" , "value": "Harber, Dave" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n638067304" }
      } ,
      {
        "person": { "type": "literal" , "value": "Simmons, Karen" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n810031199" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kingsley, Roberto" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229480056" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Kowalski, Adam F" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2522" }
      } ,
      {
        "person": { "type": "literal" , "value": "Puckett, Austin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n728097612" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Burrows, J P" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hutchison, Michael" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372190417" }
      } ,
      {
        "person": { "type": "literal" , "value": "Meisner, Randy" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n544141382" }
      } ,
      {
        "person": { "type": "literal" , "value": "Vermeer, Bill" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n566962202" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Fox, Peter" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2852" }
      } ,
      {
        "person": { "type": "literal" , "value": "Snow, Jake" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588964680" }
      } ,
      {
        "person": { "type": "literal" , "value": "Devito, Elizabeth" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1981168541" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Floyd, L E" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2559" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kowalski, Elise" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1295294388" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bay, Paul" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n598683891" }
      } ,
      {
        "person": { "type": "literal" , "value": "Thompson, Cassidy" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485924204" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kominek, Jay" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936621824" }
      } ,
      {
        "person": { "type": "literal" , "value": "Traver, Tyler" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712" }
      } ,
      {
        "person": { "type": "literal" , "xml:lang": "en-US" , "value": "Brain, David" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n111928268" }
      } ,
      {
        "person": { "type": "literal" , "value": "Cirbo, Matthew" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1864293332" }
      } ,
      {
        "person": { "type": "literal" , "value": "Lafferty, Gina" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1241916224" }
      } ,
      {
        "person": { "type": "literal" , "value": "Schloesser, Emily" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000340179" }
      } ,
      {
        "person": { "type": "literal" , "value": "McCandless, Lindsay" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801066637" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wang, Xu" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443866291" }
      } ,
      {
        "person": { "type": "literal" , "value": "Briggs, Vanessa" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336740030" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Dong, Y" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15204" }
      } ,
      {
        "person": { "type": "literal" , "value": "Barrett, William" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725" }
      } ,
      {
        "person": { "type": "literal" , "value": "Westfall, Jim" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987838283" }
      } ,
      {
        "person": { "type": "literal" , "value": "Pranger, Zachary" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526450392" }
      } ,
      {
        "person": { "type": "literal" , "value": "Fang, Xiaohua" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872761738" }
      } ,
      {
        "person": { "type": "literal" , "value": "Pilewskie, Peter" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n731850291" }
      } ,
      {
        "person": { "type": "literal" , "value": "Burks, Damien" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599575729" }
      } ,
      {
        "person": { "type": "literal" , "value": "Sarris, Theodore" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1264895617" }
      } ,
      {
        "person": { "type": "literal" , "value": "Groeninger, Matt" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976429543" }
      } ,
      {
        "person": { "type": "literal" , "value": "Pilewskie, Katherine" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310179206" }
      } ,
      {
        "person": { "type": "literal" , "value": "Caspi, Amir" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n562924903" }
      } ,
      {
        "person": { "type": "literal" , "value": "Valentine, Robert" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753432826" }
      } ,
      {
        "person": { "type": "literal" , "value": "Crotser, Dave" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1662863303" }
      } ,
      {
        "person": { "type": "literal" , "value": "Rusch, Dave" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n970911879" }
      } ,
      {
        "person": { "type": "literal" , "value": "Alfaro, Ann" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512209405" }
      } ,
      {
        "person": { "type": "literal" , "value": "Drobilek, Mark" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1277774838" }
      } ,
      {
        "person": { "type": "literal" , "value": "Smith, Doug" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513997220" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Hudson, Hugh S" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4790" }
      } ,
      {
        "person": { "type": "literal" , "value": "Batiste, Susan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n213386065" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Mewaldt, R A" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1417" }
      } ,
      {
        "person": { "type": "literal" , "value": "Smith, Jamison" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1146627975" }
      } ,
      {
        "person": { "type": "literal" , "value": "Marcucci, Emma" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1318083343" }
      } ,
      {
        "person": { "type": "literal" , "value": "Brennan, Nathanial" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1928440630" }
      } ,
      {
        "person": { "type": "literal" , "value": "Griest, Ken" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n518533566" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Erkaev, N" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n274" }
      } ,
      {
        "person": { "type": "literal" , "value": "Beech, Jason" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n888928290" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wiesman, Brett" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n852217263" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bryant, Mike" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1085025965" }
      } ,
      {
        "person": { "type": "literal" , "value": "Robbins, Stuart" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n559833574" }
      } ,
      {
        "person": { "type": "literal" , "value": "Krodinger, Andrew" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n948112081" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bloom, Laura" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2082768088" }
      } ,
      {
        "person": { "type": "literal" , "value": "Thomas, Evan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1113966394" }
      } ,
      {
        "person": { "type": "literal" , "value": "Papa, Joseph" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1354973592" }
      } ,
      {
        "person": { "type": "literal" , "value": "McGouldrick, Kevin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n418611095" }
      } ,
      {
        "person": { "type": "literal" , "value": "Packard, Mike" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299646442" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hartwick, Victoria" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1145663159" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Milligan, Ryan O" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6412" }
      } ,
      {
        "person": { "type": "literal" , "value": "Malaspina, David" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n290898740" }
      } ,
      {
        "person": { "type": "literal" , "value": "Redick, Michelle" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2080295530" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ferrington, Nicolas" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n794601920" }
      } ,
      {
        "person": { "type": "literal" , "value": "Reese, Tom" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1866062337" }
      } ,
      {
        "person": { "type": "literal" , "value": "Christofferson, Ransom" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1312757559" }
      } ,
      {
        "person": { "type": "literal" , "value": "Richard, Erik" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1655982245" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Kosovichev, A G" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031" }
      } ,
      {
        "person": { "type": "literal" , "xml:lang": "en-US" , "value": "Ergun, Bob" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n670178106" }
      } ,
      {
        "person": { "type": "literal" , "value": "Sand, Susan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428876202" }
      } ,
      {
        "person": { "type": "literal" , "value": "Zhu, Yunqian" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936941023" }
      } ,
      {
        "person": { "type": "literal" , "value": "McEnulty, Tess" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1071261447" }
      } ,
      {
        "person": { "type": "literal" , "value": "Newgord, Alexia" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n695552564" }
      } ,
      {
        "person": { "type": "literal" , "value": "Tilevitz, Chana" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705385187" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hodges, Richard" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n133316609" }
      } ,
      {
        "person": { "type": "literal" , "value": "Holt, Laura" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n180701835" }
      } ,
      {
        "person": { "type": "literal" , "value": "Albers, Nicole" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570151423" }
      } ,
      {
        "person": { "type": "literal" , "value": "Knehans, Edith" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2043547795" }
      } ,
      {
        "person": { "type": "literal" , "value": "Goodrich, Katherine" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1323188719" }
      } ,
      {
        "person": { "type": "literal" , "value": "Eberts, Theodore" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1076781062" }
      } ,
      {
        "person": { "type": "literal" , "value": "Lothringer, Joshua" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1238347136" }
      } ,
      {
        "person": { "type": "literal" , "value": "Li, Xinlin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n293691365" }
      } ,
      {
        "person": { "type": "literal" , "value": "Sparhawk, Lisa" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648087653" }
      } ,
      {
        "person": { "type": "literal" , "value": "Jeppesen, Chris" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845364011" }
      } ,
      {
        "person": { "type": "literal" , "value": "Crismani, Matteo" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1307648345" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Lin, R P" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4577" }
      } ,
      {
        "person": { "type": "literal" , "value": "Moffatt, Jerel" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330004299" }
      } ,
      {
        "person": { "type": "literal" , "value": "Larsen, Dane" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513048464" }
      } ,
      {
        "person": { "type": "literal" , "value": "Goodrich, Al" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n693905437" }
      } ,
      {
        "person": { "type": "literal" , "value": "White, Neil" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1283020055" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Delamere, Peter A" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5649" }
      } ,
      {
        "person": { "type": "literal" , "value": "Rehnberg, Morgan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1559998858" }
      } ,
      {
        "person": { "type": "literal" , "value": "Cervelli, Beth" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n707294409" }
      } ,
      {
        "person": { "type": "literal" , "value": "Vanier, Blake" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n585326394" }
      } ,
      {
        "person": { "type": "literal" , "value": "McNeil, Eric" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1528282796" }
      } ,
      {
        "person": { "type": "literal" , "value": "George, Erin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624031380" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hubbell, Karl" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n699751717" }
      } ,
      {
        "person": { "type": "literal" , "value": "Green, Alex" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n90207282" }
      } ,
      {
        "person": { "type": "literal" , "value": "Faber, Jack" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876344817" }
      } ,
      {
        "person": { "type": "literal" , "value": "Pankratz, Chris" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wullschleger, Ed" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n325914072" }
      } ,
      {
        "person": { "type": "literal" , "value": "Monk, Steve" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857867638" }
      } ,
      {
        "person": { "type": "literal" , "value": "Mitchell, Tyler" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1215748306" }
      } ,
      {
        "person": { "type": "literal" , "value": "Sremcevic, Miodrag" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n484618802" }
      } ,
      {
        "person": { "type": "literal" , "value": "Peck, Ethan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489001940" }
      } ,
      {
        "person": { "type": "literal" , "value": "Cirbo, Kathleen" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1429538900" }
      } ,
      {
        "person": { "type": "literal" , "value": "Padgett, John" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1393218320" }
      } ,
      {
        "person": { "type": "literal" , "value": "Reed, Heather" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1635945598" }
      } ,
      {
        "person": { "type": "literal" , "value": "Eaton, Zak" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n44143920" }
      } ,
      {
        "person": { "type": "literal" , "value": "Koski, Kraig" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912001963" }
      } ,
      {
        "person": { "type": "literal" , "value": "Bloch, Nikki" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1319050477" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wright, Logan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1342215268" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hepburn, Kelly" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n672306834" }
      } ,
      {
        "person": { "type": "literal" , "value": "Williams, Forrest" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575366074" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kohnert, Laura" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438416807" }
      } ,
      {
        "person": { "type": "literal" , "value": "Law, Mariah" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1209408315" }
      } ,
      {
        "person": { "type": "literal" , "value": "Miller, Jacob" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n558713751" }
      } ,
      {
        "person": { "type": "literal" , "value": "Piquette, Marcus" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1844883463" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Livingston, W" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7810" }
      } ,
      {
        "person": { "type": "literal" , "value": "Carson, Steve" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2000525679" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kokkonen, Kim" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665577609" }
      } ,
      {
        "person": { "type": "literal" , "value": "Sainsbury, Cassidy" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1293656385" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hahn, Barb" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n508652932" }
      } ,
      {
        "person": { "type": "literal" , "value": "Anfinson, Mike" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2016926148" }
      } ,
      {
        "person": { "type": "literal" , "value": "deFalco, Paul" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168824921" }
      } ,
      {
        "person": { "type": "literal" , "value": "Withnell, Pete" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1298706407" }
      } ,
      {
        "person": { "type": "literal" , "value": "Guy, Carol" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1709165908" }
      } ,
      {
        "person": { "type": "literal" , "value": "Feickert, Jason" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n173026304" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Schmutz, W" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3012" }
      } ,
      {
        "person": { "type": "literal" , "value": "Peterson, William" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n764015052" }
      } ,
      {
        "person": { "type": "literal" , "value": "Baumann, Wayne" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906271444" }
      } ,
      {
        "person": { "type": "literal" , "value": "Crary, Frank" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2007987199" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kren, Andrew" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857081541" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kopp, Greg" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068179785" }
      } ,
      {
        "person": { "type": "literal" , "value": "Lindholm, Doug" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1790175656" }
      } ,
      {
        "person": { "type": "literal" , "value": "Kelley, Michelle" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352320643" }
      } ,
      {
        "person": { "type": "literal" , "value": "Jaynes, Allison" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1147514903" }
      } ,
      {
        "person": { "type": "literal" , "value": "Holden, Nancy" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995714539" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ramas, Joe" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183" }
      } ,
      {
        "person": { "type": "literal" , "value": "Drake, Keith" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n101045317" }
      } ,
      {
        "person": { "type": "literal" , "value": "Maloney, Christopher" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n146565298" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Jones, G H" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6647" }
      } ,
      {
        "person": { "type": "literal" , "value": "Hall, David" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502629516" }
      } ,
      {
        "person": { "type": "literal" , "value": "Tate, Gail" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n268766314" }
      } ,
      {
        "person": { "type": "literal" , "value": "Deighan, Justin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1122737005" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Didkovsky, L" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1108" }
      } ,
      {
        "person": { "type": "literal" , "value": "Sims, Alan" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526911137" }
      } ,
      {
        "person": { "type": "literal" , "value": "Reed, Krista" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n877068749" }
      } ,
      {
        "person": { "type": "literal" , "value": "Mackison, Karen" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434366058" }
      } ,
      {
        "person": { "type": "literal" , "value": "Zucker, Michael" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562915827" }
      } ,
      {
        "person": { "type": "literal" , "value": "Nastaj, Debra" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782073425" }
      } ,
      {
        "person": { "type": "literal" , "value": "Ringrose, Pat" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n69165236" }
      } ,
      {
        "person": { "type": "literal" , "value": "Motz, Brent" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2124160943" }
      } ,
      {
        "person": { "type": "literal" , "value": "Possel, Bill" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019699773" }
      } ,
      {
        "person": { "type": "literal" , "value": "McCollom, Tom" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159259470" }
      } ,
      {
        "person": { "type": "literal" , "value": "Fowler, Christopher" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n932646884" }
      } ,
      {
        "person": { "type": "literal" , "value": "Theiling, Dale" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523846463" }
      } ,
      {
        "person": { "type": "literal" , "value": "Swieter, Dwayne" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1192815390" }
      } ,
      {
        "person": { "type": "literal" , "value": "Stimpfling, Robert" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n490092760" }
      } ,
      {
        "person": { "type": "literal" , "value": "Migliorini, Lucas" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n634891605" }
      } ,
      {
        "person": { "type": "literal" , "value": "Longo, Austin" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n253562955" }
      } ,
      {
        "person": { "type": "literal" , "value": "Tucker, Scott" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1007186618" }
      } ,
      {
        "person": { "type": "literal" , "value": "Keefer, Jesse" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n322281825" }
      } ,
      {
        "person": { "type": "literal" , "value": "Wolf, Eric" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n221861851" }
      } ,
      {
        "person": { "datatype": "http://www.w3.org/2001/XMLSchema#string" , "type": "typed-literal" , "value": "Fleshman, Bobby" } ,
        "personuri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1787" }
      }
    ]
  }
};
			//we'd hope to see this final List returned by formatPersonnelList
	    	var expectedList = [{"person":"Rosenshein, Miriam","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1953572127"},{"person":"Beckman, Shawn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n400097966"},{"person":"Collette, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012646325"},{"person":"Pyke, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n295572919"},{"person":"Baragiola, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7999"},{"person":"Kaufhold, Alexandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890225154"},{"person":"Lykke, K R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3229"},{"person":"Letourneau, Hannah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n442363424"},{"person":"MacKinnon, A L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3603"},{"person":"Kempf, Sascha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1611913402"},{"person":"Steg, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1580269363"},{"person":"Myers, Casey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1263641634"},{"person":"Woodraska, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n626213350"},{"person":"LaClair, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907464116"},{"person":"Burrows, Spenser","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n902811839"},{"person":"Ma, Huikang","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n557026557"},{"person":"McGrath, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85999019"},{"person":"Mason, Carolyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1092945436"},{"person":"Jilek, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207320044"},{"person":"Smith, Dona","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n256748745"},{"person":"Sturner, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n975471748"},{"person":"O'Malia, Kasandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308336345"},{"person":"Schneider, Nick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917838557"},{"person":"Vertovec, Audrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914550976"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5764"},{"person":"Bershenyi, Gabe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n93921936"},{"person":"Emmett, Jeremy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n279164454"},{"person":"Kohnert, Rick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1029083323"},{"person":"Kien, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453839589"},{"person":"Farneth, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n939895236"},{"person":"Stewart, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474554423"},{"person":"Guneratne, Gabriella","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n371682424"},{"person":"Hillier, Jonathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532250141"},{"person":"Henderson, M G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5693"},{"person":"Judge, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3730"},{"person":"Tokar, R L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7508"},{"person":"Holsclaw, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000533497"},{"person":"Califf, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n717941184"},{"person":"Bryant, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n839305267"},{"person":"Heath, Caitlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115716969"},{"person":"Judd, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2140532425"},{"person":"Kittredge, Camden","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460254225"},{"person":"Harvey, Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1476646248"},{"person":"Brakebusch, Matthias","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n88429468"},{"person":"Chaffin, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489093530"},{"person":"Brian, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1880"},{"person":"Huang, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851"},{"person":"Labrosse, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5614"},{"person":"Masters, A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701"},{"person":"Springfield, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n713855563"},{"person":"Horanyi, Mihaly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1121953972"},{"person":"Craft, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961894036"},{"person":"Bramer, Shelley","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n686469069"},{"person":"Yoo, Kenny","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845055650"},{"person":"Loche, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4559796"},{"person":"Forsyth, Sasha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1013371228"},{"person":"Gurst, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861896580"},{"person":"James, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n363350498"},{"person":"Sparn, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428120649"},{"person":"Stawarz, Julia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n78726096"},{"person":"Riesberg, Lon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057"},{"person":"Espejo, Joey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n924628617"},{"person":"Rutkowski, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n412512658"},{"person":"Sawyer, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2115528787"},{"person":"Pryor, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1521316899"},{"person":"Eldridge, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292718971"},{"person":"Nuding, Danielle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648108589"},{"person":"Sittler, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367"},{"person":"Del Zanna, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2386"},{"person":"Thomsen, M F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3367"},{"person":"Harder, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1079014435"},{"person":"Weber, M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5279"},{"person":"Stewart, Ian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1672736625"},{"person":"Himpsel, Carl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1576768257"},{"person":"Woods, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031294282"},{"person":"Heuerman, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142912025"},{"person":"Bonnici, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1261402531"},{"person":"Pagaran, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3697"},{"person":"Wise, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n691938741"},{"person":"Song, Shi","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1483702429"},{"person":"Whitman, Dylan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1640855746"},{"person":"Knapp, Barry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270"},{"person":"Vial, J C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7086"},{"person":"Bagenal, Fran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1078482970"},{"person":"Robbins, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1250170131"},{"person":"Jouchoux, Alain","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844208077"},{"person":"Ucker, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971611210"},{"person":"Yehle, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2096276531"},{"person":"Brown, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1663284208"},{"person":"Himes, Caroline","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1205373967"},{"person":"Mathioudaki, Mihalis","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2823"},{"person":"May, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540607559"},{"person":"Redick, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1133614131"},{"person":"Costello, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127780985"},{"person":"Ali, Ashar","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n499931381"},{"person":"Giorgi, Ariana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n259579485"},{"person":"George, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n807406679"},{"person":"Keenan, Francis P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4089"},{"person":"Allison, Gregg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490733197"},{"person":"Flemer, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987913665"},{"person":"Wrigley, Ray","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1585441073"},{"person":"Lewis, G R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2118"},{"person":"Randall, Cora","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n109031017"},{"person":"Kindel, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1069407984"},{"person":"Martin, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n457505183"},{"person":"Yaptengco, Jonnie Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n850764044"},{"person":"Renfrow, Stephanie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796849613"},{"person":"Cole, Wes","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1225522401"},{"person":"Parsons, Kaitlyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1347690092"},{"person":"Randall, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n768867105"},{"person":"McBride, K M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6234"},{"person":"Steffl, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6059"},{"person":"Taylor, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n716030637"},{"person":"Nammari, Aref","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n936762217"},{"person":"Unruh, Y C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2086"},{"person":"Braun, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n423648172"},{"person":"Min, Clifford","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1820576034"},{"person":"Sternovsky, Zoltan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465061973"},{"person":"Larson, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428163578"},{"person":"Larsen, Kristopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1306378180"},{"person":"Asmus, Heiner","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861075396"},{"person":"Graham, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4314"},{"person":"Barcilon, Cristina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2034181570"},{"person":"Roughton, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491"},{"person":"Wilder, Frederick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n754212791"},{"person":"McTague, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1345402132"},{"person":"Beaty, Nicholaus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n976701326"},{"person":"Baker, Dan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205444746"},{"person":"Fontenla, J M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1740"},{"person":"Laumbach, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1944328695"},{"person":"Hill, T W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6642"},{"person":"Dorey, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764"},{"person":"Otzinger, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1255830498"},{"person":"Dozier, Melissa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n175766494"},{"person":"Behner, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n894769667"},{"person":"Desroche, Mariel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n140"},{"person":"White, Oran R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3911"},{"person":"Jones, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050657630"},{"person":"Ames, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995808836"},{"person":"Zhao, Hong","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1496019964"},{"person":"Molaverdikhani, Karan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127503713"},{"person":"Newcomb, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21578080"},{"person":"Haugen, Cheryl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n480038164"},{"person":"Seidel, Durbin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1617731339"},{"person":"Hand, Molly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023583009"},{"person":"Gosling, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1962822057"},{"person":"O'Connor, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1139384165"},{"person":"Peck, Courtney","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301530484"},{"person":"Wade, Stacy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1473474892"},{"person":"Lindholm, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741489759"},{"person":"Keiser, Brad","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738"},{"person":"Ogden, Tammie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583658483"},{"person":"Spivey, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2053763554"},{"person":"Moore, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1267979694"},{"person":"Worel, Shana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n804667043"},{"person":"Rast, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n760843983"},{"person":"Szalay, Jamey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916260001"},{"person":"Street, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205732767"},{"person":"Siler, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823187793"},{"person":"Richard, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3595"},{"person":"Wood, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1184521804"},{"person":"Ziegler, Stephen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815934722"},{"person":"Aberle, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255311939"},{"person":"Reiter, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753914660"},{"person":"Kurth, W S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3385"},{"person":"Annett, Graham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n63860692"},{"person":"Ajello, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588676707"},{"person":"Bearden, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273282227"},{"person":"Osborne, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1582851040"},{"person":"Miller, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n715993936"},{"person":"Rottman, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1708643326"},{"person":"Tolea, Alin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n884210681"},{"person":"Castleman, Zach","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n646814721"},{"person":"Fletcher, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649163029"},{"person":"Lord, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1340836925"},{"person":"Thomas, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n320506707"},{"person":"Barratt, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n404394851"},{"person":"Toon, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845246448"},{"person":"Esposito, Larry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1210903869"},{"person":"Hoxie, Vaughn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1404677880"},{"person":"DeWolfe, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178"},{"person":"Buckhannon, Linda","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1066918532"},{"person":"Dewey, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575426137"},{"person":"Solomon, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n383047709"},{"person":"Persoon, A M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5493"},{"person":"Hansen, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1814290075"},{"person":"Eparvier, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1414522112"},{"person":"Knappmiller, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446589790"},{"person":"Merkow, Mat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530345758"},{"person":"Janiczek, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19700812"},{"person":"Jakosky, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1313577318"},{"person":"Mitchell, D G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1186"},{"person":"Ranquist, Drake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1154848063"},{"person":"Triplett, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1386835492"},{"person":"Eden, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014923244"},{"person":"Gagnard, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n228305227"},{"person":"Marcus, Holly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n522816235"},{"person":"Brown, S W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1400"},{"person":"Parenteau, Scarlet","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1659685056"},{"person":"Gabbert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2111487135"},{"person":"DeNeen, Mathew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n875589346"},{"person":"Williams, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310654820"},{"person":"Smith, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523165414"},{"person":"Geiger, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n953545550"},{"person":"Baker, Kirsten","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1488098331"},{"person":"Coddington, Odele","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070007600"},{"person":"Ortiz, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896094121"},{"person":"Templeman, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053"},{"person":"Pontias Jr., D W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3564"},{"person":"Johnson, R E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4997"},{"person":"Luebke, Anna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657335496"},{"person":"McClintock, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n571959716"},{"person":"Lawrence, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1315804720"},{"person":"Mueller, Steven","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013"},{"person":"Elkington, Scot","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n553631097"},{"person":"Gurgel, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301690009"},{"person":"Su, Y J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7203"},{"person":"Brown, Jeff","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417348364"},{"person":"Hartnett, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512122452"},{"person":"Costner, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367854519"},{"person":"McCabe, Deb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1966385563"},{"person":"Cohn-Cort, Bronwen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n103589832"},{"person":"Motz, Brooklyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927000766"},{"person":"Blum, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523754547"},{"person":"LeBlanc, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907419030"},{"person":"Blunck, Jeffrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382538298"},{"person":"Solanki, S K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7362"},{"person":"Avallone, Linnea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1454781079"},{"person":"Linden, Keita","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1889784291"},{"person":"Chamberlin, Phillip C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n8187"},{"person":"Krivova, N A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4043"},{"person":"Sheiko, Nathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624617909"},{"person":"Davis, Nina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n408500045"},{"person":"Williamson, Eleanor","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1118370667"},{"person":"Elrod, M K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2507"},{"person":"Evans, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1479837765"},{"person":"Pachhai, Kiran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255283506"},{"person":"Wright, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532824368"},{"person":"Mason, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n132879659"},{"person":"Vanderburgh, Abraham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281302864"},{"person":"Mcgill, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1967605763"},{"person":"Osterloo, Mikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424673248"},{"person":"Schmidt, Sebastian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330547662"},{"person":"Thiede, Jon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n107799568"},{"person":"Belting, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513891097"},{"person":"Hynek, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1628438375"},{"person":"Madhusudhanan, Prasanna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050483258"},{"person":"Werdel, Brandon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653143342"},{"person":"Carton, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n721510310"},{"person":"Salcido, Crystal","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490162473"},{"person":"Patton, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1685525735"},{"person":"McGilvray, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n177902987"},{"person":"Murphy, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1688610058"},{"person":"Mclaughlin, Pattilyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753508281"},{"person":"Rider, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1501051647"},{"person":"Slipski, Marek","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850769182"},{"person":"Welch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115139280"},{"person":"Delory, G T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n275"},{"person":"Wehner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1397764181"},{"person":"Shu, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2081552666"},{"person":"Wilson, Rob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n220165430"},{"person":"Schuehle, U","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100"},{"person":"Wahlund, J E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4697"},{"person":"Wieman, S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3791"},{"person":"Schelz, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n340499533"},{"person":"Sicken, Patti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1507994595"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3668"},{"person":"Osborne, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801786743"},{"person":"Egan, Andrea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115491601"},{"person":"Lean, Judith L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6638"},{"person":"Fenz-Trimble, Kaiti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n659278552"},{"person":"Lemaire, P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4371"},{"person":"King, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2130392723"},{"person":"Flynn, Sierra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1536335847"},{"person":"Albin, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1286655618"},{"person":"Pilinski, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1631975500"},{"person":"Van Orden, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n183811506"},{"person":"O'brien, Leela","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5234329"},{"person":"Schrijver, C J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2311"},{"person":"Coates, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n14458"},{"person":"Haskins, Jessica","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n911013275"},{"person":"Kalnajs, Lars","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1854309916"},{"person":"Snow, Marty","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n429119084"},{"person":"Abdulhamid, Ramsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912875884"},{"person":"Boschert, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1178406628"},{"person":"Panneton, Russell","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578196712"},{"person":"King, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649468078"},{"person":"Holmes, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851684395"},{"person":"Lalonde, Jean-Francois","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159233084"},{"person":"Boyle, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036313819"},{"person":"Richards, P G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801"},{"person":"Reedy, Lee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1817223813"},{"person":"Flaherty, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1395635868"},{"person":"Methlie, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2147322495"},{"person":"Cassidy, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062620213"},{"person":"Wescott, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n798247984"},{"person":"Villabona, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1116996073"},{"person":"Moreira Hooks, Joao","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n346540776"},{"person":"Liner, Samantha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1112572230"},{"person":"Hsu, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n477177479"},{"person":"Fletcher, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5034"},{"person":"Thiemann, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070599412"},{"person":"Young, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912403582"},{"person":"Rasca, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607749756"},{"person":"Klapetzky, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906366491"},{"person":"Pettit, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n35200622"},{"person":"Brugman, Karalee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n92857531"},{"person":"Bonney, Donovan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507734015"},{"person":"Rogers, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107685763"},{"person":"Barth, Charles","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1803353333"},{"person":"Bela, Megan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91624444"},{"person":"Jacobson, Ross","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n374781680"},{"person":"Perish, Norm","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1700784405"},{"person":"Cox, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931"},{"person":"Hotard, Bonnie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027471498"},{"person":"Bolton, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540886314"},{"person":"Troxel, Kathy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242954374"},{"person":"Schiller, Quintin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052186645"},{"person":"Bode, Marc","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1798748915"},{"person":"Krahe, Margaux","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1353991561"},{"person":"Eriksson, Stefan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n125517773"},{"person":"Smith, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n658738358"},{"person":"Lankton, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1043347675"},{"person":"Howes, Calvin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633595791"},{"person":"Dewoina, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2779032"},{"person":"Bunnell, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438372251"},{"person":"Haynes, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n161684617"},{"person":"Holler, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2009987779"},{"person":"Spurgeon, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014728592"},{"person":"Dols, Vincent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599462975"},{"person":"Ryan, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1188565226"},{"person":"Passe, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1234648683"},{"person":"Plesha, Rachel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1228806873"},{"person":"Drake, Ginger","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n71958169"},{"person":"Ray, L C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5341"},{"person":"Lamprecht, Bret","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n739599306"},{"person":"Summers, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115343616"},{"person":"Erickson, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n765907129"},{"person":"Jones, Gayle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n57504821"},{"person":"Dinkel, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n613953723"},{"person":"Wanamaker, Isaac","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799142869"},{"person":"Ruske, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n62569024"},{"person":"Kreisher, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n612686962"},{"person":"Kern, Josh","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653826283"},{"person":"Tseng, W L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6708"},{"person":"Simons-Brown, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159306400"},{"person":"Fox, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896505121"},{"person":"Tighe, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1537989152"},{"person":"Hoskins, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1025386724"},{"person":"Negus, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n964782842"},{"person":"Vincent, Tracy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1191377000"},{"person":"Gruen, Eberhard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1822827997"},{"person":"Taylor, Trent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507926942"},{"person":"Stone, Jordan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382272449"},{"person":"Elsborg, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911"},{"person":"Lewis, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n472262787"},{"person":"Yau, A W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3676"},{"person":"Soto Hoffmann, Patricia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1971283737"},{"person":"Gathright, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1719236045"},{"person":"Karlsson, Magnus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1544450972"},{"person":"Merkel, Aimee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n406773472"},{"person":"Yu, Pengfei","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n362772828"},{"person":"Wilson, Anne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1869681270"},{"person":"Curdt, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059"},{"person":"Thuillier, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1553"},{"person":"Collins, Rachael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732618065"},{"person":"Stearns, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1089353141"},{"person":"Beland, Stephane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123"},{"person":"French, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439300069"},{"person":"Samaripa, Byron","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1993740978"},{"person":"Soukhovei, Vladislav","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1373936880"},{"person":"Reukauf, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n276714883"},{"person":"Mason, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1653020773"},{"person":"Hess, S L G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1972"},{"person":"Stewart, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1314757256"},{"person":"Gritzmacher, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583161727"},{"person":"Barrett, Rory","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n357449403"},{"person":"Bryant, Chelsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n867120482"},{"person":"Andersson, Laila","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907618201"},{"person":"Popescu, Radu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704"},{"person":"Ericksen, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n523846245"},{"person":"Dischner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229679033"},{"person":"Lace, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3812"},{"person":"Harber, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n638067304"},{"person":"Simmons, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n810031199"},{"person":"Kingsley, Roberto","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229480056"},{"person":"Kowalski, Adam F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2522"},{"person":"Puckett, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n728097612"},{"person":"Burrows, J P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004"},{"person":"Hutchison, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372190417"},{"person":"Meisner, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n544141382"},{"person":"Vermeer, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n566962202"},{"person":"Fox, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2852"},{"person":"Snow, Jake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588964680"},{"person":"Devito, Elizabeth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1981168541"},{"person":"Floyd, L E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2559"},{"person":"Kowalski, Elise","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1295294388"},{"person":"Bay, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n598683891"},{"person":"Thompson, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485924204"},{"person":"Kominek, Jay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936621824"},{"person":"Traver, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712"},{"person":"Brain, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n111928268"},{"person":"Cirbo, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1864293332"},{"person":"Lafferty, Gina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1241916224"},{"person":"Schloesser, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000340179"},{"person":"McCandless, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801066637"},{"person":"Wang, Xu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443866291"},{"person":"Briggs, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336740030"},{"person":"Dong, Y","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15204"},{"person":"Barrett, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725"},{"person":"Westfall, Jim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987838283"},{"person":"Pranger, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526450392"},{"person":"Fang, Xiaohua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872761738"},{"person":"Pilewskie, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n731850291"},{"person":"Burks, Damien","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599575729"},{"person":"Sarris, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1264895617"},{"person":"Groeninger, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976429543"},{"person":"Pilewskie, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310179206"},{"person":"Caspi, Amir","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n562924903"},{"person":"Valentine, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753432826"},{"person":"Crotser, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1662863303"},{"person":"Rusch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n970911879"},{"person":"Alfaro, Ann","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512209405"},{"person":"Drobilek, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1277774838"},{"person":"Smith, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513997220"},{"person":"Hudson, Hugh S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4790"},{"person":"Batiste, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n213386065"},{"person":"Mewaldt, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1417"},{"person":"Smith, Jamison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1146627975"},{"person":"Marcucci, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1318083343"},{"person":"Brennan, Nathanial","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1928440630"},{"person":"Griest, Ken","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n518533566"},{"person":"Erkaev, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n274"},{"person":"Beech, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n888928290"},{"person":"Wiesman, Brett","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n852217263"},{"person":"Bryant, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1085025965"},{"person":"Robbins, Stuart","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n559833574"},{"person":"Krodinger, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n948112081"},{"person":"Bloom, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2082768088"},{"person":"Thomas, Evan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1113966394"},{"person":"Papa, Joseph","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1354973592"},{"person":"McGouldrick, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n418611095"},{"person":"Packard, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299646442"},{"person":"Hartwick, Victoria","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1145663159"},{"person":"Milligan, Ryan O","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6412"},{"person":"Malaspina, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n290898740"},{"person":"Redick, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2080295530"},{"person":"Ferrington, Nicolas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n794601920"},{"person":"Reese, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1866062337"},{"person":"Christofferson, Ransom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1312757559"},{"person":"Richard, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1655982245"},{"person":"Kosovichev, A G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031"},{"person":"Ergun, Bob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n670178106"},{"person":"Sand, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428876202"},{"person":"Zhu, Yunqian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936941023"},{"person":"McEnulty, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1071261447"},{"person":"Newgord, Alexia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n695552564"},{"person":"Tilevitz, Chana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705385187"},{"person":"Hodges, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n133316609"},{"person":"Holt, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n180701835"},{"person":"Albers, Nicole","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570151423"},{"person":"Knehans, Edith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2043547795"},{"person":"Goodrich, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1323188719"},{"person":"Eberts, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1076781062"},{"person":"Lothringer, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1238347136"},{"person":"Li, Xinlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n293691365"},{"person":"Sparhawk, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648087653"},{"person":"Jeppesen, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845364011"},{"person":"Crismani, Matteo","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1307648345"},{"person":"Lin, R P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4577"},{"person":"Moffatt, Jerel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330004299"},{"person":"Larsen, Dane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513048464"},{"person":"Goodrich, Al","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n693905437"},{"person":"White, Neil","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1283020055"},{"person":"Delamere, Peter A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5649"},{"person":"Rehnberg, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1559998858"},{"person":"Cervelli, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n707294409"},{"person":"Vanier, Blake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n585326394"},{"person":"McNeil, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1528282796"},{"person":"George, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624031380"},{"person":"Hubbell, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n699751717"},{"person":"Green, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n90207282"},{"person":"Faber, Jack","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876344817"},{"person":"Pankratz, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966"},{"person":"Wullschleger, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n325914072"},{"person":"Monk, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857867638"},{"person":"Mitchell, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1215748306"},{"person":"Sremcevic, Miodrag","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n484618802"},{"person":"Peck, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489001940"},{"person":"Cirbo, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1429538900"},{"person":"Padgett, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1393218320"},{"person":"Reed, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1635945598"},{"person":"Eaton, Zak","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n44143920"},{"person":"Koski, Kraig","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912001963"},{"person":"Bloch, Nikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1319050477"},{"person":"Wright, Logan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1342215268"},{"person":"Hepburn, Kelly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n672306834"},{"person":"Williams, Forrest","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575366074"},{"person":"Kohnert, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438416807"},{"person":"Law, Mariah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1209408315"},{"person":"Miller, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n558713751"},{"person":"Piquette, Marcus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1844883463"},{"person":"Livingston, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7810"},{"person":"Carson, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2000525679"},{"person":"Kokkonen, Kim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665577609"},{"person":"Sainsbury, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1293656385"},{"person":"Hahn, Barb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n508652932"},{"person":"Anfinson, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2016926148"},{"person":"deFalco, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168824921"},{"person":"Withnell, Pete","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1298706407"},{"person":"Guy, Carol","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1709165908"},{"person":"Feickert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n173026304"},{"person":"Schmutz, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3012"},{"person":"Peterson, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n764015052"},{"person":"Baumann, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906271444"},{"person":"Crary, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2007987199"},{"person":"Kren, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857081541"},{"person":"Kopp, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068179785"},{"person":"Lindholm, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1790175656"},{"person":"Kelley, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352320643"},{"person":"Jaynes, Allison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1147514903"},{"person":"Holden, Nancy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995714539"},{"person":"Ramas, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183"},{"person":"Drake, Keith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n101045317"},{"person":"Maloney, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n146565298"},{"person":"Jones, G H","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6647"},{"person":"Hall, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502629516"},{"person":"Tate, Gail","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n268766314"},{"person":"Deighan, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1122737005"},{"person":"Didkovsky, L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1108"},{"person":"Sims, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526911137"},{"person":"Reed, Krista","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n877068749"},{"person":"Mackison, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434366058"},{"person":"Zucker, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562915827"},{"person":"Nastaj, Debra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782073425"},{"person":"Ringrose, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n69165236"},{"person":"Motz, Brent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2124160943"},{"person":"Possel, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019699773"},{"person":"McCollom, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159259470"},{"person":"Fowler, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n932646884"},{"person":"Theiling, Dale","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523846463"},{"person":"Swieter, Dwayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1192815390"},{"person":"Stimpfling, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n490092760"},{"person":"Migliorini, Lucas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n634891605"},{"person":"Longo, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n253562955"},{"person":"Tucker, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1007186618"},{"person":"Keefer, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n322281825"},{"person":"Wolf, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n221861851"},{"person":"Fleshman, Bobby","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1787"}];
    	//act
    	var returnedList = $formatFactory.formatPersonnelList(fakeSPARQLResults);
    	
    	//assert 	
    	expect(returnedList).toEqual(expectedList);
    });
    /*
    it("$scope.filterPeople() filters the result as we would expect.", function(){
    	//arrange
	    	//given this list of results...
	   		var givenPersonnelList = [{"person":"Rosenshein, Miriam","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1953572127"},{"person":"Beckman, Shawn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n400097966"},{"person":"Collette, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012646325"},{"person":"Pyke, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n295572919"},{"person":"Baragiola, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7999"},{"person":"Kaufhold, Alexandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890225154"},{"person":"Lykke, K R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3229"},{"person":"Letourneau, Hannah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n442363424"},{"person":"MacKinnon, A L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3603"},{"person":"Kempf, Sascha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1611913402"},{"person":"Steg, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1580269363"},{"person":"Myers, Casey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1263641634"},{"person":"Woodraska, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n626213350"},{"person":"LaClair, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907464116"},{"person":"Burrows, Spenser","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n902811839"},{"person":"Ma, Huikang","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n557026557"},{"person":"McGrath, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85999019"},{"person":"Mason, Carolyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1092945436"},{"person":"Jilek, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207320044"},{"person":"Smith, Dona","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n256748745"},{"person":"Sturner, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n975471748"},{"person":"O'Malia, Kasandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308336345"},{"person":"Schneider, Nick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917838557"},{"person":"Vertovec, Audrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914550976"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5764"},{"person":"Bershenyi, Gabe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n93921936"},{"person":"Emmett, Jeremy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n279164454"},{"person":"Kohnert, Rick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1029083323"},{"person":"Kien, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453839589"},{"person":"Farneth, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n939895236"},{"person":"Stewart, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474554423"},{"person":"Guneratne, Gabriella","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n371682424"},{"person":"Hillier, Jonathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532250141"},{"person":"Henderson, M G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5693"},{"person":"Judge, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3730"},{"person":"Tokar, R L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7508"},{"person":"Holsclaw, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000533497"},{"person":"Califf, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n717941184"},{"person":"Bryant, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n839305267"},{"person":"Heath, Caitlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115716969"},{"person":"Judd, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2140532425"},{"person":"Kittredge, Camden","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460254225"},{"person":"Harvey, Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1476646248"},{"person":"Brakebusch, Matthias","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n88429468"},{"person":"Chaffin, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489093530"},{"person":"Brian, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1880"},{"person":"Huang, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851"},{"person":"Labrosse, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5614"},{"person":"Masters, A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701"},{"person":"Springfield, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n713855563"},{"person":"Horanyi, Mihaly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1121953972"},{"person":"Craft, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961894036"},{"person":"Bramer, Shelley","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n686469069"},{"person":"Yoo, Kenny","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845055650"},{"person":"Loche, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4559796"},{"person":"Forsyth, Sasha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1013371228"},{"person":"Gurst, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861896580"},{"person":"James, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n363350498"},{"person":"Sparn, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428120649"},{"person":"Stawarz, Julia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n78726096"},{"person":"Riesberg, Lon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057"},{"person":"Espejo, Joey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n924628617"},{"person":"Rutkowski, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n412512658"},{"person":"Sawyer, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2115528787"},{"person":"Pryor, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1521316899"},{"person":"Eldridge, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292718971"},{"person":"Nuding, Danielle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648108589"},{"person":"Sittler, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367"},{"person":"Del Zanna, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2386"},{"person":"Thomsen, M F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3367"},{"person":"Harder, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1079014435"},{"person":"Weber, M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5279"},{"person":"Stewart, Ian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1672736625"},{"person":"Himpsel, Carl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1576768257"},{"person":"Woods, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031294282"},{"person":"Heuerman, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142912025"},{"person":"Bonnici, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1261402531"},{"person":"Pagaran, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3697"},{"person":"Wise, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n691938741"},{"person":"Song, Shi","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1483702429"},{"person":"Whitman, Dylan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1640855746"},{"person":"Knapp, Barry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270"},{"person":"Vial, J C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7086"},{"person":"Bagenal, Fran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1078482970"},{"person":"Robbins, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1250170131"},{"person":"Jouchoux, Alain","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844208077"},{"person":"Ucker, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971611210"},{"person":"Yehle, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2096276531"},{"person":"Brown, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1663284208"},{"person":"Himes, Caroline","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1205373967"},{"person":"Mathioudaki, Mihalis","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2823"},{"person":"May, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540607559"},{"person":"Redick, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1133614131"},{"person":"Costello, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127780985"},{"person":"Ali, Ashar","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n499931381"},{"person":"Giorgi, Ariana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n259579485"},{"person":"George, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n807406679"},{"person":"Keenan, Francis P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4089"},{"person":"Allison, Gregg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490733197"},{"person":"Flemer, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987913665"},{"person":"Wrigley, Ray","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1585441073"},{"person":"Lewis, G R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2118"},{"person":"Randall, Cora","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n109031017"},{"person":"Kindel, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1069407984"},{"person":"Martin, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n457505183"},{"person":"Yaptengco, Jonnie Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n850764044"},{"person":"Renfrow, Stephanie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796849613"},{"person":"Cole, Wes","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1225522401"},{"person":"Parsons, Kaitlyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1347690092"},{"person":"Randall, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n768867105"},{"person":"McBride, K M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6234"},{"person":"Steffl, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6059"},{"person":"Taylor, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n716030637"},{"person":"Nammari, Aref","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n936762217"},{"person":"Unruh, Y C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2086"},{"person":"Braun, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n423648172"},{"person":"Min, Clifford","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1820576034"},{"person":"Sternovsky, Zoltan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465061973"},{"person":"Larson, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428163578"},{"person":"Larsen, Kristopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1306378180"},{"person":"Asmus, Heiner","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861075396"},{"person":"Graham, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4314"},{"person":"Barcilon, Cristina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2034181570"},{"person":"Roughton, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491"},{"person":"Wilder, Frederick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n754212791"},{"person":"McTague, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1345402132"},{"person":"Beaty, Nicholaus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n976701326"},{"person":"Baker, Dan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205444746"},{"person":"Fontenla, J M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1740"},{"person":"Laumbach, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1944328695"},{"person":"Hill, T W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6642"},{"person":"Dorey, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764"},{"person":"Otzinger, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1255830498"},{"person":"Dozier, Melissa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n175766494"},{"person":"Behner, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n894769667"},{"person":"Desroche, Mariel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n140"},{"person":"White, Oran R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3911"},{"person":"Jones, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050657630"},{"person":"Ames, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995808836"},{"person":"Zhao, Hong","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1496019964"},{"person":"Molaverdikhani, Karan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127503713"},{"person":"Newcomb, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21578080"},{"person":"Haugen, Cheryl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n480038164"},{"person":"Seidel, Durbin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1617731339"},{"person":"Hand, Molly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023583009"},{"person":"Gosling, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1962822057"},{"person":"O'Connor, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1139384165"},{"person":"Peck, Courtney","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301530484"},{"person":"Wade, Stacy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1473474892"},{"person":"Lindholm, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741489759"},{"person":"Keiser, Brad","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738"},{"person":"Ogden, Tammie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583658483"},{"person":"Spivey, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2053763554"},{"person":"Moore, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1267979694"},{"person":"Worel, Shana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n804667043"},{"person":"Rast, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n760843983"},{"person":"Szalay, Jamey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916260001"},{"person":"Street, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205732767"},{"person":"Siler, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823187793"},{"person":"Richard, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3595"},{"person":"Wood, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1184521804"},{"person":"Ziegler, Stephen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815934722"},{"person":"Aberle, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255311939"},{"person":"Reiter, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753914660"},{"person":"Kurth, W S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3385"},{"person":"Annett, Graham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n63860692"},{"person":"Ajello, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588676707"},{"person":"Bearden, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273282227"},{"person":"Osborne, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1582851040"},{"person":"Miller, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n715993936"},{"person":"Rottman, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1708643326"},{"person":"Tolea, Alin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n884210681"},{"person":"Castleman, Zach","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n646814721"},{"person":"Fletcher, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649163029"},{"person":"Lord, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1340836925"},{"person":"Thomas, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n320506707"},{"person":"Barratt, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n404394851"},{"person":"Toon, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845246448"},{"person":"Esposito, Larry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1210903869"},{"person":"Hoxie, Vaughn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1404677880"},{"person":"DeWolfe, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178"},{"person":"Buckhannon, Linda","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1066918532"},{"person":"Dewey, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575426137"},{"person":"Solomon, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n383047709"},{"person":"Persoon, A M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5493"},{"person":"Hansen, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1814290075"},{"person":"Eparvier, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1414522112"},{"person":"Knappmiller, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446589790"},{"person":"Merkow, Mat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530345758"},{"person":"Janiczek, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19700812"},{"person":"Jakosky, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1313577318"},{"person":"Mitchell, D G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1186"},{"person":"Ranquist, Drake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1154848063"},{"person":"Triplett, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1386835492"},{"person":"Eden, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014923244"},{"person":"Gagnard, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n228305227"},{"person":"Marcus, Holly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n522816235"},{"person":"Brown, S W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1400"},{"person":"Parenteau, Scarlet","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1659685056"},{"person":"Gabbert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2111487135"},{"person":"DeNeen, Mathew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n875589346"},{"person":"Williams, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310654820"},{"person":"Smith, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523165414"},{"person":"Geiger, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n953545550"},{"person":"Baker, Kirsten","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1488098331"},{"person":"Coddington, Odele","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070007600"},{"person":"Ortiz, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896094121"},{"person":"Templeman, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053"},{"person":"Pontias Jr., D W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3564"},{"person":"Johnson, R E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4997"},{"person":"Luebke, Anna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657335496"},{"person":"McClintock, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n571959716"},{"person":"Lawrence, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1315804720"},{"person":"Mueller, Steven","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013"},{"person":"Elkington, Scot","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n553631097"},{"person":"Gurgel, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301690009"},{"person":"Su, Y J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7203"},{"person":"Brown, Jeff","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417348364"},{"person":"Hartnett, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512122452"},{"person":"Costner, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367854519"},{"person":"McCabe, Deb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1966385563"},{"person":"Cohn-Cort, Bronwen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n103589832"},{"person":"Motz, Brooklyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927000766"},{"person":"Blum, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523754547"},{"person":"LeBlanc, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907419030"},{"person":"Blunck, Jeffrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382538298"},{"person":"Solanki, S K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7362"},{"person":"Avallone, Linnea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1454781079"},{"person":"Linden, Keita","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1889784291"},{"person":"Chamberlin, Phillip C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n8187"},{"person":"Krivova, N A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4043"},{"person":"Sheiko, Nathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624617909"},{"person":"Davis, Nina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n408500045"},{"person":"Williamson, Eleanor","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1118370667"},{"person":"Elrod, M K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2507"},{"person":"Evans, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1479837765"},{"person":"Pachhai, Kiran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255283506"},{"person":"Wright, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532824368"},{"person":"Mason, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n132879659"},{"person":"Vanderburgh, Abraham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281302864"},{"person":"Mcgill, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1967605763"},{"person":"Osterloo, Mikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424673248"},{"person":"Schmidt, Sebastian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330547662"},{"person":"Thiede, Jon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n107799568"},{"person":"Belting, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513891097"},{"person":"Hynek, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1628438375"},{"person":"Madhusudhanan, Prasanna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050483258"},{"person":"Werdel, Brandon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653143342"},{"person":"Carton, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n721510310"},{"person":"Salcido, Crystal","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490162473"},{"person":"Patton, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1685525735"},{"person":"McGilvray, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n177902987"},{"person":"Murphy, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1688610058"},{"person":"Mclaughlin, Pattilyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753508281"},{"person":"Rider, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1501051647"},{"person":"Slipski, Marek","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850769182"},{"person":"Welch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115139280"},{"person":"Delory, G T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n275"},{"person":"Wehner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1397764181"},{"person":"Shu, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2081552666"},{"person":"Wilson, Rob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n220165430"},{"person":"Schuehle, U","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100"},{"person":"Wahlund, J E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4697"},{"person":"Wieman, S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3791"},{"person":"Schelz, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n340499533"},{"person":"Sicken, Patti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1507994595"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3668"},{"person":"Osborne, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801786743"},{"person":"Egan, Andrea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115491601"},{"person":"Lean, Judith L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6638"},{"person":"Fenz-Trimble, Kaiti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n659278552"},{"person":"Lemaire, P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4371"},{"person":"King, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2130392723"},{"person":"Flynn, Sierra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1536335847"},{"person":"Albin, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1286655618"},{"person":"Pilinski, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1631975500"},{"person":"Van Orden, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n183811506"},{"person":"O'brien, Leela","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5234329"},{"person":"Schrijver, C J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2311"},{"person":"Coates, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n14458"},{"person":"Haskins, Jessica","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n911013275"},{"person":"Kalnajs, Lars","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1854309916"},{"person":"Snow, Marty","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n429119084"},{"person":"Abdulhamid, Ramsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912875884"},{"person":"Boschert, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1178406628"},{"person":"Panneton, Russell","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578196712"},{"person":"King, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649468078"},{"person":"Holmes, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851684395"},{"person":"Lalonde, Jean-Francois","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159233084"},{"person":"Boyle, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036313819"},{"person":"Richards, P G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801"},{"person":"Reedy, Lee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1817223813"},{"person":"Flaherty, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1395635868"},{"person":"Methlie, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2147322495"},{"person":"Cassidy, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062620213"},{"person":"Wescott, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n798247984"},{"person":"Villabona, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1116996073"},{"person":"Moreira Hooks, Joao","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n346540776"},{"person":"Liner, Samantha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1112572230"},{"person":"Hsu, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n477177479"},{"person":"Fletcher, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5034"},{"person":"Thiemann, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070599412"},{"person":"Young, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912403582"},{"person":"Rasca, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607749756"},{"person":"Klapetzky, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906366491"},{"person":"Pettit, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n35200622"},{"person":"Brugman, Karalee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n92857531"},{"person":"Bonney, Donovan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507734015"},{"person":"Rogers, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107685763"},{"person":"Barth, Charles","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1803353333"},{"person":"Bela, Megan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91624444"},{"person":"Jacobson, Ross","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n374781680"},{"person":"Perish, Norm","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1700784405"},{"person":"Cox, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931"},{"person":"Hotard, Bonnie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027471498"},{"person":"Bolton, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540886314"},{"person":"Troxel, Kathy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242954374"},{"person":"Schiller, Quintin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052186645"},{"person":"Bode, Marc","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1798748915"},{"person":"Krahe, Margaux","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1353991561"},{"person":"Eriksson, Stefan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n125517773"},{"person":"Smith, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n658738358"},{"person":"Lankton, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1043347675"},{"person":"Howes, Calvin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633595791"},{"person":"Dewoina, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2779032"},{"person":"Bunnell, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438372251"},{"person":"Haynes, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n161684617"},{"person":"Holler, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2009987779"},{"person":"Spurgeon, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014728592"},{"person":"Dols, Vincent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599462975"},{"person":"Ryan, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1188565226"},{"person":"Passe, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1234648683"},{"person":"Plesha, Rachel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1228806873"},{"person":"Drake, Ginger","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n71958169"},{"person":"Ray, L C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5341"},{"person":"Lamprecht, Bret","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n739599306"},{"person":"Summers, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115343616"},{"person":"Erickson, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n765907129"},{"person":"Jones, Gayle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n57504821"},{"person":"Dinkel, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n613953723"},{"person":"Wanamaker, Isaac","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799142869"},{"person":"Ruske, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n62569024"},{"person":"Kreisher, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n612686962"},{"person":"Kern, Josh","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653826283"},{"person":"Tseng, W L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6708"},{"person":"Simons-Brown, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159306400"},{"person":"Fox, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896505121"},{"person":"Tighe, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1537989152"},{"person":"Hoskins, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1025386724"},{"person":"Negus, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n964782842"},{"person":"Vincent, Tracy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1191377000"},{"person":"Gruen, Eberhard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1822827997"},{"person":"Taylor, Trent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507926942"},{"person":"Stone, Jordan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382272449"},{"person":"Elsborg, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911"},{"person":"Lewis, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n472262787"},{"person":"Yau, A W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3676"},{"person":"Soto Hoffmann, Patricia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1971283737"},{"person":"Gathright, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1719236045"},{"person":"Karlsson, Magnus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1544450972"},{"person":"Merkel, Aimee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n406773472"},{"person":"Yu, Pengfei","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n362772828"},{"person":"Wilson, Anne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1869681270"},{"person":"Curdt, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059"},{"person":"Thuillier, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1553"},{"person":"Collins, Rachael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732618065"},{"person":"Stearns, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1089353141"},{"person":"Beland, Stephane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123"},{"person":"French, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439300069"},{"person":"Samaripa, Byron","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1993740978"},{"person":"Soukhovei, Vladislav","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1373936880"},{"person":"Reukauf, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n276714883"},{"person":"Mason, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1653020773"},{"person":"Hess, S L G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1972"},{"person":"Stewart, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1314757256"},{"person":"Gritzmacher, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583161727"},{"person":"Barrett, Rory","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n357449403"},{"person":"Bryant, Chelsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n867120482"},{"person":"Andersson, Laila","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907618201"},{"person":"Popescu, Radu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704"},{"person":"Ericksen, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n523846245"},{"person":"Dischner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229679033"},{"person":"Lace, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3812"},{"person":"Harber, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n638067304"},{"person":"Simmons, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n810031199"},{"person":"Kingsley, Roberto","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229480056"},{"person":"Kowalski, Adam F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2522"},{"person":"Puckett, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n728097612"},{"person":"Burrows, J P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004"},{"person":"Hutchison, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372190417"},{"person":"Meisner, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n544141382"},{"person":"Vermeer, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n566962202"},{"person":"Fox, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2852"},{"person":"Snow, Jake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588964680"},{"person":"Devito, Elizabeth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1981168541"},{"person":"Floyd, L E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2559"},{"person":"Kowalski, Elise","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1295294388"},{"person":"Bay, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n598683891"},{"person":"Thompson, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485924204"},{"person":"Kominek, Jay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936621824"},{"person":"Traver, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712"},{"person":"Brain, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n111928268"},{"person":"Cirbo, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1864293332"},{"person":"Lafferty, Gina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1241916224"},{"person":"Schloesser, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000340179"},{"person":"McCandless, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801066637"},{"person":"Wang, Xu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443866291"},{"person":"Briggs, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336740030"},{"person":"Dong, Y","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15204"},{"person":"Barrett, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725"},{"person":"Westfall, Jim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987838283"},{"person":"Pranger, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526450392"},{"person":"Fang, Xiaohua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872761738"},{"person":"Pilewskie, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n731850291"},{"person":"Burks, Damien","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599575729"},{"person":"Sarris, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1264895617"},{"person":"Groeninger, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976429543"},{"person":"Pilewskie, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310179206"},{"person":"Caspi, Amir","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n562924903"},{"person":"Valentine, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753432826"},{"person":"Crotser, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1662863303"},{"person":"Rusch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n970911879"},{"person":"Alfaro, Ann","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512209405"},{"person":"Drobilek, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1277774838"},{"person":"Smith, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513997220"},{"person":"Hudson, Hugh S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4790"},{"person":"Batiste, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n213386065"},{"person":"Mewaldt, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1417"},{"person":"Smith, Jamison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1146627975"},{"person":"Marcucci, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1318083343"},{"person":"Brennan, Nathanial","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1928440630"},{"person":"Griest, Ken","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n518533566"},{"person":"Erkaev, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n274"},{"person":"Beech, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n888928290"},{"person":"Wiesman, Brett","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n852217263"},{"person":"Bryant, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1085025965"},{"person":"Robbins, Stuart","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n559833574"},{"person":"Krodinger, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n948112081"},{"person":"Bloom, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2082768088"},{"person":"Thomas, Evan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1113966394"},{"person":"Papa, Joseph","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1354973592"},{"person":"McGouldrick, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n418611095"},{"person":"Packard, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299646442"},{"person":"Hartwick, Victoria","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1145663159"},{"person":"Milligan, Ryan O","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6412"},{"person":"Malaspina, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n290898740"},{"person":"Redick, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2080295530"},{"person":"Ferrington, Nicolas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n794601920"},{"person":"Reese, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1866062337"},{"person":"Christofferson, Ransom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1312757559"},{"person":"Richard, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1655982245"},{"person":"Kosovichev, A G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031"},{"person":"Ergun, Bob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n670178106"},{"person":"Sand, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428876202"},{"person":"Zhu, Yunqian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936941023"},{"person":"McEnulty, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1071261447"},{"person":"Newgord, Alexia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n695552564"},{"person":"Tilevitz, Chana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705385187"},{"person":"Hodges, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n133316609"},{"person":"Holt, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n180701835"},{"person":"Albers, Nicole","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570151423"},{"person":"Knehans, Edith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2043547795"},{"person":"Goodrich, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1323188719"},{"person":"Eberts, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1076781062"},{"person":"Lothringer, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1238347136"},{"person":"Li, Xinlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n293691365"},{"person":"Sparhawk, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648087653"},{"person":"Jeppesen, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845364011"},{"person":"Crismani, Matteo","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1307648345"},{"person":"Lin, R P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4577"},{"person":"Moffatt, Jerel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330004299"},{"person":"Larsen, Dane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513048464"},{"person":"Goodrich, Al","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n693905437"},{"person":"White, Neil","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1283020055"},{"person":"Delamere, Peter A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5649"},{"person":"Rehnberg, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1559998858"},{"person":"Cervelli, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n707294409"},{"person":"Vanier, Blake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n585326394"},{"person":"McNeil, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1528282796"},{"person":"George, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624031380"},{"person":"Hubbell, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n699751717"},{"person":"Green, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n90207282"},{"person":"Faber, Jack","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876344817"},{"person":"Pankratz, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966"},{"person":"Wullschleger, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n325914072"},{"person":"Monk, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857867638"},{"person":"Mitchell, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1215748306"},{"person":"Sremcevic, Miodrag","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n484618802"},{"person":"Peck, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489001940"},{"person":"Cirbo, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1429538900"},{"person":"Padgett, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1393218320"},{"person":"Reed, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1635945598"},{"person":"Eaton, Zak","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n44143920"},{"person":"Koski, Kraig","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912001963"},{"person":"Bloch, Nikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1319050477"},{"person":"Wright, Logan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1342215268"},{"person":"Hepburn, Kelly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n672306834"},{"person":"Williams, Forrest","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575366074"},{"person":"Kohnert, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438416807"},{"person":"Law, Mariah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1209408315"},{"person":"Miller, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n558713751"},{"person":"Piquette, Marcus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1844883463"},{"person":"Livingston, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7810"},{"person":"Carson, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2000525679"},{"person":"Kokkonen, Kim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665577609"},{"person":"Sainsbury, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1293656385"},{"person":"Hahn, Barb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n508652932"},{"person":"Anfinson, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2016926148"},{"person":"deFalco, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168824921"},{"person":"Withnell, Pete","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1298706407"},{"person":"Guy, Carol","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1709165908"},{"person":"Feickert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n173026304"},{"person":"Schmutz, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3012"},{"person":"Peterson, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n764015052"},{"person":"Baumann, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906271444"},{"person":"Crary, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2007987199"},{"person":"Kren, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857081541"},{"person":"Kopp, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068179785"},{"person":"Lindholm, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1790175656"},{"person":"Kelley, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352320643"},{"person":"Jaynes, Allison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1147514903"},{"person":"Holden, Nancy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995714539"},{"person":"Ramas, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183"},{"person":"Drake, Keith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n101045317"},{"person":"Maloney, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n146565298"},{"person":"Jones, G H","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6647"},{"person":"Hall, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502629516"},{"person":"Tate, Gail","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n268766314"},{"person":"Deighan, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1122737005"},{"person":"Didkovsky, L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1108"},{"person":"Sims, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526911137"},{"person":"Reed, Krista","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n877068749"},{"person":"Mackison, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434366058"},{"person":"Zucker, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562915827"},{"person":"Nastaj, Debra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782073425"},{"person":"Ringrose, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n69165236"},{"person":"Motz, Brent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2124160943"},{"person":"Possel, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019699773"},{"person":"McCollom, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159259470"},{"person":"Fowler, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n932646884"},{"person":"Theiling, Dale","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523846463"},{"person":"Swieter, Dwayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1192815390"},{"person":"Stimpfling, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n490092760"},{"person":"Migliorini, Lucas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n634891605"},{"person":"Longo, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n253562955"},{"person":"Tucker, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1007186618"},{"person":"Keefer, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n322281825"},{"person":"Wolf, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n221861851"},{"person":"Fleshman, Bobby","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1787"}];
	   		//we'd hope to see this final List returned by formatMasterList
	    	var expectedPersonnelList = [{"person":"Abdulhamid, Ramsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912875884"},{"person":"Aberle, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255311939"},{"person":"Ajello, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588676707"},{"person":"Albers, Nicole","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570151423"},{"person":"Albin, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1286655618"},{"person":"Alfaro, Ann","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512209405"},{"person":"Ali, Ashar","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n499931381"},{"person":"Allison, Gregg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490733197"},{"person":"Ames, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995808836"},{"person":"Andersson, Laila","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907618201"},{"person":"Anfinson, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2016926148"},{"person":"Annett, Graham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n63860692"},{"person":"Asmus, Heiner","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861075396"},{"person":"Avallone, Linnea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1454781079"},{"person":"Bagenal, Fran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1078482970"},{"person":"Baker, Dan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205444746"},{"person":"Baker, Kirsten","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1488098331"},{"person":"Baragiola, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7999"},{"person":"Barcilon, Cristina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2034181570"},{"person":"Barratt, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n404394851"},{"person":"Barrett, Rory","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n357449403"},{"person":"Barrett, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725"},{"person":"Barth, Charles","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1803353333"},{"person":"Batiste, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n213386065"},{"person":"Baumann, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906271444"},{"person":"Bay, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n598683891"},{"person":"Bearden, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273282227"},{"person":"Beaty, Nicholaus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n976701326"},{"person":"Beckman, Shawn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n400097966"},{"person":"Beech, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n888928290"},{"person":"Behner, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n894769667"},{"person":"Bela, Megan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91624444"},{"person":"Beland, Stephane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123"},{"person":"Belting, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513891097"},{"person":"Bershenyi, Gabe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n93921936"},{"person":"Bloch, Nikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1319050477"},{"person":"Bloom, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2082768088"},{"person":"Blum, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523754547"},{"person":"Blunck, Jeffrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382538298"},{"person":"Bode, Marc","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1798748915"},{"person":"Bolton, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540886314"},{"person":"Bonney, Donovan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507734015"},{"person":"Bonnici, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1261402531"},{"person":"Boschert, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1178406628"},{"person":"Boyle, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036313819"},{"person":"Brain, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n111928268"},{"person":"Brakebusch, Matthias","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n88429468"},{"person":"Bramer, Shelley","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n686469069"},{"person":"Braun, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n423648172"},{"person":"Brennan, Nathanial","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1928440630"},{"person":"Brian, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1880"},{"person":"Briggs, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336740030"},{"person":"Brown, Jeff","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417348364"},{"person":"Brown, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1663284208"},{"person":"Brown, S W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1400"},{"person":"Brugman, Karalee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n92857531"},{"person":"Bryant, Chelsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n867120482"},{"person":"Bryant, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n839305267"},{"person":"Bryant, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1085025965"},{"person":"Buckhannon, Linda","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1066918532"},{"person":"Bunnell, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438372251"},{"person":"Burks, Damien","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599575729"},{"person":"Burrows, J P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004"},{"person":"Burrows, Spenser","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n902811839"},{"person":"Califf, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n717941184"},{"person":"Carson, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2000525679"},{"person":"Carton, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n721510310"},{"person":"Caspi, Amir","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n562924903"},{"person":"Cassidy, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062620213"},{"person":"Castleman, Zach","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n646814721"},{"person":"Cervelli, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n707294409"},{"person":"Chaffin, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489093530"},{"person":"Chamberlin, Phillip C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n8187"},{"person":"Christofferson, Ransom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1312757559"},{"person":"Cirbo, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1429538900"},{"person":"Cirbo, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1864293332"},{"person":"Coates, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n14458"},{"person":"Coddington, Odele","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070007600"},{"person":"Cohn-Cort, Bronwen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n103589832"},{"person":"Cole, Wes","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1225522401"},{"person":"Collette, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012646325"},{"person":"Collins, Rachael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732618065"},{"person":"Costello, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127780985"},{"person":"Costner, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367854519"},{"person":"Cox, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931"},{"person":"Craft, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961894036"},{"person":"Crary, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2007987199"},{"person":"Crismani, Matteo","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1307648345"},{"person":"Crotser, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1662863303"},{"person":"Curdt, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059"},{"person":"Davis, Nina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n408500045"},{"person":"DeNeen, Mathew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n875589346"},{"person":"DeWolfe, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178"},{"person":"Deighan, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1122737005"},{"person":"Del Zanna, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2386"},{"person":"Delamere, Peter A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5649"},{"person":"Delory, G T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n275"},{"person":"Desroche, Mariel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n140"},{"person":"Devito, Elizabeth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1981168541"},{"person":"Dewey, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575426137"},{"person":"Dewoina, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2779032"},{"person":"Didkovsky, L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1108"},{"person":"Dinkel, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n613953723"},{"person":"Dischner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229679033"},{"person":"Dols, Vincent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599462975"},{"person":"Dong, Y","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15204"},{"person":"Dorey, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764"},{"person":"Dozier, Melissa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n175766494"},{"person":"Drake, Ginger","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n71958169"},{"person":"Drake, Keith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n101045317"},{"person":"Drobilek, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1277774838"},{"person":"Eaton, Zak","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n44143920"},{"person":"Eberts, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1076781062"},{"person":"Eden, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014923244"},{"person":"Egan, Andrea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115491601"},{"person":"Eldridge, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292718971"},{"person":"Elkington, Scot","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n553631097"},{"person":"Elrod, M K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2507"},{"person":"Elsborg, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911"},{"person":"Emmett, Jeremy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n279164454"},{"person":"Eparvier, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1414522112"},{"person":"Ergun, Bob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n670178106"},{"person":"Ericksen, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n523846245"},{"person":"Erickson, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n765907129"},{"person":"Eriksson, Stefan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n125517773"},{"person":"Erkaev, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n274"},{"person":"Espejo, Joey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n924628617"},{"person":"Esposito, Larry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1210903869"},{"person":"Evans, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1479837765"},{"person":"Faber, Jack","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876344817"},{"person":"Fang, Xiaohua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872761738"},{"person":"Farneth, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n939895236"},{"person":"Feickert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n173026304"},{"person":"Fenz-Trimble, Kaiti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n659278552"},{"person":"Ferrington, Nicolas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n794601920"},{"person":"Flaherty, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1395635868"},{"person":"Flemer, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987913665"},{"person":"Fleshman, Bobby","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1787"},{"person":"Fletcher, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649163029"},{"person":"Fletcher, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5034"},{"person":"Floyd, L E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2559"},{"person":"Flynn, Sierra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1536335847"},{"person":"Fontenla, J M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1740"},{"person":"Forsyth, Sasha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1013371228"},{"person":"Fowler, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n932646884"},{"person":"Fox, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2852"},{"person":"Fox, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896505121"},{"person":"French, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439300069"},{"person":"Gabbert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2111487135"},{"person":"Gagnard, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n228305227"},{"person":"Gathright, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1719236045"},{"person":"Geiger, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n953545550"},{"person":"George, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624031380"},{"person":"George, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n807406679"},{"person":"Giorgi, Ariana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n259579485"},{"person":"Goodrich, Al","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n693905437"},{"person":"Goodrich, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1323188719"},{"person":"Gosling, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1962822057"},{"person":"Graham, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4314"},{"person":"Green, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n90207282"},{"person":"Griest, Ken","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n518533566"},{"person":"Gritzmacher, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583161727"},{"person":"Groeninger, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976429543"},{"person":"Gruen, Eberhard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1822827997"},{"person":"Guneratne, Gabriella","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n371682424"},{"person":"Gurgel, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301690009"},{"person":"Gurst, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861896580"},{"person":"Guy, Carol","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1709165908"},{"person":"Hahn, Barb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n508652932"},{"person":"Hall, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502629516"},{"person":"Hand, Molly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023583009"},{"person":"Hansen, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1814290075"},{"person":"Harber, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n638067304"},{"person":"Harder, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1079014435"},{"person":"Hartnett, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512122452"},{"person":"Hartwick, Victoria","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1145663159"},{"person":"Harvey, Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1476646248"},{"person":"Haskins, Jessica","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n911013275"},{"person":"Haugen, Cheryl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n480038164"},{"person":"Haynes, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n161684617"},{"person":"Heath, Caitlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115716969"},{"person":"Henderson, M G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5693"},{"person":"Hepburn, Kelly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n672306834"},{"person":"Hess, S L G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1972"},{"person":"Heuerman, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142912025"},{"person":"Hill, T W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6642"},{"person":"Hillier, Jonathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532250141"},{"person":"Himes, Caroline","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1205373967"},{"person":"Himpsel, Carl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1576768257"},{"person":"Hodges, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n133316609"},{"person":"Holden, Nancy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995714539"},{"person":"Holler, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2009987779"},{"person":"Holmes, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851684395"},{"person":"Holsclaw, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000533497"},{"person":"Holt, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n180701835"},{"person":"Horanyi, Mihaly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1121953972"},{"person":"Hoskins, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1025386724"},{"person":"Hotard, Bonnie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027471498"},{"person":"Howes, Calvin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633595791"},{"person":"Hoxie, Vaughn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1404677880"},{"person":"Hsu, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n477177479"},{"person":"Huang, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851"},{"person":"Hubbell, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n699751717"},{"person":"Hudson, Hugh S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4790"},{"person":"Hutchison, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372190417"},{"person":"Hynek, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1628438375"},{"person":"Jacobson, Ross","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n374781680"},{"person":"Jakosky, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1313577318"},{"person":"James, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n363350498"},{"person":"Janiczek, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19700812"},{"person":"Jaynes, Allison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1147514903"},{"person":"Jeppesen, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845364011"},{"person":"Jilek, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207320044"},{"person":"Johnson, R E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4997"},{"person":"Jones, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050657630"},{"person":"Jones, G H","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6647"},{"person":"Jones, Gayle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n57504821"},{"person":"Jouchoux, Alain","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844208077"},{"person":"Judd, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2140532425"},{"person":"Judge, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3730"},{"person":"Kalnajs, Lars","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1854309916"},{"person":"Karlsson, Magnus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1544450972"},{"person":"Kaufhold, Alexandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890225154"},{"person":"Keefer, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n322281825"},{"person":"Keenan, Francis P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4089"},{"person":"Keiser, Brad","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738"},{"person":"Kelley, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352320643"},{"person":"Kempf, Sascha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1611913402"},{"person":"Kern, Josh","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653826283"},{"person":"Kien, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453839589"},{"person":"Kindel, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1069407984"},{"person":"King, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649468078"},{"person":"King, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2130392723"},{"person":"Kingsley, Roberto","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229480056"},{"person":"Kittredge, Camden","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460254225"},{"person":"Klapetzky, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906366491"},{"person":"Knapp, Barry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270"},{"person":"Knappmiller, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446589790"},{"person":"Knehans, Edith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2043547795"},{"person":"Kohnert, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438416807"},{"person":"Kohnert, Rick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1029083323"},{"person":"Kokkonen, Kim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665577609"},{"person":"Kominek, Jay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936621824"},{"person":"Kopp, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068179785"},{"person":"Koski, Kraig","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912001963"},{"person":"Kosovichev, A G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031"},{"person":"Kowalski, Adam F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2522"},{"person":"Kowalski, Elise","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1295294388"},{"person":"Krahe, Margaux","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1353991561"},{"person":"Kreisher, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n612686962"},{"person":"Kren, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857081541"},{"person":"Krivova, N A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4043"},{"person":"Krodinger, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n948112081"},{"person":"Kurth, W S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3385"},{"person":"LaClair, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907464116"},{"person":"Labrosse, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5614"},{"person":"Lace, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3812"},{"person":"Lafferty, Gina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1241916224"},{"person":"Lalonde, Jean-Francois","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159233084"},{"person":"Lamprecht, Bret","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n739599306"},{"person":"Lankton, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1043347675"},{"person":"Larsen, Dane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513048464"},{"person":"Larsen, Kristopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1306378180"},{"person":"Larson, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428163578"},{"person":"Laumbach, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1944328695"},{"person":"Law, Mariah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1209408315"},{"person":"Lawrence, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1315804720"},{"person":"LeBlanc, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907419030"},{"person":"Lean, Judith L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6638"},{"person":"Lemaire, P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4371"},{"person":"Letourneau, Hannah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n442363424"},{"person":"Lewis, G R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2118"},{"person":"Lewis, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n472262787"},{"person":"Li, Xinlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n293691365"},{"person":"Lin, R P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4577"},{"person":"Linden, Keita","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1889784291"},{"person":"Lindholm, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741489759"},{"person":"Lindholm, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1790175656"},{"person":"Liner, Samantha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1112572230"},{"person":"Livingston, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7810"},{"person":"Loche, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4559796"},{"person":"Longo, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n253562955"},{"person":"Lord, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1340836925"},{"person":"Lothringer, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1238347136"},{"person":"Luebke, Anna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657335496"},{"person":"Lykke, K R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3229"},{"person":"Ma, Huikang","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n557026557"},{"person":"MacKinnon, A L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3603"},{"person":"Mackison, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434366058"},{"person":"Madhusudhanan, Prasanna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050483258"},{"person":"Malaspina, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n290898740"},{"person":"Maloney, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n146565298"},{"person":"Marcucci, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1318083343"},{"person":"Marcus, Holly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n522816235"},{"person":"Martin, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n457505183"},{"person":"Mason, Carolyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1092945436"},{"person":"Mason, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n132879659"},{"person":"Mason, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1653020773"},{"person":"Masters, A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701"},{"person":"Mathioudaki, Mihalis","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2823"},{"person":"May, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540607559"},{"person":"McBride, K M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6234"},{"person":"McCabe, Deb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1966385563"},{"person":"McCandless, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801066637"},{"person":"McClintock, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n571959716"},{"person":"McCollom, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159259470"},{"person":"McEnulty, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1071261447"},{"person":"McGilvray, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n177902987"},{"person":"McGouldrick, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n418611095"},{"person":"McGrath, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85999019"},{"person":"McNeil, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1528282796"},{"person":"McTague, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1345402132"},{"person":"Mcgill, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1967605763"},{"person":"Mclaughlin, Pattilyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753508281"},{"person":"Meisner, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n544141382"},{"person":"Merkel, Aimee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n406773472"},{"person":"Merkow, Mat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530345758"},{"person":"Methlie, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2147322495"},{"person":"Mewaldt, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1417"},{"person":"Migliorini, Lucas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n634891605"},{"person":"Miller, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n715993936"},{"person":"Miller, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n558713751"},{"person":"Milligan, Ryan O","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6412"},{"person":"Min, Clifford","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1820576034"},{"person":"Mitchell, D G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1186"},{"person":"Mitchell, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1215748306"},{"person":"Moffatt, Jerel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330004299"},{"person":"Molaverdikhani, Karan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127503713"},{"person":"Monk, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857867638"},{"person":"Moore, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1267979694"},{"person":"Moreira Hooks, Joao","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n346540776"},{"person":"Motz, Brent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2124160943"},{"person":"Motz, Brooklyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927000766"},{"person":"Mueller, Steven","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013"},{"person":"Murphy, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1688610058"},{"person":"Myers, Casey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1263641634"},{"person":"Nammari, Aref","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n936762217"},{"person":"Nastaj, Debra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782073425"},{"person":"Negus, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n964782842"},{"person":"Newcomb, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21578080"},{"person":"Newgord, Alexia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n695552564"},{"person":"Nuding, Danielle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648108589"},{"person":"O'Connor, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1139384165"},{"person":"O'Malia, Kasandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308336345"},{"person":"O'brien, Leela","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5234329"},{"person":"Ogden, Tammie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583658483"},{"person":"Ortiz, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896094121"},{"person":"Osborne, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1582851040"},{"person":"Osborne, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801786743"},{"person":"Osterloo, Mikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424673248"},{"person":"Otzinger, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1255830498"},{"person":"Pachhai, Kiran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255283506"},{"person":"Packard, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299646442"},{"person":"Padgett, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1393218320"},{"person":"Pagaran, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3697"},{"person":"Pankratz, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966"},{"person":"Panneton, Russell","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578196712"},{"person":"Papa, Joseph","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1354973592"},{"person":"Parenteau, Scarlet","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1659685056"},{"person":"Parsons, Kaitlyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1347690092"},{"person":"Passe, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1234648683"},{"person":"Patton, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1685525735"},{"person":"Peck, Courtney","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301530484"},{"person":"Peck, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489001940"},{"person":"Perish, Norm","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1700784405"},{"person":"Persoon, A M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5493"},{"person":"Peterson, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n764015052"},{"person":"Pettit, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n35200622"},{"person":"Pilewskie, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310179206"},{"person":"Pilewskie, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n731850291"},{"person":"Pilinski, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1631975500"},{"person":"Piquette, Marcus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1844883463"},{"person":"Plesha, Rachel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1228806873"},{"person":"Pontias Jr., D W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3564"},{"person":"Popescu, Radu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704"},{"person":"Possel, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019699773"},{"person":"Pranger, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526450392"},{"person":"Pryor, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1521316899"},{"person":"Puckett, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n728097612"},{"person":"Pyke, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n295572919"},{"person":"Ramas, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183"},{"person":"Randall, Cora","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n109031017"},{"person":"Randall, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n768867105"},{"person":"Ranquist, Drake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1154848063"},{"person":"Rasca, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607749756"},{"person":"Rast, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n760843983"},{"person":"Ray, L C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5341"},{"person":"Redick, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2080295530"},{"person":"Redick, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1133614131"},{"person":"Reed, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1635945598"},{"person":"Reed, Krista","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n877068749"},{"person":"Reedy, Lee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1817223813"},{"person":"Reese, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1866062337"},{"person":"Rehnberg, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1559998858"},{"person":"Reiter, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753914660"},{"person":"Renfrow, Stephanie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796849613"},{"person":"Reukauf, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n276714883"},{"person":"Richard, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3595"},{"person":"Richard, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1655982245"},{"person":"Richards, P G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801"},{"person":"Rider, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1501051647"},{"person":"Riesberg, Lon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057"},{"person":"Ringrose, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n69165236"},{"person":"Robbins, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1250170131"},{"person":"Robbins, Stuart","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n559833574"},{"person":"Rogers, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107685763"},{"person":"Rosenshein, Miriam","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1953572127"},{"person":"Rottman, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1708643326"},{"person":"Roughton, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491"},{"person":"Rusch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n970911879"},{"person":"Ruske, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n62569024"},{"person":"Rutkowski, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n412512658"},{"person":"Ryan, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1188565226"},{"person":"Sainsbury, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1293656385"},{"person":"Salcido, Crystal","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490162473"},{"person":"Samaripa, Byron","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1993740978"},{"person":"Sand, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428876202"},{"person":"Sarris, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1264895617"},{"person":"Sawyer, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2115528787"},{"person":"Schelz, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n340499533"},{"person":"Schiller, Quintin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052186645"},{"person":"Schloesser, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000340179"},{"person":"Schmidt, Sebastian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330547662"},{"person":"Schmutz, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3012"},{"person":"Schneider, Nick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917838557"},{"person":"Schrijver, C J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2311"},{"person":"Schuehle, U","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100"},{"person":"Seidel, Durbin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1617731339"},{"person":"Sheiko, Nathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624617909"},{"person":"Shu, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2081552666"},{"person":"Sicken, Patti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1507994595"},{"person":"Siler, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823187793"},{"person":"Simmons, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n810031199"},{"person":"Simons-Brown, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159306400"},{"person":"Sims, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526911137"},{"person":"Sittler, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367"},{"person":"Slipski, Marek","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850769182"},{"person":"Smith, Dona","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n256748745"},{"person":"Smith, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513997220"},{"person":"Smith, Jamison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1146627975"},{"person":"Smith, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523165414"},{"person":"Smith, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n658738358"},{"person":"Snow, Jake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588964680"},{"person":"Snow, Marty","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n429119084"},{"person":"Solanki, S K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7362"},{"person":"Solomon, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n383047709"},{"person":"Song, Shi","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1483702429"},{"person":"Soto Hoffmann, Patricia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1971283737"},{"person":"Soukhovei, Vladislav","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1373936880"},{"person":"Sparhawk, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648087653"},{"person":"Sparn, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428120649"},{"person":"Spivey, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2053763554"},{"person":"Springfield, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n713855563"},{"person":"Spurgeon, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014728592"},{"person":"Sremcevic, Miodrag","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n484618802"},{"person":"Stawarz, Julia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n78726096"},{"person":"Stearns, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1089353141"},{"person":"Steffl, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6059"},{"person":"Steg, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1580269363"},{"person":"Sternovsky, Zoltan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465061973"},{"person":"Stewart, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474554423"},{"person":"Stewart, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1314757256"},{"person":"Stewart, Ian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1672736625"},{"person":"Stimpfling, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n490092760"},{"person":"Stone, Jordan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382272449"},{"person":"Street, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205732767"},{"person":"Sturner, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n975471748"},{"person":"Su, Y J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7203"},{"person":"Summers, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115343616"},{"person":"Swieter, Dwayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1192815390"},{"person":"Szalay, Jamey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916260001"},{"person":"Tate, Gail","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n268766314"},{"person":"Taylor, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n716030637"},{"person":"Taylor, Trent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507926942"},{"person":"Templeman, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053"},{"person":"Theiling, Dale","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523846463"},{"person":"Thiede, Jon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n107799568"},{"person":"Thiemann, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070599412"},{"person":"Thomas, Evan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1113966394"},{"person":"Thomas, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n320506707"},{"person":"Thompson, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485924204"},{"person":"Thomsen, M F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3367"},{"person":"Thuillier, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1553"},{"person":"Tighe, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1537989152"},{"person":"Tilevitz, Chana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705385187"},{"person":"Tokar, R L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7508"},{"person":"Tolea, Alin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n884210681"},{"person":"Toon, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845246448"},{"person":"Traver, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712"},{"person":"Triplett, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1386835492"},{"person":"Troxel, Kathy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242954374"},{"person":"Tseng, W L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6708"},{"person":"Tucker, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1007186618"},{"person":"Ucker, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971611210"},{"person":"Unruh, Y C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2086"},{"person":"Valentine, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753432826"},{"person":"Van Orden, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n183811506"},{"person":"Vanderburgh, Abraham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281302864"},{"person":"Vanier, Blake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n585326394"},{"person":"Vermeer, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n566962202"},{"person":"Vertovec, Audrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914550976"},{"person":"Vial, J C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7086"},{"person":"Villabona, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1116996073"},{"person":"Vincent, Tracy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1191377000"},{"person":"Wade, Stacy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1473474892"},{"person":"Wahlund, J E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4697"},{"person":"Wanamaker, Isaac","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799142869"},{"person":"Wang, Xu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443866291"},{"person":"Weber, M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5279"},{"person":"Wehner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1397764181"},{"person":"Welch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115139280"},{"person":"Werdel, Brandon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653143342"},{"person":"Wescott, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n798247984"},{"person":"Westfall, Jim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987838283"},{"person":"White, Neil","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1283020055"},{"person":"White, Oran R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3911"},{"person":"Whitman, Dylan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1640855746"},{"person":"Wieman, S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3791"},{"person":"Wiesman, Brett","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n852217263"},{"person":"Wilder, Frederick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n754212791"},{"person":"Williams, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310654820"},{"person":"Williams, Forrest","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575366074"},{"person":"Williamson, Eleanor","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1118370667"},{"person":"Wilson, Anne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1869681270"},{"person":"Wilson, Rob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n220165430"},{"person":"Wise, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n691938741"},{"person":"Withnell, Pete","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1298706407"},{"person":"Wolf, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n221861851"},{"person":"Wood, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1184521804"},{"person":"Woodraska, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n626213350"},{"person":"Woods, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031294282"},{"person":"Worel, Shana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n804667043"},{"person":"Wright, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532824368"},{"person":"Wright, Logan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1342215268"},{"person":"Wrigley, Ray","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1585441073"},{"person":"Wullschleger, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n325914072"},{"person":"Yaptengco, Jonnie Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n850764044"},{"person":"Yau, A W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3676"},{"person":"Yehle, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2096276531"},{"person":"Yoo, Kenny","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845055650"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3668"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5764"},{"person":"Young, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912403582"},{"person":"Yu, Pengfei","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n362772828"},{"person":"Zhao, Hong","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1496019964"},{"person":"Zhu, Yunqian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936941023"},{"person":"Ziegler, Stephen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815934722"},{"person":"Zucker, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562915827"},{"person":"deFalco, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168824921"}];
	  	//act
    	var returnedList = $scope.filterPeople(givenPersonnelList);
    	
    	//assert 	
    	expect(returnedList).toEqual(expectedList);
    });
    */
});
/*
//map a skill QuickSearch filter unit tests:
describe("Filters: mapASkillCtrl", function(){
	beforeEach(module('mapaskillFilters'));
 
	describe('QuickSearch', function() {
 		var inputHaystack = 'Some Array...';
	    it("filters on search input as we would expect",inject(function(ViewAllSearchFilter) {
	    	expect(ViewAllSearchFilter(inputHaystack, "Cox, Michael").length).toBe(6);
	    	expect(ViewAllSearchFilter(inputHaystack, "cox, michael").length).toBe(6);
	    	expect(ViewAllSearchFilter(inputHaystack, "michael cox").length).toBe(6);
	    	expect(ViewAllSearchFilter(inputHaystack, "chael co").length).toBe(6);
	    	expect(ViewAllSearchFilter(inputHaystack, "Elsborg, Don").length).toBe(18);
	    	expect(ViewAllSearchFilter(inputHaystack, "Don Elsborg").length).toBe(18);
	    	expect(ViewAllSearchFilter(inputHaystack, "Ty Tra").length).toBe(13);
	    	expect(ViewAllSearchFilter(inputHaystack, "//eeeeeeee").length).toBe(0);
	    	expect(ViewAllSearchFilter(inputHaystack, "! @ # $ % ^ & * ( )```").length).toBe(0); 	
	    }));
  	});
});
*/