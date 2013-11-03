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
    //expect a post for the person SPARQL query
    $httpBackend.expectPOST('http://lasp-db-dev:3030/VIVO/query',
                "query="+escape("PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT ?person ?personuri WHERE{ ?personuri a foaf:Person . ?personuri rdfs:label ?person}"),
                {"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'})
                .respond(200);
    //expect a post for the skill SPARQL query
    $httpBackend.expectPOST('http://lasp-db-dev:3030/VIVO/query',
                "query="+escape("PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#> SELECT ?skill ?skilllevel ?skillleveluri WHERE{?skillleveluri a laspskills:SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?skill . ?skillleveluri rdfs:label ?skilllevel} ORDER BY asc(?skill) asc(?skilllevel)"),
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
    expect($scope.skillQueryStr).toBe("PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#> SELECT ?skill ?skilllevel ?skillleveluri WHERE{?skillleveluri a laspskills:SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?skill . ?skillleveluri rdfs:label ?skilllevel} ORDER BY asc(?skill) asc(?skilllevel)");
    });

    it("SPARQL query returned without errors", function(){
      //all assertions since $scope was set up in our beforeEach above
      expect($scope.error).toBe('');
    });

    //set up some variables to help us keep track of given and expected results
    var fakeSPARQLResults = '';
    var expectedList = [];
    var returnedList = [];

    it("formatFactory.formatPersonnelList returns what we expect", function(){
      //arrange
        //given these fake SPARQL results...
        fakeSPARQLResults = {
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
        expectedList = [{"person":"Rosenshein, Miriam","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1953572127"},{"person":"Beckman, Shawn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n400097966"},{"person":"Collette, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012646325"},{"person":"Pyke, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n295572919"},{"person":"Baragiola, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7999"},{"person":"Kaufhold, Alexandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890225154"},{"person":"Lykke, K R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3229"},{"person":"Letourneau, Hannah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n442363424"},{"person":"MacKinnon, A L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3603"},{"person":"Kempf, Sascha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1611913402"},{"person":"Steg, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1580269363"},{"person":"Myers, Casey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1263641634"},{"person":"Woodraska, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n626213350"},{"person":"LaClair, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907464116"},{"person":"Burrows, Spenser","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n902811839"},{"person":"Ma, Huikang","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n557026557"},{"person":"McGrath, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85999019"},{"person":"Mason, Carolyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1092945436"},{"person":"Jilek, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207320044"},{"person":"Smith, Dona","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n256748745"},{"person":"Sturner, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n975471748"},{"person":"O'Malia, Kasandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308336345"},{"person":"Schneider, Nick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917838557"},{"person":"Vertovec, Audrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914550976"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5764"},{"person":"Bershenyi, Gabe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n93921936"},{"person":"Emmett, Jeremy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n279164454"},{"person":"Kohnert, Rick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1029083323"},{"person":"Kien, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453839589"},{"person":"Farneth, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n939895236"},{"person":"Stewart, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474554423"},{"person":"Guneratne, Gabriella","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n371682424"},{"person":"Hillier, Jonathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532250141"},{"person":"Henderson, M G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5693"},{"person":"Judge, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3730"},{"person":"Tokar, R L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7508"},{"person":"Holsclaw, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000533497"},{"person":"Califf, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n717941184"},{"person":"Bryant, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n839305267"},{"person":"Heath, Caitlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115716969"},{"person":"Judd, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2140532425"},{"person":"Kittredge, Camden","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460254225"},{"person":"Harvey, Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1476646248"},{"person":"Brakebusch, Matthias","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n88429468"},{"person":"Chaffin, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489093530"},{"person":"Brian, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1880"},{"person":"Huang, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851"},{"person":"Labrosse, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5614"},{"person":"Masters, A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701"},{"person":"Springfield, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n713855563"},{"person":"Horanyi, Mihaly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1121953972"},{"person":"Craft, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961894036"},{"person":"Bramer, Shelley","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n686469069"},{"person":"Yoo, Kenny","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845055650"},{"person":"Loche, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4559796"},{"person":"Forsyth, Sasha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1013371228"},{"person":"Gurst, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861896580"},{"person":"James, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n363350498"},{"person":"Sparn, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428120649"},{"person":"Stawarz, Julia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n78726096"},{"person":"Riesberg, Lon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057"},{"person":"Espejo, Joey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n924628617"},{"person":"Rutkowski, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n412512658"},{"person":"Sawyer, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2115528787"},{"person":"Pryor, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1521316899"},{"person":"Eldridge, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292718971"},{"person":"Nuding, Danielle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648108589"},{"person":"Sittler, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367"},{"person":"Del Zanna, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2386"},{"person":"Thomsen, M F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3367"},{"person":"Harder, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1079014435"},{"person":"Weber, M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5279"},{"person":"Stewart, Ian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1672736625"},{"person":"Himpsel, Carl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1576768257"},{"person":"Woods, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031294282"},{"person":"Heuerman, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142912025"},{"person":"Bonnici, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1261402531"},{"person":"Pagaran, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3697"},{"person":"Wise, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n691938741"},{"person":"Song, Shi","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1483702429"},{"person":"Whitman, Dylan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1640855746"},{"person":"Knapp, Barry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270"},{"person":"Vial, J C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7086"},{"person":"Bagenal, Fran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1078482970"},{"person":"Robbins, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1250170131"},{"person":"Jouchoux, Alain","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844208077"},{"person":"Ucker, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971611210"},{"person":"Yehle, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2096276531"},{"person":"Brown, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1663284208"},{"person":"Himes, Caroline","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1205373967"},{"person":"Mathioudaki, Mihalis","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2823"},{"person":"May, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540607559"},{"person":"Redick, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1133614131"},{"person":"Costello, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127780985"},{"person":"Ali, Ashar","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n499931381"},{"person":"Giorgi, Ariana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n259579485"},{"person":"George, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n807406679"},{"person":"Keenan, Francis P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4089"},{"person":"Allison, Gregg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490733197"},{"person":"Flemer, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987913665"},{"person":"Wrigley, Ray","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1585441073"},{"person":"Lewis, G R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2118"},{"person":"Randall, Cora","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n109031017"},{"person":"Kindel, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1069407984"},{"person":"Martin, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n457505183"},{"person":"Yaptengco, Jonnie Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n850764044"},{"person":"Renfrow, Stephanie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796849613"},{"person":"Cole, Wes","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1225522401"},{"person":"Parsons, Kaitlyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1347690092"},{"person":"Randall, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n768867105"},{"person":"McBride, K M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6234"},{"person":"Steffl, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6059"},{"person":"Taylor, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n716030637"},{"person":"Nammari, Aref","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n936762217"},{"person":"Unruh, Y C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2086"},{"person":"Braun, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n423648172"},{"person":"Min, Clifford","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1820576034"},{"person":"Sternovsky, Zoltan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465061973"},{"person":"Larson, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428163578"},{"person":"Larsen, Kristopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1306378180"},{"person":"Asmus, Heiner","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861075396"},{"person":"Graham, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4314"},{"person":"Barcilon, Cristina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2034181570"},{"person":"Roughton, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491"},{"person":"Wilder, Frederick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n754212791"},{"person":"McTague, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1345402132"},{"person":"Beaty, Nicholaus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n976701326"},{"person":"Baker, Dan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205444746"},{"person":"Fontenla, J M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1740"},{"person":"Laumbach, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1944328695"},{"person":"Hill, T W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6642"},{"person":"Dorey, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764"},{"person":"Otzinger, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1255830498"},{"person":"Dozier, Melissa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n175766494"},{"person":"Behner, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n894769667"},{"person":"Desroche, Mariel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n140"},{"person":"White, Oran R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3911"},{"person":"Jones, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050657630"},{"person":"Ames, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995808836"},{"person":"Zhao, Hong","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1496019964"},{"person":"Molaverdikhani, Karan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127503713"},{"person":"Newcomb, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21578080"},{"person":"Haugen, Cheryl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n480038164"},{"person":"Seidel, Durbin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1617731339"},{"person":"Hand, Molly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023583009"},{"person":"Gosling, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1962822057"},{"person":"O'Connor, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1139384165"},{"person":"Peck, Courtney","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301530484"},{"person":"Wade, Stacy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1473474892"},{"person":"Lindholm, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741489759"},{"person":"Keiser, Brad","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738"},{"person":"Ogden, Tammie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583658483"},{"person":"Spivey, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2053763554"},{"person":"Moore, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1267979694"},{"person":"Worel, Shana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n804667043"},{"person":"Rast, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n760843983"},{"person":"Szalay, Jamey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916260001"},{"person":"Street, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205732767"},{"person":"Siler, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823187793"},{"person":"Richard, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3595"},{"person":"Wood, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1184521804"},{"person":"Ziegler, Stephen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815934722"},{"person":"Aberle, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255311939"},{"person":"Reiter, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753914660"},{"person":"Kurth, W S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3385"},{"person":"Annett, Graham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n63860692"},{"person":"Ajello, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588676707"},{"person":"Bearden, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273282227"},{"person":"Osborne, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1582851040"},{"person":"Miller, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n715993936"},{"person":"Rottman, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1708643326"},{"person":"Tolea, Alin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n884210681"},{"person":"Castleman, Zach","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n646814721"},{"person":"Fletcher, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649163029"},{"person":"Lord, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1340836925"},{"person":"Thomas, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n320506707"},{"person":"Barratt, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n404394851"},{"person":"Toon, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845246448"},{"person":"Esposito, Larry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1210903869"},{"person":"Hoxie, Vaughn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1404677880"},{"person":"DeWolfe, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178"},{"person":"Buckhannon, Linda","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1066918532"},{"person":"Dewey, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575426137"},{"person":"Solomon, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n383047709"},{"person":"Persoon, A M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5493"},{"person":"Hansen, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1814290075"},{"person":"Eparvier, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1414522112"},{"person":"Knappmiller, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446589790"},{"person":"Merkow, Mat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530345758"},{"person":"Janiczek, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19700812"},{"person":"Jakosky, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1313577318"},{"person":"Mitchell, D G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1186"},{"person":"Ranquist, Drake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1154848063"},{"person":"Triplett, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1386835492"},{"person":"Eden, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014923244"},{"person":"Gagnard, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n228305227"},{"person":"Marcus, Holly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n522816235"},{"person":"Brown, S W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1400"},{"person":"Parenteau, Scarlet","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1659685056"},{"person":"Gabbert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2111487135"},{"person":"DeNeen, Mathew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n875589346"},{"person":"Williams, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310654820"},{"person":"Smith, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523165414"},{"person":"Geiger, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n953545550"},{"person":"Baker, Kirsten","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1488098331"},{"person":"Coddington, Odele","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070007600"},{"person":"Ortiz, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896094121"},{"person":"Templeman, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053"},{"person":"Pontias Jr., D W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3564"},{"person":"Johnson, R E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4997"},{"person":"Luebke, Anna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657335496"},{"person":"McClintock, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n571959716"},{"person":"Lawrence, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1315804720"},{"person":"Mueller, Steven","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013"},{"person":"Elkington, Scot","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n553631097"},{"person":"Gurgel, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301690009"},{"person":"Su, Y J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7203"},{"person":"Brown, Jeff","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417348364"},{"person":"Hartnett, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512122452"},{"person":"Costner, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367854519"},{"person":"McCabe, Deb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1966385563"},{"person":"Cohn-Cort, Bronwen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n103589832"},{"person":"Motz, Brooklyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927000766"},{"person":"Blum, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523754547"},{"person":"LeBlanc, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907419030"},{"person":"Blunck, Jeffrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382538298"},{"person":"Solanki, S K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7362"},{"person":"Avallone, Linnea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1454781079"},{"person":"Linden, Keita","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1889784291"},{"person":"Chamberlin, Phillip C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n8187"},{"person":"Krivova, N A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4043"},{"person":"Sheiko, Nathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624617909"},{"person":"Davis, Nina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n408500045"},{"person":"Williamson, Eleanor","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1118370667"},{"person":"Elrod, M K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2507"},{"person":"Evans, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1479837765"},{"person":"Pachhai, Kiran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255283506"},{"person":"Wright, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532824368"},{"person":"Mason, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n132879659"},{"person":"Vanderburgh, Abraham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281302864"},{"person":"Mcgill, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1967605763"},{"person":"Osterloo, Mikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424673248"},{"person":"Schmidt, Sebastian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330547662"},{"person":"Thiede, Jon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n107799568"},{"person":"Belting, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513891097"},{"person":"Hynek, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1628438375"},{"person":"Madhusudhanan, Prasanna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050483258"},{"person":"Werdel, Brandon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653143342"},{"person":"Carton, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n721510310"},{"person":"Salcido, Crystal","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490162473"},{"person":"Patton, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1685525735"},{"person":"McGilvray, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n177902987"},{"person":"Murphy, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1688610058"},{"person":"Mclaughlin, Pattilyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753508281"},{"person":"Rider, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1501051647"},{"person":"Slipski, Marek","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850769182"},{"person":"Welch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115139280"},{"person":"Delory, G T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n275"},{"person":"Wehner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1397764181"},{"person":"Shu, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2081552666"},{"person":"Wilson, Rob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n220165430"},{"person":"Schuehle, U","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100"},{"person":"Wahlund, J E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4697"},{"person":"Wieman, S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3791"},{"person":"Schelz, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n340499533"},{"person":"Sicken, Patti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1507994595"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3668"},{"person":"Osborne, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801786743"},{"person":"Egan, Andrea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115491601"},{"person":"Lean, Judith L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6638"},{"person":"Fenz-Trimble, Kaiti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n659278552"},{"person":"Lemaire, P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4371"},{"person":"King, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2130392723"},{"person":"Flynn, Sierra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1536335847"},{"person":"Albin, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1286655618"},{"person":"Pilinski, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1631975500"},{"person":"Van Orden, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n183811506"},{"person":"O'brien, Leela","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5234329"},{"person":"Schrijver, C J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2311"},{"person":"Coates, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n14458"},{"person":"Haskins, Jessica","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n911013275"},{"person":"Kalnajs, Lars","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1854309916"},{"person":"Snow, Marty","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n429119084"},{"person":"Abdulhamid, Ramsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912875884"},{"person":"Boschert, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1178406628"},{"person":"Panneton, Russell","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578196712"},{"person":"King, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649468078"},{"person":"Holmes, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851684395"},{"person":"Lalonde, Jean-Francois","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159233084"},{"person":"Boyle, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036313819"},{"person":"Richards, P G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801"},{"person":"Reedy, Lee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1817223813"},{"person":"Flaherty, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1395635868"},{"person":"Methlie, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2147322495"},{"person":"Cassidy, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062620213"},{"person":"Wescott, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n798247984"},{"person":"Villabona, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1116996073"},{"person":"Moreira Hooks, Joao","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n346540776"},{"person":"Liner, Samantha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1112572230"},{"person":"Hsu, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n477177479"},{"person":"Fletcher, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5034"},{"person":"Thiemann, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070599412"},{"person":"Young, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912403582"},{"person":"Rasca, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607749756"},{"person":"Klapetzky, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906366491"},{"person":"Pettit, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n35200622"},{"person":"Brugman, Karalee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n92857531"},{"person":"Bonney, Donovan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507734015"},{"person":"Rogers, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107685763"},{"person":"Barth, Charles","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1803353333"},{"person":"Bela, Megan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91624444"},{"person":"Jacobson, Ross","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n374781680"},{"person":"Perish, Norm","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1700784405"},{"person":"Cox, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931"},{"person":"Hotard, Bonnie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027471498"},{"person":"Bolton, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540886314"},{"person":"Troxel, Kathy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242954374"},{"person":"Schiller, Quintin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052186645"},{"person":"Bode, Marc","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1798748915"},{"person":"Krahe, Margaux","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1353991561"},{"person":"Eriksson, Stefan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n125517773"},{"person":"Smith, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n658738358"},{"person":"Lankton, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1043347675"},{"person":"Howes, Calvin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633595791"},{"person":"Dewoina, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2779032"},{"person":"Bunnell, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438372251"},{"person":"Haynes, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n161684617"},{"person":"Holler, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2009987779"},{"person":"Spurgeon, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014728592"},{"person":"Dols, Vincent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599462975"},{"person":"Ryan, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1188565226"},{"person":"Passe, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1234648683"},{"person":"Plesha, Rachel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1228806873"},{"person":"Drake, Ginger","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n71958169"},{"person":"Ray, L C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5341"},{"person":"Lamprecht, Bret","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n739599306"},{"person":"Summers, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115343616"},{"person":"Erickson, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n765907129"},{"person":"Jones, Gayle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n57504821"},{"person":"Dinkel, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n613953723"},{"person":"Wanamaker, Isaac","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799142869"},{"person":"Ruske, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n62569024"},{"person":"Kreisher, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n612686962"},{"person":"Kern, Josh","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653826283"},{"person":"Tseng, W L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6708"},{"person":"Simons-Brown, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159306400"},{"person":"Fox, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896505121"},{"person":"Tighe, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1537989152"},{"person":"Hoskins, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1025386724"},{"person":"Negus, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n964782842"},{"person":"Vincent, Tracy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1191377000"},{"person":"Gruen, Eberhard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1822827997"},{"person":"Taylor, Trent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507926942"},{"person":"Stone, Jordan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382272449"},{"person":"Elsborg, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911"},{"person":"Lewis, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n472262787"},{"person":"Yau, A W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3676"},{"person":"Soto Hoffmann, Patricia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1971283737"},{"person":"Gathright, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1719236045"},{"person":"Karlsson, Magnus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1544450972"},{"person":"Merkel, Aimee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n406773472"},{"person":"Yu, Pengfei","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n362772828"},{"person":"Wilson, Anne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1869681270"},{"person":"Curdt, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059"},{"person":"Thuillier, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1553"},{"person":"Collins, Rachael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732618065"},{"person":"Stearns, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1089353141"},{"person":"Beland, Stephane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123"},{"person":"French, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439300069"},{"person":"Samaripa, Byron","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1993740978"},{"person":"Soukhovei, Vladislav","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1373936880"},{"person":"Reukauf, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n276714883"},{"person":"Mason, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1653020773"},{"person":"Hess, S L G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1972"},{"person":"Stewart, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1314757256"},{"person":"Gritzmacher, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583161727"},{"person":"Barrett, Rory","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n357449403"},{"person":"Bryant, Chelsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n867120482"},{"person":"Andersson, Laila","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907618201"},{"person":"Popescu, Radu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704"},{"person":"Ericksen, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n523846245"},{"person":"Dischner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229679033"},{"person":"Lace, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3812"},{"person":"Harber, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n638067304"},{"person":"Simmons, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n810031199"},{"person":"Kingsley, Roberto","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229480056"},{"person":"Kowalski, Adam F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2522"},{"person":"Puckett, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n728097612"},{"person":"Burrows, J P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004"},{"person":"Hutchison, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372190417"},{"person":"Meisner, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n544141382"},{"person":"Vermeer, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n566962202"},{"person":"Fox, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2852"},{"person":"Snow, Jake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588964680"},{"person":"Devito, Elizabeth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1981168541"},{"person":"Floyd, L E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2559"},{"person":"Kowalski, Elise","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1295294388"},{"person":"Bay, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n598683891"},{"person":"Thompson, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485924204"},{"person":"Kominek, Jay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936621824"},{"person":"Traver, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712"},{"person":"Brain, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n111928268"},{"person":"Cirbo, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1864293332"},{"person":"Lafferty, Gina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1241916224"},{"person":"Schloesser, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000340179"},{"person":"McCandless, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801066637"},{"person":"Wang, Xu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443866291"},{"person":"Briggs, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336740030"},{"person":"Dong, Y","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15204"},{"person":"Barrett, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725"},{"person":"Westfall, Jim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987838283"},{"person":"Pranger, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526450392"},{"person":"Fang, Xiaohua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872761738"},{"person":"Pilewskie, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n731850291"},{"person":"Burks, Damien","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599575729"},{"person":"Sarris, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1264895617"},{"person":"Groeninger, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976429543"},{"person":"Pilewskie, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310179206"},{"person":"Caspi, Amir","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n562924903"},{"person":"Valentine, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753432826"},{"person":"Crotser, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1662863303"},{"person":"Rusch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n970911879"},{"person":"Alfaro, Ann","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512209405"},{"person":"Drobilek, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1277774838"},{"person":"Smith, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513997220"},{"person":"Hudson, Hugh S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4790"},{"person":"Batiste, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n213386065"},{"person":"Mewaldt, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1417"},{"person":"Smith, Jamison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1146627975"},{"person":"Marcucci, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1318083343"},{"person":"Brennan, Nathanial","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1928440630"},{"person":"Griest, Ken","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n518533566"},{"person":"Erkaev, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n274"},{"person":"Beech, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n888928290"},{"person":"Wiesman, Brett","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n852217263"},{"person":"Bryant, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1085025965"},{"person":"Robbins, Stuart","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n559833574"},{"person":"Krodinger, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n948112081"},{"person":"Bloom, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2082768088"},{"person":"Thomas, Evan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1113966394"},{"person":"Papa, Joseph","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1354973592"},{"person":"McGouldrick, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n418611095"},{"person":"Packard, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299646442"},{"person":"Hartwick, Victoria","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1145663159"},{"person":"Milligan, Ryan O","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6412"},{"person":"Malaspina, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n290898740"},{"person":"Redick, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2080295530"},{"person":"Ferrington, Nicolas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n794601920"},{"person":"Reese, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1866062337"},{"person":"Christofferson, Ransom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1312757559"},{"person":"Richard, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1655982245"},{"person":"Kosovichev, A G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031"},{"person":"Ergun, Bob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n670178106"},{"person":"Sand, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428876202"},{"person":"Zhu, Yunqian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936941023"},{"person":"McEnulty, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1071261447"},{"person":"Newgord, Alexia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n695552564"},{"person":"Tilevitz, Chana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705385187"},{"person":"Hodges, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n133316609"},{"person":"Holt, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n180701835"},{"person":"Albers, Nicole","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570151423"},{"person":"Knehans, Edith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2043547795"},{"person":"Goodrich, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1323188719"},{"person":"Eberts, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1076781062"},{"person":"Lothringer, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1238347136"},{"person":"Li, Xinlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n293691365"},{"person":"Sparhawk, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648087653"},{"person":"Jeppesen, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845364011"},{"person":"Crismani, Matteo","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1307648345"},{"person":"Lin, R P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4577"},{"person":"Moffatt, Jerel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330004299"},{"person":"Larsen, Dane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513048464"},{"person":"Goodrich, Al","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n693905437"},{"person":"White, Neil","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1283020055"},{"person":"Delamere, Peter A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5649"},{"person":"Rehnberg, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1559998858"},{"person":"Cervelli, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n707294409"},{"person":"Vanier, Blake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n585326394"},{"person":"McNeil, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1528282796"},{"person":"George, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624031380"},{"person":"Hubbell, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n699751717"},{"person":"Green, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n90207282"},{"person":"Faber, Jack","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876344817"},{"person":"Pankratz, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966"},{"person":"Wullschleger, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n325914072"},{"person":"Monk, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857867638"},{"person":"Mitchell, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1215748306"},{"person":"Sremcevic, Miodrag","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n484618802"},{"person":"Peck, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489001940"},{"person":"Cirbo, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1429538900"},{"person":"Padgett, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1393218320"},{"person":"Reed, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1635945598"},{"person":"Eaton, Zak","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n44143920"},{"person":"Koski, Kraig","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912001963"},{"person":"Bloch, Nikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1319050477"},{"person":"Wright, Logan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1342215268"},{"person":"Hepburn, Kelly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n672306834"},{"person":"Williams, Forrest","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575366074"},{"person":"Kohnert, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438416807"},{"person":"Law, Mariah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1209408315"},{"person":"Miller, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n558713751"},{"person":"Piquette, Marcus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1844883463"},{"person":"Livingston, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7810"},{"person":"Carson, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2000525679"},{"person":"Kokkonen, Kim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665577609"},{"person":"Sainsbury, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1293656385"},{"person":"Hahn, Barb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n508652932"},{"person":"Anfinson, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2016926148"},{"person":"deFalco, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168824921"},{"person":"Withnell, Pete","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1298706407"},{"person":"Guy, Carol","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1709165908"},{"person":"Feickert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n173026304"},{"person":"Schmutz, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3012"},{"person":"Peterson, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n764015052"},{"person":"Baumann, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906271444"},{"person":"Crary, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2007987199"},{"person":"Kren, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857081541"},{"person":"Kopp, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068179785"},{"person":"Lindholm, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1790175656"},{"person":"Kelley, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352320643"},{"person":"Jaynes, Allison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1147514903"},{"person":"Holden, Nancy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995714539"},{"person":"Ramas, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183"},{"person":"Drake, Keith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n101045317"},{"person":"Maloney, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n146565298"},{"person":"Jones, G H","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6647"},{"person":"Hall, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502629516"},{"person":"Tate, Gail","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n268766314"},{"person":"Deighan, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1122737005"},{"person":"Didkovsky, L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1108"},{"person":"Sims, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526911137"},{"person":"Reed, Krista","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n877068749"},{"person":"Mackison, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434366058"},{"person":"Zucker, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562915827"},{"person":"Nastaj, Debra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782073425"},{"person":"Ringrose, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n69165236"},{"person":"Motz, Brent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2124160943"},{"person":"Possel, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019699773"},{"person":"McCollom, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159259470"},{"person":"Fowler, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n932646884"},{"person":"Theiling, Dale","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523846463"},{"person":"Swieter, Dwayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1192815390"},{"person":"Stimpfling, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n490092760"},{"person":"Migliorini, Lucas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n634891605"},{"person":"Longo, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n253562955"},{"person":"Tucker, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1007186618"},{"person":"Keefer, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n322281825"},{"person":"Wolf, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n221861851"},{"person":"Fleshman, Bobby","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1787"}];
      //act
      returnedList = $formatFactory.formatPersonnelList(fakeSPARQLResults);

      //assert
      expect(returnedList).toEqual(expectedList);
    });

    it("formatFactory.formatSkillList returns what we expect", function(){
      //arrange
        //given these fake SPARQL results...
        fakeSPARQLResults = {
  "head": {
    "vars": [ "skill" , "skilllevel" , "skillleveluri" ]
  } ,
  "results": {
    "bindings": [
      {
        "skill": { "type": "literal" , "value": "AMCharts" } ,
        "skilllevel": { "type": "literal" , "value": "AMCharts (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439479224" }
      } ,
      {
        "skill": { "type": "literal" , "value": "AMCharts" } ,
        "skilllevel": { "type": "literal" , "value": "AMCharts advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2088524822" }
      } ,
      {
        "skill": { "type": "literal" , "value": "AMCharts" } ,
        "skilllevel": { "type": "literal" , "value": "AMCharts beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1269075514" }
      } ,
      {
        "skill": { "type": "literal" , "value": "AMCharts" } ,
        "skilllevel": { "type": "literal" , "value": "AMCharts guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1117711741" }
      } ,
      {
        "skill": { "type": "literal" , "value": "AMCharts" } ,
        "skilllevel": { "type": "literal" , "value": "AMCharts intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115838072" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Adobe Forms" } ,
        "skilllevel": { "type": "literal" , "value": "Adobe Forms (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1143045369" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Adobe Forms" } ,
        "skilllevel": { "type": "literal" , "value": "Adobe Forms advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n28344951" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Adobe Forms" } ,
        "skilllevel": { "type": "literal" , "value": "Adobe Forms beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1934609946" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Adobe Forms" } ,
        "skilllevel": { "type": "literal" , "value": "Adobe Forms guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799459865" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Adobe Forms" } ,
        "skilllevel": { "type": "literal" , "value": "Adobe Forms intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n981057267" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Angular" } ,
        "skilllevel": { "type": "literal" , "value": "Angular (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1135254945" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Angular" } ,
        "skilllevel": { "type": "literal" , "value": "Angular advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1836477458" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Angular" } ,
        "skilllevel": { "type": "literal" , "value": "Angular beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n994473475" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Angular" } ,
        "skilllevel": { "type": "literal" , "value": "Angular guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1671030649" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Angular" } ,
        "skilllevel": { "type": "literal" , "value": "Angular intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2122206999" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Astronomical Algorithms" } ,
        "skilllevel": { "type": "literal" , "value": "Astronomical Algorithms (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1795663283" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Astronomical Algorithms" } ,
        "skilllevel": { "type": "literal" , "value": "Astronomical Algorithms advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1398263944" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Astronomical Algorithms" } ,
        "skilllevel": { "type": "literal" , "value": "Astronomical Algorithms beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n637392457" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Astronomical Algorithms" } ,
        "skilllevel": { "type": "literal" , "value": "Astronomical Algorithms guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n843890716" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Astronomical Algorithms" } ,
        "skilllevel": { "type": "literal" , "value": "Astronomical Algorithms intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1762201346" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Audio Recording" } ,
        "skilllevel": { "type": "literal" , "value": "Audio Recording (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850885710" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Audio Recording" } ,
        "skilllevel": { "type": "literal" , "value": "Audio Recording advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n390887168" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Audio Recording" } ,
        "skilllevel": { "type": "literal" , "value": "Audio Recording beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1619045870" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Audio Recording" } ,
        "skilllevel": { "type": "literal" , "value": "Audio Recording guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n22386644" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Audio Recording" } ,
        "skilllevel": { "type": "literal" , "value": "Audio Recording intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530821507" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C" } ,
        "skilllevel": { "type": "literal" , "value": "C (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793602038" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C" } ,
        "skilllevel": { "type": "literal" , "value": "C advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1026055000" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C" } ,
        "skilllevel": { "type": "literal" , "value": "C beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2116726559" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C" } ,
        "skilllevel": { "type": "literal" , "value": "C guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1337968289" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C" } ,
        "skilllevel": { "type": "literal" , "value": "C intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n591116589" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C Shell" } ,
        "skilllevel": { "type": "literal" , "value": "C Shell (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n960721007" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C Shell" } ,
        "skilllevel": { "type": "literal" , "value": "C Shell advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n225932203" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C Shell" } ,
        "skilllevel": { "type": "literal" , "value": "C Shell beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n18978706" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C Shell" } ,
        "skilllevel": { "type": "literal" , "value": "C Shell guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2046173907" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C Shell" } ,
        "skilllevel": { "type": "literal" , "value": "C Shell intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C++" } ,
        "skilllevel": { "type": "literal" , "value": "C++ (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2001992658" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C++" } ,
        "skilllevel": { "type": "literal" , "value": "C++ advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n906704525" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C++" } ,
        "skilllevel": { "type": "literal" , "value": "C++ beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n455885633" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C++" } ,
        "skilllevel": { "type": "literal" , "value": "C++ guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n370638602" }
      } ,
      {
        "skill": { "type": "literal" , "value": "C++" } ,
        "skilllevel": { "type": "literal" , "value": "C++ intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632168803" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CDF" } ,
        "skilllevel": { "type": "literal" , "value": "CDF (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n887666611" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CDF" } ,
        "skilllevel": { "type": "literal" , "value": "CDF advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n495602294" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CDF" } ,
        "skilllevel": { "type": "literal" , "value": "CDF beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n445798236" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CDF" } ,
        "skilllevel": { "type": "literal" , "value": "CDF guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1999962869" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CDF" } ,
        "skilllevel": { "type": "literal" , "value": "CDF intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n468207266" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CSTOL" } ,
        "skilllevel": { "type": "literal" , "value": "CSTOL (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n580119452" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CSTOL" } ,
        "skilllevel": { "type": "literal" , "value": "CSTOL advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n377484763" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CSTOL" } ,
        "skilllevel": { "type": "literal" , "value": "CSTOL beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n647556400" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CSTOL" } ,
        "skilllevel": { "type": "literal" , "value": "CSTOL guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n645781042" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CSTOL" } ,
        "skilllevel": { "type": "literal" , "value": "CSTOL intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815630262" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CVS" } ,
        "skilllevel": { "type": "literal" , "value": "CVS (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n777645831" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CVS" } ,
        "skilllevel": { "type": "literal" , "value": "CVS advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n874325827" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CVS" } ,
        "skilllevel": { "type": "literal" , "value": "CVS beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91451367" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CVS" } ,
        "skilllevel": { "type": "literal" , "value": "CVS guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n301452772" }
      } ,
      {
        "skill": { "type": "literal" , "value": "CVS" } ,
        "skilllevel": { "type": "literal" , "value": "CVS intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844881810" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Confluence" } ,
        "skilllevel": { "type": "literal" , "value": "Confluence (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n169192069" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Confluence" } ,
        "skilllevel": { "type": "literal" , "value": "Confluence advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1681131761" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Confluence" } ,
        "skilllevel": { "type": "literal" , "value": "Confluence beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1601745543" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Confluence" } ,
        "skilllevel": { "type": "literal" , "value": "Confluence guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1994142933" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Confluence" } ,
        "skilllevel": { "type": "literal" , "value": "Confluence intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n664178855" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Contracts" } ,
        "skilllevel": { "type": "literal" , "value": "Contracts (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059460543" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Contracts" } ,
        "skilllevel": { "type": "literal" , "value": "Contracts advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n319092444" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Contracts" } ,
        "skilllevel": { "type": "literal" , "value": "Contracts beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003402286" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Contracts" } ,
        "skilllevel": { "type": "literal" , "value": "Contracts guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530927661" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Contracts" } ,
        "skilllevel": { "type": "literal" , "value": "Contracts intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1556206671" }
      } ,
      {
        "skill": { "type": "literal" , "value": "DNS - Domain Name Service" } ,
        "skilllevel": { "type": "literal" , "value": "DNS - Domain Name Service (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019188668" }
      } ,
      {
        "skill": { "type": "literal" , "value": "DNS - Domain Name Service" } ,
        "skilllevel": { "type": "literal" , "value": "DNS - Domain Name Service advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1606242612" }
      } ,
      {
        "skill": { "type": "literal" , "value": "DNS - Domain Name Service" } ,
        "skilllevel": { "type": "literal" , "value": "DNS - Domain Name Service beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n487555171" }
      } ,
      {
        "skill": { "type": "literal" , "value": "DNS - Domain Name Service" } ,
        "skilllevel": { "type": "literal" , "value": "DNS - Domain Name Service guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1591325689" }
      } ,
      {
        "skill": { "type": "literal" , "value": "DNS - Domain Name Service" } ,
        "skilllevel": { "type": "literal" , "value": "DNS - Domain Name Service intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1183992693" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Deltek COBRA" } ,
        "skilllevel": { "type": "literal" , "value": "Deltek COBRA (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1060861762" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Deltek COBRA" } ,
        "skilllevel": { "type": "literal" , "value": "Deltek COBRA advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1289942474" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Deltek COBRA" } ,
        "skilllevel": { "type": "literal" , "value": "Deltek COBRA beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1737266517" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Deltek COBRA" } ,
        "skilllevel": { "type": "literal" , "value": "Deltek COBRA guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n683068403" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Deltek COBRA" } ,
        "skilllevel": { "type": "literal" , "value": "Deltek COBRA intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996134548" }
      } ,
      {
        "skill": { "type": "literal" , "value": "DreamWeaver" } ,
        "skilllevel": { "type": "literal" , "value": "DreamWeaver (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513352046" }
      } ,
      {
        "skill": { "type": "literal" , "value": "DreamWeaver" } ,
        "skilllevel": { "type": "literal" , "value": "DreamWeaver advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1203072807" }
      } ,
      {
        "skill": { "type": "literal" , "value": "DreamWeaver" } ,
        "skilllevel": { "type": "literal" , "value": "DreamWeaver beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1074476742" }
      } ,
      {
        "skill": { "type": "literal" , "value": "DreamWeaver" } ,
        "skilllevel": { "type": "literal" , "value": "DreamWeaver guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n327939122" }
      } ,
      {
        "skill": { "type": "literal" , "value": "DreamWeaver" } ,
        "skilllevel": { "type": "literal" , "value": "DreamWeaver intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417437827" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Dygraphs" } ,
        "skilllevel": { "type": "literal" , "value": "Dygraphs (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n859963165" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Dygraphs" } ,
        "skilllevel": { "type": "literal" , "value": "Dygraphs advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1568905926" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Dygraphs" } ,
        "skilllevel": { "type": "literal" , "value": "Dygraphs beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996489377" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Dygraphs" } ,
        "skilllevel": { "type": "literal" , "value": "Dygraphs guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n904901577" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Dygraphs" } ,
        "skilllevel": { "type": "literal" , "value": "Dygraphs intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023679351" }
      } ,
      {
        "skill": { "type": "literal" , "value": "ENVI" } ,
        "skilllevel": { "type": "literal" , "value": "ENVI (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705633567" }
      } ,
      {
        "skill": { "type": "literal" , "value": "ENVI" } ,
        "skilllevel": { "type": "literal" , "value": "ENVI advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791169703" }
      } ,
      {
        "skill": { "type": "literal" , "value": "ENVI" } ,
        "skilllevel": { "type": "literal" , "value": "ENVI beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460110611" }
      } ,
      {
        "skill": { "type": "literal" , "value": "ENVI" } ,
        "skilllevel": { "type": "literal" , "value": "ENVI guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1933582934" }
      } ,
      {
        "skill": { "type": "literal" , "value": "ENVI" } ,
        "skilllevel": { "type": "literal" , "value": "ENVI intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1730570217" }
      } ,
      {
        "skill": { "type": "literal" , "value": "FORTRAN" } ,
        "skilllevel": { "type": "literal" , "value": "FORTRAN (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1636482519" }
      } ,
      {
        "skill": { "type": "literal" , "value": "FORTRAN" } ,
        "skilllevel": { "type": "literal" , "value": "FORTRAN advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1694332440" }
      } ,
      {
        "skill": { "type": "literal" , "value": "FORTRAN" } ,
        "skilllevel": { "type": "literal" , "value": "FORTRAN beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443098442" }
      } ,
      {
        "skill": { "type": "literal" , "value": "FORTRAN" } ,
        "skilllevel": { "type": "literal" , "value": "FORTRAN guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796173201" }
      } ,
      {
        "skill": { "type": "literal" , "value": "FORTRAN" } ,
        "skilllevel": { "type": "literal" , "value": "FORTRAN intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Fisheye/Crucible" } ,
        "skilllevel": { "type": "literal" , "value": "Fisheye/Crucible (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n545321976" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Fisheye/Crucible" } ,
        "skilllevel": { "type": "literal" , "value": "Fisheye/Crucible advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1649778122" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Fisheye/Crucible" } ,
        "skilllevel": { "type": "literal" , "value": "Fisheye/Crucible beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n481615982" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Fisheye/Crucible" } ,
        "skilllevel": { "type": "literal" , "value": "Fisheye/Crucible guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1773876386" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Fisheye/Crucible" } ,
        "skilllevel": { "type": "literal" , "value": "Fisheye/Crucible intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1836921231" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Flash" } ,
        "skilllevel": { "type": "literal" , "value": "Flash (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100403272" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Flash" } ,
        "skilllevel": { "type": "literal" , "value": "Flash advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1910328820" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Flash" } ,
        "skilllevel": { "type": "literal" , "value": "Flash beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1722358499" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Flash" } ,
        "skilllevel": { "type": "literal" , "value": "Flash guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n830992144" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Flash" } ,
        "skilllevel": { "type": "literal" , "value": "Flash intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1452874899" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Google Forms" } ,
        "skilllevel": { "type": "literal" , "value": "Google Forms (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n296568149" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Google Forms" } ,
        "skilllevel": { "type": "literal" , "value": "Google Forms advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187816219" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Google Forms" } ,
        "skilllevel": { "type": "literal" , "value": "Google Forms beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n586712661" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Google Forms" } ,
        "skilllevel": { "type": "literal" , "value": "Google Forms guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1792037604" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Google Forms" } ,
        "skilllevel": { "type": "literal" , "value": "Google Forms intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485541935" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Grants" } ,
        "skilllevel": { "type": "literal" , "value": "Grants (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1706539070" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Grants" } ,
        "skilllevel": { "type": "literal" , "value": "Grants advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n502212599" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Grants" } ,
        "skilllevel": { "type": "literal" , "value": "Grants beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1591706475" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Grants" } ,
        "skilllevel": { "type": "literal" , "value": "Grants guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1747849534" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Grants" } ,
        "skilllevel": { "type": "literal" , "value": "Grants intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n473101934" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Graphical User Interface (GUI) design" } ,
        "skilllevel": { "type": "literal" , "value": "Graphical User Interface (GUI) design (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n440619623" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Graphical User Interface (GUI) design" } ,
        "skilllevel": { "type": "literal" , "value": "Graphical User Interface (GUI) design advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1846193957" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Graphical User Interface (GUI) design" } ,
        "skilllevel": { "type": "literal" , "value": "Graphical User Interface (GUI) design beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n969597673" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Graphical User Interface (GUI) design" } ,
        "skilllevel": { "type": "literal" , "value": "Graphical User Interface (GUI) design guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n470903593" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Graphical User Interface (GUI) design" } ,
        "skilllevel": { "type": "literal" , "value": "Graphical User Interface (GUI) design intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824061673" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Greenhopper" } ,
        "skilllevel": { "type": "literal" , "value": "Greenhopper (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n674121804" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Greenhopper" } ,
        "skilllevel": { "type": "literal" , "value": "Greenhopper advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1458590281" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Greenhopper" } ,
        "skilllevel": { "type": "literal" , "value": "Greenhopper beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n743299727" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Greenhopper" } ,
        "skilllevel": { "type": "literal" , "value": "Greenhopper guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n33149245" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Greenhopper" } ,
        "skilllevel": { "type": "literal" , "value": "Greenhopper intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1621503107" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HDF" } ,
        "skilllevel": { "type": "literal" , "value": "HDF (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525201002" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HDF" } ,
        "skilllevel": { "type": "literal" , "value": "HDF advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n561508048" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HDF" } ,
        "skilllevel": { "type": "literal" , "value": "HDF beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446544932" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HDF" } ,
        "skilllevel": { "type": "literal" , "value": "HDF guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n642895041" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HDF" } ,
        "skilllevel": { "type": "literal" , "value": "HDF intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n181977816" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HTML5" } ,
        "skilllevel": { "type": "literal" , "value": "HTML5 (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n738198172" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HTML5" } ,
        "skilllevel": { "type": "literal" , "value": "HTML5 advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1182983491" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HTML5" } ,
        "skilllevel": { "type": "literal" , "value": "HTML5 beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782921057" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HTML5" } ,
        "skilllevel": { "type": "literal" , "value": "HTML5 guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n286927675" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HTML5" } ,
        "skilllevel": { "type": "literal" , "value": "HTML5 intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2144932849" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HighCharts" } ,
        "skilllevel": { "type": "literal" , "value": "HighCharts (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003879660" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HighCharts" } ,
        "skilllevel": { "type": "literal" , "value": "HighCharts advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n528825677" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HighCharts" } ,
        "skilllevel": { "type": "literal" , "value": "HighCharts beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n514540812" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HighCharts" } ,
        "skilllevel": { "type": "literal" , "value": "HighCharts guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n348862312" }
      } ,
      {
        "skill": { "type": "literal" , "value": "HighCharts" } ,
        "skilllevel": { "type": "literal" , "value": "HighCharts intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976111064" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Hudson / Jenkins" } ,
        "skilllevel": { "type": "literal" , "value": "Hudson / Jenkins (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1737437541" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Hudson / Jenkins" } ,
        "skilllevel": { "type": "literal" , "value": "Hudson / Jenkins advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n552016427" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Hudson / Jenkins" } ,
        "skilllevel": { "type": "literal" , "value": "Hudson / Jenkins beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242391364" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Hudson / Jenkins" } ,
        "skilllevel": { "type": "literal" , "value": "Hudson / Jenkins guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1784251736" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Hudson / Jenkins" } ,
        "skilllevel": { "type": "literal" , "value": "Hudson / Jenkins intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2041232720" }
      } ,
      {
        "skill": { "type": "literal" , "value": "IDL" } ,
        "skilllevel": { "type": "literal" , "value": "IDL (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1087137639" }
      } ,
      {
        "skill": { "type": "literal" , "value": "IDL" } ,
        "skilllevel": { "type": "literal" , "value": "IDL advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536" }
      } ,
      {
        "skill": { "type": "literal" , "value": "IDL" } ,
        "skilllevel": { "type": "literal" , "value": "IDL beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738" }
      } ,
      {
        "skill": { "type": "literal" , "value": "IDL" } ,
        "skilllevel": { "type": "literal" , "value": "IDL guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1101836142" }
      } ,
      {
        "skill": { "type": "literal" , "value": "IDL" } ,
        "skilllevel": { "type": "literal" , "value": "IDL intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187718791" }
      } ,
      {
        "skill": { "type": "literal" , "value": "JIRA" } ,
        "skilllevel": { "type": "literal" , "value": "JIRA (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n315190482" }
      } ,
      {
        "skill": { "type": "literal" , "value": "JIRA" } ,
        "skilllevel": { "type": "literal" , "value": "JIRA advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n34465221" }
      } ,
      {
        "skill": { "type": "literal" , "value": "JIRA" } ,
        "skilllevel": { "type": "literal" , "value": "JIRA beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004191433" }
      } ,
      {
        "skill": { "type": "literal" , "value": "JIRA" } ,
        "skilllevel": { "type": "literal" , "value": "JIRA guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1080774604" }
      } ,
      {
        "skill": { "type": "literal" , "value": "JIRA" } ,
        "skilllevel": { "type": "literal" , "value": "JIRA intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1149926731" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Java" } ,
        "skilllevel": { "type": "literal" , "value": "Java (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n250976479" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Java" } ,
        "skilllevel": { "type": "literal" , "value": "Java (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Java" } ,
        "skilllevel": { "type": "literal" , "value": "Java advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1074486432" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Java" } ,
        "skilllevel": { "type": "literal" , "value": "Java advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1613" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Java" } ,
        "skilllevel": { "type": "literal" , "value": "Java beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n323417929" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Java" } ,
        "skilllevel": { "type": "literal" , "value": "Java beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Java" } ,
        "skilllevel": { "type": "literal" , "value": "Java guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2416" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Java" } ,
        "skilllevel": { "type": "literal" , "value": "Java guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246415042" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Java" } ,
        "skilllevel": { "type": "literal" , "value": "Java intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570471527" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Java" } ,
        "skilllevel": { "type": "literal" , "value": "Java intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5409" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Javascript" } ,
        "skilllevel": { "type": "literal" , "value": "Javascript (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749531629" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Javascript" } ,
        "skilllevel": { "type": "literal" , "value": "Javascript advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n121234857" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Javascript" } ,
        "skilllevel": { "type": "literal" , "value": "Javascript beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2069783663" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Javascript" } ,
        "skilllevel": { "type": "literal" , "value": "Javascript guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n421925993" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Javascript" } ,
        "skilllevel": { "type": "literal" , "value": "Javascript intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Klocwork Insight" } ,
        "skilllevel": { "type": "literal" , "value": "Klocwork Insight (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1812336606" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Klocwork Insight" } ,
        "skilllevel": { "type": "literal" , "value": "Klocwork Insight advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1606046839" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Klocwork Insight" } ,
        "skilllevel": { "type": "literal" , "value": "Klocwork Insight beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1327292223" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Klocwork Insight" } ,
        "skilllevel": { "type": "literal" , "value": "Klocwork Insight guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n130720797" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Klocwork Insight" } ,
        "skilllevel": { "type": "literal" , "value": "Klocwork Insight intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1127207099" }
      } ,
      {
        "skill": { "type": "literal" , "value": "LAPIS" } ,
        "skilllevel": { "type": "literal" , "value": "LAPIS (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502183070" }
      } ,
      {
        "skill": { "type": "literal" , "value": "LAPIS" } ,
        "skilllevel": { "type": "literal" , "value": "LAPIS advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1363606303" }
      } ,
      {
        "skill": { "type": "literal" , "value": "LAPIS" } ,
        "skilllevel": { "type": "literal" , "value": "LAPIS beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n910650024" }
      } ,
      {
        "skill": { "type": "literal" , "value": "LAPIS" } ,
        "skilllevel": { "type": "literal" , "value": "LAPIS guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n963358014" }
      } ,
      {
        "skill": { "type": "literal" , "value": "LAPIS" } ,
        "skilllevel": { "type": "literal" , "value": "LAPIS intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n210389538" }
      } ,
      {
        "skill": { "type": "literal" , "value": "LabView" } ,
        "skilllevel": { "type": "literal" , "value": "LabView (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872560217" }
      } ,
      {
        "skill": { "type": "literal" , "value": "LabView" } ,
        "skilllevel": { "type": "literal" , "value": "LabView advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1734042133" }
      } ,
      {
        "skill": { "type": "literal" , "value": "LabView" } ,
        "skilllevel": { "type": "literal" , "value": "LabView beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n958593504" }
      } ,
      {
        "skill": { "type": "literal" , "value": "LabView" } ,
        "skilllevel": { "type": "literal" , "value": "LabView guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012557516" }
      } ,
      {
        "skill": { "type": "literal" , "value": "LabView" } ,
        "skilllevel": { "type": "literal" , "value": "LabView intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1729689433" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Least Squares Fitting" } ,
        "skilllevel": { "type": "literal" , "value": "Least Squares Fitting (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1806846241" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Least Squares Fitting" } ,
        "skilllevel": { "type": "literal" , "value": "Least Squares Fitting advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154172632" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Least Squares Fitting" } ,
        "skilllevel": { "type": "literal" , "value": "Least Squares Fitting beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n848923856" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Least Squares Fitting" } ,
        "skilllevel": { "type": "literal" , "value": "Least Squares Fitting guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453811035" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Least Squares Fitting" } ,
        "skilllevel": { "type": "literal" , "value": "Least Squares Fitting intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n563249855" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Linux" } ,
        "skilllevel": { "type": "literal" , "value": "Linux (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1003796096" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Linux" } ,
        "skilllevel": { "type": "literal" , "value": "Linux advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2100386976" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Linux" } ,
        "skilllevel": { "type": "literal" , "value": "Linux beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n102309501" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Linux" } ,
        "skilllevel": { "type": "literal" , "value": "Linux guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1574739549" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Linux" } ,
        "skilllevel": { "type": "literal" , "value": "Linux intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087" }
      } ,
      {
        "skill": { "type": "literal" , "value": "MacOS" } ,
        "skilllevel": { "type": "literal" , "value": "MacOS (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n257741671" }
      } ,
      {
        "skill": { "type": "literal" , "value": "MacOS" } ,
        "skilllevel": { "type": "literal" , "value": "MacOS advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036406957" }
      } ,
      {
        "skill": { "type": "literal" , "value": "MacOS" } ,
        "skilllevel": { "type": "literal" , "value": "MacOS beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1094760625" }
      } ,
      {
        "skill": { "type": "literal" , "value": "MacOS" } ,
        "skilllevel": { "type": "literal" , "value": "MacOS guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1086823868" }
      } ,
      {
        "skill": { "type": "literal" , "value": "MacOS" } ,
        "skilllevel": { "type": "literal" , "value": "MacOS intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845544070" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Matlab" } ,
        "skilllevel": { "type": "literal" , "value": "Matlab (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1574568149" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Matlab" } ,
        "skilllevel": { "type": "literal" , "value": "Matlab advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916250560" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Matlab" } ,
        "skilllevel": { "type": "literal" , "value": "Matlab beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n982331912" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Matlab" } ,
        "skilllevel": { "type": "literal" , "value": "Matlab guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n234619747" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Matlab" } ,
        "skilllevel": { "type": "literal" , "value": "Matlab intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n387374551" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Metastorm" } ,
        "skilllevel": { "type": "literal" , "value": "Metastorm (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1561677047" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Metastorm" } ,
        "skilllevel": { "type": "literal" , "value": "Metastorm advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n377306649" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Metastorm" } ,
        "skilllevel": { "type": "literal" , "value": "Metastorm beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n726056373" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Metastorm" } ,
        "skilllevel": { "type": "literal" , "value": "Metastorm guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n270444721" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Metastorm" } ,
        "skilllevel": { "type": "literal" , "value": "Metastorm intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1834976109" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Excel" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Excel (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728291009" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Excel" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Excel advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n549514676" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Excel" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Excel beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2038895378" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Excel" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Excel guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352583939" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Excel" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Excel intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927066295" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft OneNote" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft OneNote (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115305060" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft OneNote" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft OneNote advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n330270900" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft OneNote" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft OneNote beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850432041" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft OneNote" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft OneNote guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n31966338" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft OneNote" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft OneNote intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n202128694" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft PowerPoint" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft PowerPoint (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n601023829" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft PowerPoint" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft PowerPoint advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1573553938" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft PowerPoint" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft PowerPoint beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n401762512" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft PowerPoint" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft PowerPoint guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1679272387" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft PowerPoint" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft PowerPoint intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2132356262" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Project" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Project (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1549151088" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Project" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Project advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12846418" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Project" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Project beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1275511200" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Project" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Project guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n830332280" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Project" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Project intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n342920979" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Windows" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Windows (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1893090861" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Windows" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Windows advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1492519565" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Windows" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Windows beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1658078054" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Windows" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Windows guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n944265434" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Windows" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Windows intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207841270" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Word" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Word (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1858761653" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Word" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Word advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n341709716" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Word" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Word beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n873329460" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Word" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Word guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n881800927" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Microsoft Word" } ,
        "skilllevel": { "type": "literal" , "value": "Microsoft Word intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2131579087" }
      } ,
      {
        "skill": { "type": "literal" , "value": "MySQL" } ,
        "skilllevel": { "type": "literal" , "value": "MySQL (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1326691645" }
      } ,
      {
        "skill": { "type": "literal" , "value": "MySQL" } ,
        "skilllevel": { "type": "literal" , "value": "MySQL advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1300325321" }
      } ,
      {
        "skill": { "type": "literal" , "value": "MySQL" } ,
        "skilllevel": { "type": "literal" , "value": "MySQL beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1107210262" }
      } ,
      {
        "skill": { "type": "literal" , "value": "MySQL" } ,
        "skilllevel": { "type": "literal" , "value": "MySQL guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n216062184" }
      } ,
      {
        "skill": { "type": "literal" , "value": "MySQL" } ,
        "skilllevel": { "type": "literal" , "value": "MySQL intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Numerical Recipes" } ,
        "skilllevel": { "type": "literal" , "value": "Numerical Recipes (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607410337" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Numerical Recipes" } ,
        "skilllevel": { "type": "literal" , "value": "Numerical Recipes advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n394713168" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Numerical Recipes" } ,
        "skilllevel": { "type": "literal" , "value": "Numerical Recipes beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741962757" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Numerical Recipes" } ,
        "skilllevel": { "type": "literal" , "value": "Numerical Recipes guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1979520237" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Numerical Recipes" } ,
        "skilllevel": { "type": "literal" , "value": "Numerical Recipes intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Numerical methods" } ,
        "skilllevel": { "type": "literal" , "value": "Numerical methods (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n203604722" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Numerical methods" } ,
        "skilllevel": { "type": "literal" , "value": "Numerical methods advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1413713087" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Numerical methods" } ,
        "skilllevel": { "type": "literal" , "value": "Numerical methods beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1343726345" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Numerical methods" } ,
        "skilllevel": { "type": "literal" , "value": "Numerical methods guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2045720713" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Numerical methods" } ,
        "skilllevel": { "type": "literal" , "value": "Numerical methods intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n667100965" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Object Oriented Software Engineering" } ,
        "skilllevel": { "type": "literal" , "value": "Object Oriented Software Engineering (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n420844594" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Object Oriented Software Engineering" } ,
        "skilllevel": { "type": "literal" , "value": "Object Oriented Software Engineering advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n980752808" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Object Oriented Software Engineering" } ,
        "skilllevel": { "type": "literal" , "value": "Object Oriented Software Engineering beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n378387660" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Object Oriented Software Engineering" } ,
        "skilllevel": { "type": "literal" , "value": "Object Oriented Software Engineering guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1696704915" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Object Oriented Software Engineering" } ,
        "skilllevel": { "type": "literal" , "value": "Object Oriented Software Engineering intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1704908319" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Oracle" } ,
        "skilllevel": { "type": "literal" , "value": "Oracle (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749463434" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Oracle" } ,
        "skilllevel": { "type": "literal" , "value": "Oracle advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465053752" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Oracle" } ,
        "skilllevel": { "type": "literal" , "value": "Oracle beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n643546038" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Oracle" } ,
        "skilllevel": { "type": "literal" , "value": "Oracle guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1297217083" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Oracle" } ,
        "skilllevel": { "type": "literal" , "value": "Oracle intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372628957" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Orbit / Attitude Algorithms" } ,
        "skilllevel": { "type": "literal" , "value": "Orbit / Attitude Algorithms (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n364813779" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Orbit / Attitude Algorithms" } ,
        "skilllevel": { "type": "literal" , "value": "Orbit / Attitude Algorithms advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n922046728" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Orbit / Attitude Algorithms" } ,
        "skilllevel": { "type": "literal" , "value": "Orbit / Attitude Algorithms beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5427509" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Orbit / Attitude Algorithms" } ,
        "skilllevel": { "type": "literal" , "value": "Orbit / Attitude Algorithms guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198873636" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Orbit / Attitude Algorithms" } ,
        "skilllevel": { "type": "literal" , "value": "Orbit / Attitude Algorithms intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2032542125" }
      } ,
      {
        "skill": { "type": "literal" , "value": "PHP" } ,
        "skilllevel": { "type": "literal" , "value": "PHP (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2185" }
      } ,
      {
        "skill": { "type": "literal" , "value": "PHP" } ,
        "skilllevel": { "type": "literal" , "value": "PHP advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3970" }
      } ,
      {
        "skill": { "type": "literal" , "value": "PHP" } ,
        "skilllevel": { "type": "literal" , "value": "PHP beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6849" }
      } ,
      {
        "skill": { "type": "literal" , "value": "PHP" } ,
        "skilllevel": { "type": "literal" , "value": "PHP guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15074" }
      } ,
      {
        "skill": { "type": "literal" , "value": "PHP" } ,
        "skilllevel": { "type": "literal" , "value": "PHP intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Photography" } ,
        "skilllevel": { "type": "literal" , "value": "Photography (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n113250758" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Photography" } ,
        "skilllevel": { "type": "literal" , "value": "Photography advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633382078" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Photography" } ,
        "skilllevel": { "type": "literal" , "value": "Photography beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1438661270" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Photography" } ,
        "skilllevel": { "type": "literal" , "value": "Photography guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1144259820" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Photography" } ,
        "skilllevel": { "type": "literal" , "value": "Photography intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1727916947" }
      } ,
      {
        "skill": { "type": "literal" , "value": "PostgreSQL" } ,
        "skilllevel": { "type": "literal" , "value": "PostgreSQL (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1764629184" }
      } ,
      {
        "skill": { "type": "literal" , "value": "PostgreSQL" } ,
        "skilllevel": { "type": "literal" , "value": "PostgreSQL advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n644096346" }
      } ,
      {
        "skill": { "type": "literal" , "value": "PostgreSQL" } ,
        "skilllevel": { "type": "literal" , "value": "PostgreSQL beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823456412" }
      } ,
      {
        "skill": { "type": "literal" , "value": "PostgreSQL" } ,
        "skilllevel": { "type": "literal" , "value": "PostgreSQL guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952124056" }
      } ,
      {
        "skill": { "type": "literal" , "value": "PostgreSQL" } ,
        "skilllevel": { "type": "literal" , "value": "PostgreSQL intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19546766" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Procurement" } ,
        "skilllevel": { "type": "literal" , "value": "Procurement (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1348665024" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Procurement" } ,
        "skilllevel": { "type": "literal" , "value": "Procurement advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299218139" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Procurement" } ,
        "skilllevel": { "type": "literal" , "value": "Procurement beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1484913265" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Procurement" } ,
        "skilllevel": { "type": "literal" , "value": "Procurement guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793306753" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Procurement" } ,
        "skilllevel": { "type": "literal" , "value": "Procurement intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229755004" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Proposal Writing" } ,
        "skilllevel": { "type": "literal" , "value": "Proposal Writing (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732438413" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Proposal Writing" } ,
        "skilllevel": { "type": "literal" , "value": "Proposal Writing advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n469342427" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Proposal Writing" } ,
        "skilllevel": { "type": "literal" , "value": "Proposal Writing beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n755932066" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Proposal Writing" } ,
        "skilllevel": { "type": "literal" , "value": "Proposal Writing guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971192723" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Proposal Writing" } ,
        "skilllevel": { "type": "literal" , "value": "Proposal Writing intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1810899944" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Python" } ,
        "skilllevel": { "type": "literal" , "value": "Python (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1518348383" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Python" } ,
        "skilllevel": { "type": "literal" , "value": "Python (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6338" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Python" } ,
        "skilllevel": { "type": "literal" , "value": "Python advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3965" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Python" } ,
        "skilllevel": { "type": "literal" , "value": "Python advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n531394462" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Python" } ,
        "skilllevel": { "type": "literal" , "value": "Python beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7283" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Python" } ,
        "skilllevel": { "type": "literal" , "value": "Python beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Python" } ,
        "skilllevel": { "type": "literal" , "value": "Python guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n324855540" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Python" } ,
        "skilllevel": { "type": "literal" , "value": "Python guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7173" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Python" } ,
        "skilllevel": { "type": "literal" , "value": "Python intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424885468" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Python" } ,
        "skilllevel": { "type": "literal" , "value": "Python intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6934" }
      } ,
      {
        "skill": { "type": "literal" , "value": "RCS" } ,
        "skilllevel": { "type": "literal" , "value": "RCS (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648456383" }
      } ,
      {
        "skill": { "type": "literal" , "value": "RCS" } ,
        "skilllevel": { "type": "literal" , "value": "RCS advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2047507411" }
      } ,
      {
        "skill": { "type": "literal" , "value": "RCS" } ,
        "skilllevel": { "type": "literal" , "value": "RCS beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1446893445" }
      } ,
      {
        "skill": { "type": "literal" , "value": "RCS" } ,
        "skilllevel": { "type": "literal" , "value": "RCS guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n908413896" }
      } ,
      {
        "skill": { "type": "literal" , "value": "RCS" } ,
        "skilllevel": { "type": "literal" , "value": "RCS intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890219573" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Relational Database Application Development" } ,
        "skilllevel": { "type": "literal" , "value": "Relational Database Application Development (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21061795" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Relational Database Application Development" } ,
        "skilllevel": { "type": "literal" , "value": "Relational Database Application Development advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154717227" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Relational Database Application Development" } ,
        "skilllevel": { "type": "literal" , "value": "Relational Database Application Development beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2099264145" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Relational Database Application Development" } ,
        "skilllevel": { "type": "literal" , "value": "Relational Database Application Development guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n151581269" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Relational Database Application Development" } ,
        "skilllevel": { "type": "literal" , "value": "Relational Database Application Development intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701203852" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Relational Database Design" } ,
        "skilllevel": { "type": "literal" , "value": "Relational Database Design (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1062976249" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Relational Database Design" } ,
        "skilllevel": { "type": "literal" , "value": "Relational Database Design advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1746324127" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Relational Database Design" } ,
        "skilllevel": { "type": "literal" , "value": "Relational Database Design beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434908470" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Relational Database Design" } ,
        "skilllevel": { "type": "literal" , "value": "Relational Database Design guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n232262040" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Relational Database Design" } ,
        "skilllevel": { "type": "literal" , "value": "Relational Database Design intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1647277519" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Ruby" } ,
        "skilllevel": { "type": "literal" , "value": "Ruby (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749583954" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Ruby" } ,
        "skilllevel": { "type": "literal" , "value": "Ruby (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5026" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Ruby" } ,
        "skilllevel": { "type": "literal" , "value": "Ruby advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961399363" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Ruby" } ,
        "skilllevel": { "type": "literal" , "value": "Ruby advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Ruby" } ,
        "skilllevel": { "type": "literal" , "value": "Ruby beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1541694823" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Ruby" } ,
        "skilllevel": { "type": "literal" , "value": "Ruby beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n492" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Ruby" } ,
        "skilllevel": { "type": "literal" , "value": "Ruby guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562841965" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Ruby" } ,
        "skilllevel": { "type": "literal" , "value": "Ruby guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3579" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Ruby" } ,
        "skilllevel": { "type": "literal" , "value": "Ruby intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n123506868" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Ruby" } ,
        "skilllevel": { "type": "literal" , "value": "Ruby intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3952" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SPARQL" } ,
        "skilllevel": { "type": "literal" , "value": "SPARQL (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n9258" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SPARQL" } ,
        "skilllevel": { "type": "literal" , "value": "SPARQL advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3207" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SPARQL" } ,
        "skilllevel": { "type": "literal" , "value": "SPARQL beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3572" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SPARQL" } ,
        "skilllevel": { "type": "literal" , "value": "SPARQL guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7213" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SPARQL" } ,
        "skilllevel": { "type": "literal" , "value": "SPARQL intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3976" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SQL" } ,
        "skilllevel": { "type": "literal" , "value": "SQL (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SQL" } ,
        "skilllevel": { "type": "literal" , "value": "SQL advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SQL" } ,
        "skilllevel": { "type": "literal" , "value": "SQL beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12007" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SQL" } ,
        "skilllevel": { "type": "literal" , "value": "SQL guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SQL" } ,
        "skilllevel": { "type": "literal" , "value": "SQL intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2651" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Scala" } ,
        "skilllevel": { "type": "literal" , "value": "Scala (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513873979" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Scala" } ,
        "skilllevel": { "type": "literal" , "value": "Scala advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330698146" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Scala" } ,
        "skilllevel": { "type": "literal" , "value": "Scala beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1627743057" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Scala" } ,
        "skilllevel": { "type": "literal" , "value": "Scala guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1590998608" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Scala" } ,
        "skilllevel": { "type": "literal" , "value": "Scala intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2099386419" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Science Algorithm Development" } ,
        "skilllevel": { "type": "literal" , "value": "Science Algorithm Development (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336617474" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Science Algorithm Development" } ,
        "skilllevel": { "type": "literal" , "value": "Science Algorithm Development advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Science Algorithm Development" } ,
        "skilllevel": { "type": "literal" , "value": "Science Algorithm Development beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1101287218" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Science Algorithm Development" } ,
        "skilllevel": { "type": "literal" , "value": "Science Algorithm Development guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n769254267" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Science Algorithm Development" } ,
        "skilllevel": { "type": "literal" , "value": "Science Algorithm Development intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1870781320" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SharePoint" } ,
        "skilllevel": { "type": "literal" , "value": "SharePoint (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n915511558" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SharePoint" } ,
        "skilllevel": { "type": "literal" , "value": "SharePoint advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n416848843" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SharePoint" } ,
        "skilllevel": { "type": "literal" , "value": "SharePoint beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2042036714" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SharePoint" } ,
        "skilllevel": { "type": "literal" , "value": "SharePoint guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n379581646" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SharePoint" } ,
        "skilllevel": { "type": "literal" , "value": "SharePoint intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n992690117" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Solaris" } ,
        "skilllevel": { "type": "literal" , "value": "Solaris (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525809816" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Solaris" } ,
        "skilllevel": { "type": "literal" , "value": "Solaris advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1771893770" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Solaris" } ,
        "skilllevel": { "type": "literal" , "value": "Solaris beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1849778210" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Solaris" } ,
        "skilllevel": { "type": "literal" , "value": "Solaris guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665913127" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Solaris" } ,
        "skilllevel": { "type": "literal" , "value": "Solaris intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1487833516" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Structured Query Language (SQL)" } ,
        "skilllevel": { "type": "literal" , "value": "Structured Query Language (SQL) (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198943528" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Structured Query Language (SQL)" } ,
        "skilllevel": { "type": "literal" , "value": "Structured Query Language (SQL) advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2056391629" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Structured Query Language (SQL)" } ,
        "skilllevel": { "type": "literal" , "value": "Structured Query Language (SQL) beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107484853" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Structured Query Language (SQL)" } ,
        "skilllevel": { "type": "literal" , "value": "Structured Query Language (SQL) guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n547846283" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Structured Query Language (SQL)" } ,
        "skilllevel": { "type": "literal" , "value": "Structured Query Language (SQL) intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1704091589" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Subversion" } ,
        "skilllevel": { "type": "literal" , "value": "Subversion (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1946395419" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Subversion" } ,
        "skilllevel": { "type": "literal" , "value": "Subversion advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2134894538" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Subversion" } ,
        "skilllevel": { "type": "literal" , "value": "Subversion beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n920242555" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Subversion" } ,
        "skilllevel": { "type": "literal" , "value": "Subversion guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n324520520" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Subversion" } ,
        "skilllevel": { "type": "literal" , "value": "Subversion intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330304752" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SunRays" } ,
        "skilllevel": { "type": "literal" , "value": "SunRays (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1727557509" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SunRays" } ,
        "skilllevel": { "type": "literal" , "value": "SunRays advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n631403184" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SunRays" } ,
        "skilllevel": { "type": "literal" , "value": "SunRays beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1346865514" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SunRays" } ,
        "skilllevel": { "type": "literal" , "value": "SunRays guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1927603394" }
      } ,
      {
        "skill": { "type": "literal" , "value": "SunRays" } ,
        "skilllevel": { "type": "literal" , "value": "SunRays intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n365371672" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Sybase" } ,
        "skilllevel": { "type": "literal" , "value": "Sybase (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n467937305" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Sybase" } ,
        "skilllevel": { "type": "literal" , "value": "Sybase advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1859553074" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Sybase" } ,
        "skilllevel": { "type": "literal" , "value": "Sybase beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n718212954" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Sybase" } ,
        "skilllevel": { "type": "literal" , "value": "Sybase guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n881771531" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Sybase" } ,
        "skilllevel": { "type": "literal" , "value": "Sybase intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168524923" }
      } ,
      {
        "skill": { "type": "literal" , "value": "TeamCity" } ,
        "skilllevel": { "type": "literal" , "value": "TeamCity (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578708216" }
      } ,
      {
        "skill": { "type": "literal" , "value": "TeamCity" } ,
        "skilllevel": { "type": "literal" , "value": "TeamCity advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951208546" }
      } ,
      {
        "skill": { "type": "literal" , "value": "TeamCity" } ,
        "skilllevel": { "type": "literal" , "value": "TeamCity beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052528994" }
      } ,
      {
        "skill": { "type": "literal" , "value": "TeamCity" } ,
        "skilllevel": { "type": "literal" , "value": "TeamCity guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142570208" }
      } ,
      {
        "skill": { "type": "literal" , "value": "TeamCity" } ,
        "skilllevel": { "type": "literal" , "value": "TeamCity intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1365886265" }
      } ,
      {
        "skill": { "type": "literal" , "value": "UNIX" } ,
        "skilllevel": { "type": "literal" , "value": "UNIX (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4060" }
      } ,
      {
        "skill": { "type": "literal" , "value": "UNIX" } ,
        "skilllevel": { "type": "literal" , "value": "UNIX (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n444108825" }
      } ,
      {
        "skill": { "type": "literal" , "value": "UNIX" } ,
        "skilllevel": { "type": "literal" , "value": "UNIX advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15773" }
      } ,
      {
        "skill": { "type": "literal" , "value": "UNIX" } ,
        "skilllevel": { "type": "literal" , "value": "UNIX advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038" }
      } ,
      {
        "skill": { "type": "literal" , "value": "UNIX" } ,
        "skilllevel": { "type": "literal" , "value": "UNIX beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1811330000" }
      } ,
      {
        "skill": { "type": "literal" , "value": "UNIX" } ,
        "skilllevel": { "type": "literal" , "value": "UNIX beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n506" }
      } ,
      {
        "skill": { "type": "literal" , "value": "UNIX" } ,
        "skilllevel": { "type": "literal" , "value": "UNIX guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1023625925" }
      } ,
      {
        "skill": { "type": "literal" , "value": "UNIX" } ,
        "skilllevel": { "type": "literal" , "value": "UNIX guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n16192" }
      } ,
      {
        "skill": { "type": "literal" , "value": "UNIX" } ,
        "skilllevel": { "type": "literal" , "value": "UNIX intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1515330233" }
      } ,
      {
        "skill": { "type": "literal" , "value": "UNIX" } ,
        "skilllevel": { "type": "literal" , "value": "UNIX intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5925" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Unified Modeling Language (UML)" } ,
        "skilllevel": { "type": "literal" , "value": "Unified Modeling Language (UML) (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917408733" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Unified Modeling Language (UML)" } ,
        "skilllevel": { "type": "literal" , "value": "Unified Modeling Language (UML) advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1440990092" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Unified Modeling Language (UML)" } ,
        "skilllevel": { "type": "literal" , "value": "Unified Modeling Language (UML) beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1453088749" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Unified Modeling Language (UML)" } ,
        "skilllevel": { "type": "literal" , "value": "Unified Modeling Language (UML) guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1039162219" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Unified Modeling Language (UML)" } ,
        "skilllevel": { "type": "literal" , "value": "Unified Modeling Language (UML) intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1569894841" }
      } ,
      {
        "skill": { "type": "literal" , "value": "VIVO" } ,
        "skilllevel": { "type": "literal" , "value": "VIVO (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n920844606" }
      } ,
      {
        "skill": { "type": "literal" , "value": "VIVO" } ,
        "skilllevel": { "type": "literal" , "value": "VIVO advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n690223823" }
      } ,
      {
        "skill": { "type": "literal" , "value": "VIVO" } ,
        "skilllevel": { "type": "literal" , "value": "VIVO beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n812057586" }
      } ,
      {
        "skill": { "type": "literal" , "value": "VIVO" } ,
        "skilllevel": { "type": "literal" , "value": "VIVO guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n390262573" }
      } ,
      {
        "skill": { "type": "literal" , "value": "VIVO" } ,
        "skilllevel": { "type": "literal" , "value": "VIVO intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1524740150" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video Conferencing Equipment" } ,
        "skilllevel": { "type": "literal" , "value": "Video Conferencing Equipment (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n682118795" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video Conferencing Equipment" } ,
        "skilllevel": { "type": "literal" , "value": "Video Conferencing Equipment advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1984479512" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video Conferencing Equipment" } ,
        "skilllevel": { "type": "literal" , "value": "Video Conferencing Equipment beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1692483687" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video Conferencing Equipment" } ,
        "skilllevel": { "type": "literal" , "value": "Video Conferencing Equipment guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n241032219" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video Conferencing Equipment" } ,
        "skilllevel": { "type": "literal" , "value": "Video Conferencing Equipment intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1900691484" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video Streaming" } ,
        "skilllevel": { "type": "literal" , "value": "Video Streaming (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n401501326" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video Streaming" } ,
        "skilllevel": { "type": "literal" , "value": "Video Streaming advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n813078861" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video Streaming" } ,
        "skilllevel": { "type": "literal" , "value": "Video Streaming beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n727958903" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video Streaming" } ,
        "skilllevel": { "type": "literal" , "value": "Video Streaming guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1292232260" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video Streaming" } ,
        "skilllevel": { "type": "literal" , "value": "Video Streaming intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n61105148" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video recording" } ,
        "skilllevel": { "type": "literal" , "value": "Video recording (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n879539546" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video recording" } ,
        "skilllevel": { "type": "literal" , "value": "Video recording advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952735651" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video recording" } ,
        "skilllevel": { "type": "literal" , "value": "Video recording beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027647867" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video recording" } ,
        "skilllevel": { "type": "literal" , "value": "Video recording guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n668932657" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Video recording" } ,
        "skilllevel": { "type": "literal" , "value": "Video recording intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657031559" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Web Certificates" } ,
        "skilllevel": { "type": "literal" , "value": "Web Certificates (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1394403846" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Web Certificates" } ,
        "skilllevel": { "type": "literal" , "value": "Web Certificates advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1289679300" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Web Certificates" } ,
        "skilllevel": { "type": "literal" , "value": "Web Certificates beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068955350" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Web Certificates" } ,
        "skilllevel": { "type": "literal" , "value": "Web Certificates guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n755220436" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Web Certificates" } ,
        "skilllevel": { "type": "literal" , "value": "Web Certificates intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1894130139" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Whole Disk Encryption" } ,
        "skilllevel": { "type": "literal" , "value": "Whole Disk Encryption (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n868532910" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Whole Disk Encryption" } ,
        "skilllevel": { "type": "literal" , "value": "Whole Disk Encryption advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n603466448" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Whole Disk Encryption" } ,
        "skilllevel": { "type": "literal" , "value": "Whole Disk Encryption beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1294021614" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Whole Disk Encryption" } ,
        "skilllevel": { "type": "literal" , "value": "Whole Disk Encryption guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n827443162" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Whole Disk Encryption" } ,
        "skilllevel": { "type": "literal" , "value": "Whole Disk Encryption intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1443446817" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Windows" } ,
        "skilllevel": { "type": "literal" , "value": "Windows (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n737689472" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Windows" } ,
        "skilllevel": { "type": "literal" , "value": "Windows advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n817410130" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Windows" } ,
        "skilllevel": { "type": "literal" , "value": "Windows beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1200655465" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Windows" } ,
        "skilllevel": { "type": "literal" , "value": "Windows guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1783661094" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Windows" } ,
        "skilllevel": { "type": "literal" , "value": "Windows intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n758853803" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Wordpress" } ,
        "skilllevel": { "type": "literal" , "value": "Wordpress (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824675433" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Wordpress" } ,
        "skilllevel": { "type": "literal" , "value": "Wordpress advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246712059" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Wordpress" } ,
        "skilllevel": { "type": "literal" , "value": "Wordpress beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2113348855" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Wordpress" } ,
        "skilllevel": { "type": "literal" , "value": "Wordpress guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n603445265" }
      } ,
      {
        "skill": { "type": "literal" , "value": "Wordpress" } ,
        "skilllevel": { "type": "literal" , "value": "Wordpress intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1750133670" }
      } ,
      {
        "skill": { "type": "literal" , "value": "XML" } ,
        "skilllevel": { "type": "literal" , "value": "XML (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n435809455" }
      } ,
      {
        "skill": { "type": "literal" , "value": "XML" } ,
        "skilllevel": { "type": "literal" , "value": "XML advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308372421" }
      } ,
      {
        "skill": { "type": "literal" , "value": "XML" } ,
        "skilllevel": { "type": "literal" , "value": "XML beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2010667509" }
      } ,
      {
        "skill": { "type": "literal" , "value": "XML" } ,
        "skilllevel": { "type": "literal" , "value": "XML guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1245379038" }
      } ,
      {
        "skill": { "type": "literal" , "value": "XML" } ,
        "skilllevel": { "type": "literal" , "value": "XML intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n869199825" }
      } ,
      {
        "skill": { "type": "literal" , "value": "YourKit Java Profiler" } ,
        "skilllevel": { "type": "literal" , "value": "YourKit Java Profiler (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952946630" }
      } ,
      {
        "skill": { "type": "literal" , "value": "YourKit Java Profiler" } ,
        "skilllevel": { "type": "literal" , "value": "YourKit Java Profiler advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1328280097" }
      } ,
      {
        "skill": { "type": "literal" , "value": "YourKit Java Profiler" } ,
        "skilllevel": { "type": "literal" , "value": "YourKit Java Profiler beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2074846875" }
      } ,
      {
        "skill": { "type": "literal" , "value": "YourKit Java Profiler" } ,
        "skilllevel": { "type": "literal" , "value": "YourKit Java Profiler guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914368466" }
      } ,
      {
        "skill": { "type": "literal" , "value": "YourKit Java Profiler" } ,
        "skilllevel": { "type": "literal" , "value": "YourKit Java Profiler intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971784415" }
      } ,
      {
        "skill": { "type": "literal" , "value": "ant" } ,
        "skilllevel": { "type": "literal" , "value": "ant (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n204347418" }
      } ,
      {
        "skill": { "type": "literal" , "value": "ant" } ,
        "skilllevel": { "type": "literal" , "value": "ant advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n126545019" }
      } ,
      {
        "skill": { "type": "literal" , "value": "ant" } ,
        "skilllevel": { "type": "literal" , "value": "ant beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1177272249" }
      } ,
      {
        "skill": { "type": "literal" , "value": "ant" } ,
        "skilllevel": { "type": "literal" , "value": "ant guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1785232066" }
      } ,
      {
        "skill": { "type": "literal" , "value": "ant" } ,
        "skilllevel": { "type": "literal" , "value": "ant intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1010880164" }
      } ,
      {
        "skill": { "type": "literal" , "value": "bash" } ,
        "skilllevel": { "type": "literal" , "value": "bash (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n506329001" }
      } ,
      {
        "skill": { "type": "literal" , "value": "bash" } ,
        "skilllevel": { "type": "literal" , "value": "bash advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n973358142" }
      } ,
      {
        "skill": { "type": "literal" , "value": "bash" } ,
        "skilllevel": { "type": "literal" , "value": "bash beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n784818287" }
      } ,
      {
        "skill": { "type": "literal" , "value": "bash" } ,
        "skilllevel": { "type": "literal" , "value": "bash guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1232540464" }
      } ,
      {
        "skill": { "type": "literal" , "value": "bash" } ,
        "skilllevel": { "type": "literal" , "value": "bash intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n829159456" }
      } ,
      {
        "skill": { "type": "literal" , "value": "netCDF" } ,
        "skilllevel": { "type": "literal" , "value": "netCDF (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1621791493" }
      } ,
      {
        "skill": { "type": "literal" , "value": "netCDF" } ,
        "skilllevel": { "type": "literal" , "value": "netCDF advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273549603" }
      } ,
      {
        "skill": { "type": "literal" , "value": "netCDF" } ,
        "skilllevel": { "type": "literal" , "value": "netCDF beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070145250" }
      } ,
      {
        "skill": { "type": "literal" , "value": "netCDF" } ,
        "skilllevel": { "type": "literal" , "value": "netCDF guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n194562462" }
      } ,
      {
        "skill": { "type": "literal" , "value": "netCDF" } ,
        "skilllevel": { "type": "literal" , "value": "netCDF intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876937350" }
      } ,
      {
        "skill": { "type": "literal" , "value": "perl" } ,
        "skilllevel": { "type": "literal" , "value": "perl (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1064026058" }
      } ,
      {
        "skill": { "type": "literal" , "value": "perl" } ,
        "skilllevel": { "type": "literal" , "value": "perl advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1712511923" }
      } ,
      {
        "skill": { "type": "literal" , "value": "perl" } ,
        "skilllevel": { "type": "literal" , "value": "perl beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n923173688" }
      } ,
      {
        "skill": { "type": "literal" , "value": "perl" } ,
        "skilllevel": { "type": "literal" , "value": "perl guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n744724876" }
      } ,
      {
        "skill": { "type": "literal" , "value": "perl" } ,
        "skilllevel": { "type": "literal" , "value": "perl intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130" }
      } ,
      {
        "skill": { "type": "literal" , "value": "tcsh" } ,
        "skilllevel": { "type": "literal" , "value": "tcsh (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632010458" }
      } ,
      {
        "skill": { "type": "literal" , "value": "tcsh" } ,
        "skilllevel": { "type": "literal" , "value": "tcsh advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352988386" }
      } ,
      {
        "skill": { "type": "literal" , "value": "tcsh" } ,
        "skilllevel": { "type": "literal" , "value": "tcsh beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1220194198" }
      } ,
      {
        "skill": { "type": "literal" , "value": "tcsh" } ,
        "skilllevel": { "type": "literal" , "value": "tcsh guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1001446887" }
      } ,
      {
        "skill": { "type": "literal" , "value": "tcsh" } ,
        "skilllevel": { "type": "literal" , "value": "tcsh intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n396073491" }
      } ,
      {
        "skill": { "type": "literal" , "value": "wInsight" } ,
        "skilllevel": { "type": "literal" , "value": "wInsight (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062117007" }
      } ,
      {
        "skill": { "type": "literal" , "value": "wInsight" } ,
        "skilllevel": { "type": "literal" , "value": "wInsight advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n358560745" }
      } ,
      {
        "skill": { "type": "literal" , "value": "wInsight" } ,
        "skilllevel": { "type": "literal" , "value": "wInsight beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n239194321" }
      } ,
      {
        "skill": { "type": "literal" , "value": "wInsight" } ,
        "skilllevel": { "type": "literal" , "value": "wInsight guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1173580466" }
      } ,
      {
        "skill": { "type": "literal" , "value": "wInsight" } ,
        "skilllevel": { "type": "literal" , "value": "wInsight intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n862908734" }
      } ,
      {
        "skill": { "type": "literal" , "value": "wikimedia" } ,
        "skilllevel": { "type": "literal" , "value": "wikimedia (unranked)" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1853486041" }
      } ,
      {
        "skill": { "type": "literal" , "value": "wikimedia" } ,
        "skilllevel": { "type": "literal" , "value": "wikimedia advanced" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n876419576" }
      } ,
      {
        "skill": { "type": "literal" , "value": "wikimedia" } ,
        "skilllevel": { "type": "literal" , "value": "wikimedia beginner" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299767191" }
      } ,
      {
        "skill": { "type": "literal" , "value": "wikimedia" } ,
        "skilllevel": { "type": "literal" , "value": "wikimedia guru" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474335554" }
      } ,
      {
        "skill": { "type": "literal" , "value": "wikimedia" } ,
        "skilllevel": { "type": "literal" , "value": "wikimedia intermediate" } ,
        "skillleveluri": { "type": "uri" , "value": "http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446453562" }
      }
    ]
  }
};
        //we'd hope to see this final List returned by formatSkillList
        expectedList = [{"skill":"AMCharts","levels":[{"skilllevel":"AMCharts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439479224"},{"skilllevel":"AMCharts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2088524822"},{"skilllevel":"AMCharts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1269075514"},{"skilllevel":"AMCharts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1117711741"},{"skilllevel":"AMCharts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115838072"}]},{"skill":"Adobe Forms","levels":[{"skilllevel":"Adobe Forms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1143045369"},{"skilllevel":"Adobe Forms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n28344951"},{"skilllevel":"Adobe Forms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1934609946"},{"skilllevel":"Adobe Forms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799459865"},{"skilllevel":"Adobe Forms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n981057267"}]},{"skill":"Angular","levels":[{"skilllevel":"Angular (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1135254945"},{"skilllevel":"Angular advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1836477458"},{"skilllevel":"Angular beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n994473475"},{"skilllevel":"Angular guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1671030649"},{"skilllevel":"Angular intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2122206999"}]},{"skill":"Astronomical Algorithms","levels":[{"skilllevel":"Astronomical Algorithms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1795663283"},{"skilllevel":"Astronomical Algorithms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1398263944"},{"skilllevel":"Astronomical Algorithms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n637392457"},{"skilllevel":"Astronomical Algorithms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n843890716"},{"skilllevel":"Astronomical Algorithms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1762201346"}]},{"skill":"Audio Recording","levels":[{"skilllevel":"Audio Recording (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850885710"},{"skilllevel":"Audio Recording advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n390887168"},{"skilllevel":"Audio Recording beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1619045870"},{"skilllevel":"Audio Recording guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n22386644"},{"skilllevel":"Audio Recording intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530821507"}]},{"skill":"C","levels":[{"skilllevel":"C (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793602038"},{"skilllevel":"C advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1026055000"},{"skilllevel":"C beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2116726559"},{"skilllevel":"C guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1337968289"},{"skilllevel":"C intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n591116589"}]},{"skill":"C Shell","levels":[{"skilllevel":"C Shell (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n960721007"},{"skilllevel":"C Shell advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n225932203"},{"skilllevel":"C Shell beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n18978706"},{"skilllevel":"C Shell guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2046173907"},{"skilllevel":"C Shell intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185"}]},{"skill":"C++","levels":[{"skilllevel":"C++ (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2001992658"},{"skilllevel":"C++ advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n906704525"},{"skilllevel":"C++ beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n455885633"},{"skilllevel":"C++ guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n370638602"},{"skilllevel":"C++ intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632168803"}]},{"skill":"CDF","levels":[{"skilllevel":"CDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n887666611"},{"skilllevel":"CDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n495602294"},{"skilllevel":"CDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n445798236"},{"skilllevel":"CDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1999962869"},{"skilllevel":"CDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n468207266"}]},{"skill":"CSTOL","levels":[{"skilllevel":"CSTOL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n580119452"},{"skilllevel":"CSTOL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n377484763"},{"skilllevel":"CSTOL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n647556400"},{"skilllevel":"CSTOL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n645781042"},{"skilllevel":"CSTOL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815630262"}]},{"skill":"CVS","levels":[{"skilllevel":"CVS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n777645831"},{"skilllevel":"CVS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n874325827"},{"skilllevel":"CVS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91451367"},{"skilllevel":"CVS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n301452772"},{"skilllevel":"CVS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844881810"}]},{"skill":"Confluence","levels":[{"skilllevel":"Confluence (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n169192069"},{"skilllevel":"Confluence advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1681131761"},{"skilllevel":"Confluence beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1601745543"},{"skilllevel":"Confluence guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1994142933"},{"skilllevel":"Confluence intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n664178855"}]},{"skill":"Contracts","levels":[{"skilllevel":"Contracts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059460543"},{"skilllevel":"Contracts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n319092444"},{"skilllevel":"Contracts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003402286"},{"skilllevel":"Contracts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530927661"},{"skilllevel":"Contracts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1556206671"}]},{"skill":"DNS - Domain Name Service","levels":[{"skilllevel":"DNS - Domain Name Service (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019188668"},{"skilllevel":"DNS - Domain Name Service advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1606242612"},{"skilllevel":"DNS - Domain Name Service beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n487555171"},{"skilllevel":"DNS - Domain Name Service guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1591325689"},{"skilllevel":"DNS - Domain Name Service intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1183992693"}]},{"skill":"Deltek COBRA","levels":[{"skilllevel":"Deltek COBRA (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1060861762"},{"skilllevel":"Deltek COBRA advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1289942474"},{"skilllevel":"Deltek COBRA beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1737266517"},{"skilllevel":"Deltek COBRA guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n683068403"},{"skilllevel":"Deltek COBRA intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996134548"}]},{"skill":"DreamWeaver","levels":[{"skilllevel":"DreamWeaver (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513352046"},{"skilllevel":"DreamWeaver advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1203072807"},{"skilllevel":"DreamWeaver beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1074476742"},{"skilllevel":"DreamWeaver guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n327939122"},{"skilllevel":"DreamWeaver intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417437827"}]},{"skill":"Dygraphs","levels":[{"skilllevel":"Dygraphs (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n859963165"},{"skilllevel":"Dygraphs advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1568905926"},{"skilllevel":"Dygraphs beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996489377"},{"skilllevel":"Dygraphs guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n904901577"},{"skilllevel":"Dygraphs intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023679351"}]},{"skill":"ENVI","levels":[{"skilllevel":"ENVI (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705633567"},{"skilllevel":"ENVI advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791169703"},{"skilllevel":"ENVI beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460110611"},{"skilllevel":"ENVI guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1933582934"},{"skilllevel":"ENVI intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1730570217"}]},{"skill":"FORTRAN","levels":[{"skilllevel":"FORTRAN (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1636482519"},{"skilllevel":"FORTRAN advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1694332440"},{"skilllevel":"FORTRAN beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443098442"},{"skilllevel":"FORTRAN guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796173201"},{"skilllevel":"FORTRAN intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199"}]},{"skill":"Fisheye/Crucible","levels":[{"skilllevel":"Fisheye/Crucible (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n545321976"},{"skilllevel":"Fisheye/Crucible advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1649778122"},{"skilllevel":"Fisheye/Crucible beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n481615982"},{"skilllevel":"Fisheye/Crucible guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1773876386"},{"skilllevel":"Fisheye/Crucible intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1836921231"}]},{"skill":"Flash","levels":[{"skilllevel":"Flash (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100403272"},{"skilllevel":"Flash advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1910328820"},{"skilllevel":"Flash beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1722358499"},{"skilllevel":"Flash guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n830992144"},{"skilllevel":"Flash intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1452874899"}]},{"skill":"Google Forms","levels":[{"skilllevel":"Google Forms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n296568149"},{"skilllevel":"Google Forms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187816219"},{"skilllevel":"Google Forms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n586712661"},{"skilllevel":"Google Forms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1792037604"},{"skilllevel":"Google Forms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485541935"}]},{"skill":"Grants","levels":[{"skilllevel":"Grants (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1706539070"},{"skilllevel":"Grants advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n502212599"},{"skilllevel":"Grants beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1591706475"},{"skilllevel":"Grants guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1747849534"},{"skilllevel":"Grants intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n473101934"}]},{"skill":"Graphical User Interface (GUI) design","levels":[{"skilllevel":"Graphical User Interface (GUI) design (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n440619623"},{"skilllevel":"Graphical User Interface (GUI) design advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1846193957"},{"skilllevel":"Graphical User Interface (GUI) design beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n969597673"},{"skilllevel":"Graphical User Interface (GUI) design guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n470903593"},{"skilllevel":"Graphical User Interface (GUI) design intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824061673"}]},{"skill":"Greenhopper","levels":[{"skilllevel":"Greenhopper (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n674121804"},{"skilllevel":"Greenhopper advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1458590281"},{"skilllevel":"Greenhopper beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n743299727"},{"skilllevel":"Greenhopper guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n33149245"},{"skilllevel":"Greenhopper intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1621503107"}]},{"skill":"HDF","levels":[{"skilllevel":"HDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525201002"},{"skilllevel":"HDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n561508048"},{"skilllevel":"HDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446544932"},{"skilllevel":"HDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n642895041"},{"skilllevel":"HDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n181977816"}]},{"skill":"HTML5","levels":[{"skilllevel":"HTML5 (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n738198172"},{"skilllevel":"HTML5 advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1182983491"},{"skilllevel":"HTML5 beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782921057"},{"skilllevel":"HTML5 guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n286927675"},{"skilllevel":"HTML5 intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2144932849"}]},{"skill":"HighCharts","levels":[{"skilllevel":"HighCharts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003879660"},{"skilllevel":"HighCharts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n528825677"},{"skilllevel":"HighCharts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n514540812"},{"skilllevel":"HighCharts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n348862312"},{"skilllevel":"HighCharts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976111064"}]},{"skill":"Hudson / Jenkins","levels":[{"skilllevel":"Hudson / Jenkins (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1737437541"},{"skilllevel":"Hudson / Jenkins advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n552016427"},{"skilllevel":"Hudson / Jenkins beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242391364"},{"skilllevel":"Hudson / Jenkins guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1784251736"},{"skilllevel":"Hudson / Jenkins intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2041232720"}]},{"skill":"IDL","levels":[{"skilllevel":"IDL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1087137639"},{"skilllevel":"IDL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536"},{"skilllevel":"IDL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738"},{"skilllevel":"IDL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1101836142"},{"skilllevel":"IDL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187718791"}]},{"skill":"JIRA","levels":[{"skilllevel":"JIRA (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n315190482"},{"skilllevel":"JIRA advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n34465221"},{"skilllevel":"JIRA beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004191433"},{"skilllevel":"JIRA guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1080774604"},{"skilllevel":"JIRA intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1149926731"}]},{"skill":"Java","levels":[{"skilllevel":"Java (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n250976479"},{"skilllevel":"Java (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477"},{"skilllevel":"Java advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1074486432"},{"skilllevel":"Java advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1613"},{"skilllevel":"Java beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n323417929"},{"skilllevel":"Java beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091"},{"skilllevel":"Java guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2416"},{"skilllevel":"Java guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246415042"},{"skilllevel":"Java intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570471527"},{"skilllevel":"Java intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5409"}]},{"skill":"Javascript","levels":[{"skilllevel":"Javascript (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749531629"},{"skilllevel":"Javascript advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n121234857"},{"skilllevel":"Javascript beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2069783663"},{"skilllevel":"Javascript guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n421925993"},{"skilllevel":"Javascript intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611"}]},{"skill":"Klocwork Insight","levels":[{"skilllevel":"Klocwork Insight (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1812336606"},{"skilllevel":"Klocwork Insight advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1606046839"},{"skilllevel":"Klocwork Insight beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1327292223"},{"skilllevel":"Klocwork Insight guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n130720797"},{"skilllevel":"Klocwork Insight intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1127207099"}]},{"skill":"LAPIS","levels":[{"skilllevel":"LAPIS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502183070"},{"skilllevel":"LAPIS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1363606303"},{"skilllevel":"LAPIS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n910650024"},{"skilllevel":"LAPIS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n963358014"},{"skilllevel":"LAPIS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n210389538"}]},{"skill":"LabView","levels":[{"skilllevel":"LabView (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872560217"},{"skilllevel":"LabView advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1734042133"},{"skilllevel":"LabView beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n958593504"},{"skilllevel":"LabView guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012557516"},{"skilllevel":"LabView intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1729689433"}]},{"skill":"Least Squares Fitting","levels":[{"skilllevel":"Least Squares Fitting (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1806846241"},{"skilllevel":"Least Squares Fitting advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154172632"},{"skilllevel":"Least Squares Fitting beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n848923856"},{"skilllevel":"Least Squares Fitting guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453811035"},{"skilllevel":"Least Squares Fitting intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n563249855"}]},{"skill":"Linux","levels":[{"skilllevel":"Linux (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1003796096"},{"skilllevel":"Linux advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2100386976"},{"skilllevel":"Linux beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n102309501"},{"skilllevel":"Linux guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1574739549"},{"skilllevel":"Linux intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087"}]},{"skill":"MacOS","levels":[{"skilllevel":"MacOS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n257741671"},{"skilllevel":"MacOS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036406957"},{"skilllevel":"MacOS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1094760625"},{"skilllevel":"MacOS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1086823868"},{"skilllevel":"MacOS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845544070"}]},{"skill":"Matlab","levels":[{"skilllevel":"Matlab (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1574568149"},{"skilllevel":"Matlab advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916250560"},{"skilllevel":"Matlab beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n982331912"},{"skilllevel":"Matlab guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n234619747"},{"skilllevel":"Matlab intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n387374551"}]},{"skill":"Metastorm","levels":[{"skilllevel":"Metastorm (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1561677047"},{"skilllevel":"Metastorm advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n377306649"},{"skilllevel":"Metastorm beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n726056373"},{"skilllevel":"Metastorm guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n270444721"},{"skilllevel":"Metastorm intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1834976109"}]},{"skill":"Microsoft Excel","levels":[{"skilllevel":"Microsoft Excel (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728291009"},{"skilllevel":"Microsoft Excel advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n549514676"},{"skilllevel":"Microsoft Excel beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2038895378"},{"skilllevel":"Microsoft Excel guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352583939"},{"skilllevel":"Microsoft Excel intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927066295"}]},{"skill":"Microsoft OneNote","levels":[{"skilllevel":"Microsoft OneNote (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115305060"},{"skilllevel":"Microsoft OneNote advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n330270900"},{"skilllevel":"Microsoft OneNote beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850432041"},{"skilllevel":"Microsoft OneNote guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n31966338"},{"skilllevel":"Microsoft OneNote intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n202128694"}]},{"skill":"Microsoft PowerPoint","levels":[{"skilllevel":"Microsoft PowerPoint (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n601023829"},{"skilllevel":"Microsoft PowerPoint advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1573553938"},{"skilllevel":"Microsoft PowerPoint beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n401762512"},{"skilllevel":"Microsoft PowerPoint guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1679272387"},{"skilllevel":"Microsoft PowerPoint intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2132356262"}]},{"skill":"Microsoft Project","levels":[{"skilllevel":"Microsoft Project (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1549151088"},{"skilllevel":"Microsoft Project advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12846418"},{"skilllevel":"Microsoft Project beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1275511200"},{"skilllevel":"Microsoft Project guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n830332280"},{"skilllevel":"Microsoft Project intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n342920979"}]},{"skill":"Microsoft Windows","levels":[{"skilllevel":"Microsoft Windows (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1893090861"},{"skilllevel":"Microsoft Windows advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1492519565"},{"skilllevel":"Microsoft Windows beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1658078054"},{"skilllevel":"Microsoft Windows guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n944265434"},{"skilllevel":"Microsoft Windows intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207841270"}]},{"skill":"Microsoft Word","levels":[{"skilllevel":"Microsoft Word (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1858761653"},{"skilllevel":"Microsoft Word advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n341709716"},{"skilllevel":"Microsoft Word beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n873329460"},{"skilllevel":"Microsoft Word guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n881800927"},{"skilllevel":"Microsoft Word intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2131579087"}]},{"skill":"MySQL","levels":[{"skilllevel":"MySQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1326691645"},{"skilllevel":"MySQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1300325321"},{"skilllevel":"MySQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1107210262"},{"skilllevel":"MySQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n216062184"},{"skilllevel":"MySQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921"}]},{"skill":"Numerical Recipes","levels":[{"skilllevel":"Numerical Recipes (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607410337"},{"skilllevel":"Numerical Recipes advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n394713168"},{"skilllevel":"Numerical Recipes beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741962757"},{"skilllevel":"Numerical Recipes guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1979520237"},{"skilllevel":"Numerical Recipes intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840"}]},{"skill":"Numerical methods","levels":[{"skilllevel":"Numerical methods (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n203604722"},{"skilllevel":"Numerical methods advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1413713087"},{"skilllevel":"Numerical methods beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1343726345"},{"skilllevel":"Numerical methods guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2045720713"},{"skilllevel":"Numerical methods intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n667100965"}]},{"skill":"Object Oriented Software Engineering","levels":[{"skilllevel":"Object Oriented Software Engineering (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n420844594"},{"skilllevel":"Object Oriented Software Engineering advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n980752808"},{"skilllevel":"Object Oriented Software Engineering beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n378387660"},{"skilllevel":"Object Oriented Software Engineering guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1696704915"},{"skilllevel":"Object Oriented Software Engineering intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1704908319"}]},{"skill":"Oracle","levels":[{"skilllevel":"Oracle (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749463434"},{"skilllevel":"Oracle advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465053752"},{"skilllevel":"Oracle beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n643546038"},{"skilllevel":"Oracle guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1297217083"},{"skilllevel":"Oracle intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372628957"}]},{"skill":"Orbit / Attitude Algorithms","levels":[{"skilllevel":"Orbit / Attitude Algorithms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n364813779"},{"skilllevel":"Orbit / Attitude Algorithms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n922046728"},{"skilllevel":"Orbit / Attitude Algorithms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5427509"},{"skilllevel":"Orbit / Attitude Algorithms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198873636"},{"skilllevel":"Orbit / Attitude Algorithms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2032542125"}]},{"skill":"PHP","levels":[{"skilllevel":"PHP (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2185"},{"skilllevel":"PHP advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3970"},{"skilllevel":"PHP beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6849"},{"skilllevel":"PHP guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15074"},{"skilllevel":"PHP intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363"}]},{"skill":"Photography","levels":[{"skilllevel":"Photography (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n113250758"},{"skilllevel":"Photography advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633382078"},{"skilllevel":"Photography beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1438661270"},{"skilllevel":"Photography guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1144259820"},{"skilllevel":"Photography intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1727916947"}]},{"skill":"PostgreSQL","levels":[{"skilllevel":"PostgreSQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1764629184"},{"skilllevel":"PostgreSQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n644096346"},{"skilllevel":"PostgreSQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823456412"},{"skilllevel":"PostgreSQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952124056"},{"skilllevel":"PostgreSQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19546766"}]},{"skill":"Procurement","levels":[{"skilllevel":"Procurement (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1348665024"},{"skilllevel":"Procurement advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299218139"},{"skilllevel":"Procurement beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1484913265"},{"skilllevel":"Procurement guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793306753"},{"skilllevel":"Procurement intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229755004"}]},{"skill":"Proposal Writing","levels":[{"skilllevel":"Proposal Writing (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732438413"},{"skilllevel":"Proposal Writing advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n469342427"},{"skilllevel":"Proposal Writing beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n755932066"},{"skilllevel":"Proposal Writing guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971192723"},{"skilllevel":"Proposal Writing intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1810899944"}]},{"skill":"Python","levels":[{"skilllevel":"Python (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1518348383"},{"skilllevel":"Python (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6338"},{"skilllevel":"Python advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3965"},{"skilllevel":"Python advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n531394462"},{"skilllevel":"Python beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7283"},{"skilllevel":"Python beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313"},{"skilllevel":"Python guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n324855540"},{"skilllevel":"Python guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7173"},{"skilllevel":"Python intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424885468"},{"skilllevel":"Python intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6934"}]},{"skill":"RCS","levels":[{"skilllevel":"RCS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648456383"},{"skilllevel":"RCS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2047507411"},{"skilllevel":"RCS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1446893445"},{"skilllevel":"RCS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n908413896"},{"skilllevel":"RCS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890219573"}]},{"skill":"Relational Database Application Development","levels":[{"skilllevel":"Relational Database Application Development (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21061795"},{"skilllevel":"Relational Database Application Development advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154717227"},{"skilllevel":"Relational Database Application Development beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2099264145"},{"skilllevel":"Relational Database Application Development guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n151581269"},{"skilllevel":"Relational Database Application Development intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701203852"}]},{"skill":"Relational Database Design","levels":[{"skilllevel":"Relational Database Design (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1062976249"},{"skilllevel":"Relational Database Design advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1746324127"},{"skilllevel":"Relational Database Design beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434908470"},{"skilllevel":"Relational Database Design guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n232262040"},{"skilllevel":"Relational Database Design intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1647277519"}]},{"skill":"Ruby","levels":[{"skilllevel":"Ruby (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749583954"},{"skilllevel":"Ruby (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5026"},{"skilllevel":"Ruby advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961399363"},{"skilllevel":"Ruby advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85"},{"skilllevel":"Ruby beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1541694823"},{"skilllevel":"Ruby beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n492"},{"skilllevel":"Ruby guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562841965"},{"skilllevel":"Ruby guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3579"},{"skilllevel":"Ruby intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n123506868"},{"skilllevel":"Ruby intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3952"}]},{"skill":"SPARQL","levels":[{"skilllevel":"SPARQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n9258"},{"skilllevel":"SPARQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3207"},{"skilllevel":"SPARQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3572"},{"skilllevel":"SPARQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7213"},{"skilllevel":"SPARQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3976"}]},{"skill":"SQL","levels":[{"skilllevel":"SQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454"},{"skilllevel":"SQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565"},{"skilllevel":"SQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12007"},{"skilllevel":"SQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728"},{"skilllevel":"SQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2651"}]},{"skill":"Scala","levels":[{"skilllevel":"Scala (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513873979"},{"skilllevel":"Scala advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330698146"},{"skilllevel":"Scala beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1627743057"},{"skilllevel":"Scala guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1590998608"},{"skilllevel":"Scala intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2099386419"}]},{"skill":"Science Algorithm Development","levels":[{"skilllevel":"Science Algorithm Development (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336617474"},{"skilllevel":"Science Algorithm Development advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001"},{"skilllevel":"Science Algorithm Development beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1101287218"},{"skilllevel":"Science Algorithm Development guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n769254267"},{"skilllevel":"Science Algorithm Development intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1870781320"}]},{"skill":"SharePoint","levels":[{"skilllevel":"SharePoint (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n915511558"},{"skilllevel":"SharePoint advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n416848843"},{"skilllevel":"SharePoint beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2042036714"},{"skilllevel":"SharePoint guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n379581646"},{"skilllevel":"SharePoint intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n992690117"}]},{"skill":"Solaris","levels":[{"skilllevel":"Solaris (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525809816"},{"skilllevel":"Solaris advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1771893770"},{"skilllevel":"Solaris beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1849778210"},{"skilllevel":"Solaris guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665913127"},{"skilllevel":"Solaris intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1487833516"}]},{"skill":"Structured Query Language (SQL)","levels":[{"skilllevel":"Structured Query Language (SQL) (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198943528"},{"skilllevel":"Structured Query Language (SQL) advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2056391629"},{"skilllevel":"Structured Query Language (SQL) beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107484853"},{"skilllevel":"Structured Query Language (SQL) guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n547846283"},{"skilllevel":"Structured Query Language (SQL) intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1704091589"}]},{"skill":"Subversion","levels":[{"skilllevel":"Subversion (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1946395419"},{"skilllevel":"Subversion advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2134894538"},{"skilllevel":"Subversion beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n920242555"},{"skilllevel":"Subversion guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n324520520"},{"skilllevel":"Subversion intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330304752"}]},{"skill":"SunRays","levels":[{"skilllevel":"SunRays (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1727557509"},{"skilllevel":"SunRays advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n631403184"},{"skilllevel":"SunRays beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1346865514"},{"skilllevel":"SunRays guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1927603394"},{"skilllevel":"SunRays intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n365371672"}]},{"skill":"Sybase","levels":[{"skilllevel":"Sybase (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n467937305"},{"skilllevel":"Sybase advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1859553074"},{"skilllevel":"Sybase beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n718212954"},{"skilllevel":"Sybase guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n881771531"},{"skilllevel":"Sybase intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168524923"}]},{"skill":"TeamCity","levels":[{"skilllevel":"TeamCity (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578708216"},{"skilllevel":"TeamCity advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951208546"},{"skilllevel":"TeamCity beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052528994"},{"skilllevel":"TeamCity guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142570208"},{"skilllevel":"TeamCity intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1365886265"}]},{"skill":"UNIX","levels":[{"skilllevel":"UNIX (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4060"},{"skilllevel":"UNIX (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n444108825"},{"skilllevel":"UNIX advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15773"},{"skilllevel":"UNIX advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038"},{"skilllevel":"UNIX beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1811330000"},{"skilllevel":"UNIX beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n506"},{"skilllevel":"UNIX guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1023625925"},{"skilllevel":"UNIX guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n16192"},{"skilllevel":"UNIX intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1515330233"},{"skilllevel":"UNIX intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5925"}]},{"skill":"Unified Modeling Language (UML)","levels":[{"skilllevel":"Unified Modeling Language (UML) (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917408733"},{"skilllevel":"Unified Modeling Language (UML) advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1440990092"},{"skilllevel":"Unified Modeling Language (UML) beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1453088749"},{"skilllevel":"Unified Modeling Language (UML) guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1039162219"},{"skilllevel":"Unified Modeling Language (UML) intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1569894841"}]},{"skill":"VIVO","levels":[{"skilllevel":"VIVO (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n920844606"},{"skilllevel":"VIVO advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n690223823"},{"skilllevel":"VIVO beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n812057586"},{"skilllevel":"VIVO guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n390262573"},{"skilllevel":"VIVO intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1524740150"}]},{"skill":"Video Conferencing Equipment","levels":[{"skilllevel":"Video Conferencing Equipment (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n682118795"},{"skilllevel":"Video Conferencing Equipment advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1984479512"},{"skilllevel":"Video Conferencing Equipment beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1692483687"},{"skilllevel":"Video Conferencing Equipment guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n241032219"},{"skilllevel":"Video Conferencing Equipment intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1900691484"}]},{"skill":"Video Streaming","levels":[{"skilllevel":"Video Streaming (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n401501326"},{"skilllevel":"Video Streaming advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n813078861"},{"skilllevel":"Video Streaming beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n727958903"},{"skilllevel":"Video Streaming guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1292232260"},{"skilllevel":"Video Streaming intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n61105148"}]},{"skill":"Video recording","levels":[{"skilllevel":"Video recording (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n879539546"},{"skilllevel":"Video recording advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952735651"},{"skilllevel":"Video recording beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027647867"},{"skilllevel":"Video recording guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n668932657"},{"skilllevel":"Video recording intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657031559"}]},{"skill":"Web Certificates","levels":[{"skilllevel":"Web Certificates (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1394403846"},{"skilllevel":"Web Certificates advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1289679300"},{"skilllevel":"Web Certificates beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068955350"},{"skilllevel":"Web Certificates guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n755220436"},{"skilllevel":"Web Certificates intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1894130139"}]},{"skill":"Whole Disk Encryption","levels":[{"skilllevel":"Whole Disk Encryption (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n868532910"},{"skilllevel":"Whole Disk Encryption advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n603466448"},{"skilllevel":"Whole Disk Encryption beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1294021614"},{"skilllevel":"Whole Disk Encryption guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n827443162"},{"skilllevel":"Whole Disk Encryption intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1443446817"}]},{"skill":"Windows","levels":[{"skilllevel":"Windows (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n737689472"},{"skilllevel":"Windows advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n817410130"},{"skilllevel":"Windows beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1200655465"},{"skilllevel":"Windows guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1783661094"},{"skilllevel":"Windows intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n758853803"}]},{"skill":"Wordpress","levels":[{"skilllevel":"Wordpress (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824675433"},{"skilllevel":"Wordpress advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246712059"},{"skilllevel":"Wordpress beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2113348855"},{"skilllevel":"Wordpress guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n603445265"},{"skilllevel":"Wordpress intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1750133670"}]},{"skill":"XML","levels":[{"skilllevel":"XML (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n435809455"},{"skilllevel":"XML advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308372421"},{"skilllevel":"XML beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2010667509"},{"skilllevel":"XML guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1245379038"},{"skilllevel":"XML intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n869199825"}]},{"skill":"YourKit Java Profiler","levels":[{"skilllevel":"YourKit Java Profiler (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952946630"},{"skilllevel":"YourKit Java Profiler advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1328280097"},{"skilllevel":"YourKit Java Profiler beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2074846875"},{"skilllevel":"YourKit Java Profiler guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914368466"},{"skilllevel":"YourKit Java Profiler intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971784415"}]},{"skill":"ant","levels":[{"skilllevel":"ant (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n204347418"},{"skilllevel":"ant advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n126545019"},{"skilllevel":"ant beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1177272249"},{"skilllevel":"ant guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1785232066"},{"skilllevel":"ant intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1010880164"}]},{"skill":"bash","levels":[{"skilllevel":"bash (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n506329001"},{"skilllevel":"bash advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n973358142"},{"skilllevel":"bash beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n784818287"},{"skilllevel":"bash guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1232540464"},{"skilllevel":"bash intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n829159456"}]},{"skill":"netCDF","levels":[{"skilllevel":"netCDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1621791493"},{"skilllevel":"netCDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273549603"},{"skilllevel":"netCDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070145250"},{"skilllevel":"netCDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n194562462"},{"skilllevel":"netCDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876937350"}]},{"skill":"perl","levels":[{"skilllevel":"perl (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1064026058"},{"skilllevel":"perl advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1712511923"},{"skilllevel":"perl beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n923173688"},{"skilllevel":"perl guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n744724876"},{"skilllevel":"perl intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130"}]},{"skill":"tcsh","levels":[{"skilllevel":"tcsh (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632010458"},{"skilllevel":"tcsh advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352988386"},{"skilllevel":"tcsh beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1220194198"},{"skilllevel":"tcsh guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1001446887"},{"skilllevel":"tcsh intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n396073491"}]},{"skill":"wInsight","levels":[{"skilllevel":"wInsight (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062117007"},{"skilllevel":"wInsight advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n358560745"},{"skilllevel":"wInsight beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n239194321"},{"skilllevel":"wInsight guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1173580466"},{"skilllevel":"wInsight intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n862908734"}]},{"skill":"wikimedia","levels":[{"skilllevel":"wikimedia (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1853486041"},{"skilllevel":"wikimedia advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n876419576"},{"skilllevel":"wikimedia beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299767191"},{"skilllevel":"wikimedia guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474335554"},{"skilllevel":"wikimedia intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446453562"}]}];
      //act
      returnedList = $formatFactory.formatSkillList(fakeSPARQLResults);

      //assert
      expect(JSON.stringify(returnedList)).toEqual(JSON.stringify(expectedList));
    });

    it("pages data properly", function(){
      //arrange
      var skillsInput = [{"skill":"AMCharts","levels":[{"skilllevel":"AMCharts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439479224"},{"skilllevel":"AMCharts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2088524822"},{"skilllevel":"AMCharts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1269075514"},{"skilllevel":"AMCharts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1117711741"},{"skilllevel":"AMCharts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115838072"}]},{"skill":"Adobe Forms","levels":[{"skilllevel":"Adobe Forms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1143045369"},{"skilllevel":"Adobe Forms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n28344951"},{"skilllevel":"Adobe Forms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1934609946"},{"skilllevel":"Adobe Forms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799459865"},{"skilllevel":"Adobe Forms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n981057267"}]},{"skill":"Angular","levels":[{"skilllevel":"Angular (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1135254945"},{"skilllevel":"Angular advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1836477458"},{"skilllevel":"Angular beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n994473475"},{"skilllevel":"Angular guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1671030649"},{"skilllevel":"Angular intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2122206999"}]},{"skill":"Astronomical Algorithms","levels":[{"skilllevel":"Astronomical Algorithms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1795663283"},{"skilllevel":"Astronomical Algorithms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1398263944"},{"skilllevel":"Astronomical Algorithms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n637392457"},{"skilllevel":"Astronomical Algorithms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n843890716"},{"skilllevel":"Astronomical Algorithms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1762201346"}]},{"skill":"Audio Recording","levels":[{"skilllevel":"Audio Recording (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850885710"},{"skilllevel":"Audio Recording advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n390887168"},{"skilllevel":"Audio Recording beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1619045870"},{"skilllevel":"Audio Recording guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n22386644"},{"skilllevel":"Audio Recording intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530821507"}]},{"skill":"C","levels":[{"skilllevel":"C (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793602038"},{"skilllevel":"C advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1026055000"},{"skilllevel":"C beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2116726559"},{"skilllevel":"C guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1337968289"},{"skilllevel":"C intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n591116589"}]},{"skill":"C Shell","levels":[{"skilllevel":"C Shell (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n960721007"},{"skilllevel":"C Shell advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n225932203"},{"skilllevel":"C Shell beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n18978706"},{"skilllevel":"C Shell guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2046173907"},{"skilllevel":"C Shell intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185"}]},{"skill":"C++","levels":[{"skilllevel":"C++ (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2001992658"},{"skilllevel":"C++ advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n906704525"},{"skilllevel":"C++ beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n455885633"},{"skilllevel":"C++ guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n370638602"},{"skilllevel":"C++ intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632168803"}]},{"skill":"CDF","levels":[{"skilllevel":"CDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n887666611"},{"skilllevel":"CDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n495602294"},{"skilllevel":"CDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n445798236"},{"skilllevel":"CDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1999962869"},{"skilllevel":"CDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n468207266"}]},{"skill":"CSTOL","levels":[{"skilllevel":"CSTOL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n580119452"},{"skilllevel":"CSTOL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n377484763"},{"skilllevel":"CSTOL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n647556400"},{"skilllevel":"CSTOL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n645781042"},{"skilllevel":"CSTOL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815630262"}]},{"skill":"CVS","levels":[{"skilllevel":"CVS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n777645831"},{"skilllevel":"CVS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n874325827"},{"skilllevel":"CVS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91451367"},{"skilllevel":"CVS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n301452772"},{"skilllevel":"CVS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844881810"}]},{"skill":"Confluence","levels":[{"skilllevel":"Confluence (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n169192069"},{"skilllevel":"Confluence advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1681131761"},{"skilllevel":"Confluence beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1601745543"},{"skilllevel":"Confluence guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1994142933"},{"skilllevel":"Confluence intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n664178855"}]},{"skill":"Contracts","levels":[{"skilllevel":"Contracts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059460543"},{"skilllevel":"Contracts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n319092444"},{"skilllevel":"Contracts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003402286"},{"skilllevel":"Contracts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530927661"},{"skilllevel":"Contracts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1556206671"}]},{"skill":"DNS - Domain Name Service","levels":[{"skilllevel":"DNS - Domain Name Service (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019188668"},{"skilllevel":"DNS - Domain Name Service advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1606242612"},{"skilllevel":"DNS - Domain Name Service beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n487555171"},{"skilllevel":"DNS - Domain Name Service guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1591325689"},{"skilllevel":"DNS - Domain Name Service intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1183992693"}]},{"skill":"Deltek COBRA","levels":[{"skilllevel":"Deltek COBRA (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1060861762"},{"skilllevel":"Deltek COBRA advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1289942474"},{"skilllevel":"Deltek COBRA beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1737266517"},{"skilllevel":"Deltek COBRA guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n683068403"},{"skilllevel":"Deltek COBRA intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996134548"}]},{"skill":"DreamWeaver","levels":[{"skilllevel":"DreamWeaver (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513352046"},{"skilllevel":"DreamWeaver advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1203072807"},{"skilllevel":"DreamWeaver beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1074476742"},{"skilllevel":"DreamWeaver guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n327939122"},{"skilllevel":"DreamWeaver intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417437827"}]},{"skill":"Dygraphs","levels":[{"skilllevel":"Dygraphs (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n859963165"},{"skilllevel":"Dygraphs advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1568905926"},{"skilllevel":"Dygraphs beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996489377"},{"skilllevel":"Dygraphs guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n904901577"},{"skilllevel":"Dygraphs intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023679351"}]},{"skill":"ENVI","levels":[{"skilllevel":"ENVI (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705633567"},{"skilllevel":"ENVI advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791169703"},{"skilllevel":"ENVI beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460110611"},{"skilllevel":"ENVI guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1933582934"},{"skilllevel":"ENVI intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1730570217"}]},{"skill":"FORTRAN","levels":[{"skilllevel":"FORTRAN (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1636482519"},{"skilllevel":"FORTRAN advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1694332440"},{"skilllevel":"FORTRAN beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443098442"},{"skilllevel":"FORTRAN guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796173201"},{"skilllevel":"FORTRAN intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199"}]},{"skill":"Fisheye/Crucible","levels":[{"skilllevel":"Fisheye/Crucible (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n545321976"},{"skilllevel":"Fisheye/Crucible advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1649778122"},{"skilllevel":"Fisheye/Crucible beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n481615982"},{"skilllevel":"Fisheye/Crucible guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1773876386"},{"skilllevel":"Fisheye/Crucible intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1836921231"}]},{"skill":"Flash","levels":[{"skilllevel":"Flash (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100403272"},{"skilllevel":"Flash advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1910328820"},{"skilllevel":"Flash beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1722358499"},{"skilllevel":"Flash guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n830992144"},{"skilllevel":"Flash intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1452874899"}]},{"skill":"Google Forms","levels":[{"skilllevel":"Google Forms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n296568149"},{"skilllevel":"Google Forms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187816219"},{"skilllevel":"Google Forms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n586712661"},{"skilllevel":"Google Forms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1792037604"},{"skilllevel":"Google Forms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485541935"}]},{"skill":"Grants","levels":[{"skilllevel":"Grants (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1706539070"},{"skilllevel":"Grants advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n502212599"},{"skilllevel":"Grants beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1591706475"},{"skilllevel":"Grants guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1747849534"},{"skilllevel":"Grants intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n473101934"}]},{"skill":"Graphical User Interface (GUI) design","levels":[{"skilllevel":"Graphical User Interface (GUI) design (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n440619623"},{"skilllevel":"Graphical User Interface (GUI) design advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1846193957"},{"skilllevel":"Graphical User Interface (GUI) design beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n969597673"},{"skilllevel":"Graphical User Interface (GUI) design guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n470903593"},{"skilllevel":"Graphical User Interface (GUI) design intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824061673"}]},{"skill":"Greenhopper","levels":[{"skilllevel":"Greenhopper (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n674121804"},{"skilllevel":"Greenhopper advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1458590281"},{"skilllevel":"Greenhopper beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n743299727"},{"skilllevel":"Greenhopper guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n33149245"},{"skilllevel":"Greenhopper intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1621503107"}]},{"skill":"HDF","levels":[{"skilllevel":"HDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525201002"},{"skilllevel":"HDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n561508048"},{"skilllevel":"HDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446544932"},{"skilllevel":"HDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n642895041"},{"skilllevel":"HDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n181977816"}]},{"skill":"HTML5","levels":[{"skilllevel":"HTML5 (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n738198172"},{"skilllevel":"HTML5 advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1182983491"},{"skilllevel":"HTML5 beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782921057"},{"skilllevel":"HTML5 guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n286927675"},{"skilllevel":"HTML5 intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2144932849"}]},{"skill":"HighCharts","levels":[{"skilllevel":"HighCharts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003879660"},{"skilllevel":"HighCharts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n528825677"},{"skilllevel":"HighCharts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n514540812"},{"skilllevel":"HighCharts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n348862312"},{"skilllevel":"HighCharts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976111064"}]},{"skill":"Hudson / Jenkins","levels":[{"skilllevel":"Hudson / Jenkins (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1737437541"},{"skilllevel":"Hudson / Jenkins advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n552016427"},{"skilllevel":"Hudson / Jenkins beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242391364"},{"skilllevel":"Hudson / Jenkins guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1784251736"},{"skilllevel":"Hudson / Jenkins intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2041232720"}]},{"skill":"IDL","levels":[{"skilllevel":"IDL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1087137639"},{"skilllevel":"IDL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536"},{"skilllevel":"IDL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738"},{"skilllevel":"IDL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1101836142"},{"skilllevel":"IDL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187718791"}]},{"skill":"JIRA","levels":[{"skilllevel":"JIRA (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n315190482"},{"skilllevel":"JIRA advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n34465221"},{"skilllevel":"JIRA beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004191433"},{"skilllevel":"JIRA guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1080774604"},{"skilllevel":"JIRA intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1149926731"}]},{"skill":"Java","levels":[{"skilllevel":"Java (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n250976479"},{"skilllevel":"Java (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477"},{"skilllevel":"Java advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1074486432"},{"skilllevel":"Java advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1613"},{"skilllevel":"Java beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n323417929"},{"skilllevel":"Java beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091"},{"skilllevel":"Java guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2416"},{"skilllevel":"Java guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246415042"},{"skilllevel":"Java intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570471527"},{"skilllevel":"Java intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5409"}]},{"skill":"Javascript","levels":[{"skilllevel":"Javascript (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749531629"},{"skilllevel":"Javascript advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n121234857"},{"skilllevel":"Javascript beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2069783663"},{"skilllevel":"Javascript guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n421925993"},{"skilllevel":"Javascript intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611"}]},{"skill":"Klocwork Insight","levels":[{"skilllevel":"Klocwork Insight (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1812336606"},{"skilllevel":"Klocwork Insight advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1606046839"},{"skilllevel":"Klocwork Insight beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1327292223"},{"skilllevel":"Klocwork Insight guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n130720797"},{"skilllevel":"Klocwork Insight intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1127207099"}]},{"skill":"LAPIS","levels":[{"skilllevel":"LAPIS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502183070"},{"skilllevel":"LAPIS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1363606303"},{"skilllevel":"LAPIS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n910650024"},{"skilllevel":"LAPIS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n963358014"},{"skilllevel":"LAPIS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n210389538"}]},{"skill":"LabView","levels":[{"skilllevel":"LabView (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872560217"},{"skilllevel":"LabView advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1734042133"},{"skilllevel":"LabView beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n958593504"},{"skilllevel":"LabView guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012557516"},{"skilllevel":"LabView intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1729689433"}]},{"skill":"Least Squares Fitting","levels":[{"skilllevel":"Least Squares Fitting (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1806846241"},{"skilllevel":"Least Squares Fitting advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154172632"},{"skilllevel":"Least Squares Fitting beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n848923856"},{"skilllevel":"Least Squares Fitting guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453811035"},{"skilllevel":"Least Squares Fitting intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n563249855"}]},{"skill":"Linux","levels":[{"skilllevel":"Linux (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1003796096"},{"skilllevel":"Linux advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2100386976"},{"skilllevel":"Linux beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n102309501"},{"skilllevel":"Linux guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1574739549"},{"skilllevel":"Linux intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087"}]},{"skill":"MacOS","levels":[{"skilllevel":"MacOS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n257741671"},{"skilllevel":"MacOS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036406957"},{"skilllevel":"MacOS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1094760625"},{"skilllevel":"MacOS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1086823868"},{"skilllevel":"MacOS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845544070"}]},{"skill":"Matlab","levels":[{"skilllevel":"Matlab (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1574568149"},{"skilllevel":"Matlab advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916250560"},{"skilllevel":"Matlab beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n982331912"},{"skilllevel":"Matlab guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n234619747"},{"skilllevel":"Matlab intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n387374551"}]},{"skill":"Metastorm","levels":[{"skilllevel":"Metastorm (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1561677047"},{"skilllevel":"Metastorm advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n377306649"},{"skilllevel":"Metastorm beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n726056373"},{"skilllevel":"Metastorm guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n270444721"},{"skilllevel":"Metastorm intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1834976109"}]},{"skill":"Microsoft Excel","levels":[{"skilllevel":"Microsoft Excel (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728291009"},{"skilllevel":"Microsoft Excel advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n549514676"},{"skilllevel":"Microsoft Excel beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2038895378"},{"skilllevel":"Microsoft Excel guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352583939"},{"skilllevel":"Microsoft Excel intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927066295"}]},{"skill":"Microsoft OneNote","levels":[{"skilllevel":"Microsoft OneNote (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115305060"},{"skilllevel":"Microsoft OneNote advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n330270900"},{"skilllevel":"Microsoft OneNote beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850432041"},{"skilllevel":"Microsoft OneNote guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n31966338"},{"skilllevel":"Microsoft OneNote intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n202128694"}]},{"skill":"Microsoft PowerPoint","levels":[{"skilllevel":"Microsoft PowerPoint (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n601023829"},{"skilllevel":"Microsoft PowerPoint advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1573553938"},{"skilllevel":"Microsoft PowerPoint beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n401762512"},{"skilllevel":"Microsoft PowerPoint guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1679272387"},{"skilllevel":"Microsoft PowerPoint intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2132356262"}]},{"skill":"Microsoft Project","levels":[{"skilllevel":"Microsoft Project (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1549151088"},{"skilllevel":"Microsoft Project advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12846418"},{"skilllevel":"Microsoft Project beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1275511200"},{"skilllevel":"Microsoft Project guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n830332280"},{"skilllevel":"Microsoft Project intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n342920979"}]},{"skill":"Microsoft Windows","levels":[{"skilllevel":"Microsoft Windows (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1893090861"},{"skilllevel":"Microsoft Windows advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1492519565"},{"skilllevel":"Microsoft Windows beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1658078054"},{"skilllevel":"Microsoft Windows guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n944265434"},{"skilllevel":"Microsoft Windows intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207841270"}]},{"skill":"Microsoft Word","levels":[{"skilllevel":"Microsoft Word (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1858761653"},{"skilllevel":"Microsoft Word advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n341709716"},{"skilllevel":"Microsoft Word beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n873329460"},{"skilllevel":"Microsoft Word guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n881800927"},{"skilllevel":"Microsoft Word intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2131579087"}]},{"skill":"MySQL","levels":[{"skilllevel":"MySQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1326691645"},{"skilllevel":"MySQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1300325321"},{"skilllevel":"MySQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1107210262"},{"skilllevel":"MySQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n216062184"},{"skilllevel":"MySQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921"}]},{"skill":"Numerical Recipes","levels":[{"skilllevel":"Numerical Recipes (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607410337"},{"skilllevel":"Numerical Recipes advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n394713168"},{"skilllevel":"Numerical Recipes beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741962757"},{"skilllevel":"Numerical Recipes guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1979520237"},{"skilllevel":"Numerical Recipes intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840"}]},{"skill":"Numerical methods","levels":[{"skilllevel":"Numerical methods (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n203604722"},{"skilllevel":"Numerical methods advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1413713087"},{"skilllevel":"Numerical methods beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1343726345"},{"skilllevel":"Numerical methods guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2045720713"},{"skilllevel":"Numerical methods intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n667100965"}]},{"skill":"Object Oriented Software Engineering","levels":[{"skilllevel":"Object Oriented Software Engineering (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n420844594"},{"skilllevel":"Object Oriented Software Engineering advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n980752808"},{"skilllevel":"Object Oriented Software Engineering beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n378387660"},{"skilllevel":"Object Oriented Software Engineering guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1696704915"},{"skilllevel":"Object Oriented Software Engineering intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1704908319"}]},{"skill":"Oracle","levels":[{"skilllevel":"Oracle (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749463434"},{"skilllevel":"Oracle advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465053752"},{"skilllevel":"Oracle beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n643546038"},{"skilllevel":"Oracle guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1297217083"},{"skilllevel":"Oracle intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372628957"}]},{"skill":"Orbit / Attitude Algorithms","levels":[{"skilllevel":"Orbit / Attitude Algorithms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n364813779"},{"skilllevel":"Orbit / Attitude Algorithms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n922046728"},{"skilllevel":"Orbit / Attitude Algorithms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5427509"},{"skilllevel":"Orbit / Attitude Algorithms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198873636"},{"skilllevel":"Orbit / Attitude Algorithms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2032542125"}]},{"skill":"PHP","levels":[{"skilllevel":"PHP (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2185"},{"skilllevel":"PHP advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3970"},{"skilllevel":"PHP beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6849"},{"skilllevel":"PHP guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15074"},{"skilllevel":"PHP intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363"}]},{"skill":"Photography","levels":[{"skilllevel":"Photography (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n113250758"},{"skilllevel":"Photography advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633382078"},{"skilllevel":"Photography beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1438661270"},{"skilllevel":"Photography guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1144259820"},{"skilllevel":"Photography intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1727916947"}]},{"skill":"PostgreSQL","levels":[{"skilllevel":"PostgreSQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1764629184"},{"skilllevel":"PostgreSQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n644096346"},{"skilllevel":"PostgreSQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823456412"},{"skilllevel":"PostgreSQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952124056"},{"skilllevel":"PostgreSQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19546766"}]},{"skill":"Procurement","levels":[{"skilllevel":"Procurement (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1348665024"},{"skilllevel":"Procurement advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299218139"},{"skilllevel":"Procurement beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1484913265"},{"skilllevel":"Procurement guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793306753"},{"skilllevel":"Procurement intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229755004"}]},{"skill":"Proposal Writing","levels":[{"skilllevel":"Proposal Writing (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732438413"},{"skilllevel":"Proposal Writing advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n469342427"},{"skilllevel":"Proposal Writing beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n755932066"},{"skilllevel":"Proposal Writing guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971192723"},{"skilllevel":"Proposal Writing intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1810899944"}]},{"skill":"Python","levels":[{"skilllevel":"Python (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1518348383"},{"skilllevel":"Python (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6338"},{"skilllevel":"Python advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3965"},{"skilllevel":"Python advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n531394462"},{"skilllevel":"Python beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7283"},{"skilllevel":"Python beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313"},{"skilllevel":"Python guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n324855540"},{"skilllevel":"Python guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7173"},{"skilllevel":"Python intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424885468"},{"skilllevel":"Python intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6934"}]},{"skill":"RCS","levels":[{"skilllevel":"RCS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648456383"},{"skilllevel":"RCS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2047507411"},{"skilllevel":"RCS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1446893445"},{"skilllevel":"RCS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n908413896"},{"skilllevel":"RCS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890219573"}]},{"skill":"Relational Database Application Development","levels":[{"skilllevel":"Relational Database Application Development (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21061795"},{"skilllevel":"Relational Database Application Development advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154717227"},{"skilllevel":"Relational Database Application Development beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2099264145"},{"skilllevel":"Relational Database Application Development guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n151581269"},{"skilllevel":"Relational Database Application Development intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701203852"}]},{"skill":"Relational Database Design","levels":[{"skilllevel":"Relational Database Design (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1062976249"},{"skilllevel":"Relational Database Design advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1746324127"},{"skilllevel":"Relational Database Design beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434908470"},{"skilllevel":"Relational Database Design guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n232262040"},{"skilllevel":"Relational Database Design intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1647277519"}]},{"skill":"Ruby","levels":[{"skilllevel":"Ruby (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749583954"},{"skilllevel":"Ruby (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5026"},{"skilllevel":"Ruby advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961399363"},{"skilllevel":"Ruby advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85"},{"skilllevel":"Ruby beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1541694823"},{"skilllevel":"Ruby beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n492"},{"skilllevel":"Ruby guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562841965"},{"skilllevel":"Ruby guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3579"},{"skilllevel":"Ruby intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n123506868"},{"skilllevel":"Ruby intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3952"}]},{"skill":"SPARQL","levels":[{"skilllevel":"SPARQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n9258"},{"skilllevel":"SPARQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3207"},{"skilllevel":"SPARQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3572"},{"skilllevel":"SPARQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7213"},{"skilllevel":"SPARQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3976"}]},{"skill":"SQL","levels":[{"skilllevel":"SQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454"},{"skilllevel":"SQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565"},{"skilllevel":"SQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12007"},{"skilllevel":"SQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728"},{"skilllevel":"SQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2651"}]},{"skill":"Scala","levels":[{"skilllevel":"Scala (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513873979"},{"skilllevel":"Scala advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330698146"},{"skilllevel":"Scala beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1627743057"},{"skilllevel":"Scala guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1590998608"},{"skilllevel":"Scala intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2099386419"}]},{"skill":"Science Algorithm Development","levels":[{"skilllevel":"Science Algorithm Development (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336617474"},{"skilllevel":"Science Algorithm Development advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001"},{"skilllevel":"Science Algorithm Development beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1101287218"},{"skilllevel":"Science Algorithm Development guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n769254267"},{"skilllevel":"Science Algorithm Development intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1870781320"}]},{"skill":"SharePoint","levels":[{"skilllevel":"SharePoint (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n915511558"},{"skilllevel":"SharePoint advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n416848843"},{"skilllevel":"SharePoint beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2042036714"},{"skilllevel":"SharePoint guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n379581646"},{"skilllevel":"SharePoint intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n992690117"}]},{"skill":"Solaris","levels":[{"skilllevel":"Solaris (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525809816"},{"skilllevel":"Solaris advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1771893770"},{"skilllevel":"Solaris beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1849778210"},{"skilllevel":"Solaris guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665913127"},{"skilllevel":"Solaris intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1487833516"}]},{"skill":"Structured Query Language (SQL)","levels":[{"skilllevel":"Structured Query Language (SQL) (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198943528"},{"skilllevel":"Structured Query Language (SQL) advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2056391629"},{"skilllevel":"Structured Query Language (SQL) beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107484853"},{"skilllevel":"Structured Query Language (SQL) guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n547846283"},{"skilllevel":"Structured Query Language (SQL) intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1704091589"}]},{"skill":"Subversion","levels":[{"skilllevel":"Subversion (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1946395419"},{"skilllevel":"Subversion advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2134894538"},{"skilllevel":"Subversion beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n920242555"},{"skilllevel":"Subversion guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n324520520"},{"skilllevel":"Subversion intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330304752"}]},{"skill":"SunRays","levels":[{"skilllevel":"SunRays (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1727557509"},{"skilllevel":"SunRays advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n631403184"},{"skilllevel":"SunRays beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1346865514"},{"skilllevel":"SunRays guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1927603394"},{"skilllevel":"SunRays intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n365371672"}]},{"skill":"Sybase","levels":[{"skilllevel":"Sybase (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n467937305"},{"skilllevel":"Sybase advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1859553074"},{"skilllevel":"Sybase beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n718212954"},{"skilllevel":"Sybase guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n881771531"},{"skilllevel":"Sybase intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168524923"}]},{"skill":"TeamCity","levels":[{"skilllevel":"TeamCity (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578708216"},{"skilllevel":"TeamCity advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951208546"},{"skilllevel":"TeamCity beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052528994"},{"skilllevel":"TeamCity guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142570208"},{"skilllevel":"TeamCity intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1365886265"}]},{"skill":"UNIX","levels":[{"skilllevel":"UNIX (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4060"},{"skilllevel":"UNIX (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n444108825"},{"skilllevel":"UNIX advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15773"},{"skilllevel":"UNIX advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038"},{"skilllevel":"UNIX beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1811330000"},{"skilllevel":"UNIX beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n506"},{"skilllevel":"UNIX guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1023625925"},{"skilllevel":"UNIX guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n16192"},{"skilllevel":"UNIX intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1515330233"},{"skilllevel":"UNIX intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5925"}]},{"skill":"Unified Modeling Language (UML)","levels":[{"skilllevel":"Unified Modeling Language (UML) (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917408733"},{"skilllevel":"Unified Modeling Language (UML) advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1440990092"},{"skilllevel":"Unified Modeling Language (UML) beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1453088749"},{"skilllevel":"Unified Modeling Language (UML) guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1039162219"},{"skilllevel":"Unified Modeling Language (UML) intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1569894841"}]},{"skill":"VIVO","levels":[{"skilllevel":"VIVO (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n920844606"},{"skilllevel":"VIVO advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n690223823"},{"skilllevel":"VIVO beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n812057586"},{"skilllevel":"VIVO guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n390262573"},{"skilllevel":"VIVO intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1524740150"}]},{"skill":"Video Conferencing Equipment","levels":[{"skilllevel":"Video Conferencing Equipment (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n682118795"},{"skilllevel":"Video Conferencing Equipment advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1984479512"},{"skilllevel":"Video Conferencing Equipment beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1692483687"},{"skilllevel":"Video Conferencing Equipment guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n241032219"},{"skilllevel":"Video Conferencing Equipment intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1900691484"}]},{"skill":"Video Streaming","levels":[{"skilllevel":"Video Streaming (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n401501326"},{"skilllevel":"Video Streaming advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n813078861"},{"skilllevel":"Video Streaming beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n727958903"},{"skilllevel":"Video Streaming guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1292232260"},{"skilllevel":"Video Streaming intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n61105148"}]},{"skill":"Video recording","levels":[{"skilllevel":"Video recording (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n879539546"},{"skilllevel":"Video recording advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952735651"},{"skilllevel":"Video recording beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027647867"},{"skilllevel":"Video recording guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n668932657"},{"skilllevel":"Video recording intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657031559"}]},{"skill":"Web Certificates","levels":[{"skilllevel":"Web Certificates (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1394403846"},{"skilllevel":"Web Certificates advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1289679300"},{"skilllevel":"Web Certificates beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068955350"},{"skilllevel":"Web Certificates guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n755220436"},{"skilllevel":"Web Certificates intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1894130139"}]},{"skill":"Whole Disk Encryption","levels":[{"skilllevel":"Whole Disk Encryption (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n868532910"},{"skilllevel":"Whole Disk Encryption advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n603466448"},{"skilllevel":"Whole Disk Encryption beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1294021614"},{"skilllevel":"Whole Disk Encryption guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n827443162"},{"skilllevel":"Whole Disk Encryption intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1443446817"}]},{"skill":"Windows","levels":[{"skilllevel":"Windows (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n737689472"},{"skilllevel":"Windows advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n817410130"},{"skilllevel":"Windows beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1200655465"},{"skilllevel":"Windows guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1783661094"},{"skilllevel":"Windows intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n758853803"}]},{"skill":"Wordpress","levels":[{"skilllevel":"Wordpress (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824675433"},{"skilllevel":"Wordpress advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246712059"},{"skilllevel":"Wordpress beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2113348855"},{"skilllevel":"Wordpress guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n603445265"},{"skilllevel":"Wordpress intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1750133670"}]},{"skill":"XML","levels":[{"skilllevel":"XML (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n435809455"},{"skilllevel":"XML advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308372421"},{"skilllevel":"XML beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2010667509"},{"skilllevel":"XML guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1245379038"},{"skilllevel":"XML intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n869199825"}]},{"skill":"YourKit Java Profiler","levels":[{"skilllevel":"YourKit Java Profiler (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952946630"},{"skilllevel":"YourKit Java Profiler advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1328280097"},{"skilllevel":"YourKit Java Profiler beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2074846875"},{"skilllevel":"YourKit Java Profiler guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914368466"},{"skilllevel":"YourKit Java Profiler intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971784415"}]},{"skill":"ant","levels":[{"skilllevel":"ant (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n204347418"},{"skilllevel":"ant advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n126545019"},{"skilllevel":"ant beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1177272249"},{"skilllevel":"ant guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1785232066"},{"skilllevel":"ant intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1010880164"}]},{"skill":"bash","levels":[{"skilllevel":"bash (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n506329001"},{"skilllevel":"bash advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n973358142"},{"skilllevel":"bash beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n784818287"},{"skilllevel":"bash guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1232540464"},{"skilllevel":"bash intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n829159456"}]},{"skill":"netCDF","levels":[{"skilllevel":"netCDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1621791493"},{"skilllevel":"netCDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273549603"},{"skilllevel":"netCDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070145250"},{"skilllevel":"netCDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n194562462"},{"skilllevel":"netCDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876937350"}]},{"skill":"perl","levels":[{"skilllevel":"perl (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1064026058"},{"skilllevel":"perl advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1712511923"},{"skilllevel":"perl beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n923173688"},{"skilllevel":"perl guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n744724876"},{"skilllevel":"perl intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130"}]},{"skill":"tcsh","levels":[{"skilllevel":"tcsh (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632010458"},{"skilllevel":"tcsh advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352988386"},{"skilllevel":"tcsh beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1220194198"},{"skilllevel":"tcsh guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1001446887"},{"skilllevel":"tcsh intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n396073491"}]},{"skill":"wInsight","levels":[{"skilllevel":"wInsight (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062117007"},{"skilllevel":"wInsight advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n358560745"},{"skilllevel":"wInsight beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n239194321"},{"skilllevel":"wInsight guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1173580466"},{"skilllevel":"wInsight intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n862908734"}]},{"skill":"wikimedia","levels":[{"skilllevel":"wikimedia (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1853486041"},{"skilllevel":"wikimedia advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n876419576"},{"skilllevel":"wikimedia beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299767191"},{"skilllevel":"wikimedia guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474335554"},{"skilllevel":"wikimedia intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446453562"}]}];
      var peopleInput = [{"person":"Abdulhamid, Ramsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912875884"},{"person":"Aberle, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255311939"},{"person":"Ajello, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588676707"},{"person":"Albers, Nicole","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570151423"},{"person":"Albin, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1286655618"},{"person":"Alfaro, Ann","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512209405"},{"person":"Ali, Ashar","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n499931381"},{"person":"Allison, Gregg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490733197"},{"person":"Ames, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995808836"},{"person":"Andersson, Laila","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907618201"},{"person":"Anfinson, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2016926148"},{"person":"Annett, Graham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n63860692"},{"person":"Asmus, Heiner","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861075396"},{"person":"Avallone, Linnea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1454781079"},{"person":"Bagenal, Fran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1078482970"},{"person":"Baker, Dan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205444746"},{"person":"Baker, Kirsten","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1488098331"},{"person":"Baragiola, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7999"},{"person":"Barcilon, Cristina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2034181570"},{"person":"Barratt, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n404394851"},{"person":"Barrett, Rory","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n357449403"},{"person":"Barrett, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725"},{"person":"Barth, Charles","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1803353333"},{"person":"Batiste, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n213386065"},{"person":"Baumann, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906271444"},{"person":"Bay, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n598683891"},{"person":"Bearden, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273282227"},{"person":"Beaty, Nicholaus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n976701326"},{"person":"Beckman, Shawn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n400097966"},{"person":"Beech, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n888928290"},{"person":"Behner, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n894769667"},{"person":"Bela, Megan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91624444"},{"person":"Beland, Stephane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123"},{"person":"Belting, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513891097"},{"person":"Bershenyi, Gabe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n93921936"},{"person":"Bloch, Nikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1319050477"},{"person":"Bloom, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2082768088"},{"person":"Blum, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523754547"},{"person":"Blunck, Jeffrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382538298"},{"person":"Bode, Marc","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1798748915"},{"person":"Bolton, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540886314"},{"person":"Bonney, Donovan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507734015"},{"person":"Bonnici, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1261402531"},{"person":"Boschert, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1178406628"},{"person":"Boyle, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036313819"},{"person":"Brain, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n111928268"},{"person":"Brakebusch, Matthias","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n88429468"},{"person":"Bramer, Shelley","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n686469069"},{"person":"Braun, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n423648172"},{"person":"Brennan, Nathanial","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1928440630"},{"person":"Brian, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1880"},{"person":"Briggs, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336740030"},{"person":"Brown, Jeff","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417348364"},{"person":"Brown, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1663284208"},{"person":"Brown, S W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1400"},{"person":"Brugman, Karalee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n92857531"},{"person":"Bryant, Chelsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n867120482"},{"person":"Bryant, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n839305267"},{"person":"Bryant, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1085025965"},{"person":"Buckhannon, Linda","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1066918532"},{"person":"Bunnell, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438372251"},{"person":"Burks, Damien","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599575729"},{"person":"Burrows, J P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004"},{"person":"Burrows, Spenser","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n902811839"},{"person":"Califf, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n717941184"},{"person":"Carson, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2000525679"},{"person":"Carton, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n721510310"},{"person":"Caspi, Amir","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n562924903"},{"person":"Cassidy, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062620213"},{"person":"Castleman, Zach","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n646814721"},{"person":"Cervelli, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n707294409"},{"person":"Chaffin, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489093530"},{"person":"Chamberlin, Phillip C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n8187"},{"person":"Christofferson, Ransom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1312757559"},{"person":"Cirbo, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1429538900"},{"person":"Cirbo, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1864293332"},{"person":"Coates, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n14458"},{"person":"Coddington, Odele","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070007600"},{"person":"Cohn-Cort, Bronwen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n103589832"},{"person":"Cole, Wes","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1225522401"},{"person":"Collette, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012646325"},{"person":"Collins, Rachael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732618065"},{"person":"Costello, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127780985"},{"person":"Costner, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367854519"},{"person":"Cox, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931"},{"person":"Craft, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961894036"},{"person":"Crary, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2007987199"},{"person":"Crismani, Matteo","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1307648345"},{"person":"Crotser, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1662863303"},{"person":"Curdt, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059"},{"person":"Davis, Nina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n408500045"},{"person":"DeNeen, Mathew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n875589346"},{"person":"DeWolfe, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178"},{"person":"Deighan, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1122737005"},{"person":"Del Zanna, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2386"},{"person":"Delamere, Peter A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5649"},{"person":"Delory, G T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n275"},{"person":"Desroche, Mariel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n140"},{"person":"Devito, Elizabeth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1981168541"},{"person":"Dewey, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575426137"},{"person":"Dewoina, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2779032"},{"person":"Didkovsky, L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1108"},{"person":"Dinkel, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n613953723"},{"person":"Dischner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229679033"},{"person":"Dols, Vincent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599462975"},{"person":"Dong, Y","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15204"},{"person":"Dorey, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764"},{"person":"Dozier, Melissa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n175766494"},{"person":"Drake, Ginger","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n71958169"},{"person":"Drake, Keith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n101045317"},{"person":"Drobilek, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1277774838"},{"person":"Eaton, Zak","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n44143920"},{"person":"Eberts, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1076781062"},{"person":"Eden, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014923244"},{"person":"Egan, Andrea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115491601"},{"person":"Eldridge, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292718971"},{"person":"Elkington, Scot","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n553631097"},{"person":"Elrod, M K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2507"},{"person":"Elsborg, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911"},{"person":"Emmett, Jeremy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n279164454"},{"person":"Eparvier, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1414522112"},{"person":"Ergun, Bob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n670178106"},{"person":"Ericksen, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n523846245"},{"person":"Erickson, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n765907129"},{"person":"Eriksson, Stefan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n125517773"},{"person":"Erkaev, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n274"},{"person":"Espejo, Joey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n924628617"},{"person":"Esposito, Larry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1210903869"},{"person":"Evans, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1479837765"},{"person":"Faber, Jack","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876344817"},{"person":"Fang, Xiaohua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872761738"},{"person":"Farneth, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n939895236"},{"person":"Feickert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n173026304"},{"person":"Fenz-Trimble, Kaiti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n659278552"},{"person":"Ferrington, Nicolas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n794601920"},{"person":"Flaherty, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1395635868"},{"person":"Flemer, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987913665"},{"person":"Fleshman, Bobby","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1787"},{"person":"Fletcher, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649163029"},{"person":"Fletcher, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5034"},{"person":"Floyd, L E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2559"},{"person":"Flynn, Sierra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1536335847"},{"person":"Fontenla, J M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1740"},{"person":"Forsyth, Sasha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1013371228"},{"person":"Fowler, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n932646884"},{"person":"Fox, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2852"},{"person":"Fox, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896505121"},{"person":"French, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439300069"},{"person":"Gabbert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2111487135"},{"person":"Gagnard, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n228305227"},{"person":"Gathright, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1719236045"},{"person":"Geiger, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n953545550"},{"person":"George, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624031380"},{"person":"George, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n807406679"},{"person":"Giorgi, Ariana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n259579485"},{"person":"Goodrich, Al","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n693905437"},{"person":"Goodrich, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1323188719"},{"person":"Gosling, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1962822057"},{"person":"Graham, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4314"},{"person":"Green, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n90207282"},{"person":"Griest, Ken","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n518533566"},{"person":"Gritzmacher, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583161727"},{"person":"Groeninger, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976429543"},{"person":"Gruen, Eberhard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1822827997"},{"person":"Guneratne, Gabriella","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n371682424"},{"person":"Gurgel, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301690009"},{"person":"Gurst, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861896580"},{"person":"Guy, Carol","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1709165908"},{"person":"Hahn, Barb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n508652932"},{"person":"Hall, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502629516"},{"person":"Hand, Molly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023583009"},{"person":"Hansen, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1814290075"},{"person":"Harber, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n638067304"},{"person":"Harder, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1079014435"},{"person":"Hartnett, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512122452"},{"person":"Hartwick, Victoria","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1145663159"},{"person":"Harvey, Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1476646248"},{"person":"Haskins, Jessica","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n911013275"},{"person":"Haugen, Cheryl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n480038164"},{"person":"Haynes, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n161684617"},{"person":"Heath, Caitlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115716969"},{"person":"Henderson, M G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5693"},{"person":"Hepburn, Kelly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n672306834"},{"person":"Hess, S L G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1972"},{"person":"Heuerman, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142912025"},{"person":"Hill, T W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6642"},{"person":"Hillier, Jonathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532250141"},{"person":"Himes, Caroline","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1205373967"},{"person":"Himpsel, Carl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1576768257"},{"person":"Hodges, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n133316609"},{"person":"Holden, Nancy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995714539"},{"person":"Holler, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2009987779"},{"person":"Holmes, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851684395"},{"person":"Holsclaw, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000533497"},{"person":"Holt, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n180701835"},{"person":"Horanyi, Mihaly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1121953972"},{"person":"Hoskins, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1025386724"},{"person":"Hotard, Bonnie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027471498"},{"person":"Howes, Calvin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633595791"},{"person":"Hoxie, Vaughn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1404677880"},{"person":"Hsu, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n477177479"},{"person":"Huang, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851"},{"person":"Hubbell, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n699751717"},{"person":"Hudson, Hugh S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4790"},{"person":"Hutchison, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372190417"},{"person":"Hynek, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1628438375"},{"person":"Jacobson, Ross","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n374781680"},{"person":"Jakosky, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1313577318"},{"person":"James, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n363350498"},{"person":"Janiczek, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19700812"},{"person":"Jaynes, Allison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1147514903"},{"person":"Jeppesen, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845364011"},{"person":"Jilek, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207320044"},{"person":"Johnson, R E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4997"},{"person":"Jones, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050657630"},{"person":"Jones, G H","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6647"},{"person":"Jones, Gayle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n57504821"},{"person":"Jouchoux, Alain","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844208077"},{"person":"Judd, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2140532425"},{"person":"Judge, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3730"},{"person":"Kalnajs, Lars","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1854309916"},{"person":"Karlsson, Magnus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1544450972"},{"person":"Kaufhold, Alexandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890225154"},{"person":"Keefer, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n322281825"},{"person":"Keenan, Francis P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4089"},{"person":"Keiser, Brad","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738"},{"person":"Kelley, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352320643"},{"person":"Kempf, Sascha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1611913402"},{"person":"Kern, Josh","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653826283"},{"person":"Kien, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453839589"},{"person":"Kindel, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1069407984"},{"person":"King, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649468078"},{"person":"King, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2130392723"},{"person":"Kingsley, Roberto","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229480056"},{"person":"Kittredge, Camden","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460254225"},{"person":"Klapetzky, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906366491"},{"person":"Knapp, Barry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270"},{"person":"Knappmiller, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446589790"},{"person":"Knehans, Edith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2043547795"},{"person":"Kohnert, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438416807"},{"person":"Kohnert, Rick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1029083323"},{"person":"Kokkonen, Kim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665577609"},{"person":"Kominek, Jay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936621824"},{"person":"Kopp, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068179785"},{"person":"Koski, Kraig","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912001963"},{"person":"Kosovichev, A G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031"},{"person":"Kowalski, Adam F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2522"},{"person":"Kowalski, Elise","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1295294388"},{"person":"Krahe, Margaux","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1353991561"},{"person":"Kreisher, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n612686962"},{"person":"Kren, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857081541"},{"person":"Krivova, N A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4043"},{"person":"Krodinger, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n948112081"},{"person":"Kurth, W S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3385"},{"person":"LaClair, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907464116"},{"person":"Labrosse, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5614"},{"person":"Lace, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3812"},{"person":"Lafferty, Gina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1241916224"},{"person":"Lalonde, Jean-Francois","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159233084"},{"person":"Lamprecht, Bret","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n739599306"},{"person":"Lankton, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1043347675"},{"person":"Larsen, Dane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513048464"},{"person":"Larsen, Kristopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1306378180"},{"person":"Larson, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428163578"},{"person":"Laumbach, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1944328695"},{"person":"Law, Mariah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1209408315"},{"person":"Lawrence, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1315804720"},{"person":"LeBlanc, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907419030"},{"person":"Lean, Judith L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6638"},{"person":"Lemaire, P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4371"},{"person":"Letourneau, Hannah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n442363424"},{"person":"Lewis, G R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2118"},{"person":"Lewis, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n472262787"},{"person":"Li, Xinlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n293691365"},{"person":"Lin, R P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4577"},{"person":"Linden, Keita","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1889784291"},{"person":"Lindholm, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741489759"},{"person":"Lindholm, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1790175656"},{"person":"Liner, Samantha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1112572230"},{"person":"Livingston, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7810"},{"person":"Loche, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4559796"},{"person":"Longo, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n253562955"},{"person":"Lord, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1340836925"},{"person":"Lothringer, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1238347136"},{"person":"Luebke, Anna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657335496"},{"person":"Lykke, K R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3229"},{"person":"Ma, Huikang","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n557026557"},{"person":"MacKinnon, A L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3603"},{"person":"Mackison, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434366058"},{"person":"Madhusudhanan, Prasanna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050483258"},{"person":"Malaspina, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n290898740"},{"person":"Maloney, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n146565298"},{"person":"Marcucci, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1318083343"},{"person":"Marcus, Holly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n522816235"},{"person":"Martin, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n457505183"},{"person":"Mason, Carolyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1092945436"},{"person":"Mason, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n132879659"},{"person":"Mason, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1653020773"},{"person":"Masters, A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701"},{"person":"Mathioudaki, Mihalis","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2823"},{"person":"May, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540607559"},{"person":"McBride, K M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6234"},{"person":"McCabe, Deb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1966385563"},{"person":"McCandless, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801066637"},{"person":"McClintock, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n571959716"},{"person":"McCollom, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159259470"},{"person":"McEnulty, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1071261447"},{"person":"McGilvray, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n177902987"},{"person":"McGouldrick, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n418611095"},{"person":"McGrath, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85999019"},{"person":"McNeil, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1528282796"},{"person":"McTague, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1345402132"},{"person":"Mcgill, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1967605763"},{"person":"Mclaughlin, Pattilyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753508281"},{"person":"Meisner, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n544141382"},{"person":"Merkel, Aimee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n406773472"},{"person":"Merkow, Mat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530345758"},{"person":"Methlie, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2147322495"},{"person":"Mewaldt, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1417"},{"person":"Migliorini, Lucas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n634891605"},{"person":"Miller, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n715993936"},{"person":"Miller, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n558713751"},{"person":"Milligan, Ryan O","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6412"},{"person":"Min, Clifford","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1820576034"},{"person":"Mitchell, D G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1186"},{"person":"Mitchell, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1215748306"},{"person":"Moffatt, Jerel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330004299"},{"person":"Molaverdikhani, Karan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127503713"},{"person":"Monk, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857867638"},{"person":"Moore, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1267979694"},{"person":"Moreira Hooks, Joao","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n346540776"},{"person":"Motz, Brent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2124160943"},{"person":"Motz, Brooklyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927000766"},{"person":"Mueller, Steven","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013"},{"person":"Murphy, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1688610058"},{"person":"Myers, Casey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1263641634"},{"person":"Nammari, Aref","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n936762217"},{"person":"Nastaj, Debra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782073425"},{"person":"Negus, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n964782842"},{"person":"Newcomb, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21578080"},{"person":"Newgord, Alexia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n695552564"},{"person":"Nuding, Danielle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648108589"},{"person":"O'Connor, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1139384165"},{"person":"O'Malia, Kasandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308336345"},{"person":"O'brien, Leela","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5234329"},{"person":"Ogden, Tammie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583658483"},{"person":"Ortiz, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896094121"},{"person":"Osborne, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1582851040"},{"person":"Osborne, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801786743"},{"person":"Osterloo, Mikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424673248"},{"person":"Otzinger, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1255830498"},{"person":"Pachhai, Kiran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255283506"},{"person":"Packard, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299646442"},{"person":"Padgett, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1393218320"},{"person":"Pagaran, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3697"},{"person":"Pankratz, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966"},{"person":"Panneton, Russell","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578196712"},{"person":"Papa, Joseph","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1354973592"},{"person":"Parenteau, Scarlet","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1659685056"},{"person":"Parsons, Kaitlyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1347690092"},{"person":"Passe, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1234648683"},{"person":"Patton, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1685525735"},{"person":"Peck, Courtney","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301530484"},{"person":"Peck, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489001940"},{"person":"Perish, Norm","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1700784405"},{"person":"Persoon, A M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5493"},{"person":"Peterson, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n764015052"},{"person":"Pettit, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n35200622"},{"person":"Pilewskie, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310179206"},{"person":"Pilewskie, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n731850291"},{"person":"Pilinski, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1631975500"},{"person":"Piquette, Marcus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1844883463"},{"person":"Plesha, Rachel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1228806873"},{"person":"Pontias Jr., D W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3564"},{"person":"Popescu, Radu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704"},{"person":"Possel, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019699773"},{"person":"Pranger, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526450392"},{"person":"Pryor, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1521316899"},{"person":"Puckett, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n728097612"},{"person":"Pyke, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n295572919"},{"person":"Ramas, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183"},{"person":"Randall, Cora","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n109031017"},{"person":"Randall, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n768867105"},{"person":"Ranquist, Drake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1154848063"},{"person":"Rasca, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607749756"},{"person":"Rast, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n760843983"},{"person":"Ray, L C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5341"},{"person":"Redick, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2080295530"},{"person":"Redick, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1133614131"},{"person":"Reed, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1635945598"},{"person":"Reed, Krista","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n877068749"},{"person":"Reedy, Lee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1817223813"},{"person":"Reese, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1866062337"},{"person":"Rehnberg, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1559998858"},{"person":"Reiter, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753914660"},{"person":"Renfrow, Stephanie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796849613"},{"person":"Reukauf, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n276714883"},{"person":"Richard, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3595"},{"person":"Richard, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1655982245"},{"person":"Richards, P G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801"},{"person":"Rider, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1501051647"},{"person":"Riesberg, Lon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057"},{"person":"Ringrose, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n69165236"},{"person":"Robbins, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1250170131"},{"person":"Robbins, Stuart","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n559833574"},{"person":"Rogers, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107685763"},{"person":"Rosenshein, Miriam","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1953572127"},{"person":"Rottman, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1708643326"},{"person":"Roughton, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491"},{"person":"Rusch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n970911879"},{"person":"Ruske, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n62569024"},{"person":"Rutkowski, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n412512658"},{"person":"Ryan, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1188565226"},{"person":"Sainsbury, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1293656385"},{"person":"Salcido, Crystal","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490162473"},{"person":"Samaripa, Byron","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1993740978"},{"person":"Sand, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428876202"},{"person":"Sarris, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1264895617"},{"person":"Sawyer, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2115528787"},{"person":"Schelz, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n340499533"},{"person":"Schiller, Quintin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052186645"},{"person":"Schloesser, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000340179"},{"person":"Schmidt, Sebastian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330547662"},{"person":"Schmutz, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3012"},{"person":"Schneider, Nick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917838557"},{"person":"Schrijver, C J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2311"},{"person":"Schuehle, U","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100"},{"person":"Seidel, Durbin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1617731339"},{"person":"Sheiko, Nathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624617909"},{"person":"Shu, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2081552666"},{"person":"Sicken, Patti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1507994595"},{"person":"Siler, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823187793"},{"person":"Simmons, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n810031199"},{"person":"Simons-Brown, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159306400"},{"person":"Sims, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526911137"},{"person":"Sittler, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367"},{"person":"Slipski, Marek","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850769182"},{"person":"Smith, Dona","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n256748745"},{"person":"Smith, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513997220"},{"person":"Smith, Jamison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1146627975"},{"person":"Smith, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523165414"},{"person":"Smith, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n658738358"},{"person":"Snow, Jake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588964680"},{"person":"Snow, Marty","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n429119084"},{"person":"Solanki, S K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7362"},{"person":"Solomon, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n383047709"},{"person":"Song, Shi","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1483702429"},{"person":"Soto Hoffmann, Patricia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1971283737"},{"person":"Soukhovei, Vladislav","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1373936880"},{"person":"Sparhawk, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648087653"},{"person":"Sparn, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428120649"},{"person":"Spivey, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2053763554"},{"person":"Springfield, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n713855563"},{"person":"Spurgeon, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014728592"},{"person":"Sremcevic, Miodrag","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n484618802"},{"person":"Stawarz, Julia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n78726096"},{"person":"Stearns, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1089353141"},{"person":"Steffl, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6059"},{"person":"Steg, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1580269363"},{"person":"Sternovsky, Zoltan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465061973"},{"person":"Stewart, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474554423"},{"person":"Stewart, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1314757256"},{"person":"Stewart, Ian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1672736625"},{"person":"Stimpfling, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n490092760"},{"person":"Stone, Jordan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382272449"},{"person":"Street, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205732767"},{"person":"Sturner, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n975471748"},{"person":"Su, Y J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7203"},{"person":"Summers, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115343616"},{"person":"Swieter, Dwayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1192815390"},{"person":"Szalay, Jamey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916260001"},{"person":"Tate, Gail","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n268766314"},{"person":"Taylor, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n716030637"},{"person":"Taylor, Trent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507926942"},{"person":"Templeman, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053"},{"person":"Theiling, Dale","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523846463"},{"person":"Thiede, Jon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n107799568"},{"person":"Thiemann, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070599412"},{"person":"Thomas, Evan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1113966394"},{"person":"Thomas, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n320506707"},{"person":"Thompson, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485924204"},{"person":"Thomsen, M F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3367"},{"person":"Thuillier, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1553"},{"person":"Tighe, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1537989152"},{"person":"Tilevitz, Chana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705385187"},{"person":"Tokar, R L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7508"},{"person":"Tolea, Alin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n884210681"},{"person":"Toon, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845246448"},{"person":"Traver, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712"},{"person":"Triplett, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1386835492"},{"person":"Troxel, Kathy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242954374"},{"person":"Tseng, W L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6708"},{"person":"Tucker, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1007186618"},{"person":"Ucker, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971611210"},{"person":"Unruh, Y C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2086"},{"person":"Valentine, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753432826"},{"person":"Van Orden, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n183811506"},{"person":"Vanderburgh, Abraham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281302864"},{"person":"Vanier, Blake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n585326394"},{"person":"Vermeer, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n566962202"},{"person":"Vertovec, Audrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914550976"},{"person":"Vial, J C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7086"},{"person":"Villabona, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1116996073"},{"person":"Vincent, Tracy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1191377000"},{"person":"Wade, Stacy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1473474892"},{"person":"Wahlund, J E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4697"},{"person":"Wanamaker, Isaac","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799142869"},{"person":"Wang, Xu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443866291"},{"person":"Weber, M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5279"},{"person":"Wehner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1397764181"},{"person":"Welch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115139280"},{"person":"Werdel, Brandon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653143342"},{"person":"Wescott, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n798247984"},{"person":"Westfall, Jim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987838283"},{"person":"White, Neil","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1283020055"},{"person":"White, Oran R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3911"},{"person":"Whitman, Dylan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1640855746"},{"person":"Wieman, S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3791"},{"person":"Wiesman, Brett","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n852217263"},{"person":"Wilder, Frederick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n754212791"},{"person":"Williams, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310654820"},{"person":"Williams, Forrest","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575366074"},{"person":"Williamson, Eleanor","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1118370667"},{"person":"Wilson, Anne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1869681270"},{"person":"Wilson, Rob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n220165430"},{"person":"Wise, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n691938741"},{"person":"Withnell, Pete","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1298706407"},{"person":"Wolf, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n221861851"},{"person":"Wood, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1184521804"},{"person":"Woodraska, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n626213350"},{"person":"Woods, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031294282"},{"person":"Worel, Shana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n804667043"},{"person":"Wright, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532824368"},{"person":"Wright, Logan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1342215268"},{"person":"Wrigley, Ray","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1585441073"},{"person":"Wullschleger, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n325914072"},{"person":"Yaptengco, Jonnie Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n850764044"},{"person":"Yau, A W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3676"},{"person":"Yehle, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2096276531"},{"person":"Yoo, Kenny","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845055650"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3668"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5764"},{"person":"Young, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912403582"},{"person":"Yu, Pengfei","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n362772828"},{"person":"Zhao, Hong","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1496019964"},{"person":"Zhu, Yunqian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936941023"},{"person":"Ziegler, Stephen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815934722"},{"person":"Zucker, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562915827"},{"person":"deFalco, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168824921"}];
      var expectedPagedSkills = [[{"skill":"AMCharts","levels":[{"skilllevel":"AMCharts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439479224"},{"skilllevel":"AMCharts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2088524822"},{"skilllevel":"AMCharts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1269075514"},{"skilllevel":"AMCharts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1117711741"},{"skilllevel":"AMCharts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115838072"}]},{"skill":"Adobe Forms","levels":[{"skilllevel":"Adobe Forms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1143045369"},{"skilllevel":"Adobe Forms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n28344951"},{"skilllevel":"Adobe Forms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1934609946"},{"skilllevel":"Adobe Forms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799459865"},{"skilllevel":"Adobe Forms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n981057267"}]},{"skill":"Angular","levels":[{"skilllevel":"Angular (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1135254945"},{"skilllevel":"Angular advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1836477458"},{"skilllevel":"Angular beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n994473475"},{"skilllevel":"Angular guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1671030649"},{"skilllevel":"Angular intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2122206999"}]},{"skill":"Astronomical Algorithms","levels":[{"skilllevel":"Astronomical Algorithms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1795663283"},{"skilllevel":"Astronomical Algorithms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1398263944"},{"skilllevel":"Astronomical Algorithms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n637392457"},{"skilllevel":"Astronomical Algorithms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n843890716"},{"skilllevel":"Astronomical Algorithms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1762201346"}]},{"skill":"Audio Recording","levels":[{"skilllevel":"Audio Recording (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850885710"},{"skilllevel":"Audio Recording advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n390887168"},{"skilllevel":"Audio Recording beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1619045870"},{"skilllevel":"Audio Recording guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n22386644"},{"skilllevel":"Audio Recording intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530821507"}]},{"skill":"C","levels":[{"skilllevel":"C (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793602038"},{"skilllevel":"C advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1026055000"},{"skilllevel":"C beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2116726559"},{"skilllevel":"C guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1337968289"},{"skilllevel":"C intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n591116589"}]},{"skill":"C Shell","levels":[{"skilllevel":"C Shell (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n960721007"},{"skilllevel":"C Shell advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n225932203"},{"skilllevel":"C Shell beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n18978706"},{"skilllevel":"C Shell guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2046173907"},{"skilllevel":"C Shell intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185"}]},{"skill":"C++","levels":[{"skilllevel":"C++ (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2001992658"},{"skilllevel":"C++ advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n906704525"},{"skilllevel":"C++ beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n455885633"},{"skilllevel":"C++ guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n370638602"},{"skilllevel":"C++ intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632168803"}]},{"skill":"CDF","levels":[{"skilllevel":"CDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n887666611"},{"skilllevel":"CDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n495602294"},{"skilllevel":"CDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n445798236"},{"skilllevel":"CDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1999962869"},{"skilllevel":"CDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n468207266"}]},{"skill":"CSTOL","levels":[{"skilllevel":"CSTOL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n580119452"},{"skilllevel":"CSTOL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n377484763"},{"skilllevel":"CSTOL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n647556400"},{"skilllevel":"CSTOL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n645781042"},{"skilllevel":"CSTOL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815630262"}]},{"skill":"CVS","levels":[{"skilllevel":"CVS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n777645831"},{"skilllevel":"CVS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n874325827"},{"skilllevel":"CVS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91451367"},{"skilllevel":"CVS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n301452772"},{"skilllevel":"CVS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844881810"}]},{"skill":"Confluence","levels":[{"skilllevel":"Confluence (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n169192069"},{"skilllevel":"Confluence advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1681131761"},{"skilllevel":"Confluence beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1601745543"},{"skilllevel":"Confluence guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1994142933"},{"skilllevel":"Confluence intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n664178855"}]},{"skill":"Contracts","levels":[{"skilllevel":"Contracts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059460543"},{"skilllevel":"Contracts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n319092444"},{"skilllevel":"Contracts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003402286"},{"skilllevel":"Contracts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530927661"},{"skilllevel":"Contracts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1556206671"}]},{"skill":"DNS - Domain Name Service","levels":[{"skilllevel":"DNS - Domain Name Service (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019188668"},{"skilllevel":"DNS - Domain Name Service advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1606242612"},{"skilllevel":"DNS - Domain Name Service beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n487555171"},{"skilllevel":"DNS - Domain Name Service guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1591325689"},{"skilllevel":"DNS - Domain Name Service intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1183992693"}]},{"skill":"Deltek COBRA","levels":[{"skilllevel":"Deltek COBRA (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1060861762"},{"skilllevel":"Deltek COBRA advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1289942474"},{"skilllevel":"Deltek COBRA beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1737266517"},{"skilllevel":"Deltek COBRA guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n683068403"},{"skilllevel":"Deltek COBRA intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996134548"}]}],[{"skill":"DreamWeaver","levels":[{"skilllevel":"DreamWeaver (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513352046"},{"skilllevel":"DreamWeaver advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1203072807"},{"skilllevel":"DreamWeaver beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1074476742"},{"skilllevel":"DreamWeaver guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n327939122"},{"skilllevel":"DreamWeaver intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417437827"}]},{"skill":"Dygraphs","levels":[{"skilllevel":"Dygraphs (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n859963165"},{"skilllevel":"Dygraphs advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1568905926"},{"skilllevel":"Dygraphs beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996489377"},{"skilllevel":"Dygraphs guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n904901577"},{"skilllevel":"Dygraphs intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023679351"}]},{"skill":"ENVI","levels":[{"skilllevel":"ENVI (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705633567"},{"skilllevel":"ENVI advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791169703"},{"skilllevel":"ENVI beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460110611"},{"skilllevel":"ENVI guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1933582934"},{"skilllevel":"ENVI intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1730570217"}]},{"skill":"FORTRAN","levels":[{"skilllevel":"FORTRAN (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1636482519"},{"skilllevel":"FORTRAN advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1694332440"},{"skilllevel":"FORTRAN beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443098442"},{"skilllevel":"FORTRAN guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796173201"},{"skilllevel":"FORTRAN intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199"}]},{"skill":"Fisheye/Crucible","levels":[{"skilllevel":"Fisheye/Crucible (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n545321976"},{"skilllevel":"Fisheye/Crucible advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1649778122"},{"skilllevel":"Fisheye/Crucible beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n481615982"},{"skilllevel":"Fisheye/Crucible guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1773876386"},{"skilllevel":"Fisheye/Crucible intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1836921231"}]},{"skill":"Flash","levels":[{"skilllevel":"Flash (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100403272"},{"skilllevel":"Flash advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1910328820"},{"skilllevel":"Flash beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1722358499"},{"skilllevel":"Flash guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n830992144"},{"skilllevel":"Flash intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1452874899"}]},{"skill":"Google Forms","levels":[{"skilllevel":"Google Forms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n296568149"},{"skilllevel":"Google Forms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187816219"},{"skilllevel":"Google Forms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n586712661"},{"skilllevel":"Google Forms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1792037604"},{"skilllevel":"Google Forms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485541935"}]},{"skill":"Grants","levels":[{"skilllevel":"Grants (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1706539070"},{"skilllevel":"Grants advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n502212599"},{"skilllevel":"Grants beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1591706475"},{"skilllevel":"Grants guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1747849534"},{"skilllevel":"Grants intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n473101934"}]},{"skill":"Graphical User Interface (GUI) design","levels":[{"skilllevel":"Graphical User Interface (GUI) design (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n440619623"},{"skilllevel":"Graphical User Interface (GUI) design advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1846193957"},{"skilllevel":"Graphical User Interface (GUI) design beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n969597673"},{"skilllevel":"Graphical User Interface (GUI) design guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n470903593"},{"skilllevel":"Graphical User Interface (GUI) design intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824061673"}]},{"skill":"Greenhopper","levels":[{"skilllevel":"Greenhopper (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n674121804"},{"skilllevel":"Greenhopper advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1458590281"},{"skilllevel":"Greenhopper beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n743299727"},{"skilllevel":"Greenhopper guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n33149245"},{"skilllevel":"Greenhopper intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1621503107"}]},{"skill":"HDF","levels":[{"skilllevel":"HDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525201002"},{"skilllevel":"HDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n561508048"},{"skilllevel":"HDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446544932"},{"skilllevel":"HDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n642895041"},{"skilllevel":"HDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n181977816"}]},{"skill":"HTML5","levels":[{"skilllevel":"HTML5 (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n738198172"},{"skilllevel":"HTML5 advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1182983491"},{"skilllevel":"HTML5 beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782921057"},{"skilllevel":"HTML5 guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n286927675"},{"skilllevel":"HTML5 intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2144932849"}]},{"skill":"HighCharts","levels":[{"skilllevel":"HighCharts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003879660"},{"skilllevel":"HighCharts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n528825677"},{"skilllevel":"HighCharts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n514540812"},{"skilllevel":"HighCharts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n348862312"},{"skilllevel":"HighCharts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976111064"}]},{"skill":"Hudson / Jenkins","levels":[{"skilllevel":"Hudson / Jenkins (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1737437541"},{"skilllevel":"Hudson / Jenkins advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n552016427"},{"skilllevel":"Hudson / Jenkins beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242391364"},{"skilllevel":"Hudson / Jenkins guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1784251736"},{"skilllevel":"Hudson / Jenkins intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2041232720"}]},{"skill":"IDL","levels":[{"skilllevel":"IDL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1087137639"},{"skilllevel":"IDL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536"},{"skilllevel":"IDL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738"},{"skilllevel":"IDL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1101836142"},{"skilllevel":"IDL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187718791"}]}],[{"skill":"JIRA","levels":[{"skilllevel":"JIRA (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n315190482"},{"skilllevel":"JIRA advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n34465221"},{"skilllevel":"JIRA beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004191433"},{"skilllevel":"JIRA guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1080774604"},{"skilllevel":"JIRA intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1149926731"}]},{"skill":"Java","levels":[{"skilllevel":"Java (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n250976479"},{"skilllevel":"Java (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477"},{"skilllevel":"Java advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1074486432"},{"skilllevel":"Java advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1613"},{"skilllevel":"Java beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n323417929"},{"skilllevel":"Java beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091"},{"skilllevel":"Java guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2416"},{"skilllevel":"Java guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246415042"},{"skilllevel":"Java intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570471527"},{"skilllevel":"Java intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5409"}]},{"skill":"Javascript","levels":[{"skilllevel":"Javascript (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749531629"},{"skilllevel":"Javascript advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n121234857"},{"skilllevel":"Javascript beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2069783663"},{"skilllevel":"Javascript guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n421925993"},{"skilllevel":"Javascript intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611"}]},{"skill":"Klocwork Insight","levels":[{"skilllevel":"Klocwork Insight (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1812336606"},{"skilllevel":"Klocwork Insight advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1606046839"},{"skilllevel":"Klocwork Insight beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1327292223"},{"skilllevel":"Klocwork Insight guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n130720797"},{"skilllevel":"Klocwork Insight intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1127207099"}]},{"skill":"LAPIS","levels":[{"skilllevel":"LAPIS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502183070"},{"skilllevel":"LAPIS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1363606303"},{"skilllevel":"LAPIS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n910650024"},{"skilllevel":"LAPIS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n963358014"},{"skilllevel":"LAPIS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n210389538"}]},{"skill":"LabView","levels":[{"skilllevel":"LabView (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872560217"},{"skilllevel":"LabView advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1734042133"},{"skilllevel":"LabView beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n958593504"},{"skilllevel":"LabView guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012557516"},{"skilllevel":"LabView intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1729689433"}]},{"skill":"Least Squares Fitting","levels":[{"skilllevel":"Least Squares Fitting (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1806846241"},{"skilllevel":"Least Squares Fitting advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154172632"},{"skilllevel":"Least Squares Fitting beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n848923856"},{"skilllevel":"Least Squares Fitting guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453811035"},{"skilllevel":"Least Squares Fitting intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n563249855"}]},{"skill":"Linux","levels":[{"skilllevel":"Linux (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1003796096"},{"skilllevel":"Linux advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2100386976"},{"skilllevel":"Linux beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n102309501"},{"skilllevel":"Linux guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1574739549"},{"skilllevel":"Linux intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087"}]},{"skill":"MacOS","levels":[{"skilllevel":"MacOS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n257741671"},{"skilllevel":"MacOS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036406957"},{"skilllevel":"MacOS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1094760625"},{"skilllevel":"MacOS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1086823868"},{"skilllevel":"MacOS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845544070"}]},{"skill":"Matlab","levels":[{"skilllevel":"Matlab (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1574568149"},{"skilllevel":"Matlab advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916250560"},{"skilllevel":"Matlab beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n982331912"},{"skilllevel":"Matlab guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n234619747"},{"skilllevel":"Matlab intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n387374551"}]},{"skill":"Metastorm","levels":[{"skilllevel":"Metastorm (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1561677047"},{"skilllevel":"Metastorm advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n377306649"},{"skilllevel":"Metastorm beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n726056373"},{"skilllevel":"Metastorm guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n270444721"},{"skilllevel":"Metastorm intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1834976109"}]},{"skill":"Microsoft Excel","levels":[{"skilllevel":"Microsoft Excel (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728291009"},{"skilllevel":"Microsoft Excel advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n549514676"},{"skilllevel":"Microsoft Excel beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2038895378"},{"skilllevel":"Microsoft Excel guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352583939"},{"skilllevel":"Microsoft Excel intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927066295"}]},{"skill":"Microsoft OneNote","levels":[{"skilllevel":"Microsoft OneNote (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115305060"},{"skilllevel":"Microsoft OneNote advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n330270900"},{"skilllevel":"Microsoft OneNote beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850432041"},{"skilllevel":"Microsoft OneNote guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n31966338"},{"skilllevel":"Microsoft OneNote intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n202128694"}]},{"skill":"Microsoft PowerPoint","levels":[{"skilllevel":"Microsoft PowerPoint (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n601023829"},{"skilllevel":"Microsoft PowerPoint advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1573553938"},{"skilllevel":"Microsoft PowerPoint beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n401762512"},{"skilllevel":"Microsoft PowerPoint guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1679272387"},{"skilllevel":"Microsoft PowerPoint intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2132356262"}]},{"skill":"Microsoft Project","levels":[{"skilllevel":"Microsoft Project (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1549151088"},{"skilllevel":"Microsoft Project advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12846418"},{"skilllevel":"Microsoft Project beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1275511200"},{"skilllevel":"Microsoft Project guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n830332280"},{"skilllevel":"Microsoft Project intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n342920979"}]}],[{"skill":"Microsoft Windows","levels":[{"skilllevel":"Microsoft Windows (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1893090861"},{"skilllevel":"Microsoft Windows advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1492519565"},{"skilllevel":"Microsoft Windows beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1658078054"},{"skilllevel":"Microsoft Windows guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n944265434"},{"skilllevel":"Microsoft Windows intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207841270"}]},{"skill":"Microsoft Word","levels":[{"skilllevel":"Microsoft Word (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1858761653"},{"skilllevel":"Microsoft Word advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n341709716"},{"skilllevel":"Microsoft Word beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n873329460"},{"skilllevel":"Microsoft Word guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n881800927"},{"skilllevel":"Microsoft Word intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2131579087"}]},{"skill":"MySQL","levels":[{"skilllevel":"MySQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1326691645"},{"skilllevel":"MySQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1300325321"},{"skilllevel":"MySQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1107210262"},{"skilllevel":"MySQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n216062184"},{"skilllevel":"MySQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921"}]},{"skill":"Numerical Recipes","levels":[{"skilllevel":"Numerical Recipes (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607410337"},{"skilllevel":"Numerical Recipes advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n394713168"},{"skilllevel":"Numerical Recipes beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741962757"},{"skilllevel":"Numerical Recipes guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1979520237"},{"skilllevel":"Numerical Recipes intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840"}]},{"skill":"Numerical methods","levels":[{"skilllevel":"Numerical methods (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n203604722"},{"skilllevel":"Numerical methods advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1413713087"},{"skilllevel":"Numerical methods beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1343726345"},{"skilllevel":"Numerical methods guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2045720713"},{"skilllevel":"Numerical methods intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n667100965"}]},{"skill":"Object Oriented Software Engineering","levels":[{"skilllevel":"Object Oriented Software Engineering (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n420844594"},{"skilllevel":"Object Oriented Software Engineering advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n980752808"},{"skilllevel":"Object Oriented Software Engineering beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n378387660"},{"skilllevel":"Object Oriented Software Engineering guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1696704915"},{"skilllevel":"Object Oriented Software Engineering intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1704908319"}]},{"skill":"Oracle","levels":[{"skilllevel":"Oracle (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749463434"},{"skilllevel":"Oracle advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465053752"},{"skilllevel":"Oracle beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n643546038"},{"skilllevel":"Oracle guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1297217083"},{"skilllevel":"Oracle intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372628957"}]},{"skill":"Orbit / Attitude Algorithms","levels":[{"skilllevel":"Orbit / Attitude Algorithms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n364813779"},{"skilllevel":"Orbit / Attitude Algorithms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n922046728"},{"skilllevel":"Orbit / Attitude Algorithms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5427509"},{"skilllevel":"Orbit / Attitude Algorithms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198873636"},{"skilllevel":"Orbit / Attitude Algorithms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2032542125"}]},{"skill":"PHP","levels":[{"skilllevel":"PHP (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2185"},{"skilllevel":"PHP advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3970"},{"skilllevel":"PHP beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6849"},{"skilllevel":"PHP guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15074"},{"skilllevel":"PHP intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363"}]},{"skill":"Photography","levels":[{"skilllevel":"Photography (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n113250758"},{"skilllevel":"Photography advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633382078"},{"skilllevel":"Photography beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1438661270"},{"skilllevel":"Photography guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1144259820"},{"skilllevel":"Photography intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1727916947"}]},{"skill":"PostgreSQL","levels":[{"skilllevel":"PostgreSQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1764629184"},{"skilllevel":"PostgreSQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n644096346"},{"skilllevel":"PostgreSQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823456412"},{"skilllevel":"PostgreSQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952124056"},{"skilllevel":"PostgreSQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19546766"}]},{"skill":"Procurement","levels":[{"skilllevel":"Procurement (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1348665024"},{"skilllevel":"Procurement advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299218139"},{"skilllevel":"Procurement beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1484913265"},{"skilllevel":"Procurement guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793306753"},{"skilllevel":"Procurement intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229755004"}]},{"skill":"Proposal Writing","levels":[{"skilllevel":"Proposal Writing (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732438413"},{"skilllevel":"Proposal Writing advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n469342427"},{"skilllevel":"Proposal Writing beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n755932066"},{"skilllevel":"Proposal Writing guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971192723"},{"skilllevel":"Proposal Writing intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1810899944"}]},{"skill":"Python","levels":[{"skilllevel":"Python (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1518348383"},{"skilllevel":"Python (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6338"},{"skilllevel":"Python advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3965"},{"skilllevel":"Python advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n531394462"},{"skilllevel":"Python beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7283"},{"skilllevel":"Python beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313"},{"skilllevel":"Python guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n324855540"},{"skilllevel":"Python guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7173"},{"skilllevel":"Python intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424885468"},{"skilllevel":"Python intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6934"}]},{"skill":"RCS","levels":[{"skilllevel":"RCS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648456383"},{"skilllevel":"RCS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2047507411"},{"skilllevel":"RCS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1446893445"},{"skilllevel":"RCS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n908413896"},{"skilllevel":"RCS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890219573"}]}],[{"skill":"Relational Database Application Development","levels":[{"skilllevel":"Relational Database Application Development (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21061795"},{"skilllevel":"Relational Database Application Development advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154717227"},{"skilllevel":"Relational Database Application Development beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2099264145"},{"skilllevel":"Relational Database Application Development guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n151581269"},{"skilllevel":"Relational Database Application Development intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701203852"}]},{"skill":"Relational Database Design","levels":[{"skilllevel":"Relational Database Design (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1062976249"},{"skilllevel":"Relational Database Design advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1746324127"},{"skilllevel":"Relational Database Design beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434908470"},{"skilllevel":"Relational Database Design guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n232262040"},{"skilllevel":"Relational Database Design intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1647277519"}]},{"skill":"Ruby","levels":[{"skilllevel":"Ruby (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749583954"},{"skilllevel":"Ruby (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5026"},{"skilllevel":"Ruby advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961399363"},{"skilllevel":"Ruby advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85"},{"skilllevel":"Ruby beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1541694823"},{"skilllevel":"Ruby beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n492"},{"skilllevel":"Ruby guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562841965"},{"skilllevel":"Ruby guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3579"},{"skilllevel":"Ruby intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n123506868"},{"skilllevel":"Ruby intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3952"}]},{"skill":"SPARQL","levels":[{"skilllevel":"SPARQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n9258"},{"skilllevel":"SPARQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3207"},{"skilllevel":"SPARQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3572"},{"skilllevel":"SPARQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7213"},{"skilllevel":"SPARQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3976"}]},{"skill":"SQL","levels":[{"skilllevel":"SQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454"},{"skilllevel":"SQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565"},{"skilllevel":"SQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12007"},{"skilllevel":"SQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728"},{"skilllevel":"SQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2651"}]},{"skill":"Scala","levels":[{"skilllevel":"Scala (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513873979"},{"skilllevel":"Scala advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330698146"},{"skilllevel":"Scala beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1627743057"},{"skilllevel":"Scala guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1590998608"},{"skilllevel":"Scala intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2099386419"}]},{"skill":"Science Algorithm Development","levels":[{"skilllevel":"Science Algorithm Development (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336617474"},{"skilllevel":"Science Algorithm Development advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001"},{"skilllevel":"Science Algorithm Development beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1101287218"},{"skilllevel":"Science Algorithm Development guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n769254267"},{"skilllevel":"Science Algorithm Development intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1870781320"}]},{"skill":"SharePoint","levels":[{"skilllevel":"SharePoint (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n915511558"},{"skilllevel":"SharePoint advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n416848843"},{"skilllevel":"SharePoint beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2042036714"},{"skilllevel":"SharePoint guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n379581646"},{"skilllevel":"SharePoint intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n992690117"}]},{"skill":"Solaris","levels":[{"skilllevel":"Solaris (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525809816"},{"skilllevel":"Solaris advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1771893770"},{"skilllevel":"Solaris beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1849778210"},{"skilllevel":"Solaris guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665913127"},{"skilllevel":"Solaris intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1487833516"}]},{"skill":"Structured Query Language (SQL)","levels":[{"skilllevel":"Structured Query Language (SQL) (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198943528"},{"skilllevel":"Structured Query Language (SQL) advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2056391629"},{"skilllevel":"Structured Query Language (SQL) beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107484853"},{"skilllevel":"Structured Query Language (SQL) guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n547846283"},{"skilllevel":"Structured Query Language (SQL) intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1704091589"}]},{"skill":"Subversion","levels":[{"skilllevel":"Subversion (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1946395419"},{"skilllevel":"Subversion advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2134894538"},{"skilllevel":"Subversion beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n920242555"},{"skilllevel":"Subversion guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n324520520"},{"skilllevel":"Subversion intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330304752"}]},{"skill":"SunRays","levels":[{"skilllevel":"SunRays (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1727557509"},{"skilllevel":"SunRays advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n631403184"},{"skilllevel":"SunRays beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1346865514"},{"skilllevel":"SunRays guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1927603394"},{"skilllevel":"SunRays intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n365371672"}]},{"skill":"Sybase","levels":[{"skilllevel":"Sybase (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n467937305"},{"skilllevel":"Sybase advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1859553074"},{"skilllevel":"Sybase beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n718212954"},{"skilllevel":"Sybase guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n881771531"},{"skilllevel":"Sybase intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168524923"}]},{"skill":"TeamCity","levels":[{"skilllevel":"TeamCity (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578708216"},{"skilllevel":"TeamCity advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951208546"},{"skilllevel":"TeamCity beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052528994"},{"skilllevel":"TeamCity guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142570208"},{"skilllevel":"TeamCity intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1365886265"}]},{"skill":"UNIX","levels":[{"skilllevel":"UNIX (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4060"},{"skilllevel":"UNIX (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n444108825"},{"skilllevel":"UNIX advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15773"},{"skilllevel":"UNIX advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038"},{"skilllevel":"UNIX beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1811330000"},{"skilllevel":"UNIX beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n506"},{"skilllevel":"UNIX guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1023625925"},{"skilllevel":"UNIX guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n16192"},{"skilllevel":"UNIX intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1515330233"},{"skilllevel":"UNIX intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5925"}]}],[{"skill":"Unified Modeling Language (UML)","levels":[{"skilllevel":"Unified Modeling Language (UML) (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917408733"},{"skilllevel":"Unified Modeling Language (UML) advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1440990092"},{"skilllevel":"Unified Modeling Language (UML) beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1453088749"},{"skilllevel":"Unified Modeling Language (UML) guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1039162219"},{"skilllevel":"Unified Modeling Language (UML) intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1569894841"}]},{"skill":"VIVO","levels":[{"skilllevel":"VIVO (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n920844606"},{"skilllevel":"VIVO advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n690223823"},{"skilllevel":"VIVO beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n812057586"},{"skilllevel":"VIVO guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n390262573"},{"skilllevel":"VIVO intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1524740150"}]},{"skill":"Video Conferencing Equipment","levels":[{"skilllevel":"Video Conferencing Equipment (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n682118795"},{"skilllevel":"Video Conferencing Equipment advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1984479512"},{"skilllevel":"Video Conferencing Equipment beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1692483687"},{"skilllevel":"Video Conferencing Equipment guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n241032219"},{"skilllevel":"Video Conferencing Equipment intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1900691484"}]},{"skill":"Video Streaming","levels":[{"skilllevel":"Video Streaming (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n401501326"},{"skilllevel":"Video Streaming advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n813078861"},{"skilllevel":"Video Streaming beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n727958903"},{"skilllevel":"Video Streaming guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1292232260"},{"skilllevel":"Video Streaming intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n61105148"}]},{"skill":"Video recording","levels":[{"skilllevel":"Video recording (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n879539546"},{"skilllevel":"Video recording advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952735651"},{"skilllevel":"Video recording beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027647867"},{"skilllevel":"Video recording guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n668932657"},{"skilllevel":"Video recording intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657031559"}]},{"skill":"Web Certificates","levels":[{"skilllevel":"Web Certificates (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1394403846"},{"skilllevel":"Web Certificates advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1289679300"},{"skilllevel":"Web Certificates beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068955350"},{"skilllevel":"Web Certificates guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n755220436"},{"skilllevel":"Web Certificates intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1894130139"}]},{"skill":"Whole Disk Encryption","levels":[{"skilllevel":"Whole Disk Encryption (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n868532910"},{"skilllevel":"Whole Disk Encryption advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n603466448"},{"skilllevel":"Whole Disk Encryption beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1294021614"},{"skilllevel":"Whole Disk Encryption guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n827443162"},{"skilllevel":"Whole Disk Encryption intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1443446817"}]},{"skill":"Windows","levels":[{"skilllevel":"Windows (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n737689472"},{"skilllevel":"Windows advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n817410130"},{"skilllevel":"Windows beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1200655465"},{"skilllevel":"Windows guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1783661094"},{"skilllevel":"Windows intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n758853803"}]},{"skill":"Wordpress","levels":[{"skilllevel":"Wordpress (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824675433"},{"skilllevel":"Wordpress advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246712059"},{"skilllevel":"Wordpress beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2113348855"},{"skilllevel":"Wordpress guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n603445265"},{"skilllevel":"Wordpress intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1750133670"}]},{"skill":"XML","levels":[{"skilllevel":"XML (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n435809455"},{"skilllevel":"XML advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308372421"},{"skilllevel":"XML beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2010667509"},{"skilllevel":"XML guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1245379038"},{"skilllevel":"XML intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n869199825"}]},{"skill":"YourKit Java Profiler","levels":[{"skilllevel":"YourKit Java Profiler (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952946630"},{"skilllevel":"YourKit Java Profiler advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1328280097"},{"skilllevel":"YourKit Java Profiler beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2074846875"},{"skilllevel":"YourKit Java Profiler guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914368466"},{"skilllevel":"YourKit Java Profiler intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971784415"}]},{"skill":"ant","levels":[{"skilllevel":"ant (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n204347418"},{"skilllevel":"ant advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n126545019"},{"skilllevel":"ant beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1177272249"},{"skilllevel":"ant guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1785232066"},{"skilllevel":"ant intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1010880164"}]},{"skill":"bash","levels":[{"skilllevel":"bash (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n506329001"},{"skilllevel":"bash advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n973358142"},{"skilllevel":"bash beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n784818287"},{"skilllevel":"bash guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1232540464"},{"skilllevel":"bash intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n829159456"}]},{"skill":"netCDF","levels":[{"skilllevel":"netCDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1621791493"},{"skilllevel":"netCDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273549603"},{"skilllevel":"netCDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070145250"},{"skilllevel":"netCDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n194562462"},{"skilllevel":"netCDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876937350"}]},{"skill":"perl","levels":[{"skilllevel":"perl (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1064026058"},{"skilllevel":"perl advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1712511923"},{"skilllevel":"perl beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n923173688"},{"skilllevel":"perl guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n744724876"},{"skilllevel":"perl intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130"}]}],[{"skill":"tcsh","levels":[{"skilllevel":"tcsh (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632010458"},{"skilllevel":"tcsh advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352988386"},{"skilllevel":"tcsh beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1220194198"},{"skilllevel":"tcsh guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1001446887"},{"skilllevel":"tcsh intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n396073491"}]},{"skill":"wInsight","levels":[{"skilllevel":"wInsight (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062117007"},{"skilllevel":"wInsight advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n358560745"},{"skilllevel":"wInsight beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n239194321"},{"skilllevel":"wInsight guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1173580466"},{"skilllevel":"wInsight intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n862908734"}]},{"skill":"wikimedia","levels":[{"skilllevel":"wikimedia (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1853486041"},{"skilllevel":"wikimedia advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n876419576"},{"skilllevel":"wikimedia beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299767191"},{"skilllevel":"wikimedia guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474335554"},{"skilllevel":"wikimedia intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446453562"}]}]];
      var expectedPagedPeople = [[{"person":"Abdulhamid, Ramsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912875884"},{"person":"Aberle, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255311939"},{"person":"Ajello, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588676707"},{"person":"Albers, Nicole","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570151423"},{"person":"Albin, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1286655618"},{"person":"Alfaro, Ann","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512209405"},{"person":"Ali, Ashar","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n499931381"},{"person":"Allison, Gregg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490733197"},{"person":"Ames, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995808836"},{"person":"Andersson, Laila","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907618201"},{"person":"Anfinson, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2016926148"},{"person":"Annett, Graham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n63860692"},{"person":"Asmus, Heiner","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861075396"},{"person":"Avallone, Linnea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1454781079"},{"person":"Bagenal, Fran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1078482970"}],[{"person":"Baker, Dan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205444746"},{"person":"Baker, Kirsten","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1488098331"},{"person":"Baragiola, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7999"},{"person":"Barcilon, Cristina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2034181570"},{"person":"Barratt, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n404394851"},{"person":"Barrett, Rory","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n357449403"},{"person":"Barrett, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725"},{"person":"Barth, Charles","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1803353333"},{"person":"Batiste, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n213386065"},{"person":"Baumann, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906271444"},{"person":"Bay, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n598683891"},{"person":"Bearden, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273282227"},{"person":"Beaty, Nicholaus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n976701326"},{"person":"Beckman, Shawn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n400097966"},{"person":"Beech, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n888928290"}],[{"person":"Behner, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n894769667"},{"person":"Bela, Megan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91624444"},{"person":"Beland, Stephane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123"},{"person":"Belting, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513891097"},{"person":"Bershenyi, Gabe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n93921936"},{"person":"Bloch, Nikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1319050477"},{"person":"Bloom, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2082768088"},{"person":"Blum, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523754547"},{"person":"Blunck, Jeffrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382538298"},{"person":"Bode, Marc","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1798748915"},{"person":"Bolton, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540886314"},{"person":"Bonney, Donovan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507734015"},{"person":"Bonnici, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1261402531"},{"person":"Boschert, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1178406628"},{"person":"Boyle, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036313819"}],[{"person":"Brain, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n111928268"},{"person":"Brakebusch, Matthias","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n88429468"},{"person":"Bramer, Shelley","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n686469069"},{"person":"Braun, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n423648172"},{"person":"Brennan, Nathanial","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1928440630"},{"person":"Brian, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1880"},{"person":"Briggs, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336740030"},{"person":"Brown, Jeff","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417348364"},{"person":"Brown, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1663284208"},{"person":"Brown, S W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1400"},{"person":"Brugman, Karalee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n92857531"},{"person":"Bryant, Chelsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n867120482"},{"person":"Bryant, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n839305267"},{"person":"Bryant, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1085025965"},{"person":"Buckhannon, Linda","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1066918532"}],[{"person":"Bunnell, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438372251"},{"person":"Burks, Damien","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599575729"},{"person":"Burrows, J P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004"},{"person":"Burrows, Spenser","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n902811839"},{"person":"Califf, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n717941184"},{"person":"Carson, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2000525679"},{"person":"Carton, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n721510310"},{"person":"Caspi, Amir","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n562924903"},{"person":"Cassidy, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062620213"},{"person":"Castleman, Zach","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n646814721"},{"person":"Cervelli, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n707294409"},{"person":"Chaffin, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489093530"},{"person":"Chamberlin, Phillip C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n8187"},{"person":"Christofferson, Ransom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1312757559"},{"person":"Cirbo, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1429538900"}],[{"person":"Cirbo, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1864293332"},{"person":"Coates, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n14458"},{"person":"Coddington, Odele","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070007600"},{"person":"Cohn-Cort, Bronwen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n103589832"},{"person":"Cole, Wes","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1225522401"},{"person":"Collette, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012646325"},{"person":"Collins, Rachael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732618065"},{"person":"Costello, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127780985"},{"person":"Costner, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367854519"},{"person":"Cox, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931"},{"person":"Craft, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961894036"},{"person":"Crary, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2007987199"},{"person":"Crismani, Matteo","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1307648345"},{"person":"Crotser, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1662863303"},{"person":"Curdt, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059"}],[{"person":"Davis, Nina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n408500045"},{"person":"DeNeen, Mathew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n875589346"},{"person":"DeWolfe, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178"},{"person":"Deighan, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1122737005"},{"person":"Del Zanna, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2386"},{"person":"Delamere, Peter A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5649"},{"person":"Delory, G T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n275"},{"person":"Desroche, Mariel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n140"},{"person":"Devito, Elizabeth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1981168541"},{"person":"Dewey, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575426137"},{"person":"Dewoina, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2779032"},{"person":"Didkovsky, L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1108"},{"person":"Dinkel, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n613953723"},{"person":"Dischner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229679033"},{"person":"Dols, Vincent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599462975"}],[{"person":"Dong, Y","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15204"},{"person":"Dorey, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764"},{"person":"Dozier, Melissa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n175766494"},{"person":"Drake, Ginger","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n71958169"},{"person":"Drake, Keith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n101045317"},{"person":"Drobilek, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1277774838"},{"person":"Eaton, Zak","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n44143920"},{"person":"Eberts, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1076781062"},{"person":"Eden, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014923244"},{"person":"Egan, Andrea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115491601"},{"person":"Eldridge, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292718971"},{"person":"Elkington, Scot","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n553631097"},{"person":"Elrod, M K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2507"},{"person":"Elsborg, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911"},{"person":"Emmett, Jeremy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n279164454"}],[{"person":"Eparvier, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1414522112"},{"person":"Ergun, Bob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n670178106"},{"person":"Ericksen, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n523846245"},{"person":"Erickson, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n765907129"},{"person":"Eriksson, Stefan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n125517773"},{"person":"Erkaev, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n274"},{"person":"Espejo, Joey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n924628617"},{"person":"Esposito, Larry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1210903869"},{"person":"Evans, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1479837765"},{"person":"Faber, Jack","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876344817"},{"person":"Fang, Xiaohua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872761738"},{"person":"Farneth, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n939895236"},{"person":"Feickert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n173026304"},{"person":"Fenz-Trimble, Kaiti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n659278552"},{"person":"Ferrington, Nicolas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n794601920"}],[{"person":"Flaherty, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1395635868"},{"person":"Flemer, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987913665"},{"person":"Fleshman, Bobby","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1787"},{"person":"Fletcher, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649163029"},{"person":"Fletcher, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5034"},{"person":"Floyd, L E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2559"},{"person":"Flynn, Sierra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1536335847"},{"person":"Fontenla, J M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1740"},{"person":"Forsyth, Sasha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1013371228"},{"person":"Fowler, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n932646884"},{"person":"Fox, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2852"},{"person":"Fox, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896505121"},{"person":"French, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439300069"},{"person":"Gabbert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2111487135"},{"person":"Gagnard, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n228305227"}],[{"person":"Gathright, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1719236045"},{"person":"Geiger, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n953545550"},{"person":"George, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624031380"},{"person":"George, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n807406679"},{"person":"Giorgi, Ariana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n259579485"},{"person":"Goodrich, Al","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n693905437"},{"person":"Goodrich, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1323188719"},{"person":"Gosling, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1962822057"},{"person":"Graham, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4314"},{"person":"Green, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n90207282"},{"person":"Griest, Ken","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n518533566"},{"person":"Gritzmacher, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583161727"},{"person":"Groeninger, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976429543"},{"person":"Gruen, Eberhard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1822827997"},{"person":"Guneratne, Gabriella","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n371682424"}],[{"person":"Gurgel, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301690009"},{"person":"Gurst, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861896580"},{"person":"Guy, Carol","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1709165908"},{"person":"Hahn, Barb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n508652932"},{"person":"Hall, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502629516"},{"person":"Hand, Molly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023583009"},{"person":"Hansen, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1814290075"},{"person":"Harber, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n638067304"},{"person":"Harder, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1079014435"},{"person":"Hartnett, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512122452"},{"person":"Hartwick, Victoria","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1145663159"},{"person":"Harvey, Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1476646248"},{"person":"Haskins, Jessica","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n911013275"},{"person":"Haugen, Cheryl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n480038164"},{"person":"Haynes, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n161684617"}],[{"person":"Heath, Caitlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115716969"},{"person":"Henderson, M G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5693"},{"person":"Hepburn, Kelly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n672306834"},{"person":"Hess, S L G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1972"},{"person":"Heuerman, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142912025"},{"person":"Hill, T W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6642"},{"person":"Hillier, Jonathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532250141"},{"person":"Himes, Caroline","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1205373967"},{"person":"Himpsel, Carl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1576768257"},{"person":"Hodges, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n133316609"},{"person":"Holden, Nancy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995714539"},{"person":"Holler, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2009987779"},{"person":"Holmes, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851684395"},{"person":"Holsclaw, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000533497"},{"person":"Holt, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n180701835"}],[{"person":"Horanyi, Mihaly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1121953972"},{"person":"Hoskins, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1025386724"},{"person":"Hotard, Bonnie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027471498"},{"person":"Howes, Calvin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633595791"},{"person":"Hoxie, Vaughn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1404677880"},{"person":"Hsu, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n477177479"},{"person":"Huang, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851"},{"person":"Hubbell, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n699751717"},{"person":"Hudson, Hugh S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4790"},{"person":"Hutchison, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372190417"},{"person":"Hynek, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1628438375"},{"person":"Jacobson, Ross","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n374781680"},{"person":"Jakosky, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1313577318"},{"person":"James, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n363350498"},{"person":"Janiczek, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19700812"}],[{"person":"Jaynes, Allison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1147514903"},{"person":"Jeppesen, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845364011"},{"person":"Jilek, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207320044"},{"person":"Johnson, R E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4997"},{"person":"Jones, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050657630"},{"person":"Jones, G H","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6647"},{"person":"Jones, Gayle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n57504821"},{"person":"Jouchoux, Alain","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844208077"},{"person":"Judd, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2140532425"},{"person":"Judge, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3730"},{"person":"Kalnajs, Lars","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1854309916"},{"person":"Karlsson, Magnus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1544450972"},{"person":"Kaufhold, Alexandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890225154"},{"person":"Keefer, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n322281825"},{"person":"Keenan, Francis P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4089"}],[{"person":"Keiser, Brad","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738"},{"person":"Kelley, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352320643"},{"person":"Kempf, Sascha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1611913402"},{"person":"Kern, Josh","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653826283"},{"person":"Kien, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453839589"},{"person":"Kindel, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1069407984"},{"person":"King, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649468078"},{"person":"King, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2130392723"},{"person":"Kingsley, Roberto","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229480056"},{"person":"Kittredge, Camden","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460254225"},{"person":"Klapetzky, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906366491"},{"person":"Knapp, Barry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270"},{"person":"Knappmiller, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446589790"},{"person":"Knehans, Edith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2043547795"},{"person":"Kohnert, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438416807"}],[{"person":"Kohnert, Rick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1029083323"},{"person":"Kokkonen, Kim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665577609"},{"person":"Kominek, Jay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936621824"},{"person":"Kopp, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068179785"},{"person":"Koski, Kraig","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912001963"},{"person":"Kosovichev, A G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031"},{"person":"Kowalski, Adam F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2522"},{"person":"Kowalski, Elise","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1295294388"},{"person":"Krahe, Margaux","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1353991561"},{"person":"Kreisher, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n612686962"},{"person":"Kren, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857081541"},{"person":"Krivova, N A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4043"},{"person":"Krodinger, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n948112081"},{"person":"Kurth, W S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3385"},{"person":"LaClair, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907464116"}],[{"person":"Labrosse, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5614"},{"person":"Lace, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3812"},{"person":"Lafferty, Gina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1241916224"},{"person":"Lalonde, Jean-Francois","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159233084"},{"person":"Lamprecht, Bret","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n739599306"},{"person":"Lankton, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1043347675"},{"person":"Larsen, Dane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513048464"},{"person":"Larsen, Kristopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1306378180"},{"person":"Larson, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428163578"},{"person":"Laumbach, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1944328695"},{"person":"Law, Mariah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1209408315"},{"person":"Lawrence, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1315804720"},{"person":"LeBlanc, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907419030"},{"person":"Lean, Judith L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6638"},{"person":"Lemaire, P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4371"}],[{"person":"Letourneau, Hannah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n442363424"},{"person":"Lewis, G R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2118"},{"person":"Lewis, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n472262787"},{"person":"Li, Xinlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n293691365"},{"person":"Lin, R P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4577"},{"person":"Linden, Keita","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1889784291"},{"person":"Lindholm, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741489759"},{"person":"Lindholm, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1790175656"},{"person":"Liner, Samantha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1112572230"},{"person":"Livingston, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7810"},{"person":"Loche, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4559796"},{"person":"Longo, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n253562955"},{"person":"Lord, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1340836925"},{"person":"Lothringer, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1238347136"},{"person":"Luebke, Anna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657335496"}],[{"person":"Lykke, K R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3229"},{"person":"Ma, Huikang","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n557026557"},{"person":"MacKinnon, A L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3603"},{"person":"Mackison, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434366058"},{"person":"Madhusudhanan, Prasanna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050483258"},{"person":"Malaspina, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n290898740"},{"person":"Maloney, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n146565298"},{"person":"Marcucci, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1318083343"},{"person":"Marcus, Holly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n522816235"},{"person":"Martin, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n457505183"},{"person":"Mason, Carolyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1092945436"},{"person":"Mason, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n132879659"},{"person":"Mason, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1653020773"},{"person":"Masters, A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701"},{"person":"Mathioudaki, Mihalis","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2823"}],[{"person":"May, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540607559"},{"person":"McBride, K M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6234"},{"person":"McCabe, Deb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1966385563"},{"person":"McCandless, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801066637"},{"person":"McClintock, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n571959716"},{"person":"McCollom, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159259470"},{"person":"McEnulty, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1071261447"},{"person":"McGilvray, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n177902987"},{"person":"McGouldrick, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n418611095"},{"person":"McGrath, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85999019"},{"person":"McNeil, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1528282796"},{"person":"McTague, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1345402132"},{"person":"Mcgill, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1967605763"},{"person":"Mclaughlin, Pattilyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753508281"},{"person":"Meisner, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n544141382"}],[{"person":"Merkel, Aimee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n406773472"},{"person":"Merkow, Mat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530345758"},{"person":"Methlie, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2147322495"},{"person":"Mewaldt, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1417"},{"person":"Migliorini, Lucas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n634891605"},{"person":"Miller, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n715993936"},{"person":"Miller, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n558713751"},{"person":"Milligan, Ryan O","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6412"},{"person":"Min, Clifford","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1820576034"},{"person":"Mitchell, D G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1186"},{"person":"Mitchell, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1215748306"},{"person":"Moffatt, Jerel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330004299"},{"person":"Molaverdikhani, Karan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127503713"},{"person":"Monk, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857867638"},{"person":"Moore, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1267979694"}],[{"person":"Moreira Hooks, Joao","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n346540776"},{"person":"Motz, Brent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2124160943"},{"person":"Motz, Brooklyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927000766"},{"person":"Mueller, Steven","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013"},{"person":"Murphy, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1688610058"},{"person":"Myers, Casey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1263641634"},{"person":"Nammari, Aref","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n936762217"},{"person":"Nastaj, Debra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782073425"},{"person":"Negus, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n964782842"},{"person":"Newcomb, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21578080"},{"person":"Newgord, Alexia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n695552564"},{"person":"Nuding, Danielle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648108589"},{"person":"O'Connor, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1139384165"},{"person":"O'Malia, Kasandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308336345"},{"person":"O'brien, Leela","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5234329"}],[{"person":"Ogden, Tammie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583658483"},{"person":"Ortiz, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896094121"},{"person":"Osborne, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1582851040"},{"person":"Osborne, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801786743"},{"person":"Osterloo, Mikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424673248"},{"person":"Otzinger, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1255830498"},{"person":"Pachhai, Kiran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255283506"},{"person":"Packard, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299646442"},{"person":"Padgett, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1393218320"},{"person":"Pagaran, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3697"},{"person":"Pankratz, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966"},{"person":"Panneton, Russell","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578196712"},{"person":"Papa, Joseph","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1354973592"},{"person":"Parenteau, Scarlet","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1659685056"},{"person":"Parsons, Kaitlyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1347690092"}],[{"person":"Passe, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1234648683"},{"person":"Patton, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1685525735"},{"person":"Peck, Courtney","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301530484"},{"person":"Peck, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489001940"},{"person":"Perish, Norm","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1700784405"},{"person":"Persoon, A M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5493"},{"person":"Peterson, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n764015052"},{"person":"Pettit, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n35200622"},{"person":"Pilewskie, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310179206"},{"person":"Pilewskie, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n731850291"},{"person":"Pilinski, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1631975500"},{"person":"Piquette, Marcus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1844883463"},{"person":"Plesha, Rachel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1228806873"},{"person":"Pontias Jr., D W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3564"},{"person":"Popescu, Radu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704"}],[{"person":"Possel, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019699773"},{"person":"Pranger, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526450392"},{"person":"Pryor, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1521316899"},{"person":"Puckett, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n728097612"},{"person":"Pyke, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n295572919"},{"person":"Ramas, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183"},{"person":"Randall, Cora","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n109031017"},{"person":"Randall, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n768867105"},{"person":"Ranquist, Drake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1154848063"},{"person":"Rasca, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607749756"},{"person":"Rast, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n760843983"},{"person":"Ray, L C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5341"},{"person":"Redick, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2080295530"},{"person":"Redick, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1133614131"},{"person":"Reed, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1635945598"}],[{"person":"Reed, Krista","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n877068749"},{"person":"Reedy, Lee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1817223813"},{"person":"Reese, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1866062337"},{"person":"Rehnberg, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1559998858"},{"person":"Reiter, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753914660"},{"person":"Renfrow, Stephanie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796849613"},{"person":"Reukauf, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n276714883"},{"person":"Richard, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3595"},{"person":"Richard, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1655982245"},{"person":"Richards, P G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801"},{"person":"Rider, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1501051647"},{"person":"Riesberg, Lon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057"},{"person":"Ringrose, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n69165236"},{"person":"Robbins, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1250170131"},{"person":"Robbins, Stuart","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n559833574"}],[{"person":"Rogers, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107685763"},{"person":"Rosenshein, Miriam","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1953572127"},{"person":"Rottman, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1708643326"},{"person":"Roughton, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491"},{"person":"Rusch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n970911879"},{"person":"Ruske, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n62569024"},{"person":"Rutkowski, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n412512658"},{"person":"Ryan, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1188565226"},{"person":"Sainsbury, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1293656385"},{"person":"Salcido, Crystal","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490162473"},{"person":"Samaripa, Byron","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1993740978"},{"person":"Sand, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428876202"},{"person":"Sarris, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1264895617"},{"person":"Sawyer, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2115528787"},{"person":"Schelz, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n340499533"}],[{"person":"Schiller, Quintin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052186645"},{"person":"Schloesser, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000340179"},{"person":"Schmidt, Sebastian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330547662"},{"person":"Schmutz, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3012"},{"person":"Schneider, Nick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917838557"},{"person":"Schrijver, C J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2311"},{"person":"Schuehle, U","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100"},{"person":"Seidel, Durbin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1617731339"},{"person":"Sheiko, Nathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624617909"},{"person":"Shu, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2081552666"},{"person":"Sicken, Patti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1507994595"},{"person":"Siler, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823187793"},{"person":"Simmons, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n810031199"},{"person":"Simons-Brown, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159306400"},{"person":"Sims, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526911137"}],[{"person":"Sittler, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367"},{"person":"Slipski, Marek","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850769182"},{"person":"Smith, Dona","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n256748745"},{"person":"Smith, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513997220"},{"person":"Smith, Jamison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1146627975"},{"person":"Smith, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523165414"},{"person":"Smith, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n658738358"},{"person":"Snow, Jake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588964680"},{"person":"Snow, Marty","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n429119084"},{"person":"Solanki, S K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7362"},{"person":"Solomon, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n383047709"},{"person":"Song, Shi","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1483702429"},{"person":"Soto Hoffmann, Patricia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1971283737"},{"person":"Soukhovei, Vladislav","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1373936880"},{"person":"Sparhawk, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648087653"}],[{"person":"Sparn, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428120649"},{"person":"Spivey, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2053763554"},{"person":"Springfield, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n713855563"},{"person":"Spurgeon, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014728592"},{"person":"Sremcevic, Miodrag","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n484618802"},{"person":"Stawarz, Julia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n78726096"},{"person":"Stearns, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1089353141"},{"person":"Steffl, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6059"},{"person":"Steg, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1580269363"},{"person":"Sternovsky, Zoltan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465061973"},{"person":"Stewart, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474554423"},{"person":"Stewart, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1314757256"},{"person":"Stewart, Ian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1672736625"},{"person":"Stimpfling, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n490092760"},{"person":"Stone, Jordan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382272449"}],[{"person":"Street, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205732767"},{"person":"Sturner, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n975471748"},{"person":"Su, Y J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7203"},{"person":"Summers, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115343616"},{"person":"Swieter, Dwayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1192815390"},{"person":"Szalay, Jamey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916260001"},{"person":"Tate, Gail","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n268766314"},{"person":"Taylor, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n716030637"},{"person":"Taylor, Trent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507926942"},{"person":"Templeman, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053"},{"person":"Theiling, Dale","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523846463"},{"person":"Thiede, Jon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n107799568"},{"person":"Thiemann, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070599412"},{"person":"Thomas, Evan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1113966394"},{"person":"Thomas, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n320506707"}],[{"person":"Thompson, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485924204"},{"person":"Thomsen, M F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3367"},{"person":"Thuillier, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1553"},{"person":"Tighe, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1537989152"},{"person":"Tilevitz, Chana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705385187"},{"person":"Tokar, R L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7508"},{"person":"Tolea, Alin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n884210681"},{"person":"Toon, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845246448"},{"person":"Traver, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712"},{"person":"Triplett, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1386835492"},{"person":"Troxel, Kathy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242954374"},{"person":"Tseng, W L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6708"},{"person":"Tucker, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1007186618"},{"person":"Ucker, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971611210"},{"person":"Unruh, Y C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2086"}],[{"person":"Valentine, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753432826"},{"person":"Van Orden, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n183811506"},{"person":"Vanderburgh, Abraham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281302864"},{"person":"Vanier, Blake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n585326394"},{"person":"Vermeer, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n566962202"},{"person":"Vertovec, Audrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914550976"},{"person":"Vial, J C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7086"},{"person":"Villabona, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1116996073"},{"person":"Vincent, Tracy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1191377000"},{"person":"Wade, Stacy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1473474892"},{"person":"Wahlund, J E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4697"},{"person":"Wanamaker, Isaac","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799142869"},{"person":"Wang, Xu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443866291"},{"person":"Weber, M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5279"},{"person":"Wehner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1397764181"}],[{"person":"Welch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115139280"},{"person":"Werdel, Brandon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653143342"},{"person":"Wescott, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n798247984"},{"person":"Westfall, Jim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987838283"},{"person":"White, Neil","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1283020055"},{"person":"White, Oran R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3911"},{"person":"Whitman, Dylan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1640855746"},{"person":"Wieman, S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3791"},{"person":"Wiesman, Brett","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n852217263"},{"person":"Wilder, Frederick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n754212791"},{"person":"Williams, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310654820"},{"person":"Williams, Forrest","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575366074"},{"person":"Williamson, Eleanor","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1118370667"},{"person":"Wilson, Anne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1869681270"},{"person":"Wilson, Rob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n220165430"}],[{"person":"Wise, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n691938741"},{"person":"Withnell, Pete","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1298706407"},{"person":"Wolf, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n221861851"},{"person":"Wood, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1184521804"},{"person":"Woodraska, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n626213350"},{"person":"Woods, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031294282"},{"person":"Worel, Shana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n804667043"},{"person":"Wright, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532824368"},{"person":"Wright, Logan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1342215268"},{"person":"Wrigley, Ray","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1585441073"},{"person":"Wullschleger, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n325914072"},{"person":"Yaptengco, Jonnie Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n850764044"},{"person":"Yau, A W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3676"},{"person":"Yehle, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2096276531"},{"person":"Yoo, Kenny","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845055650"}],[{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3668"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5764"},{"person":"Young, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912403582"},{"person":"Yu, Pengfei","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n362772828"},{"person":"Zhao, Hong","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1496019964"},{"person":"Zhu, Yunqian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936941023"},{"person":"Ziegler, Stephen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815934722"},{"person":"Zucker, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562915827"},{"person":"deFalco, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168824921"}]];

      //act
      var returnedPagedSkills = $scope.groupToPages(skillsInput);
      var returnedPagedPeople = $scope.groupToPages(peopleInput);

    //alert(JSON.stringify(returnedPagedPeople));
    //alert(JSON.stringify(expectedPagedPeople));
    //alert(JSON.stringify(returnedPagedSkills) == JSON.stringify(expectedPagedSkills));

      //assert
      expect(JSON.stringify(returnedPagedSkills)).toEqual(JSON.stringify(expectedPagedSkills));
      expect(JSON.stringify(returnedPagedPeople)).toEqual(JSON.stringify(expectedPagedPeople));
        });

});

//map a skill QuickSearch filter unit tests:
describe("Filters: mapASkillCtrl", function(){
  beforeEach(module('mapaskillFilters'));

  describe('QuickSearch', function() {
    it("filters People on search input as we would expect",inject(function(QuickSearchFilter) {
      //arrange: given this fake data...
      var inputHaystack = [{"person":"Abdulhamid, Ramsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912875884"},{"person":"Aberle, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255311939"},{"person":"Ajello, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588676707"},{"person":"Albers, Nicole","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570151423"},{"person":"Albin, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1286655618"},{"person":"Alfaro, Ann","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512209405"},{"person":"Ali, Ashar","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n499931381"},{"person":"Allison, Gregg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490733197"},{"person":"Ames, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995808836"},{"person":"Andersson, Laila","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907618201"},{"person":"Anfinson, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2016926148"},{"person":"Annett, Graham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n63860692"},{"person":"Asmus, Heiner","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861075396"},{"person":"Avallone, Linnea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1454781079"},{"person":"Bagenal, Fran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1078482970"},{"person":"Baker, Dan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205444746"},{"person":"Baker, Kirsten","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1488098331"},{"person":"Baragiola, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7999"},{"person":"Barcilon, Cristina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2034181570"},{"person":"Barratt, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n404394851"},{"person":"Barrett, Rory","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n357449403"},{"person":"Barrett, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725"},{"person":"Barth, Charles","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1803353333"},{"person":"Batiste, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n213386065"},{"person":"Baumann, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906271444"},{"person":"Bay, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n598683891"},{"person":"Bearden, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273282227"},{"person":"Beaty, Nicholaus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n976701326"},{"person":"Beckman, Shawn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n400097966"},{"person":"Beech, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n888928290"},{"person":"Behner, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n894769667"},{"person":"Bela, Megan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91624444"},{"person":"Beland, Stephane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123"},{"person":"Belting, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513891097"},{"person":"Bershenyi, Gabe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n93921936"},{"person":"Bloch, Nikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1319050477"},{"person":"Bloom, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2082768088"},{"person":"Blum, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523754547"},{"person":"Blunck, Jeffrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382538298"},{"person":"Bode, Marc","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1798748915"},{"person":"Bolton, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540886314"},{"person":"Bonney, Donovan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507734015"},{"person":"Bonnici, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1261402531"},{"person":"Boschert, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1178406628"},{"person":"Boyle, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036313819"},{"person":"Brain, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n111928268"},{"person":"Brakebusch, Matthias","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n88429468"},{"person":"Bramer, Shelley","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n686469069"},{"person":"Braun, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n423648172"},{"person":"Brennan, Nathanial","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1928440630"},{"person":"Brian, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1880"},{"person":"Briggs, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336740030"},{"person":"Brown, Jeff","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417348364"},{"person":"Brown, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1663284208"},{"person":"Brown, S W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1400"},{"person":"Brugman, Karalee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n92857531"},{"person":"Bryant, Chelsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n867120482"},{"person":"Bryant, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n839305267"},{"person":"Bryant, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1085025965"},{"person":"Buckhannon, Linda","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1066918532"},{"person":"Bunnell, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438372251"},{"person":"Burks, Damien","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599575729"},{"person":"Burrows, J P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004"},{"person":"Burrows, Spenser","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n902811839"},{"person":"Califf, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n717941184"},{"person":"Carson, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2000525679"},{"person":"Carton, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n721510310"},{"person":"Caspi, Amir","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n562924903"},{"person":"Cassidy, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062620213"},{"person":"Castleman, Zach","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n646814721"},{"person":"Cervelli, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n707294409"},{"person":"Chaffin, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489093530"},{"person":"Chamberlin, Phillip C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n8187"},{"person":"Christofferson, Ransom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1312757559"},{"person":"Cirbo, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1429538900"},{"person":"Cirbo, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1864293332"},{"person":"Coates, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n14458"},{"person":"Coddington, Odele","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070007600"},{"person":"Cohn-Cort, Bronwen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n103589832"},{"person":"Cole, Wes","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1225522401"},{"person":"Collette, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012646325"},{"person":"Collins, Rachael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732618065"},{"person":"Costello, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127780985"},{"person":"Costner, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367854519"},{"person":"Cox, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931"},{"person":"Craft, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961894036"},{"person":"Crary, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2007987199"},{"person":"Crismani, Matteo","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1307648345"},{"person":"Crotser, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1662863303"},{"person":"Curdt, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059"},{"person":"Davis, Nina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n408500045"},{"person":"DeNeen, Mathew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n875589346"},{"person":"DeWolfe, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178"},{"person":"Deighan, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1122737005"},{"person":"Del Zanna, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2386"},{"person":"Delamere, Peter A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5649"},{"person":"Delory, G T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n275"},{"person":"Desroche, Mariel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n140"},{"person":"Devito, Elizabeth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1981168541"},{"person":"Dewey, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575426137"},{"person":"Dewoina, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2779032"},{"person":"Didkovsky, L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1108"},{"person":"Dinkel, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n613953723"},{"person":"Dischner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229679033"},{"person":"Dols, Vincent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599462975"},{"person":"Dong, Y","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15204"},{"person":"Dorey, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764"},{"person":"Dozier, Melissa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n175766494"},{"person":"Drake, Ginger","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n71958169"},{"person":"Drake, Keith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n101045317"},{"person":"Drobilek, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1277774838"},{"person":"Eaton, Zak","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n44143920"},{"person":"Eberts, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1076781062"},{"person":"Eden, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014923244"},{"person":"Egan, Andrea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115491601"},{"person":"Eldridge, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292718971"},{"person":"Elkington, Scot","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n553631097"},{"person":"Elrod, M K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2507"},{"person":"Elsborg, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911"},{"person":"Emmett, Jeremy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n279164454"},{"person":"Eparvier, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1414522112"},{"person":"Ergun, Bob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n670178106"},{"person":"Ericksen, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n523846245"},{"person":"Erickson, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n765907129"},{"person":"Eriksson, Stefan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n125517773"},{"person":"Erkaev, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n274"},{"person":"Espejo, Joey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n924628617"},{"person":"Esposito, Larry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1210903869"},{"person":"Evans, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1479837765"},{"person":"Faber, Jack","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876344817"},{"person":"Fang, Xiaohua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872761738"},{"person":"Farneth, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n939895236"},{"person":"Feickert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n173026304"},{"person":"Fenz-Trimble, Kaiti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n659278552"},{"person":"Ferrington, Nicolas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n794601920"},{"person":"Flaherty, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1395635868"},{"person":"Flemer, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987913665"},{"person":"Fleshman, Bobby","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1787"},{"person":"Fletcher, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649163029"},{"person":"Fletcher, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5034"},{"person":"Floyd, L E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2559"},{"person":"Flynn, Sierra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1536335847"},{"person":"Fontenla, J M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1740"},{"person":"Forsyth, Sasha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1013371228"},{"person":"Fowler, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n932646884"},{"person":"Fox, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2852"},{"person":"Fox, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896505121"},{"person":"French, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439300069"},{"person":"Gabbert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2111487135"},{"person":"Gagnard, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n228305227"},{"person":"Gathright, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1719236045"},{"person":"Geiger, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n953545550"},{"person":"George, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624031380"},{"person":"George, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n807406679"},{"person":"Giorgi, Ariana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n259579485"},{"person":"Goodrich, Al","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n693905437"},{"person":"Goodrich, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1323188719"},{"person":"Gosling, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1962822057"},{"person":"Graham, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4314"},{"person":"Green, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n90207282"},{"person":"Griest, Ken","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n518533566"},{"person":"Gritzmacher, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583161727"},{"person":"Groeninger, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976429543"},{"person":"Gruen, Eberhard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1822827997"},{"person":"Guneratne, Gabriella","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n371682424"},{"person":"Gurgel, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301690009"},{"person":"Gurst, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861896580"},{"person":"Guy, Carol","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1709165908"},{"person":"Hahn, Barb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n508652932"},{"person":"Hall, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502629516"},{"person":"Hand, Molly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023583009"},{"person":"Hansen, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1814290075"},{"person":"Harber, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n638067304"},{"person":"Harder, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1079014435"},{"person":"Hartnett, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512122452"},{"person":"Hartwick, Victoria","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1145663159"},{"person":"Harvey, Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1476646248"},{"person":"Haskins, Jessica","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n911013275"},{"person":"Haugen, Cheryl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n480038164"},{"person":"Haynes, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n161684617"},{"person":"Heath, Caitlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115716969"},{"person":"Henderson, M G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5693"},{"person":"Hepburn, Kelly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n672306834"},{"person":"Hess, S L G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1972"},{"person":"Heuerman, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142912025"},{"person":"Hill, T W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6642"},{"person":"Hillier, Jonathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532250141"},{"person":"Himes, Caroline","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1205373967"},{"person":"Himpsel, Carl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1576768257"},{"person":"Hodges, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n133316609"},{"person":"Holden, Nancy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995714539"},{"person":"Holler, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2009987779"},{"person":"Holmes, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851684395"},{"person":"Holsclaw, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000533497"},{"person":"Holt, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n180701835"},{"person":"Horanyi, Mihaly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1121953972"},{"person":"Hoskins, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1025386724"},{"person":"Hotard, Bonnie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027471498"},{"person":"Howes, Calvin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633595791"},{"person":"Hoxie, Vaughn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1404677880"},{"person":"Hsu, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n477177479"},{"person":"Huang, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851"},{"person":"Hubbell, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n699751717"},{"person":"Hudson, Hugh S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4790"},{"person":"Hutchison, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372190417"},{"person":"Hynek, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1628438375"},{"person":"Jacobson, Ross","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n374781680"},{"person":"Jakosky, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1313577318"},{"person":"James, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n363350498"},{"person":"Janiczek, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19700812"},{"person":"Jaynes, Allison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1147514903"},{"person":"Jeppesen, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845364011"},{"person":"Jilek, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207320044"},{"person":"Johnson, R E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4997"},{"person":"Jones, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050657630"},{"person":"Jones, G H","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6647"},{"person":"Jones, Gayle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n57504821"},{"person":"Jouchoux, Alain","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844208077"},{"person":"Judd, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2140532425"},{"person":"Judge, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3730"},{"person":"Kalnajs, Lars","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1854309916"},{"person":"Karlsson, Magnus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1544450972"},{"person":"Kaufhold, Alexandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890225154"},{"person":"Keefer, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n322281825"},{"person":"Keenan, Francis P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4089"},{"person":"Keiser, Brad","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738"},{"person":"Kelley, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352320643"},{"person":"Kempf, Sascha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1611913402"},{"person":"Kern, Josh","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653826283"},{"person":"Kien, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453839589"},{"person":"Kindel, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1069407984"},{"person":"King, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649468078"},{"person":"King, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2130392723"},{"person":"Kingsley, Roberto","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229480056"},{"person":"Kittredge, Camden","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460254225"},{"person":"Klapetzky, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906366491"},{"person":"Knapp, Barry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270"},{"person":"Knappmiller, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446589790"},{"person":"Knehans, Edith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2043547795"},{"person":"Kohnert, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438416807"},{"person":"Kohnert, Rick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1029083323"},{"person":"Kokkonen, Kim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665577609"},{"person":"Kominek, Jay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936621824"},{"person":"Kopp, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068179785"},{"person":"Koski, Kraig","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912001963"},{"person":"Kosovichev, A G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031"},{"person":"Kowalski, Adam F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2522"},{"person":"Kowalski, Elise","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1295294388"},{"person":"Krahe, Margaux","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1353991561"},{"person":"Kreisher, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n612686962"},{"person":"Kren, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857081541"},{"person":"Krivova, N A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4043"},{"person":"Krodinger, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n948112081"},{"person":"Kurth, W S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3385"},{"person":"LaClair, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907464116"},{"person":"Labrosse, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5614"},{"person":"Lace, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3812"},{"person":"Lafferty, Gina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1241916224"},{"person":"Lalonde, Jean-Francois","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159233084"},{"person":"Lamprecht, Bret","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n739599306"},{"person":"Lankton, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1043347675"},{"person":"Larsen, Dane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513048464"},{"person":"Larsen, Kristopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1306378180"},{"person":"Larson, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428163578"},{"person":"Laumbach, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1944328695"},{"person":"Law, Mariah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1209408315"},{"person":"Lawrence, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1315804720"},{"person":"LeBlanc, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907419030"},{"person":"Lean, Judith L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6638"},{"person":"Lemaire, P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4371"},{"person":"Letourneau, Hannah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n442363424"},{"person":"Lewis, G R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2118"},{"person":"Lewis, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n472262787"},{"person":"Li, Xinlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n293691365"},{"person":"Lin, R P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4577"},{"person":"Linden, Keita","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1889784291"},{"person":"Lindholm, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741489759"},{"person":"Lindholm, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1790175656"},{"person":"Liner, Samantha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1112572230"},{"person":"Livingston, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7810"},{"person":"Loche, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4559796"},{"person":"Longo, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n253562955"},{"person":"Lord, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1340836925"},{"person":"Lothringer, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1238347136"},{"person":"Luebke, Anna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657335496"},{"person":"Lykke, K R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3229"},{"person":"Ma, Huikang","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n557026557"},{"person":"MacKinnon, A L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3603"},{"person":"Mackison, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434366058"},{"person":"Madhusudhanan, Prasanna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050483258"},{"person":"Malaspina, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n290898740"},{"person":"Maloney, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n146565298"},{"person":"Marcucci, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1318083343"},{"person":"Marcus, Holly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n522816235"},{"person":"Martin, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n457505183"},{"person":"Mason, Carolyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1092945436"},{"person":"Mason, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n132879659"},{"person":"Mason, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1653020773"},{"person":"Masters, A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701"},{"person":"Mathioudaki, Mihalis","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2823"},{"person":"May, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540607559"},{"person":"McBride, K M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6234"},{"person":"McCabe, Deb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1966385563"},{"person":"McCandless, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801066637"},{"person":"McClintock, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n571959716"},{"person":"McCollom, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159259470"},{"person":"McEnulty, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1071261447"},{"person":"McGilvray, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n177902987"},{"person":"McGouldrick, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n418611095"},{"person":"McGrath, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85999019"},{"person":"McNeil, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1528282796"},{"person":"McTague, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1345402132"},{"person":"Mcgill, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1967605763"},{"person":"Mclaughlin, Pattilyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753508281"},{"person":"Meisner, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n544141382"},{"person":"Merkel, Aimee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n406773472"},{"person":"Merkow, Mat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530345758"},{"person":"Methlie, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2147322495"},{"person":"Mewaldt, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1417"},{"person":"Migliorini, Lucas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n634891605"},{"person":"Miller, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n715993936"},{"person":"Miller, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n558713751"},{"person":"Milligan, Ryan O","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6412"},{"person":"Min, Clifford","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1820576034"},{"person":"Mitchell, D G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1186"},{"person":"Mitchell, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1215748306"},{"person":"Moffatt, Jerel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330004299"},{"person":"Molaverdikhani, Karan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127503713"},{"person":"Monk, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857867638"},{"person":"Moore, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1267979694"},{"person":"Moreira Hooks, Joao","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n346540776"},{"person":"Motz, Brent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2124160943"},{"person":"Motz, Brooklyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927000766"},{"person":"Mueller, Steven","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013"},{"person":"Murphy, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1688610058"},{"person":"Myers, Casey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1263641634"},{"person":"Nammari, Aref","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n936762217"},{"person":"Nastaj, Debra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782073425"},{"person":"Negus, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n964782842"},{"person":"Newcomb, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21578080"},{"person":"Newgord, Alexia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n695552564"},{"person":"Nuding, Danielle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648108589"},{"person":"O'Connor, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1139384165"},{"person":"O'Malia, Kasandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308336345"},{"person":"O'brien, Leela","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5234329"},{"person":"Ogden, Tammie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583658483"},{"person":"Ortiz, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896094121"},{"person":"Osborne, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1582851040"},{"person":"Osborne, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801786743"},{"person":"Osterloo, Mikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424673248"},{"person":"Otzinger, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1255830498"},{"person":"Pachhai, Kiran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255283506"},{"person":"Packard, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299646442"},{"person":"Padgett, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1393218320"},{"person":"Pagaran, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3697"},{"person":"Pankratz, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966"},{"person":"Panneton, Russell","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578196712"},{"person":"Papa, Joseph","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1354973592"},{"person":"Parenteau, Scarlet","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1659685056"},{"person":"Parsons, Kaitlyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1347690092"},{"person":"Passe, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1234648683"},{"person":"Patton, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1685525735"},{"person":"Peck, Courtney","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301530484"},{"person":"Peck, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489001940"},{"person":"Perish, Norm","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1700784405"},{"person":"Persoon, A M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5493"},{"person":"Peterson, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n764015052"},{"person":"Pettit, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n35200622"},{"person":"Pilewskie, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310179206"},{"person":"Pilewskie, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n731850291"},{"person":"Pilinski, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1631975500"},{"person":"Piquette, Marcus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1844883463"},{"person":"Plesha, Rachel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1228806873"},{"person":"Pontias Jr., D W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3564"},{"person":"Popescu, Radu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704"},{"person":"Possel, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019699773"},{"person":"Pranger, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526450392"},{"person":"Pryor, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1521316899"},{"person":"Puckett, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n728097612"},{"person":"Pyke, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n295572919"},{"person":"Ramas, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183"},{"person":"Randall, Cora","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n109031017"},{"person":"Randall, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n768867105"},{"person":"Ranquist, Drake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1154848063"},{"person":"Rasca, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607749756"},{"person":"Rast, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n760843983"},{"person":"Ray, L C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5341"},{"person":"Redick, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2080295530"},{"person":"Redick, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1133614131"},{"person":"Reed, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1635945598"},{"person":"Reed, Krista","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n877068749"},{"person":"Reedy, Lee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1817223813"},{"person":"Reese, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1866062337"},{"person":"Rehnberg, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1559998858"},{"person":"Reiter, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753914660"},{"person":"Renfrow, Stephanie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796849613"},{"person":"Reukauf, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n276714883"},{"person":"Richard, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3595"},{"person":"Richard, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1655982245"},{"person":"Richards, P G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801"},{"person":"Rider, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1501051647"},{"person":"Riesberg, Lon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057"},{"person":"Ringrose, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n69165236"},{"person":"Robbins, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1250170131"},{"person":"Robbins, Stuart","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n559833574"},{"person":"Rogers, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107685763"},{"person":"Rosenshein, Miriam","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1953572127"},{"person":"Rottman, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1708643326"},{"person":"Roughton, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491"},{"person":"Rusch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n970911879"},{"person":"Ruske, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n62569024"},{"person":"Rutkowski, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n412512658"},{"person":"Ryan, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1188565226"},{"person":"Sainsbury, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1293656385"},{"person":"Salcido, Crystal","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490162473"},{"person":"Samaripa, Byron","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1993740978"},{"person":"Sand, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428876202"},{"person":"Sarris, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1264895617"},{"person":"Sawyer, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2115528787"},{"person":"Schelz, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n340499533"},{"person":"Schiller, Quintin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052186645"},{"person":"Schloesser, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000340179"},{"person":"Schmidt, Sebastian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330547662"},{"person":"Schmutz, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3012"},{"person":"Schneider, Nick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917838557"},{"person":"Schrijver, C J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2311"},{"person":"Schuehle, U","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100"},{"person":"Seidel, Durbin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1617731339"},{"person":"Sheiko, Nathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624617909"},{"person":"Shu, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2081552666"},{"person":"Sicken, Patti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1507994595"},{"person":"Siler, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823187793"},{"person":"Simmons, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n810031199"},{"person":"Simons-Brown, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159306400"},{"person":"Sims, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526911137"},{"person":"Sittler, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367"},{"person":"Slipski, Marek","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850769182"},{"person":"Smith, Dona","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n256748745"},{"person":"Smith, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513997220"},{"person":"Smith, Jamison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1146627975"},{"person":"Smith, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523165414"},{"person":"Smith, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n658738358"},{"person":"Snow, Jake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588964680"},{"person":"Snow, Marty","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n429119084"},{"person":"Solanki, S K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7362"},{"person":"Solomon, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n383047709"},{"person":"Song, Shi","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1483702429"},{"person":"Soto Hoffmann, Patricia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1971283737"},{"person":"Soukhovei, Vladislav","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1373936880"},{"person":"Sparhawk, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648087653"},{"person":"Sparn, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428120649"},{"person":"Spivey, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2053763554"},{"person":"Springfield, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n713855563"},{"person":"Spurgeon, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014728592"},{"person":"Sremcevic, Miodrag","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n484618802"},{"person":"Stawarz, Julia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n78726096"},{"person":"Stearns, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1089353141"},{"person":"Steffl, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6059"},{"person":"Steg, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1580269363"},{"person":"Sternovsky, Zoltan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465061973"},{"person":"Stewart, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474554423"},{"person":"Stewart, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1314757256"},{"person":"Stewart, Ian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1672736625"},{"person":"Stimpfling, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n490092760"},{"person":"Stone, Jordan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382272449"},{"person":"Street, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205732767"},{"person":"Sturner, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n975471748"},{"person":"Su, Y J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7203"},{"person":"Summers, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115343616"},{"person":"Swieter, Dwayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1192815390"},{"person":"Szalay, Jamey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916260001"},{"person":"Tate, Gail","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n268766314"},{"person":"Taylor, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n716030637"},{"person":"Taylor, Trent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507926942"},{"person":"Templeman, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053"},{"person":"Theiling, Dale","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523846463"},{"person":"Thiede, Jon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n107799568"},{"person":"Thiemann, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070599412"},{"person":"Thomas, Evan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1113966394"},{"person":"Thomas, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n320506707"},{"person":"Thompson, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485924204"},{"person":"Thomsen, M F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3367"},{"person":"Thuillier, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1553"},{"person":"Tighe, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1537989152"},{"person":"Tilevitz, Chana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705385187"},{"person":"Tokar, R L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7508"},{"person":"Tolea, Alin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n884210681"},{"person":"Toon, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845246448"},{"person":"Traver, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712"},{"person":"Triplett, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1386835492"},{"person":"Troxel, Kathy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242954374"},{"person":"Tseng, W L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6708"},{"person":"Tucker, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1007186618"},{"person":"Ucker, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971611210"},{"person":"Unruh, Y C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2086"},{"person":"Valentine, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753432826"},{"person":"Van Orden, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n183811506"},{"person":"Vanderburgh, Abraham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281302864"},{"person":"Vanier, Blake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n585326394"},{"person":"Vermeer, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n566962202"},{"person":"Vertovec, Audrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914550976"},{"person":"Vial, J C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7086"},{"person":"Villabona, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1116996073"},{"person":"Vincent, Tracy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1191377000"},{"person":"Wade, Stacy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1473474892"},{"person":"Wahlund, J E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4697"},{"person":"Wanamaker, Isaac","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799142869"},{"person":"Wang, Xu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443866291"},{"person":"Weber, M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5279"},{"person":"Wehner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1397764181"},{"person":"Welch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115139280"},{"person":"Werdel, Brandon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653143342"},{"person":"Wescott, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n798247984"},{"person":"Westfall, Jim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987838283"},{"person":"White, Neil","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1283020055"},{"person":"White, Oran R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3911"},{"person":"Whitman, Dylan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1640855746"},{"person":"Wieman, S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3791"},{"person":"Wiesman, Brett","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n852217263"},{"person":"Wilder, Frederick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n754212791"},{"person":"Williams, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310654820"},{"person":"Williams, Forrest","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575366074"},{"person":"Williamson, Eleanor","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1118370667"},{"person":"Wilson, Anne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1869681270"},{"person":"Wilson, Rob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n220165430"},{"person":"Wise, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n691938741"},{"person":"Withnell, Pete","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1298706407"},{"person":"Wolf, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n221861851"},{"person":"Wood, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1184521804"},{"person":"Woodraska, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n626213350"},{"person":"Woods, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031294282"},{"person":"Worel, Shana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n804667043"},{"person":"Wright, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532824368"},{"person":"Wright, Logan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1342215268"},{"person":"Wrigley, Ray","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1585441073"},{"person":"Wullschleger, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n325914072"},{"person":"Yaptengco, Jonnie Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n850764044"},{"person":"Yau, A W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3676"},{"person":"Yehle, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2096276531"},{"person":"Yoo, Kenny","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845055650"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3668"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5764"},{"person":"Young, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912403582"},{"person":"Yu, Pengfei","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n362772828"},{"person":"Zhao, Hong","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1496019964"},{"person":"Zhu, Yunqian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936941023"},{"person":"Ziegler, Stephen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815934722"},{"person":"Zucker, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562915827"},{"person":"deFalco, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168824921"}];
        //act and assert
        expect(JSON.stringify(QuickSearchFilter(inputHaystack, "", "person"))).toEqual(JSON.stringify([{"person":"Abdulhamid, Ramsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912875884"},{"person":"Aberle, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255311939"},{"person":"Ajello, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588676707"},{"person":"Albers, Nicole","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570151423"},{"person":"Albin, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1286655618"},{"person":"Alfaro, Ann","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512209405"},{"person":"Ali, Ashar","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n499931381"},{"person":"Allison, Gregg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490733197"},{"person":"Ames, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995808836"},{"person":"Andersson, Laila","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907618201"},{"person":"Anfinson, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2016926148"},{"person":"Annett, Graham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n63860692"},{"person":"Asmus, Heiner","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861075396"},{"person":"Avallone, Linnea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1454781079"},{"person":"Bagenal, Fran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1078482970"},{"person":"Baker, Dan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205444746"},{"person":"Baker, Kirsten","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1488098331"},{"person":"Baragiola, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7999"},{"person":"Barcilon, Cristina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2034181570"},{"person":"Barratt, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n404394851"},{"person":"Barrett, Rory","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n357449403"},{"person":"Barrett, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725"},{"person":"Barth, Charles","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1803353333"},{"person":"Batiste, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n213386065"},{"person":"Baumann, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906271444"},{"person":"Bay, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n598683891"},{"person":"Bearden, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273282227"},{"person":"Beaty, Nicholaus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n976701326"},{"person":"Beckman, Shawn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n400097966"},{"person":"Beech, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n888928290"},{"person":"Behner, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n894769667"},{"person":"Bela, Megan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91624444"},{"person":"Beland, Stephane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123"},{"person":"Belting, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513891097"},{"person":"Bershenyi, Gabe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n93921936"},{"person":"Bloch, Nikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1319050477"},{"person":"Bloom, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2082768088"},{"person":"Blum, Lauren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523754547"},{"person":"Blunck, Jeffrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382538298"},{"person":"Bode, Marc","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1798748915"},{"person":"Bolton, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540886314"},{"person":"Bonney, Donovan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507734015"},{"person":"Bonnici, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1261402531"},{"person":"Boschert, Nicholas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1178406628"},{"person":"Boyle, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036313819"},{"person":"Brain, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n111928268"},{"person":"Brakebusch, Matthias","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n88429468"},{"person":"Bramer, Shelley","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n686469069"},{"person":"Braun, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n423648172"},{"person":"Brennan, Nathanial","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1928440630"},{"person":"Brian, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1880"},{"person":"Briggs, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336740030"},{"person":"Brown, Jeff","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417348364"},{"person":"Brown, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1663284208"},{"person":"Brown, S W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1400"},{"person":"Brugman, Karalee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n92857531"},{"person":"Bryant, Chelsey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n867120482"},{"person":"Bryant, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n839305267"},{"person":"Bryant, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1085025965"},{"person":"Buckhannon, Linda","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1066918532"},{"person":"Bunnell, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438372251"},{"person":"Burks, Damien","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599575729"},{"person":"Burrows, J P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004"},{"person":"Burrows, Spenser","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n902811839"},{"person":"Califf, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n717941184"},{"person":"Carson, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2000525679"},{"person":"Carton, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n721510310"},{"person":"Caspi, Amir","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n562924903"},{"person":"Cassidy, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062620213"},{"person":"Castleman, Zach","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n646814721"},{"person":"Cervelli, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n707294409"},{"person":"Chaffin, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489093530"},{"person":"Chamberlin, Phillip C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n8187"},{"person":"Christofferson, Ransom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1312757559"},{"person":"Cirbo, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1429538900"},{"person":"Cirbo, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1864293332"},{"person":"Coates, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n14458"},{"person":"Coddington, Odele","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070007600"},{"person":"Cohn-Cort, Bronwen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n103589832"},{"person":"Cole, Wes","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1225522401"},{"person":"Collette, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012646325"},{"person":"Collins, Rachael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732618065"},{"person":"Costello, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127780985"},{"person":"Costner, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367854519"},{"person":"Cox, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931"},{"person":"Craft, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961894036"},{"person":"Crary, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2007987199"},{"person":"Crismani, Matteo","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1307648345"},{"person":"Crotser, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1662863303"},{"person":"Curdt, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059"},{"person":"Davis, Nina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n408500045"},{"person":"DeNeen, Mathew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n875589346"},{"person":"DeWolfe, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178"},{"person":"Deighan, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1122737005"},{"person":"Del Zanna, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2386"},{"person":"Delamere, Peter A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5649"},{"person":"Delory, G T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n275"},{"person":"Desroche, Mariel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n140"},{"person":"Devito, Elizabeth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1981168541"},{"person":"Dewey, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575426137"},{"person":"Dewoina, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2779032"},{"person":"Didkovsky, L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1108"},{"person":"Dinkel, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n613953723"},{"person":"Dischner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229679033"},{"person":"Dols, Vincent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1599462975"},{"person":"Dong, Y","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15204"},{"person":"Dorey, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764"},{"person":"Dozier, Melissa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n175766494"},{"person":"Drake, Ginger","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n71958169"},{"person":"Drake, Keith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n101045317"},{"person":"Drobilek, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1277774838"},{"person":"Eaton, Zak","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n44143920"},{"person":"Eberts, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1076781062"},{"person":"Eden, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014923244"},{"person":"Egan, Andrea","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115491601"},{"person":"Eldridge, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292718971"},{"person":"Elkington, Scot","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n553631097"},{"person":"Elrod, M K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2507"},{"person":"Elsborg, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911"},{"person":"Emmett, Jeremy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n279164454"},{"person":"Eparvier, Frank","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1414522112"},{"person":"Ergun, Bob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n670178106"},{"person":"Ericksen, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n523846245"},{"person":"Erickson, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n765907129"},{"person":"Eriksson, Stefan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n125517773"},{"person":"Erkaev, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n274"},{"person":"Espejo, Joey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n924628617"},{"person":"Esposito, Larry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1210903869"},{"person":"Evans, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1479837765"},{"person":"Faber, Jack","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876344817"},{"person":"Fang, Xiaohua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872761738"},{"person":"Farneth, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n939895236"},{"person":"Feickert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n173026304"},{"person":"Fenz-Trimble, Kaiti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n659278552"},{"person":"Ferrington, Nicolas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n794601920"},{"person":"Flaherty, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1395635868"},{"person":"Flemer, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987913665"},{"person":"Fleshman, Bobby","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1787"},{"person":"Fletcher, Kathleen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649163029"},{"person":"Fletcher, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5034"},{"person":"Floyd, L E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2559"},{"person":"Flynn, Sierra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1536335847"},{"person":"Fontenla, J M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1740"},{"person":"Forsyth, Sasha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1013371228"},{"person":"Fowler, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n932646884"},{"person":"Fox, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2852"},{"person":"Fox, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896505121"},{"person":"French, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439300069"},{"person":"Gabbert, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2111487135"},{"person":"Gagnard, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n228305227"},{"person":"Gathright, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1719236045"},{"person":"Geiger, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n953545550"},{"person":"George, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624031380"},{"person":"George, Vanessa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n807406679"},{"person":"Giorgi, Ariana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n259579485"},{"person":"Goodrich, Al","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n693905437"},{"person":"Goodrich, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1323188719"},{"person":"Gosling, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1962822057"},{"person":"Graham, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4314"},{"person":"Green, Alex","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n90207282"},{"person":"Griest, Ken","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n518533566"},{"person":"Gritzmacher, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583161727"},{"person":"Groeninger, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976429543"},{"person":"Gruen, Eberhard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1822827997"},{"person":"Guneratne, Gabriella","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n371682424"},{"person":"Gurgel, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301690009"},{"person":"Gurst, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1861896580"},{"person":"Guy, Carol","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1709165908"},{"person":"Hahn, Barb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n508652932"},{"person":"Hall, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502629516"},{"person":"Hand, Molly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023583009"},{"person":"Hansen, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1814290075"},{"person":"Harber, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n638067304"},{"person":"Harder, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1079014435"},{"person":"Hartnett, Edward","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n512122452"},{"person":"Hartwick, Victoria","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1145663159"},{"person":"Harvey, Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1476646248"},{"person":"Haskins, Jessica","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n911013275"},{"person":"Haugen, Cheryl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n480038164"},{"person":"Haynes, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n161684617"},{"person":"Heath, Caitlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115716969"},{"person":"Henderson, M G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5693"},{"person":"Hepburn, Kelly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n672306834"},{"person":"Hess, S L G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1972"},{"person":"Heuerman, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142912025"},{"person":"Hill, T W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6642"},{"person":"Hillier, Jonathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532250141"},{"person":"Himes, Caroline","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1205373967"},{"person":"Himpsel, Carl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1576768257"},{"person":"Hodges, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n133316609"},{"person":"Holden, Nancy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1995714539"},{"person":"Holler, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2009987779"},{"person":"Holmes, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851684395"},{"person":"Holsclaw, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000533497"},{"person":"Holt, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n180701835"},{"person":"Horanyi, Mihaly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1121953972"},{"person":"Hoskins, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1025386724"},{"person":"Hotard, Bonnie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027471498"},{"person":"Howes, Calvin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633595791"},{"person":"Hoxie, Vaughn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1404677880"},{"person":"Hsu, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n477177479"},{"person":"Huang, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n851"},{"person":"Hubbell, Karl","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n699751717"},{"person":"Hudson, Hugh S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4790"},{"person":"Hutchison, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372190417"},{"person":"Hynek, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1628438375"},{"person":"Jacobson, Ross","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n374781680"},{"person":"Jakosky, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1313577318"},{"person":"James, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n363350498"},{"person":"Janiczek, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19700812"},{"person":"Jaynes, Allison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1147514903"},{"person":"Jeppesen, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845364011"},{"person":"Jilek, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207320044"},{"person":"Johnson, R E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4997"},{"person":"Jones, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050657630"},{"person":"Jones, G H","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6647"},{"person":"Jones, Gayle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n57504821"},{"person":"Jouchoux, Alain","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844208077"},{"person":"Judd, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2140532425"},{"person":"Judge, D","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3730"},{"person":"Kalnajs, Lars","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1854309916"},{"person":"Karlsson, Magnus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1544450972"},{"person":"Kaufhold, Alexandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890225154"},{"person":"Keefer, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n322281825"},{"person":"Keenan, Francis P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4089"},{"person":"Keiser, Brad","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738"},{"person":"Kelley, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352320643"},{"person":"Kempf, Sascha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1611913402"},{"person":"Kern, Josh","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653826283"},{"person":"Kien, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453839589"},{"person":"Kindel, Bruce","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1069407984"},{"person":"King, Matthew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n649468078"},{"person":"King, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2130392723"},{"person":"Kingsley, Roberto","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229480056"},{"person":"Kittredge, Camden","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460254225"},{"person":"Klapetzky, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906366491"},{"person":"Knapp, Barry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270"},{"person":"Knappmiller, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446589790"},{"person":"Knehans, Edith","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2043547795"},{"person":"Kohnert, Laura","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n438416807"},{"person":"Kohnert, Rick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1029083323"},{"person":"Kokkonen, Kim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665577609"},{"person":"Kominek, Jay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936621824"},{"person":"Kopp, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068179785"},{"person":"Koski, Kraig","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912001963"},{"person":"Kosovichev, A G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031"},{"person":"Kowalski, Adam F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2522"},{"person":"Kowalski, Elise","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1295294388"},{"person":"Krahe, Margaux","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1353991561"},{"person":"Kreisher, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n612686962"},{"person":"Kren, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857081541"},{"person":"Krivova, N A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4043"},{"person":"Krodinger, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n948112081"},{"person":"Kurth, W S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3385"},{"person":"LaClair, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907464116"},{"person":"Labrosse, N","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5614"},{"person":"Lace, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3812"},{"person":"Lafferty, Gina","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1241916224"},{"person":"Lalonde, Jean-Francois","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159233084"},{"person":"Lamprecht, Bret","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n739599306"},{"person":"Lankton, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1043347675"},{"person":"Larsen, Dane","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n513048464"},{"person":"Larsen, Kristopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1306378180"},{"person":"Larson, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428163578"},{"person":"Laumbach, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1944328695"},{"person":"Law, Mariah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1209408315"},{"person":"Lawrence, George","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1315804720"},{"person":"LeBlanc, Samuel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n907419030"},{"person":"Lean, Judith L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6638"},{"person":"Lemaire, P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4371"},{"person":"Letourneau, Hannah","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n442363424"},{"person":"Lewis, G R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2118"},{"person":"Lewis, Ryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n472262787"},{"person":"Li, Xinlin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n293691365"},{"person":"Lin, R P","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4577"},{"person":"Linden, Keita","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1889784291"},{"person":"Lindholm, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741489759"},{"person":"Lindholm, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1790175656"},{"person":"Liner, Samantha","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1112572230"},{"person":"Livingston, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7810"},{"person":"Loche, Richard","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4559796"},{"person":"Longo, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n253562955"},{"person":"Lord, Jesse","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1340836925"},{"person":"Lothringer, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1238347136"},{"person":"Luebke, Anna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657335496"},{"person":"Lykke, K R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3229"},{"person":"Ma, Huikang","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n557026557"},{"person":"MacKinnon, A L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3603"},{"person":"Mackison, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434366058"},{"person":"Madhusudhanan, Prasanna","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2050483258"},{"person":"Malaspina, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n290898740"},{"person":"Maloney, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n146565298"},{"person":"Marcucci, Emma","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1318083343"},{"person":"Marcus, Holly","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n522816235"},{"person":"Martin, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n457505183"},{"person":"Mason, Carolyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1092945436"},{"person":"Mason, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n132879659"},{"person":"Mason, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1653020773"},{"person":"Masters, A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701"},{"person":"Mathioudaki, Mihalis","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2823"},{"person":"May, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1540607559"},{"person":"McBride, K M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6234"},{"person":"McCabe, Deb","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1966385563"},{"person":"McCandless, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801066637"},{"person":"McClintock, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n571959716"},{"person":"McCollom, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159259470"},{"person":"McEnulty, Tess","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1071261447"},{"person":"McGilvray, Beth","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n177902987"},{"person":"McGouldrick, Kevin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n418611095"},{"person":"McGrath, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85999019"},{"person":"McNeil, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1528282796"},{"person":"McTague, Lindsay","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1345402132"},{"person":"Mcgill, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1967605763"},{"person":"Mclaughlin, Pattilyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753508281"},{"person":"Meisner, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n544141382"},{"person":"Merkel, Aimee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n406773472"},{"person":"Merkow, Mat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530345758"},{"person":"Methlie, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2147322495"},{"person":"Mewaldt, R A","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1417"},{"person":"Migliorini, Lucas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n634891605"},{"person":"Miller, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n715993936"},{"person":"Miller, Jacob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n558713751"},{"person":"Milligan, Ryan O","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6412"},{"person":"Min, Clifford","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1820576034"},{"person":"Mitchell, D G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1186"},{"person":"Mitchell, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1215748306"},{"person":"Moffatt, Jerel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330004299"},{"person":"Molaverdikhani, Karan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2127503713"},{"person":"Monk, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1857867638"},{"person":"Moore, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1267979694"},{"person":"Moreira Hooks, Joao","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n346540776"},{"person":"Motz, Brent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2124160943"},{"person":"Motz, Brooklyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927000766"},{"person":"Mueller, Steven","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013"},{"person":"Murphy, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1688610058"},{"person":"Myers, Casey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1263641634"},{"person":"Nammari, Aref","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n936762217"},{"person":"Nastaj, Debra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782073425"},{"person":"Negus, James","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n964782842"},{"person":"Newcomb, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21578080"},{"person":"Newgord, Alexia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n695552564"},{"person":"Nuding, Danielle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648108589"},{"person":"O'Connor, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1139384165"},{"person":"O'Malia, Kasandra","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308336345"},{"person":"O'brien, Leela","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5234329"},{"person":"Ogden, Tammie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n583658483"},{"person":"Ortiz, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1896094121"},{"person":"Osborne, Darren","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1582851040"},{"person":"Osborne, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801786743"},{"person":"Osterloo, Mikki","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424673248"},{"person":"Otzinger, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1255830498"},{"person":"Pachhai, Kiran","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n255283506"},{"person":"Packard, Mike","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299646442"},{"person":"Padgett, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1393218320"},{"person":"Pagaran, J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3697"},{"person":"Pankratz, Chris","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966"},{"person":"Panneton, Russell","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578196712"},{"person":"Papa, Joseph","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1354973592"},{"person":"Parenteau, Scarlet","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1659685056"},{"person":"Parsons, Kaitlyn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1347690092"},{"person":"Passe, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1234648683"},{"person":"Patton, Thomas","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1685525735"},{"person":"Peck, Courtney","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1301530484"},{"person":"Peck, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489001940"},{"person":"Perish, Norm","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1700784405"},{"person":"Persoon, A M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5493"},{"person":"Peterson, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n764015052"},{"person":"Pettit, Joshua","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n35200622"},{"person":"Pilewskie, Katherine","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310179206"},{"person":"Pilewskie, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n731850291"},{"person":"Pilinski, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1631975500"},{"person":"Piquette, Marcus","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1844883463"},{"person":"Plesha, Rachel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1228806873"},{"person":"Pontias Jr., D W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3564"},{"person":"Popescu, Radu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704"},{"person":"Possel, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019699773"},{"person":"Pranger, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526450392"},{"person":"Pryor, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1521316899"},{"person":"Puckett, Austin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n728097612"},{"person":"Pyke, Bryan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n295572919"},{"person":"Ramas, Joe","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183"},{"person":"Randall, Cora","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n109031017"},{"person":"Randall, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n768867105"},{"person":"Ranquist, Drake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1154848063"},{"person":"Rasca, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607749756"},{"person":"Rast, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n760843983"},{"person":"Ray, L C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5341"},{"person":"Redick, Michelle","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2080295530"},{"person":"Redick, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1133614131"},{"person":"Reed, Heather","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1635945598"},{"person":"Reed, Krista","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n877068749"},{"person":"Reedy, Lee","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1817223813"},{"person":"Reese, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1866062337"},{"person":"Rehnberg, Morgan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1559998858"},{"person":"Reiter, Jennifer","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753914660"},{"person":"Renfrow, Stephanie","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796849613"},{"person":"Reukauf, Randy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n276714883"},{"person":"Richard, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3595"},{"person":"Richard, Erik","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1655982245"},{"person":"Richards, P G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1801"},{"person":"Rider, Mary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1501051647"},{"person":"Riesberg, Lon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057"},{"person":"Ringrose, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n69165236"},{"person":"Robbins, Mark","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1250170131"},{"person":"Robbins, Stuart","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n559833574"},{"person":"Rogers, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107685763"},{"person":"Rosenshein, Miriam","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1953572127"},{"person":"Rottman, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1708643326"},{"person":"Roughton, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491"},{"person":"Rusch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n970911879"},{"person":"Ruske, Tim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n62569024"},{"person":"Rutkowski, Joel","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n412512658"},{"person":"Ryan, Sean","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1188565226"},{"person":"Sainsbury, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1293656385"},{"person":"Salcido, Crystal","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1490162473"},{"person":"Samaripa, Byron","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1993740978"},{"person":"Sand, Susan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428876202"},{"person":"Sarris, Theodore","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1264895617"},{"person":"Sawyer, Christopher","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2115528787"},{"person":"Schelz, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n340499533"},{"person":"Schiller, Quintin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052186645"},{"person":"Schloesser, Emily","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1000340179"},{"person":"Schmidt, Sebastian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330547662"},{"person":"Schmutz, W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3012"},{"person":"Schneider, Nick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917838557"},{"person":"Schrijver, C J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2311"},{"person":"Schuehle, U","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100"},{"person":"Seidel, Durbin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1617731339"},{"person":"Sheiko, Nathan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1624617909"},{"person":"Shu, Anthony","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2081552666"},{"person":"Sicken, Patti","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1507994595"},{"person":"Siler, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823187793"},{"person":"Simmons, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n810031199"},{"person":"Simons-Brown, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1159306400"},{"person":"Sims, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1526911137"},{"person":"Sittler, E C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1367"},{"person":"Slipski, Marek","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850769182"},{"person":"Smith, Dona","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n256748745"},{"person":"Smith, Doug","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513997220"},{"person":"Smith, Jamison","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1146627975"},{"person":"Smith, Pat","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523165414"},{"person":"Smith, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n658738358"},{"person":"Snow, Jake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n588964680"},{"person":"Snow, Marty","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n429119084"},{"person":"Solanki, S K","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7362"},{"person":"Solomon, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n383047709"},{"person":"Song, Shi","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1483702429"},{"person":"Soto Hoffmann, Patricia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1971283737"},{"person":"Soukhovei, Vladislav","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1373936880"},{"person":"Sparhawk, Lisa","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648087653"},{"person":"Sparn, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1428120649"},{"person":"Spivey, Jerry","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2053763554"},{"person":"Springfield, Karen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n713855563"},{"person":"Spurgeon, Justin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2014728592"},{"person":"Sremcevic, Miodrag","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n484618802"},{"person":"Stawarz, Julia","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n78726096"},{"person":"Stearns, John","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1089353141"},{"person":"Steffl, A J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6059"},{"person":"Steg, Steve","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1580269363"},{"person":"Sternovsky, Zoltan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465061973"},{"person":"Stewart, Colin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474554423"},{"person":"Stewart, Glen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1314757256"},{"person":"Stewart, Ian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1672736625"},{"person":"Stimpfling, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n490092760"},{"person":"Stone, Jordan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1382272449"},{"person":"Street, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n205732767"},{"person":"Sturner, Andrew","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n975471748"},{"person":"Su, Y J","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7203"},{"person":"Summers, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115343616"},{"person":"Swieter, Dwayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1192815390"},{"person":"Szalay, Jamey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916260001"},{"person":"Tate, Gail","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n268766314"},{"person":"Taylor, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n716030637"},{"person":"Taylor, Trent","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n507926942"},{"person":"Templeman, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053"},{"person":"Theiling, Dale","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1523846463"},{"person":"Thiede, Jon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n107799568"},{"person":"Thiemann, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070599412"},{"person":"Thomas, Evan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1113966394"},{"person":"Thomas, Gary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n320506707"},{"person":"Thompson, Cassidy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485924204"},{"person":"Thomsen, M F","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3367"},{"person":"Thuillier, G","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1553"},{"person":"Tighe, Wayne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1537989152"},{"person":"Tilevitz, Chana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705385187"},{"person":"Tokar, R L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7508"},{"person":"Tolea, Alin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n884210681"},{"person":"Toon, Brian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845246448"},{"person":"Traver, Tyler","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712"},{"person":"Triplett, Matt","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1386835492"},{"person":"Troxel, Kathy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242954374"},{"person":"Tseng, W L","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6708"},{"person":"Tucker, Scott","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1007186618"},{"person":"Ucker, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971611210"},{"person":"Unruh, Y C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2086"},{"person":"Valentine, Robert","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n753432826"},{"person":"Van Orden, William","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n183811506"},{"person":"Vanderburgh, Abraham","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281302864"},{"person":"Vanier, Blake","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n585326394"},{"person":"Vermeer, Bill","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n566962202"},{"person":"Vertovec, Audrey","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914550976"},{"person":"Vial, J C","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7086"},{"person":"Villabona, Timothy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1116996073"},{"person":"Vincent, Tracy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1191377000"},{"person":"Wade, Stacy","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1473474892"},{"person":"Wahlund, J E","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4697"},{"person":"Wanamaker, Isaac","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799142869"},{"person":"Wang, Xu","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443866291"},{"person":"Weber, M","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5279"},{"person":"Wehner, Zachary","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1397764181"},{"person":"Welch, Dave","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115139280"},{"person":"Werdel, Brandon","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n653143342"},{"person":"Wescott, David","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n798247984"},{"person":"Westfall, Jim","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1987838283"},{"person":"White, Neil","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1283020055"},{"person":"White, Oran R","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3911"},{"person":"Whitman, Dylan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1640855746"},{"person":"Wieman, S","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3791"},{"person":"Wiesman, Brett","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n852217263"},{"person":"Wilder, Frederick","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n754212791"},{"person":"Williams, Ethan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1310654820"},{"person":"Williams, Forrest","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n575366074"},{"person":"Williamson, Eleanor","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1118370667"},{"person":"Wilson, Anne","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1869681270"},{"person":"Wilson, Rob","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n220165430"},{"person":"Wise, Peter","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n691938741"},{"person":"Withnell, Pete","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1298706407"},{"person":"Wolf, Eric","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n221861851"},{"person":"Wood, Erin","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1184521804"},{"person":"Woodraska, Don","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n626213350"},{"person":"Woods, Tom","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1031294282"},{"person":"Worel, Shana","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n804667043"},{"person":"Wright, Greg","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1532824368"},{"person":"Wright, Logan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1342215268"},{"person":"Wrigley, Ray","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1585441073"},{"person":"Wullschleger, Ed","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n325914072"},{"person":"Yaptengco, Jonnie Lynn","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n850764044"},{"person":"Yau, A W","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3676"},{"person":"Yehle, Alan","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2096276531"},{"person":"Yoo, Kenny","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845055650"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3668"},{"person":"Young, D T","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5764"},{"person":"Young, Jason","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n912403582"},{"person":"Yu, Pengfei","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n362772828"},{"person":"Zhao, Hong","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1496019964"},{"person":"Zhu, Yunqian","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1936941023"},{"person":"Ziegler, Stephen","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815934722"},{"person":"Zucker, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562915827"},{"person":"deFalco, Paul","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168824921"}]));
        expect(JSON.stringify(QuickSearchFilter(inputHaystack, "michael", "person"))).toEqual(JSON.stringify([{"person":"Bonnici, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1261402531"},{"person":"Chaffin, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n489093530"},{"person":"Cox, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931"},{"person":"Hutchison, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372190417"},{"person":"King, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2130392723"},{"person":"Klapetzky, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1906366491"},{"person":"Zucker, Michael","uri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562915827"}]));
        expect(QuickSearchFilter(inputHaystack, "elsborg", "person").length).toEqual(1);
        expect(QuickSearchFilter(inputHaystack, "tyl tra", "person").length).toEqual(1);
        expect(QuickSearchFilter(inputHaystack, "tyler", "person").length).toEqual(4);
        expect(QuickSearchFilter(inputHaystack, "        michael  ", "person").length).toEqual(7);
      }));
      it("filters Skills on search input as we would expect",inject(function(QuickSearchFilter) {
        //arrange: given this fake data...
      var inputHaystack = [{"skill":"AMCharts","levels":[{"skilllevel":"AMCharts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439479224"},{"skilllevel":"AMCharts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2088524822"},{"skilllevel":"AMCharts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1269075514"},{"skilllevel":"AMCharts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1117711741"},{"skilllevel":"AMCharts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115838072"}]},{"skill":"Adobe Forms","levels":[{"skilllevel":"Adobe Forms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1143045369"},{"skilllevel":"Adobe Forms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n28344951"},{"skilllevel":"Adobe Forms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1934609946"},{"skilllevel":"Adobe Forms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799459865"},{"skilllevel":"Adobe Forms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n981057267"}]},{"skill":"Angular","levels":[{"skilllevel":"Angular (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1135254945"},{"skilllevel":"Angular advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1836477458"},{"skilllevel":"Angular beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n994473475"},{"skilllevel":"Angular guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1671030649"},{"skilllevel":"Angular intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2122206999"}]},{"skill":"Astronomical Algorithms","levels":[{"skilllevel":"Astronomical Algorithms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1795663283"},{"skilllevel":"Astronomical Algorithms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1398263944"},{"skilllevel":"Astronomical Algorithms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n637392457"},{"skilllevel":"Astronomical Algorithms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n843890716"},{"skilllevel":"Astronomical Algorithms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1762201346"}]},{"skill":"Audio Recording","levels":[{"skilllevel":"Audio Recording (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850885710"},{"skilllevel":"Audio Recording advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n390887168"},{"skilllevel":"Audio Recording beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1619045870"},{"skilllevel":"Audio Recording guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n22386644"},{"skilllevel":"Audio Recording intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530821507"}]},{"skill":"C","levels":[{"skilllevel":"C (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793602038"},{"skilllevel":"C advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1026055000"},{"skilllevel":"C beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2116726559"},{"skilllevel":"C guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1337968289"},{"skilllevel":"C intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n591116589"}]},{"skill":"C Shell","levels":[{"skilllevel":"C Shell (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n960721007"},{"skilllevel":"C Shell advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n225932203"},{"skilllevel":"C Shell beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n18978706"},{"skilllevel":"C Shell guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2046173907"},{"skilllevel":"C Shell intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185"}]},{"skill":"C++","levels":[{"skilllevel":"C++ (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2001992658"},{"skilllevel":"C++ advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n906704525"},{"skilllevel":"C++ beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n455885633"},{"skilllevel":"C++ guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n370638602"},{"skilllevel":"C++ intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632168803"}]},{"skill":"CDF","levels":[{"skilllevel":"CDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n887666611"},{"skilllevel":"CDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n495602294"},{"skilllevel":"CDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n445798236"},{"skilllevel":"CDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1999962869"},{"skilllevel":"CDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n468207266"}]},{"skill":"CSTOL","levels":[{"skilllevel":"CSTOL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n580119452"},{"skilllevel":"CSTOL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n377484763"},{"skilllevel":"CSTOL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n647556400"},{"skilllevel":"CSTOL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n645781042"},{"skilllevel":"CSTOL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815630262"}]},{"skill":"CVS","levels":[{"skilllevel":"CVS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n777645831"},{"skilllevel":"CVS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n874325827"},{"skilllevel":"CVS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91451367"},{"skilllevel":"CVS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n301452772"},{"skilllevel":"CVS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844881810"}]},{"skill":"Confluence","levels":[{"skilllevel":"Confluence (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n169192069"},{"skilllevel":"Confluence advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1681131761"},{"skilllevel":"Confluence beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1601745543"},{"skilllevel":"Confluence guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1994142933"},{"skilllevel":"Confluence intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n664178855"}]},{"skill":"Contracts","levels":[{"skilllevel":"Contracts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059460543"},{"skilllevel":"Contracts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n319092444"},{"skilllevel":"Contracts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003402286"},{"skilllevel":"Contracts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530927661"},{"skilllevel":"Contracts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1556206671"}]},{"skill":"DNS - Domain Name Service","levels":[{"skilllevel":"DNS - Domain Name Service (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019188668"},{"skilllevel":"DNS - Domain Name Service advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1606242612"},{"skilllevel":"DNS - Domain Name Service beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n487555171"},{"skilllevel":"DNS - Domain Name Service guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1591325689"},{"skilllevel":"DNS - Domain Name Service intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1183992693"}]},{"skill":"Deltek COBRA","levels":[{"skilllevel":"Deltek COBRA (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1060861762"},{"skilllevel":"Deltek COBRA advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1289942474"},{"skilllevel":"Deltek COBRA beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1737266517"},{"skilllevel":"Deltek COBRA guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n683068403"},{"skilllevel":"Deltek COBRA intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996134548"}]},{"skill":"DreamWeaver","levels":[{"skilllevel":"DreamWeaver (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513352046"},{"skilllevel":"DreamWeaver advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1203072807"},{"skilllevel":"DreamWeaver beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1074476742"},{"skilllevel":"DreamWeaver guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n327939122"},{"skilllevel":"DreamWeaver intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417437827"}]},{"skill":"Dygraphs","levels":[{"skilllevel":"Dygraphs (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n859963165"},{"skilllevel":"Dygraphs advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1568905926"},{"skilllevel":"Dygraphs beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996489377"},{"skilllevel":"Dygraphs guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n904901577"},{"skilllevel":"Dygraphs intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023679351"}]},{"skill":"ENVI","levels":[{"skilllevel":"ENVI (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705633567"},{"skilllevel":"ENVI advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791169703"},{"skilllevel":"ENVI beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460110611"},{"skilllevel":"ENVI guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1933582934"},{"skilllevel":"ENVI intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1730570217"}]},{"skill":"FORTRAN","levels":[{"skilllevel":"FORTRAN (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1636482519"},{"skilllevel":"FORTRAN advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1694332440"},{"skilllevel":"FORTRAN beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443098442"},{"skilllevel":"FORTRAN guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796173201"},{"skilllevel":"FORTRAN intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199"}]},{"skill":"Fisheye/Crucible","levels":[{"skilllevel":"Fisheye/Crucible (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n545321976"},{"skilllevel":"Fisheye/Crucible advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1649778122"},{"skilllevel":"Fisheye/Crucible beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n481615982"},{"skilllevel":"Fisheye/Crucible guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1773876386"},{"skilllevel":"Fisheye/Crucible intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1836921231"}]},{"skill":"Flash","levels":[{"skilllevel":"Flash (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100403272"},{"skilllevel":"Flash advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1910328820"},{"skilllevel":"Flash beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1722358499"},{"skilllevel":"Flash guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n830992144"},{"skilllevel":"Flash intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1452874899"}]},{"skill":"Google Forms","levels":[{"skilllevel":"Google Forms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n296568149"},{"skilllevel":"Google Forms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187816219"},{"skilllevel":"Google Forms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n586712661"},{"skilllevel":"Google Forms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1792037604"},{"skilllevel":"Google Forms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485541935"}]},{"skill":"Grants","levels":[{"skilllevel":"Grants (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1706539070"},{"skilllevel":"Grants advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n502212599"},{"skilllevel":"Grants beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1591706475"},{"skilllevel":"Grants guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1747849534"},{"skilllevel":"Grants intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n473101934"}]},{"skill":"Graphical User Interface (GUI) design","levels":[{"skilllevel":"Graphical User Interface (GUI) design (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n440619623"},{"skilllevel":"Graphical User Interface (GUI) design advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1846193957"},{"skilllevel":"Graphical User Interface (GUI) design beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n969597673"},{"skilllevel":"Graphical User Interface (GUI) design guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n470903593"},{"skilllevel":"Graphical User Interface (GUI) design intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824061673"}]},{"skill":"Greenhopper","levels":[{"skilllevel":"Greenhopper (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n674121804"},{"skilllevel":"Greenhopper advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1458590281"},{"skilllevel":"Greenhopper beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n743299727"},{"skilllevel":"Greenhopper guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n33149245"},{"skilllevel":"Greenhopper intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1621503107"}]},{"skill":"HDF","levels":[{"skilllevel":"HDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525201002"},{"skilllevel":"HDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n561508048"},{"skilllevel":"HDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446544932"},{"skilllevel":"HDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n642895041"},{"skilllevel":"HDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n181977816"}]},{"skill":"HTML5","levels":[{"skilllevel":"HTML5 (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n738198172"},{"skilllevel":"HTML5 advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1182983491"},{"skilllevel":"HTML5 beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782921057"},{"skilllevel":"HTML5 guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n286927675"},{"skilllevel":"HTML5 intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2144932849"}]},{"skill":"HighCharts","levels":[{"skilllevel":"HighCharts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003879660"},{"skilllevel":"HighCharts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n528825677"},{"skilllevel":"HighCharts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n514540812"},{"skilllevel":"HighCharts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n348862312"},{"skilllevel":"HighCharts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976111064"}]},{"skill":"Hudson / Jenkins","levels":[{"skilllevel":"Hudson / Jenkins (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1737437541"},{"skilllevel":"Hudson / Jenkins advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n552016427"},{"skilllevel":"Hudson / Jenkins beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242391364"},{"skilllevel":"Hudson / Jenkins guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1784251736"},{"skilllevel":"Hudson / Jenkins intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2041232720"}]},{"skill":"IDL","levels":[{"skilllevel":"IDL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1087137639"},{"skilllevel":"IDL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536"},{"skilllevel":"IDL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738"},{"skilllevel":"IDL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1101836142"},{"skilllevel":"IDL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187718791"}]},{"skill":"JIRA","levels":[{"skilllevel":"JIRA (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n315190482"},{"skilllevel":"JIRA advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n34465221"},{"skilllevel":"JIRA beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004191433"},{"skilllevel":"JIRA guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1080774604"},{"skilllevel":"JIRA intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1149926731"}]},{"skill":"Java","levels":[{"skilllevel":"Java (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n250976479"},{"skilllevel":"Java (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477"},{"skilllevel":"Java advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1074486432"},{"skilllevel":"Java advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1613"},{"skilllevel":"Java beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n323417929"},{"skilllevel":"Java beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091"},{"skilllevel":"Java guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2416"},{"skilllevel":"Java guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246415042"},{"skilllevel":"Java intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570471527"},{"skilllevel":"Java intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5409"}]},{"skill":"Javascript","levels":[{"skilllevel":"Javascript (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749531629"},{"skilllevel":"Javascript advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n121234857"},{"skilllevel":"Javascript beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2069783663"},{"skilllevel":"Javascript guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n421925993"},{"skilllevel":"Javascript intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611"}]},{"skill":"Klocwork Insight","levels":[{"skilllevel":"Klocwork Insight (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1812336606"},{"skilllevel":"Klocwork Insight advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1606046839"},{"skilllevel":"Klocwork Insight beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1327292223"},{"skilllevel":"Klocwork Insight guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n130720797"},{"skilllevel":"Klocwork Insight intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1127207099"}]},{"skill":"LAPIS","levels":[{"skilllevel":"LAPIS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502183070"},{"skilllevel":"LAPIS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1363606303"},{"skilllevel":"LAPIS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n910650024"},{"skilllevel":"LAPIS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n963358014"},{"skilllevel":"LAPIS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n210389538"}]},{"skill":"LabView","levels":[{"skilllevel":"LabView (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872560217"},{"skilllevel":"LabView advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1734042133"},{"skilllevel":"LabView beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n958593504"},{"skilllevel":"LabView guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012557516"},{"skilllevel":"LabView intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1729689433"}]},{"skill":"Least Squares Fitting","levels":[{"skilllevel":"Least Squares Fitting (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1806846241"},{"skilllevel":"Least Squares Fitting advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154172632"},{"skilllevel":"Least Squares Fitting beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n848923856"},{"skilllevel":"Least Squares Fitting guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453811035"},{"skilllevel":"Least Squares Fitting intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n563249855"}]},{"skill":"Linux","levels":[{"skilllevel":"Linux (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1003796096"},{"skilllevel":"Linux advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2100386976"},{"skilllevel":"Linux beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n102309501"},{"skilllevel":"Linux guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1574739549"},{"skilllevel":"Linux intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087"}]},{"skill":"MacOS","levels":[{"skilllevel":"MacOS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n257741671"},{"skilllevel":"MacOS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036406957"},{"skilllevel":"MacOS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1094760625"},{"skilllevel":"MacOS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1086823868"},{"skilllevel":"MacOS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845544070"}]},{"skill":"Matlab","levels":[{"skilllevel":"Matlab (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1574568149"},{"skilllevel":"Matlab advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916250560"},{"skilllevel":"Matlab beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n982331912"},{"skilllevel":"Matlab guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n234619747"},{"skilllevel":"Matlab intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n387374551"}]},{"skill":"Metastorm","levels":[{"skilllevel":"Metastorm (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1561677047"},{"skilllevel":"Metastorm advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n377306649"},{"skilllevel":"Metastorm beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n726056373"},{"skilllevel":"Metastorm guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n270444721"},{"skilllevel":"Metastorm intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1834976109"}]},{"skill":"Microsoft Excel","levels":[{"skilllevel":"Microsoft Excel (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728291009"},{"skilllevel":"Microsoft Excel advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n549514676"},{"skilllevel":"Microsoft Excel beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2038895378"},{"skilllevel":"Microsoft Excel guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352583939"},{"skilllevel":"Microsoft Excel intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927066295"}]},{"skill":"Microsoft OneNote","levels":[{"skilllevel":"Microsoft OneNote (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115305060"},{"skilllevel":"Microsoft OneNote advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n330270900"},{"skilllevel":"Microsoft OneNote beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850432041"},{"skilllevel":"Microsoft OneNote guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n31966338"},{"skilllevel":"Microsoft OneNote intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n202128694"}]},{"skill":"Microsoft PowerPoint","levels":[{"skilllevel":"Microsoft PowerPoint (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n601023829"},{"skilllevel":"Microsoft PowerPoint advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1573553938"},{"skilllevel":"Microsoft PowerPoint beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n401762512"},{"skilllevel":"Microsoft PowerPoint guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1679272387"},{"skilllevel":"Microsoft PowerPoint intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2132356262"}]},{"skill":"Microsoft Project","levels":[{"skilllevel":"Microsoft Project (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1549151088"},{"skilllevel":"Microsoft Project advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12846418"},{"skilllevel":"Microsoft Project beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1275511200"},{"skilllevel":"Microsoft Project guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n830332280"},{"skilllevel":"Microsoft Project intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n342920979"}]},{"skill":"Microsoft Windows","levels":[{"skilllevel":"Microsoft Windows (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1893090861"},{"skilllevel":"Microsoft Windows advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1492519565"},{"skilllevel":"Microsoft Windows beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1658078054"},{"skilllevel":"Microsoft Windows guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n944265434"},{"skilllevel":"Microsoft Windows intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207841270"}]},{"skill":"Microsoft Word","levels":[{"skilllevel":"Microsoft Word (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1858761653"},{"skilllevel":"Microsoft Word advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n341709716"},{"skilllevel":"Microsoft Word beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n873329460"},{"skilllevel":"Microsoft Word guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n881800927"},{"skilllevel":"Microsoft Word intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2131579087"}]},{"skill":"MySQL","levels":[{"skilllevel":"MySQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1326691645"},{"skilllevel":"MySQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1300325321"},{"skilllevel":"MySQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1107210262"},{"skilllevel":"MySQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n216062184"},{"skilllevel":"MySQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921"}]},{"skill":"Numerical Recipes","levels":[{"skilllevel":"Numerical Recipes (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607410337"},{"skilllevel":"Numerical Recipes advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n394713168"},{"skilllevel":"Numerical Recipes beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741962757"},{"skilllevel":"Numerical Recipes guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1979520237"},{"skilllevel":"Numerical Recipes intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840"}]},{"skill":"Numerical methods","levels":[{"skilllevel":"Numerical methods (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n203604722"},{"skilllevel":"Numerical methods advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1413713087"},{"skilllevel":"Numerical methods beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1343726345"},{"skilllevel":"Numerical methods guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2045720713"},{"skilllevel":"Numerical methods intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n667100965"}]},{"skill":"Object Oriented Software Engineering","levels":[{"skilllevel":"Object Oriented Software Engineering (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n420844594"},{"skilllevel":"Object Oriented Software Engineering advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n980752808"},{"skilllevel":"Object Oriented Software Engineering beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n378387660"},{"skilllevel":"Object Oriented Software Engineering guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1696704915"},{"skilllevel":"Object Oriented Software Engineering intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1704908319"}]},{"skill":"Oracle","levels":[{"skilllevel":"Oracle (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749463434"},{"skilllevel":"Oracle advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465053752"},{"skilllevel":"Oracle beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n643546038"},{"skilllevel":"Oracle guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1297217083"},{"skilllevel":"Oracle intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372628957"}]},{"skill":"Orbit / Attitude Algorithms","levels":[{"skilllevel":"Orbit / Attitude Algorithms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n364813779"},{"skilllevel":"Orbit / Attitude Algorithms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n922046728"},{"skilllevel":"Orbit / Attitude Algorithms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5427509"},{"skilllevel":"Orbit / Attitude Algorithms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198873636"},{"skilllevel":"Orbit / Attitude Algorithms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2032542125"}]},{"skill":"PHP","levels":[{"skilllevel":"PHP (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2185"},{"skilllevel":"PHP advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3970"},{"skilllevel":"PHP beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6849"},{"skilllevel":"PHP guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15074"},{"skilllevel":"PHP intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363"}]},{"skill":"Photography","levels":[{"skilllevel":"Photography (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n113250758"},{"skilllevel":"Photography advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633382078"},{"skilllevel":"Photography beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1438661270"},{"skilllevel":"Photography guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1144259820"},{"skilllevel":"Photography intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1727916947"}]},{"skill":"PostgreSQL","levels":[{"skilllevel":"PostgreSQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1764629184"},{"skilllevel":"PostgreSQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n644096346"},{"skilllevel":"PostgreSQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823456412"},{"skilllevel":"PostgreSQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952124056"},{"skilllevel":"PostgreSQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19546766"}]},{"skill":"Procurement","levels":[{"skilllevel":"Procurement (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1348665024"},{"skilllevel":"Procurement advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299218139"},{"skilllevel":"Procurement beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1484913265"},{"skilllevel":"Procurement guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793306753"},{"skilllevel":"Procurement intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229755004"}]},{"skill":"Proposal Writing","levels":[{"skilllevel":"Proposal Writing (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732438413"},{"skilllevel":"Proposal Writing advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n469342427"},{"skilllevel":"Proposal Writing beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n755932066"},{"skilllevel":"Proposal Writing guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971192723"},{"skilllevel":"Proposal Writing intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1810899944"}]},{"skill":"Python","levels":[{"skilllevel":"Python (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1518348383"},{"skilllevel":"Python (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6338"},{"skilllevel":"Python advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3965"},{"skilllevel":"Python advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n531394462"},{"skilllevel":"Python beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7283"},{"skilllevel":"Python beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313"},{"skilllevel":"Python guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n324855540"},{"skilllevel":"Python guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7173"},{"skilllevel":"Python intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424885468"},{"skilllevel":"Python intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6934"}]},{"skill":"RCS","levels":[{"skilllevel":"RCS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648456383"},{"skilllevel":"RCS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2047507411"},{"skilllevel":"RCS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1446893445"},{"skilllevel":"RCS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n908413896"},{"skilllevel":"RCS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890219573"}]},{"skill":"Relational Database Application Development","levels":[{"skilllevel":"Relational Database Application Development (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21061795"},{"skilllevel":"Relational Database Application Development advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154717227"},{"skilllevel":"Relational Database Application Development beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2099264145"},{"skilllevel":"Relational Database Application Development guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n151581269"},{"skilllevel":"Relational Database Application Development intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701203852"}]},{"skill":"Relational Database Design","levels":[{"skilllevel":"Relational Database Design (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1062976249"},{"skilllevel":"Relational Database Design advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1746324127"},{"skilllevel":"Relational Database Design beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434908470"},{"skilllevel":"Relational Database Design guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n232262040"},{"skilllevel":"Relational Database Design intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1647277519"}]},{"skill":"Ruby","levels":[{"skilllevel":"Ruby (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749583954"},{"skilllevel":"Ruby (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5026"},{"skilllevel":"Ruby advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961399363"},{"skilllevel":"Ruby advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85"},{"skilllevel":"Ruby beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1541694823"},{"skilllevel":"Ruby beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n492"},{"skilllevel":"Ruby guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562841965"},{"skilllevel":"Ruby guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3579"},{"skilllevel":"Ruby intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n123506868"},{"skilllevel":"Ruby intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3952"}]},{"skill":"SPARQL","levels":[{"skilllevel":"SPARQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n9258"},{"skilllevel":"SPARQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3207"},{"skilllevel":"SPARQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3572"},{"skilllevel":"SPARQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7213"},{"skilllevel":"SPARQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3976"}]},{"skill":"SQL","levels":[{"skilllevel":"SQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454"},{"skilllevel":"SQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565"},{"skilllevel":"SQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12007"},{"skilllevel":"SQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728"},{"skilllevel":"SQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2651"}]},{"skill":"Scala","levels":[{"skilllevel":"Scala (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513873979"},{"skilllevel":"Scala advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330698146"},{"skilllevel":"Scala beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1627743057"},{"skilllevel":"Scala guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1590998608"},{"skilllevel":"Scala intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2099386419"}]},{"skill":"Science Algorithm Development","levels":[{"skilllevel":"Science Algorithm Development (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336617474"},{"skilllevel":"Science Algorithm Development advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001"},{"skilllevel":"Science Algorithm Development beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1101287218"},{"skilllevel":"Science Algorithm Development guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n769254267"},{"skilllevel":"Science Algorithm Development intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1870781320"}]},{"skill":"SharePoint","levels":[{"skilllevel":"SharePoint (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n915511558"},{"skilllevel":"SharePoint advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n416848843"},{"skilllevel":"SharePoint beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2042036714"},{"skilllevel":"SharePoint guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n379581646"},{"skilllevel":"SharePoint intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n992690117"}]},{"skill":"Solaris","levels":[{"skilllevel":"Solaris (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525809816"},{"skilllevel":"Solaris advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1771893770"},{"skilllevel":"Solaris beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1849778210"},{"skilllevel":"Solaris guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665913127"},{"skilllevel":"Solaris intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1487833516"}]},{"skill":"Structured Query Language (SQL)","levels":[{"skilllevel":"Structured Query Language (SQL) (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198943528"},{"skilllevel":"Structured Query Language (SQL) advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2056391629"},{"skilllevel":"Structured Query Language (SQL) beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107484853"},{"skilllevel":"Structured Query Language (SQL) guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n547846283"},{"skilllevel":"Structured Query Language (SQL) intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1704091589"}]},{"skill":"Subversion","levels":[{"skilllevel":"Subversion (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1946395419"},{"skilllevel":"Subversion advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2134894538"},{"skilllevel":"Subversion beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n920242555"},{"skilllevel":"Subversion guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n324520520"},{"skilllevel":"Subversion intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330304752"}]},{"skill":"SunRays","levels":[{"skilllevel":"SunRays (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1727557509"},{"skilllevel":"SunRays advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n631403184"},{"skilllevel":"SunRays beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1346865514"},{"skilllevel":"SunRays guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1927603394"},{"skilllevel":"SunRays intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n365371672"}]},{"skill":"Sybase","levels":[{"skilllevel":"Sybase (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n467937305"},{"skilllevel":"Sybase advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1859553074"},{"skilllevel":"Sybase beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n718212954"},{"skilllevel":"Sybase guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n881771531"},{"skilllevel":"Sybase intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168524923"}]},{"skill":"TeamCity","levels":[{"skilllevel":"TeamCity (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578708216"},{"skilllevel":"TeamCity advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951208546"},{"skilllevel":"TeamCity beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052528994"},{"skilllevel":"TeamCity guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142570208"},{"skilllevel":"TeamCity intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1365886265"}]},{"skill":"UNIX","levels":[{"skilllevel":"UNIX (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4060"},{"skilllevel":"UNIX (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n444108825"},{"skilllevel":"UNIX advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15773"},{"skilllevel":"UNIX advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038"},{"skilllevel":"UNIX beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1811330000"},{"skilllevel":"UNIX beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n506"},{"skilllevel":"UNIX guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1023625925"},{"skilllevel":"UNIX guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n16192"},{"skilllevel":"UNIX intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1515330233"},{"skilllevel":"UNIX intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5925"}]},{"skill":"Unified Modeling Language (UML)","levels":[{"skilllevel":"Unified Modeling Language (UML) (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917408733"},{"skilllevel":"Unified Modeling Language (UML) advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1440990092"},{"skilllevel":"Unified Modeling Language (UML) beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1453088749"},{"skilllevel":"Unified Modeling Language (UML) guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1039162219"},{"skilllevel":"Unified Modeling Language (UML) intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1569894841"}]},{"skill":"VIVO","levels":[{"skilllevel":"VIVO (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n920844606"},{"skilllevel":"VIVO advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n690223823"},{"skilllevel":"VIVO beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n812057586"},{"skilllevel":"VIVO guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n390262573"},{"skilllevel":"VIVO intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1524740150"}]},{"skill":"Video Conferencing Equipment","levels":[{"skilllevel":"Video Conferencing Equipment (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n682118795"},{"skilllevel":"Video Conferencing Equipment advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1984479512"},{"skilllevel":"Video Conferencing Equipment beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1692483687"},{"skilllevel":"Video Conferencing Equipment guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n241032219"},{"skilllevel":"Video Conferencing Equipment intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1900691484"}]},{"skill":"Video Streaming","levels":[{"skilllevel":"Video Streaming (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n401501326"},{"skilllevel":"Video Streaming advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n813078861"},{"skilllevel":"Video Streaming beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n727958903"},{"skilllevel":"Video Streaming guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1292232260"},{"skilllevel":"Video Streaming intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n61105148"}]},{"skill":"Video recording","levels":[{"skilllevel":"Video recording (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n879539546"},{"skilllevel":"Video recording advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952735651"},{"skilllevel":"Video recording beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027647867"},{"skilllevel":"Video recording guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n668932657"},{"skilllevel":"Video recording intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657031559"}]},{"skill":"Web Certificates","levels":[{"skilllevel":"Web Certificates (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1394403846"},{"skilllevel":"Web Certificates advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1289679300"},{"skilllevel":"Web Certificates beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068955350"},{"skilllevel":"Web Certificates guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n755220436"},{"skilllevel":"Web Certificates intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1894130139"}]},{"skill":"Whole Disk Encryption","levels":[{"skilllevel":"Whole Disk Encryption (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n868532910"},{"skilllevel":"Whole Disk Encryption advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n603466448"},{"skilllevel":"Whole Disk Encryption beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1294021614"},{"skilllevel":"Whole Disk Encryption guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n827443162"},{"skilllevel":"Whole Disk Encryption intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1443446817"}]},{"skill":"Windows","levels":[{"skilllevel":"Windows (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n737689472"},{"skilllevel":"Windows advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n817410130"},{"skilllevel":"Windows beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1200655465"},{"skilllevel":"Windows guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1783661094"},{"skilllevel":"Windows intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n758853803"}]},{"skill":"Wordpress","levels":[{"skilllevel":"Wordpress (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824675433"},{"skilllevel":"Wordpress advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246712059"},{"skilllevel":"Wordpress beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2113348855"},{"skilllevel":"Wordpress guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n603445265"},{"skilllevel":"Wordpress intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1750133670"}]},{"skill":"XML","levels":[{"skilllevel":"XML (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n435809455"},{"skilllevel":"XML advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308372421"},{"skilllevel":"XML beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2010667509"},{"skilllevel":"XML guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1245379038"},{"skilllevel":"XML intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n869199825"}]},{"skill":"YourKit Java Profiler","levels":[{"skilllevel":"YourKit Java Profiler (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952946630"},{"skilllevel":"YourKit Java Profiler advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1328280097"},{"skilllevel":"YourKit Java Profiler beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2074846875"},{"skilllevel":"YourKit Java Profiler guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914368466"},{"skilllevel":"YourKit Java Profiler intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971784415"}]},{"skill":"ant","levels":[{"skilllevel":"ant (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n204347418"},{"skilllevel":"ant advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n126545019"},{"skilllevel":"ant beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1177272249"},{"skilllevel":"ant guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1785232066"},{"skilllevel":"ant intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1010880164"}]},{"skill":"bash","levels":[{"skilllevel":"bash (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n506329001"},{"skilllevel":"bash advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n973358142"},{"skilllevel":"bash beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n784818287"},{"skilllevel":"bash guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1232540464"},{"skilllevel":"bash intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n829159456"}]},{"skill":"netCDF","levels":[{"skilllevel":"netCDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1621791493"},{"skilllevel":"netCDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273549603"},{"skilllevel":"netCDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070145250"},{"skilllevel":"netCDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n194562462"},{"skilllevel":"netCDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876937350"}]},{"skill":"perl","levels":[{"skilllevel":"perl (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1064026058"},{"skilllevel":"perl advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1712511923"},{"skilllevel":"perl beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n923173688"},{"skilllevel":"perl guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n744724876"},{"skilllevel":"perl intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130"}]},{"skill":"tcsh","levels":[{"skilllevel":"tcsh (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632010458"},{"skilllevel":"tcsh advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352988386"},{"skilllevel":"tcsh beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1220194198"},{"skilllevel":"tcsh guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1001446887"},{"skilllevel":"tcsh intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n396073491"}]},{"skill":"wInsight","levels":[{"skilllevel":"wInsight (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062117007"},{"skilllevel":"wInsight advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n358560745"},{"skilllevel":"wInsight beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n239194321"},{"skilllevel":"wInsight guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1173580466"},{"skilllevel":"wInsight intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n862908734"}]},{"skill":"wikimedia","levels":[{"skilllevel":"wikimedia (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1853486041"},{"skilllevel":"wikimedia advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n876419576"},{"skilllevel":"wikimedia beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299767191"},{"skilllevel":"wikimedia guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474335554"},{"skilllevel":"wikimedia intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446453562"}]}];

        //act and assert
        expect(JSON.stringify(QuickSearchFilter(inputHaystack, "", "skill"))).toEqual(JSON.stringify([{"skill":"AMCharts","levels":[{"skilllevel":"AMCharts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n439479224"},{"skilllevel":"AMCharts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2088524822"},{"skilllevel":"AMCharts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1269075514"},{"skilllevel":"AMCharts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1117711741"},{"skilllevel":"AMCharts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115838072"}]},{"skill":"Adobe Forms","levels":[{"skilllevel":"Adobe Forms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1143045369"},{"skilllevel":"Adobe Forms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n28344951"},{"skilllevel":"Adobe Forms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1934609946"},{"skilllevel":"Adobe Forms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n799459865"},{"skilllevel":"Adobe Forms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n981057267"}]},{"skill":"Angular","levels":[{"skilllevel":"Angular (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1135254945"},{"skilllevel":"Angular advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1836477458"},{"skilllevel":"Angular beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n994473475"},{"skilllevel":"Angular guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1671030649"},{"skilllevel":"Angular intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2122206999"}]},{"skill":"Astronomical Algorithms","levels":[{"skilllevel":"Astronomical Algorithms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1795663283"},{"skilllevel":"Astronomical Algorithms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1398263944"},{"skilllevel":"Astronomical Algorithms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n637392457"},{"skilllevel":"Astronomical Algorithms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n843890716"},{"skilllevel":"Astronomical Algorithms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1762201346"}]},{"skill":"Audio Recording","levels":[{"skilllevel":"Audio Recording (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850885710"},{"skilllevel":"Audio Recording advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n390887168"},{"skilllevel":"Audio Recording beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1619045870"},{"skilllevel":"Audio Recording guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n22386644"},{"skilllevel":"Audio Recording intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530821507"}]},{"skill":"C","levels":[{"skilllevel":"C (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793602038"},{"skilllevel":"C advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1026055000"},{"skilllevel":"C beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2116726559"},{"skilllevel":"C guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1337968289"},{"skilllevel":"C intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n591116589"}]},{"skill":"C Shell","levels":[{"skilllevel":"C Shell (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n960721007"},{"skilllevel":"C Shell advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n225932203"},{"skilllevel":"C Shell beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n18978706"},{"skilllevel":"C Shell guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2046173907"},{"skilllevel":"C Shell intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185"}]},{"skill":"C++","levels":[{"skilllevel":"C++ (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2001992658"},{"skilllevel":"C++ advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n906704525"},{"skilllevel":"C++ beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n455885633"},{"skilllevel":"C++ guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n370638602"},{"skilllevel":"C++ intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632168803"}]},{"skill":"CDF","levels":[{"skilllevel":"CDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n887666611"},{"skilllevel":"CDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n495602294"},{"skilllevel":"CDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n445798236"},{"skilllevel":"CDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1999962869"},{"skilllevel":"CDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n468207266"}]},{"skill":"CSTOL","levels":[{"skilllevel":"CSTOL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n580119452"},{"skilllevel":"CSTOL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n377484763"},{"skilllevel":"CSTOL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n647556400"},{"skilllevel":"CSTOL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n645781042"},{"skilllevel":"CSTOL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n815630262"}]},{"skill":"CVS","levels":[{"skilllevel":"CVS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n777645831"},{"skilllevel":"CVS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n874325827"},{"skilllevel":"CVS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n91451367"},{"skilllevel":"CVS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n301452772"},{"skilllevel":"CVS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n844881810"}]},{"skill":"Confluence","levels":[{"skilllevel":"Confluence (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n169192069"},{"skilllevel":"Confluence advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1681131761"},{"skilllevel":"Confluence beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1601745543"},{"skilllevel":"Confluence guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1994142933"},{"skilllevel":"Confluence intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n664178855"}]},{"skill":"Contracts","levels":[{"skilllevel":"Contracts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2059460543"},{"skilllevel":"Contracts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n319092444"},{"skilllevel":"Contracts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003402286"},{"skilllevel":"Contracts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n530927661"},{"skilllevel":"Contracts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1556206671"}]},{"skill":"DNS - Domain Name Service","levels":[{"skilllevel":"DNS - Domain Name Service (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1019188668"},{"skilllevel":"DNS - Domain Name Service advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1606242612"},{"skilllevel":"DNS - Domain Name Service beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n487555171"},{"skilllevel":"DNS - Domain Name Service guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1591325689"},{"skilllevel":"DNS - Domain Name Service intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1183992693"}]},{"skill":"Deltek COBRA","levels":[{"skilllevel":"Deltek COBRA (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1060861762"},{"skilllevel":"Deltek COBRA advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1289942474"},{"skilllevel":"Deltek COBRA beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1737266517"},{"skilllevel":"Deltek COBRA guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n683068403"},{"skilllevel":"Deltek COBRA intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996134548"}]},{"skill":"DreamWeaver","levels":[{"skilllevel":"DreamWeaver (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513352046"},{"skilllevel":"DreamWeaver advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1203072807"},{"skilllevel":"DreamWeaver beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1074476742"},{"skilllevel":"DreamWeaver guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n327939122"},{"skilllevel":"DreamWeaver intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n417437827"}]},{"skill":"Dygraphs","levels":[{"skilllevel":"Dygraphs (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n859963165"},{"skilllevel":"Dygraphs advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1568905926"},{"skilllevel":"Dygraphs beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996489377"},{"skilllevel":"Dygraphs guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n904901577"},{"skilllevel":"Dygraphs intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2023679351"}]},{"skill":"ENVI","levels":[{"skilllevel":"ENVI (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n705633567"},{"skilllevel":"ENVI advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791169703"},{"skilllevel":"ENVI beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460110611"},{"skilllevel":"ENVI guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1933582934"},{"skilllevel":"ENVI intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1730570217"}]},{"skill":"FORTRAN","levels":[{"skilllevel":"FORTRAN (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1636482519"},{"skilllevel":"FORTRAN advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1694332440"},{"skilllevel":"FORTRAN beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n443098442"},{"skilllevel":"FORTRAN guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1796173201"},{"skilllevel":"FORTRAN intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199"}]},{"skill":"Fisheye/Crucible","levels":[{"skilllevel":"Fisheye/Crucible (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n545321976"},{"skilllevel":"Fisheye/Crucible advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1649778122"},{"skilllevel":"Fisheye/Crucible beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n481615982"},{"skilllevel":"Fisheye/Crucible guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1773876386"},{"skilllevel":"Fisheye/Crucible intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1836921231"}]},{"skill":"Flash","levels":[{"skilllevel":"Flash (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n100403272"},{"skilllevel":"Flash advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1910328820"},{"skilllevel":"Flash beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1722358499"},{"skilllevel":"Flash guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n830992144"},{"skilllevel":"Flash intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1452874899"}]},{"skill":"Google Forms","levels":[{"skilllevel":"Google Forms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n296568149"},{"skilllevel":"Google Forms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187816219"},{"skilllevel":"Google Forms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n586712661"},{"skilllevel":"Google Forms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1792037604"},{"skilllevel":"Google Forms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485541935"}]},{"skill":"Grants","levels":[{"skilllevel":"Grants (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1706539070"},{"skilllevel":"Grants advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n502212599"},{"skilllevel":"Grants beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1591706475"},{"skilllevel":"Grants guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1747849534"},{"skilllevel":"Grants intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n473101934"}]},{"skill":"Graphical User Interface (GUI) design","levels":[{"skilllevel":"Graphical User Interface (GUI) design (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n440619623"},{"skilllevel":"Graphical User Interface (GUI) design advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1846193957"},{"skilllevel":"Graphical User Interface (GUI) design beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n969597673"},{"skilllevel":"Graphical User Interface (GUI) design guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n470903593"},{"skilllevel":"Graphical User Interface (GUI) design intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824061673"}]},{"skill":"Greenhopper","levels":[{"skilllevel":"Greenhopper (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n674121804"},{"skilllevel":"Greenhopper advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1458590281"},{"skilllevel":"Greenhopper beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n743299727"},{"skilllevel":"Greenhopper guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n33149245"},{"skilllevel":"Greenhopper intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1621503107"}]},{"skill":"HDF","levels":[{"skilllevel":"HDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525201002"},{"skilllevel":"HDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n561508048"},{"skilllevel":"HDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446544932"},{"skilllevel":"HDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n642895041"},{"skilllevel":"HDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n181977816"}]},{"skill":"HTML5","levels":[{"skilllevel":"HTML5 (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n738198172"},{"skilllevel":"HTML5 advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1182983491"},{"skilllevel":"HTML5 beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1782921057"},{"skilllevel":"HTML5 guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n286927675"},{"skilllevel":"HTML5 intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2144932849"}]},{"skill":"HighCharts","levels":[{"skilllevel":"HighCharts (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003879660"},{"skilllevel":"HighCharts advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n528825677"},{"skilllevel":"HighCharts beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n514540812"},{"skilllevel":"HighCharts guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n348862312"},{"skilllevel":"HighCharts intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1976111064"}]},{"skill":"Hudson / Jenkins","levels":[{"skilllevel":"Hudson / Jenkins (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1737437541"},{"skilllevel":"Hudson / Jenkins advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n552016427"},{"skilllevel":"Hudson / Jenkins beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1242391364"},{"skilllevel":"Hudson / Jenkins guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1784251736"},{"skilllevel":"Hudson / Jenkins intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2041232720"}]},{"skill":"IDL","levels":[{"skilllevel":"IDL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1087137639"},{"skilllevel":"IDL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536"},{"skilllevel":"IDL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738"},{"skilllevel":"IDL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1101836142"},{"skilllevel":"IDL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187718791"}]},{"skill":"JIRA","levels":[{"skilllevel":"JIRA (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n315190482"},{"skilllevel":"JIRA advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n34465221"},{"skilllevel":"JIRA beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004191433"},{"skilllevel":"JIRA guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1080774604"},{"skilllevel":"JIRA intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1149926731"}]},{"skill":"Java","levels":[{"skilllevel":"Java (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n250976479"},{"skilllevel":"Java (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477"},{"skilllevel":"Java advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1074486432"},{"skilllevel":"Java advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1613"},{"skilllevel":"Java beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n323417929"},{"skilllevel":"Java beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091"},{"skilllevel":"Java guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2416"},{"skilllevel":"Java guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246415042"},{"skilllevel":"Java intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1570471527"},{"skilllevel":"Java intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5409"}]},{"skill":"Javascript","levels":[{"skilllevel":"Javascript (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749531629"},{"skilllevel":"Javascript advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n121234857"},{"skilllevel":"Javascript beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2069783663"},{"skilllevel":"Javascript guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n421925993"},{"skilllevel":"Javascript intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611"}]},{"skill":"Klocwork Insight","levels":[{"skilllevel":"Klocwork Insight (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1812336606"},{"skilllevel":"Klocwork Insight advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1606046839"},{"skilllevel":"Klocwork Insight beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1327292223"},{"skilllevel":"Klocwork Insight guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n130720797"},{"skilllevel":"Klocwork Insight intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1127207099"}]},{"skill":"LAPIS","levels":[{"skilllevel":"LAPIS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1502183070"},{"skilllevel":"LAPIS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1363606303"},{"skilllevel":"LAPIS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n910650024"},{"skilllevel":"LAPIS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n963358014"},{"skilllevel":"LAPIS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n210389538"}]},{"skill":"LabView","levels":[{"skilllevel":"LabView (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1872560217"},{"skilllevel":"LabView advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1734042133"},{"skilllevel":"LabView beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n958593504"},{"skilllevel":"LabView guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1012557516"},{"skilllevel":"LabView intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1729689433"}]},{"skill":"Least Squares Fitting","levels":[{"skilllevel":"Least Squares Fitting (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1806846241"},{"skilllevel":"Least Squares Fitting advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154172632"},{"skilllevel":"Least Squares Fitting beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n848923856"},{"skilllevel":"Least Squares Fitting guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n453811035"},{"skilllevel":"Least Squares Fitting intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n563249855"}]},{"skill":"Linux","levels":[{"skilllevel":"Linux (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1003796096"},{"skilllevel":"Linux advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2100386976"},{"skilllevel":"Linux beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n102309501"},{"skilllevel":"Linux guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1574739549"},{"skilllevel":"Linux intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087"}]},{"skill":"MacOS","levels":[{"skilllevel":"MacOS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n257741671"},{"skilllevel":"MacOS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036406957"},{"skilllevel":"MacOS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1094760625"},{"skilllevel":"MacOS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1086823868"},{"skilllevel":"MacOS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n845544070"}]},{"skill":"Matlab","levels":[{"skilllevel":"Matlab (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1574568149"},{"skilllevel":"Matlab advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916250560"},{"skilllevel":"Matlab beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n982331912"},{"skilllevel":"Matlab guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n234619747"},{"skilllevel":"Matlab intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n387374551"}]},{"skill":"Metastorm","levels":[{"skilllevel":"Metastorm (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1561677047"},{"skilllevel":"Metastorm advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n377306649"},{"skilllevel":"Metastorm beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n726056373"},{"skilllevel":"Metastorm guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n270444721"},{"skilllevel":"Metastorm intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1834976109"}]},{"skill":"Microsoft Excel","levels":[{"skilllevel":"Microsoft Excel (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728291009"},{"skilllevel":"Microsoft Excel advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n549514676"},{"skilllevel":"Microsoft Excel beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2038895378"},{"skilllevel":"Microsoft Excel guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352583939"},{"skilllevel":"Microsoft Excel intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927066295"}]},{"skill":"Microsoft OneNote","levels":[{"skilllevel":"Microsoft OneNote (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n115305060"},{"skilllevel":"Microsoft OneNote advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n330270900"},{"skilllevel":"Microsoft OneNote beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1850432041"},{"skilllevel":"Microsoft OneNote guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n31966338"},{"skilllevel":"Microsoft OneNote intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n202128694"}]},{"skill":"Microsoft PowerPoint","levels":[{"skilllevel":"Microsoft PowerPoint (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n601023829"},{"skilllevel":"Microsoft PowerPoint advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1573553938"},{"skilllevel":"Microsoft PowerPoint beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n401762512"},{"skilllevel":"Microsoft PowerPoint guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1679272387"},{"skilllevel":"Microsoft PowerPoint intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2132356262"}]},{"skill":"Microsoft Project","levels":[{"skilllevel":"Microsoft Project (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1549151088"},{"skilllevel":"Microsoft Project advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12846418"},{"skilllevel":"Microsoft Project beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1275511200"},{"skilllevel":"Microsoft Project guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n830332280"},{"skilllevel":"Microsoft Project intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n342920979"}]},{"skill":"Microsoft Windows","levels":[{"skilllevel":"Microsoft Windows (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1893090861"},{"skilllevel":"Microsoft Windows advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1492519565"},{"skilllevel":"Microsoft Windows beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1658078054"},{"skilllevel":"Microsoft Windows guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n944265434"},{"skilllevel":"Microsoft Windows intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n207841270"}]},{"skill":"Microsoft Word","levels":[{"skilllevel":"Microsoft Word (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1858761653"},{"skilllevel":"Microsoft Word advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n341709716"},{"skilllevel":"Microsoft Word beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n873329460"},{"skilllevel":"Microsoft Word guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n881800927"},{"skilllevel":"Microsoft Word intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2131579087"}]},{"skill":"MySQL","levels":[{"skilllevel":"MySQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1326691645"},{"skilllevel":"MySQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1300325321"},{"skilllevel":"MySQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1107210262"},{"skilllevel":"MySQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n216062184"},{"skilllevel":"MySQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921"}]},{"skill":"Numerical Recipes","levels":[{"skilllevel":"Numerical Recipes (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1607410337"},{"skilllevel":"Numerical Recipes advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n394713168"},{"skilllevel":"Numerical Recipes beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1741962757"},{"skilllevel":"Numerical Recipes guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1979520237"},{"skilllevel":"Numerical Recipes intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840"}]},{"skill":"Numerical methods","levels":[{"skilllevel":"Numerical methods (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n203604722"},{"skilllevel":"Numerical methods advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1413713087"},{"skilllevel":"Numerical methods beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1343726345"},{"skilllevel":"Numerical methods guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2045720713"},{"skilllevel":"Numerical methods intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n667100965"}]},{"skill":"Object Oriented Software Engineering","levels":[{"skilllevel":"Object Oriented Software Engineering (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n420844594"},{"skilllevel":"Object Oriented Software Engineering advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n980752808"},{"skilllevel":"Object Oriented Software Engineering beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n378387660"},{"skilllevel":"Object Oriented Software Engineering guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1696704915"},{"skilllevel":"Object Oriented Software Engineering intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1704908319"}]},{"skill":"Oracle","levels":[{"skilllevel":"Oracle (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749463434"},{"skilllevel":"Oracle advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465053752"},{"skilllevel":"Oracle beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n643546038"},{"skilllevel":"Oracle guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1297217083"},{"skilllevel":"Oracle intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n372628957"}]},{"skill":"Orbit / Attitude Algorithms","levels":[{"skilllevel":"Orbit / Attitude Algorithms (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n364813779"},{"skilllevel":"Orbit / Attitude Algorithms advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n922046728"},{"skilllevel":"Orbit / Attitude Algorithms beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5427509"},{"skilllevel":"Orbit / Attitude Algorithms guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198873636"},{"skilllevel":"Orbit / Attitude Algorithms intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2032542125"}]},{"skill":"PHP","levels":[{"skilllevel":"PHP (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2185"},{"skilllevel":"PHP advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3970"},{"skilllevel":"PHP beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6849"},{"skilllevel":"PHP guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15074"},{"skilllevel":"PHP intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363"}]},{"skill":"Photography","levels":[{"skilllevel":"Photography (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n113250758"},{"skilllevel":"Photography advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1633382078"},{"skilllevel":"Photography beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1438661270"},{"skilllevel":"Photography guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1144259820"},{"skilllevel":"Photography intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1727916947"}]},{"skill":"PostgreSQL","levels":[{"skilllevel":"PostgreSQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1764629184"},{"skilllevel":"PostgreSQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n644096346"},{"skilllevel":"PostgreSQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823456412"},{"skilllevel":"PostgreSQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952124056"},{"skilllevel":"PostgreSQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19546766"}]},{"skill":"Procurement","levels":[{"skilllevel":"Procurement (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1348665024"},{"skilllevel":"Procurement advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299218139"},{"skilllevel":"Procurement beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1484913265"},{"skilllevel":"Procurement guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793306753"},{"skilllevel":"Procurement intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1229755004"}]},{"skill":"Proposal Writing","levels":[{"skilllevel":"Proposal Writing (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1732438413"},{"skilllevel":"Proposal Writing advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n469342427"},{"skilllevel":"Proposal Writing beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n755932066"},{"skilllevel":"Proposal Writing guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971192723"},{"skilllevel":"Proposal Writing intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1810899944"}]},{"skill":"Python","levels":[{"skilllevel":"Python (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1518348383"},{"skilllevel":"Python (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6338"},{"skilllevel":"Python advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3965"},{"skilllevel":"Python advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n531394462"},{"skilllevel":"Python beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7283"},{"skilllevel":"Python beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313"},{"skilllevel":"Python guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n324855540"},{"skilllevel":"Python guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7173"},{"skilllevel":"Python intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424885468"},{"skilllevel":"Python intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6934"}]},{"skill":"RCS","levels":[{"skilllevel":"RCS (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1648456383"},{"skilllevel":"RCS advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2047507411"},{"skilllevel":"RCS beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1446893445"},{"skilllevel":"RCS guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n908413896"},{"skilllevel":"RCS intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n890219573"}]},{"skill":"Relational Database Application Development","levels":[{"skilllevel":"Relational Database Application Development (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n21061795"},{"skilllevel":"Relational Database Application Development advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154717227"},{"skilllevel":"Relational Database Application Development beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2099264145"},{"skilllevel":"Relational Database Application Development guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n151581269"},{"skilllevel":"Relational Database Application Development intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701203852"}]},{"skill":"Relational Database Design","levels":[{"skilllevel":"Relational Database Design (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1062976249"},{"skilllevel":"Relational Database Design advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1746324127"},{"skilllevel":"Relational Database Design beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n434908470"},{"skilllevel":"Relational Database Design guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n232262040"},{"skilllevel":"Relational Database Design intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1647277519"}]},{"skill":"Ruby","levels":[{"skilllevel":"Ruby (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749583954"},{"skilllevel":"Ruby (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5026"},{"skilllevel":"Ruby advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1961399363"},{"skilllevel":"Ruby advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n85"},{"skilllevel":"Ruby beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1541694823"},{"skilllevel":"Ruby beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n492"},{"skilllevel":"Ruby guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1562841965"},{"skilllevel":"Ruby guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3579"},{"skilllevel":"Ruby intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n123506868"},{"skilllevel":"Ruby intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3952"}]},{"skill":"SPARQL","levels":[{"skilllevel":"SPARQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n9258"},{"skilllevel":"SPARQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3207"},{"skilllevel":"SPARQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3572"},{"skilllevel":"SPARQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7213"},{"skilllevel":"SPARQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3976"}]},{"skill":"SQL","levels":[{"skilllevel":"SQL (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454"},{"skilllevel":"SQL advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565"},{"skilllevel":"SQL beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12007"},{"skilllevel":"SQL guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728"},{"skilllevel":"SQL intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2651"}]},{"skill":"Scala","levels":[{"skilllevel":"Scala (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1513873979"},{"skilllevel":"Scala advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330698146"},{"skilllevel":"Scala beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1627743057"},{"skilllevel":"Scala guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1590998608"},{"skilllevel":"Scala intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2099386419"}]},{"skill":"Science Algorithm Development","levels":[{"skilllevel":"Science Algorithm Development (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336617474"},{"skilllevel":"Science Algorithm Development advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001"},{"skilllevel":"Science Algorithm Development beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1101287218"},{"skilllevel":"Science Algorithm Development guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n769254267"},{"skilllevel":"Science Algorithm Development intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1870781320"}]},{"skill":"SharePoint","levels":[{"skilllevel":"SharePoint (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n915511558"},{"skilllevel":"SharePoint advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n416848843"},{"skilllevel":"SharePoint beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2042036714"},{"skilllevel":"SharePoint guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n379581646"},{"skilllevel":"SharePoint intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n992690117"}]},{"skill":"Solaris","levels":[{"skilllevel":"Solaris (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525809816"},{"skilllevel":"Solaris advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1771893770"},{"skilllevel":"Solaris beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1849778210"},{"skilllevel":"Solaris guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1665913127"},{"skilllevel":"Solaris intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1487833516"}]},{"skill":"Structured Query Language (SQL)","levels":[{"skilllevel":"Structured Query Language (SQL) (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198943528"},{"skilllevel":"Structured Query Language (SQL) advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2056391629"},{"skilllevel":"Structured Query Language (SQL) beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2107484853"},{"skilllevel":"Structured Query Language (SQL) guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n547846283"},{"skilllevel":"Structured Query Language (SQL) intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1704091589"}]},{"skill":"Subversion","levels":[{"skilllevel":"Subversion (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1946395419"},{"skilllevel":"Subversion advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2134894538"},{"skilllevel":"Subversion beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n920242555"},{"skilllevel":"Subversion guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n324520520"},{"skilllevel":"Subversion intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330304752"}]},{"skill":"SunRays","levels":[{"skilllevel":"SunRays (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1727557509"},{"skilllevel":"SunRays advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n631403184"},{"skilllevel":"SunRays beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1346865514"},{"skilllevel":"SunRays guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1927603394"},{"skilllevel":"SunRays intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n365371672"}]},{"skill":"Sybase","levels":[{"skilllevel":"Sybase (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n467937305"},{"skilllevel":"Sybase advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1859553074"},{"skilllevel":"Sybase beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n718212954"},{"skilllevel":"Sybase guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n881771531"},{"skilllevel":"Sybase intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168524923"}]},{"skill":"TeamCity","levels":[{"skilllevel":"TeamCity (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n578708216"},{"skilllevel":"TeamCity advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951208546"},{"skilllevel":"TeamCity beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1052528994"},{"skilllevel":"TeamCity guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2142570208"},{"skilllevel":"TeamCity intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1365886265"}]},{"skill":"UNIX","levels":[{"skilllevel":"UNIX (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n4060"},{"skilllevel":"UNIX (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n444108825"},{"skilllevel":"UNIX advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15773"},{"skilllevel":"UNIX advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038"},{"skilllevel":"UNIX beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1811330000"},{"skilllevel":"UNIX beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n506"},{"skilllevel":"UNIX guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1023625925"},{"skilllevel":"UNIX guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n16192"},{"skilllevel":"UNIX intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1515330233"},{"skilllevel":"UNIX intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5925"}]},{"skill":"Unified Modeling Language (UML)","levels":[{"skilllevel":"Unified Modeling Language (UML) (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n917408733"},{"skilllevel":"Unified Modeling Language (UML) advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1440990092"},{"skilllevel":"Unified Modeling Language (UML) beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1453088749"},{"skilllevel":"Unified Modeling Language (UML) guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1039162219"},{"skilllevel":"Unified Modeling Language (UML) intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1569894841"}]},{"skill":"VIVO","levels":[{"skilllevel":"VIVO (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n920844606"},{"skilllevel":"VIVO advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n690223823"},{"skilllevel":"VIVO beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n812057586"},{"skilllevel":"VIVO guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n390262573"},{"skilllevel":"VIVO intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1524740150"}]},{"skill":"Video Conferencing Equipment","levels":[{"skilllevel":"Video Conferencing Equipment (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n682118795"},{"skilllevel":"Video Conferencing Equipment advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1984479512"},{"skilllevel":"Video Conferencing Equipment beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1692483687"},{"skilllevel":"Video Conferencing Equipment guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n241032219"},{"skilllevel":"Video Conferencing Equipment intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1900691484"}]},{"skill":"Video Streaming","levels":[{"skilllevel":"Video Streaming (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n401501326"},{"skilllevel":"Video Streaming advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n813078861"},{"skilllevel":"Video Streaming beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n727958903"},{"skilllevel":"Video Streaming guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1292232260"},{"skilllevel":"Video Streaming intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n61105148"}]},{"skill":"Video recording","levels":[{"skilllevel":"Video recording (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n879539546"},{"skilllevel":"Video recording advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952735651"},{"skilllevel":"Video recording beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2027647867"},{"skilllevel":"Video recording guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n668932657"},{"skilllevel":"Video recording intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1657031559"}]},{"skill":"Web Certificates","levels":[{"skilllevel":"Web Certificates (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1394403846"},{"skilllevel":"Web Certificates advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1289679300"},{"skilllevel":"Web Certificates beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1068955350"},{"skilllevel":"Web Certificates guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n755220436"},{"skilllevel":"Web Certificates intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1894130139"}]},{"skill":"Whole Disk Encryption","levels":[{"skilllevel":"Whole Disk Encryption (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n868532910"},{"skilllevel":"Whole Disk Encryption advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n603466448"},{"skilllevel":"Whole Disk Encryption beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1294021614"},{"skilllevel":"Whole Disk Encryption guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n827443162"},{"skilllevel":"Whole Disk Encryption intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1443446817"}]},{"skill":"Windows","levels":[{"skilllevel":"Windows (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n737689472"},{"skilllevel":"Windows advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n817410130"},{"skilllevel":"Windows beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1200655465"},{"skilllevel":"Windows guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1783661094"},{"skilllevel":"Windows intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n758853803"}]},{"skill":"Wordpress","levels":[{"skilllevel":"Wordpress (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824675433"},{"skilllevel":"Wordpress advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246712059"},{"skilllevel":"Wordpress beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2113348855"},{"skilllevel":"Wordpress guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n603445265"},{"skilllevel":"Wordpress intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1750133670"}]},{"skill":"XML","levels":[{"skilllevel":"XML (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n435809455"},{"skilllevel":"XML advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1308372421"},{"skilllevel":"XML beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2010667509"},{"skilllevel":"XML guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1245379038"},{"skilllevel":"XML intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n869199825"}]},{"skill":"YourKit Java Profiler","levels":[{"skilllevel":"YourKit Java Profiler (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n952946630"},{"skilllevel":"YourKit Java Profiler advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1328280097"},{"skilllevel":"YourKit Java Profiler beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2074846875"},{"skilllevel":"YourKit Java Profiler guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1914368466"},{"skilllevel":"YourKit Java Profiler intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n971784415"}]},{"skill":"ant","levels":[{"skilllevel":"ant (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n204347418"},{"skilllevel":"ant advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n126545019"},{"skilllevel":"ant beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1177272249"},{"skilllevel":"ant guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1785232066"},{"skilllevel":"ant intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1010880164"}]},{"skill":"bash","levels":[{"skilllevel":"bash (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n506329001"},{"skilllevel":"bash advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n973358142"},{"skilllevel":"bash beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n784818287"},{"skilllevel":"bash guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1232540464"},{"skilllevel":"bash intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n829159456"}]},{"skill":"netCDF","levels":[{"skilllevel":"netCDF (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1621791493"},{"skilllevel":"netCDF advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1273549603"},{"skilllevel":"netCDF beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2070145250"},{"skilllevel":"netCDF guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n194562462"},{"skilllevel":"netCDF intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1876937350"}]},{"skill":"perl","levels":[{"skilllevel":"perl (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1064026058"},{"skilllevel":"perl advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1712511923"},{"skilllevel":"perl beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n923173688"},{"skilllevel":"perl guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n744724876"},{"skilllevel":"perl intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130"}]},{"skill":"tcsh","levels":[{"skilllevel":"tcsh (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632010458"},{"skilllevel":"tcsh advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n352988386"},{"skilllevel":"tcsh beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1220194198"},{"skilllevel":"tcsh guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1001446887"},{"skilllevel":"tcsh intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n396073491"}]},{"skill":"wInsight","levels":[{"skilllevel":"wInsight (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2062117007"},{"skilllevel":"wInsight advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n358560745"},{"skilllevel":"wInsight beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n239194321"},{"skilllevel":"wInsight guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1173580466"},{"skilllevel":"wInsight intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n862908734"}]},{"skill":"wikimedia","levels":[{"skilllevel":"wikimedia (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1853486041"},{"skilllevel":"wikimedia advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n876419576"},{"skilllevel":"wikimedia beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1299767191"},{"skilllevel":"wikimedia guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1474335554"},{"skilllevel":"wikimedia intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n446453562"}]}]));
        expect(JSON.stringify(QuickSearchFilter(inputHaystack, "c++", "skill"))).toEqual(JSON.stringify([{"skill":"C++","levels":[{"skilllevel":"C++ (unranked)","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2001992658"},{"skilllevel":"C++ advanced","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n906704525"},{"skilllevel":"C++ beginner","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n455885633"},{"skilllevel":"C++ guru","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n370638602"},{"skilllevel":"C++ intermediate","skillleveluri":"http://webdev1.lasp.colorado.edu:57529/vivo/individual/n632168803"}]}]));
      expect(QuickSearchFilter(inputHaystack, "c", "skill").length).toEqual(42);
      expect(QuickSearchFilter(inputHaystack, "++", "skill").length).toEqual(1);
      expect(QuickSearchFilter(inputHaystack, "    java ", "skill").length).toEqual(3);
      expect(QuickSearchFilter(inputHaystack, "recording", "skill").length).toEqual(2);
      expect(QuickSearchFilter(inputHaystack, "donald", "skill").length).toEqual(0);
      expect(QuickSearchFilter(inputHaystack, "advanced", "skill").length).toEqual(0);
      }));
    });
});
