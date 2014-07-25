//unit tests used by the allSkillsCtrl controller
describe('Unit Tests: allSkillsCtrl', function () {
  var $httpBackend, $http, $scope, $rootScope, $dataFactory, $formatFactory, $controller;
  var ctrl = null;
  beforeEach(angular.mock.module('skillsModule'));
  beforeEach(inject(function ($httpBackend, $http, $rootScope, dataFactory, formatFactory, $controller) {
    $httpBackend = $httpBackend;
    $http = $http;
    $scope = $rootScope.$new();
    $dataFactory = dataFactory;
    $formatFactory = formatFactory;
    $httpBackend.expectPOST('http://lemr-dev:3030/VIVO/query', 'query=' + escape('PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX obo: <http://purl.obolibrary.org/obo/> PREFIX vcard: <http://www.w3.org/2006/vcard/ns#> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#>  SELECT ?Person ?personuri ?Skill ?SkillLevel ?skillleveluri ?Office ?Email ?PhoneNumber ?Position ?Division ?Group WHERE { ?personuri a foaf:Person . ?personuri rdfs:label ?Person . ?personuri laspskills:hasSkill ?skillleveluri . ?skillleveluri rdfs:label ?SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?Skill . OPTIONAL{?personuri obo:ARG_2000028 ?contactInfo . ?contactInfo vcard:hasEmail ?email . ?email vcard:email ?Email}. OPTIONAL{?personuri obo:RO_0001025 ?roomuri . ?roomuri rdfs:label ?Office} . OPTIONAL{?personuri obo:ARG_2000028 ?contactInfo . ?contactInfo vcard:hasTelephone ?tphone . ?tphone vcard:telephone ?PhoneNumber} . OPTIONAL{?personuri vivo:relatedBy ?positionuri . ?positionuri rdfs:label ?Position} . OPTIONAL{?personuri obo:RO_0000053 ?roleuri . ?roleuri vivo:roleContributesTo ?groupuri . ?groupuri rdfs:label ?Group . ?groupuri obo:BFO_0000050 ?divisionuri . ?divisionuri rdfs:label ?Division }}'), {
      'Accept': 'application/sparql-results+json',
      'Content-type': 'application/x-www-form-urlencoded'
    }).respond(200);
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
  it('can get an instance of dataFactory', function () {
    //all assertions since $dataFactory was set up in our beforeEach above
    expect($dataFactory).toBeDefined();
  });
  it('can get an instance of formatFactory', function () {
    //all assertions since $dataFactory was set up in our beforeEach above
    expect($formatFactory).toBeDefined();
  });
  it('can find dataFactory.getSPARQLQuery()', function () {
    //all assertions since $dataFactory was set up in our beforeEach above
    expect($dataFactory.getSPARQLQuery).toBeDefined();
  });
  it('sent the correct SPARQL query to the correct place', function () {
    //all assertion since $scope has already been created by the controller in beforeEach above
    expect($scope.urlBase).toBe('http://lemr-dev:3030/VIVO/query');
    expect($scope.queryStr).toBe('PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX obo: <http://purl.obolibrary.org/obo/> PREFIX vcard: <http://www.w3.org/2006/vcard/ns#> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#>  SELECT ?Person ?personuri ?Skill ?SkillLevel ?skillleveluri ?Office ?Email ?PhoneNumber ?Position ?Division ?Group WHERE { ?personuri a foaf:Person . ?personuri rdfs:label ?Person . ?personuri laspskills:hasSkill ?skillleveluri . ?skillleveluri rdfs:label ?SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?Skill . OPTIONAL{?personuri obo:ARG_2000028 ?contactInfo . ?contactInfo vcard:hasEmail ?email . ?email vcard:email ?Email}. OPTIONAL{?personuri obo:RO_0001025 ?roomuri . ?roomuri rdfs:label ?Office} . OPTIONAL{?personuri obo:ARG_2000028 ?contactInfo . ?contactInfo vcard:hasTelephone ?tphone . ?tphone vcard:telephone ?PhoneNumber} . OPTIONAL{?personuri vivo:relatedBy ?positionuri . ?positionuri rdfs:label ?Position} . OPTIONAL{?personuri obo:RO_0000053 ?roleuri . ?roleuri vivo:roleContributesTo ?groupuri . ?groupuri rdfs:label ?Group . ?groupuri obo:BFO_0000050 ?divisionuri . ?divisionuri rdfs:label ?Division }}');
  });
  it('SPARQL query returned without errors', function () {
    //all assertions since $scope was set up in our beforeEach above
    expect($scope.error).toBe('');
  });
  it('formatFactory.formatMasterList returns what we expect', function () {
    //arrange
    //given these fake SPARQL results...
    var fakeSPARQLResults = {
        'head': {
          'vars': [
            'Person',
            'personuri',
            'Skill',
            'SkillLevel',
            'skillleveluri',
            'Office',
            'Email',
            'PhoneNumber',
            'Position',
            'Division',
            'Group'
          ]
        },
        'results': {
          'bindings': [
            {
              'Person': {
                'type': 'literal',
                'value': 'Riesberg, Lon'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-259'
              },
              'Email': {
                'type': 'literal',
                'value': 'Lon.Riesberg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-9388'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Riesberg, Lon'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057'
              },
              'Skill': {
                'type': 'literal',
                'value': 'HighCharts'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'HighCharts (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003879660'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-259'
              },
              'Email': {
                'type': 'literal',
                'value': 'Lon.Riesberg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-9388'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Knapp, Barry'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270'
              },
              'Skill': {
                'type': 'literal',
                'value': 'IDL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'IDL advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280B'
              },
              'Email': {
                'type': 'literal',
                'value': 'Barry.Knapp@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-8970'
              },
              'Position': {
                'type': 'literal',
                'value': 'Retiree'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Knapp, Barry'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Astronomical Algorithms'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Astronomical Algorithms advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1398263944'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280B'
              },
              'Email': {
                'type': 'literal',
                'value': 'Barry.Knapp@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-8970'
              },
              'Position': {
                'type': 'literal',
                'value': 'Retiree'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Knapp, Barry'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270'
              },
              'Skill': {
                'type': 'literal',
                'value': 'FORTRAN'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'FORTRAN advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1694332440'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280B'
              },
              'Email': {
                'type': 'literal',
                'value': 'Barry.Knapp@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-8970'
              },
              'Position': {
                'type': 'literal',
                'value': 'Retiree'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Roughton, Steve'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SQL advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-217'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steve.Roughton@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-5621'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Roughton, Steve'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491'
              },
              'Skill': {
                'type': 'literal',
                'value': 'PHP'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'PHP guru'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15074'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-217'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steve.Roughton@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-5621'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Roughton, Steve'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491'
              },
              'Skill': {
                'type': 'literal',
                'value': 'UNIX'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'UNIX advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-217'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steve.Roughton@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-5621'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Roughton, Steve'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Python'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Python beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-217'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steve.Roughton@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-5621'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Roughton, Steve'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-217'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steve.Roughton@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-5621'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Dorey, Mike'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Dygraphs'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Dygraphs (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n859963165'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTR-288'
              },
              'Email': {
                'type': 'literal',
                'value': 'Mike.Dorey@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-4687'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Dorey, Mike'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Python'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Python advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n531394462'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTR-288'
              },
              'Email': {
                'type': 'literal',
                'value': 'Mike.Dorey@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-4687'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Dorey, Mike'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Ruby'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Ruby intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n123506868'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTR-288'
              },
              'Email': {
                'type': 'literal',
                'value': 'Mike.Dorey@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-4687'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Dorey, Mike'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Linux'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Linux intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTR-288'
              },
              'Email': {
                'type': 'literal',
                'value': 'Mike.Dorey@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-4687'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Dorey, Mike'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764'
              },
              'Skill': {
                'type': 'literal',
                'value': 'PostgreSQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'PostgreSQL intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19546766'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTR-288'
              },
              'Email': {
                'type': 'literal',
                'value': 'Mike.Dorey@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-4687'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Dorey, Mike'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764'
              },
              'Skill': {
                'type': 'literal',
                'value': 'FORTRAN'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'FORTRAN intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTR-288'
              },
              'Email': {
                'type': 'literal',
                'value': 'Mike.Dorey@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-4687'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Keiser, Brad'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738'
              },
              'Skill': {
                'type': 'literal',
                'value': 'UNIX'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'UNIX advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-213'
              },
              'Email': {
                'type': 'literal',
                'value': 'Brad.Keiser@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '720-454-9338'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Administration'
              },
              'Group': {
                'type': 'literal',
                'value': 'Information Technology'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Keiser, Brad'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738'
              },
              'Skill': {
                'type': 'literal',
                'value': 'UNIX'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'UNIX advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-213'
              },
              'Email': {
                'type': 'literal',
                'value': 'Brad.Keiser@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-5543'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Administration'
              },
              'Group': {
                'type': 'literal',
                'value': 'Information Technology'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'DeWolfe, Alex'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178'
              },
              'Skill': {
                'type': 'literal',
                'value': 'IDL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'IDL intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187718791'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-278'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alex.DeWolfe@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6835'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'DeWolfe, Alex'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Matlab'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Matlab beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n982331912'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-278'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alex.DeWolfe@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6835'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'DeWolfe, Alex'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178'
              },
              'Skill': {
                'type': 'literal',
                'value': 'AMCharts'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'AMCharts intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115838072'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-278'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alex.DeWolfe@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6835'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'DeWolfe, Alex'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Dygraphs'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Dygraphs beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996489377'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-278'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alex.DeWolfe@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6835'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'DeWolfe, Alex'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft Excel'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft Excel advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n549514676'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-278'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alex.DeWolfe@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6835'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'DeWolfe, Alex'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Python'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Python beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-278'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alex.DeWolfe@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6835'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'DeWolfe, Alex'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178'
              },
              'Skill': {
                'type': 'literal',
                'value': 'JIRA'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'JIRA beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004191433'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-278'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alex.DeWolfe@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6835'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'DeWolfe, Alex'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Graphical User Interface (GUI) design'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Graphical User Interface (GUI) design beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n969597673'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-278'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alex.DeWolfe@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6835'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'DeWolfe, Alex'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Confluence'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Confluence beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1601745543'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-278'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alex.DeWolfe@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6835'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'DeWolfe, Alex'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Javascript'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Javascript intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-278'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alex.DeWolfe@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6835'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'DeWolfe, Alex'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft Word'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft Word advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n341709716'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-278'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alex.DeWolfe@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6835'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'DeWolfe, Alex'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178'
              },
              'Skill': {
                'type': 'literal',
                'value': 'MacOS'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'MacOS advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036406957'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-278'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alex.DeWolfe@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6835'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Templeman, Brian'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053'
              },
              'Skill': {
                'type': 'literal',
                'value': 'tcsh'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'tcsh intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n396073491'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280C'
              },
              'Email': {
                'type': 'literal',
                'value': 'Brian.Templeman@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-5101'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Templeman, Brian'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Science Algorithm Development'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Science Algorithm Development intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1870781320'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280C'
              },
              'Email': {
                'type': 'literal',
                'value': 'Brian.Templeman@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-5101'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Templeman, Brian'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053'
              },
              'Skill': {
                'type': 'literal',
                'value': 'IDL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'IDL intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187718791'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280C'
              },
              'Email': {
                'type': 'literal',
                'value': 'Brian.Templeman@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-5101'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Templeman, Brian'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Linux'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Linux advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2100386976'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280C'
              },
              'Email': {
                'type': 'literal',
                'value': 'Brian.Templeman@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-5101'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Templeman, Brian'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053'
              },
              'Skill': {
                'type': 'literal',
                'value': 'AMCharts'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'AMCharts advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2088524822'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280C'
              },
              'Email': {
                'type': 'literal',
                'value': 'Brian.Templeman@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-5101'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Templeman, Brian'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053'
              },
              'Skill': {
                'type': 'literal',
                'value': 'C'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'C (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793602038'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280C'
              },
              'Email': {
                'type': 'literal',
                'value': 'Brian.Templeman@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-5101'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Templeman, Brian'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Javascript'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Javascript intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280C'
              },
              'Email': {
                'type': 'literal',
                'value': 'Brian.Templeman@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-5101'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Templeman, Brian'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053'
              },
              'Skill': {
                'type': 'literal',
                'value': 'perl'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'perl advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1712511923'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280C'
              },
              'Email': {
                'type': 'literal',
                'value': 'Brian.Templeman@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-5101'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Templeman, Brian'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053'
              },
              'Skill': {
                'type': 'literal',
                'value': 'MySQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'MySQL intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280C'
              },
              'Email': {
                'type': 'literal',
                'value': 'Brian.Templeman@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-5101'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Templeman, Brian'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053'
              },
              'Skill': {
                'type': 'literal',
                'value': 'C Shell'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'C Shell intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280C'
              },
              'Email': {
                'type': 'literal',
                'value': 'Brian.Templeman@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-5101'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Science Algorithm Development'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Science Algorithm Development advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Science Algorithm Development'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Science Algorithm Development advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'PHP'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'PHP intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'PHP'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'PHP intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Python'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Python beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Python'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Python beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Numerical methods'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Numerical methods intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n667100965'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Numerical methods'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Numerical methods intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n667100965'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Numerical Recipes'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Numerical Recipes intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Numerical Recipes'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Numerical Recipes intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'UNIX'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'UNIX intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1515330233'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'UNIX'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'UNIX intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1515330233'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Linux'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Linux intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Linux'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Linux intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'perl'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'perl intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'perl'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'perl intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'C++'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'C++ advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n906704525'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'C++'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'C++ advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n906704525'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Matlab'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Matlab advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916250560'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Matlab'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Matlab advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916250560'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'IDL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'IDL beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'IDL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'IDL beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'C Shell'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'C Shell intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'C Shell'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'C Shell intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'FORTRAN'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'FORTRAN intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-0512'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Mueller, Steven'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013'
              },
              'Skill': {
                'type': 'literal',
                'value': 'FORTRAN'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'FORTRAN intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W280E'
              },
              'Email': {
                'type': 'literal',
                'value': 'Steven.Mueller@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1072'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Cox, Michael'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931'
              },
              'Skill': {
                'type': 'literal',
                'value': 'UNIX'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'UNIX advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-226'
              },
              'Email': {
                'type': 'literal',
                'value': 'Michael.Cox@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Cox, Michael'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931'
              },
              'Skill': {
                'type': 'literal',
                'value': 'C++'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'C++ beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n455885633'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-226'
              },
              'Email': {
                'type': 'literal',
                'value': 'Michael.Cox@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Cox, Michael'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931'
              },
              'Skill': {
                'type': 'literal',
                'value': 'PHP'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'PHP beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6849'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-226'
              },
              'Email': {
                'type': 'literal',
                'value': 'Michael.Cox@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Cox, Michael'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-226'
              },
              'Email': {
                'type': 'literal',
                'value': 'Michael.Cox@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Cox, Michael'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931'
              },
              'Skill': {
                'type': 'literal',
                'value': 'JIRA'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'JIRA intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1149926731'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-226'
              },
              'Email': {
                'type': 'literal',
                'value': 'Michael.Cox@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Cox, Michael'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Python'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Python intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424885468'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-226'
              },
              'Email': {
                'type': 'literal',
                'value': 'Michael.Cox@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Cox, Michael'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Linux'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Linux advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2100386976'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-226'
              },
              'Email': {
                'type': 'literal',
                'value': 'Michael.Cox@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Cox, Michael'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SQL beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12007'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-226'
              },
              'Email': {
                'type': 'literal',
                'value': 'Michael.Cox@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Cox, Michael'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SPARQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SPARQL advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3207'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-226'
              },
              'Email': {
                'type': 'literal',
                'value': 'Michael.Cox@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Cox, Michael'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931'
              },
              'Skill': {
                'type': 'literal',
                'value': 'AngularJS'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'AngularJS intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2122206999'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-226'
              },
              'Email': {
                'type': 'literal',
                'value': 'Michael.Cox@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Cox, Michael'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Javascript'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Javascript intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-226'
              },
              'Email': {
                'type': 'literal',
                'value': 'Michael.Cox@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Cox, Michael'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931'
              },
              'Skill': {
                'type': 'literal',
                'value': 'MySQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'MySQL intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-226'
              },
              'Email': {
                'type': 'literal',
                'value': 'Michael.Cox@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SQL advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SQL advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Relational Database Application Development'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Relational Database Application Development advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154717227'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Relational Database Application Development'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Relational Database Application Development advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154717227'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Google Forms'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Google Forms intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485541935'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Google Forms'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Google Forms intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485541935'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'UNIX'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'UNIX advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'UNIX'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'UNIX advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Oracle'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Oracle advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465053752'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Oracle'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Oracle advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465053752'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'PHP'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'PHP intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'PHP'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'PHP intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Wordpress'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Wordpress intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1750133670'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Wordpress'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Wordpress intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1750133670'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Python'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Python beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Python'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Python beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft Project'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft Project intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n342920979'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft Project'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft Project intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n342920979'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'PostgreSQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'PostgreSQL beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823456412'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'PostgreSQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'PostgreSQL beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823456412'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'bash'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'bash intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n829159456'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'bash'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'bash intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n829159456'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Javascript'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Javascript intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Javascript'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Javascript intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'perl'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'perl intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'perl'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'perl intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SPARQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SPARQL intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3976'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SPARQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SPARQL intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3976'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Solaris'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Solaris advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1771893770'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Solaris'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Solaris advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1771893770'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'MySQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'MySQL intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'MySQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'MySQL intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Sybase'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Sybase advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1859553074'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-641-9442'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'xml:lang': 'en-US',
                'value': 'Elsborg, Don'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Sybase'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Sybase advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1859553074'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-221'
              },
              'Email': {
                'type': 'literal',
                'value': 'Don.Elsborg@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-4585'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SQL intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2651'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Least Squares Fitting'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Least Squares Fitting intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n563249855'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5409'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'LabView'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'LabView intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1729689433'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'UNIX'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'UNIX advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Science Algorithm Development'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Science Algorithm Development advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Python'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Python intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424885468'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'HTML5'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'HTML5 intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2144932849'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'C Shell'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'C Shell advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n225932203'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Numerical Recipes'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Numerical Recipes intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'IDL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'IDL advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Astronomical Algorithms'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Astronomical Algorithms advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1398263944'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Graphical User Interface (GUI) design'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Graphical User Interface (GUI) design intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824061673'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Linux'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Linux intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'ENVI'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'ENVI beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460110611'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Javascript'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Javascript intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'MacOS'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'MacOS advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036406957'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'FORTRAN'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'FORTRAN intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Beland, Stephane'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123'
              },
              'Skill': {
                'type': 'literal',
                'value': 'C'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'C advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1026055000'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W265'
              },
              'Email': {
                'type': 'literal',
                'value': 'Stephane.Beland@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-3657'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Reukauf, Randy'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n276714883'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SQL (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-286'
              },
              'Email': {
                'type': 'literal',
                'value': 'Randy.Reukauf@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-2045'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Popescu, Radu'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SQL (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-225'
              },
              'Email': {
                'type': 'literal',
                'value': 'Radu.Popescu@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-589-5143'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Administration'
              },
              'Group': {
                'type': 'literal',
                'value': 'Information Technology'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Popescu, Radu'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SQL (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-225'
              },
              'Email': {
                'type': 'literal',
                'value': 'Radu.Popescu@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-5689'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Administration'
              },
              'Group': {
                'type': 'literal',
                'value': 'Information Technology'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Popescu, Radu'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SharePoint'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SharePoint (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n915511558'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-225'
              },
              'Email': {
                'type': 'literal',
                'value': 'Radu.Popescu@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-589-5143'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Administration'
              },
              'Group': {
                'type': 'literal',
                'value': 'Information Technology'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Popescu, Radu'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SharePoint'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SharePoint (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n915511558'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-225'
              },
              'Email': {
                'type': 'literal',
                'value': 'Radu.Popescu@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-5689'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Administration'
              },
              'Group': {
                'type': 'literal',
                'value': 'Information Technology'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Traver, Tyler'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5409'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-277'
              },
              'Email': {
                'type': 'literal',
                'value': 'Tyler.Traver@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Traver, Tyler'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712'
              },
              'Skill': {
                'type': 'literal',
                'value': 'UNIX'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'UNIX advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-277'
              },
              'Email': {
                'type': 'literal',
                'value': 'Tyler.Traver@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Traver, Tyler'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Python'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Python beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-277'
              },
              'Email': {
                'type': 'literal',
                'value': 'Tyler.Traver@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Traver, Tyler'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft Excel'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft Excel intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927066295'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-277'
              },
              'Email': {
                'type': 'literal',
                'value': 'Tyler.Traver@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Traver, Tyler'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712'
              },
              'Skill': {
                'type': 'literal',
                'value': 'AngularJS'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'AngularJS beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n994473475'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-277'
              },
              'Email': {
                'type': 'literal',
                'value': 'Tyler.Traver@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Traver, Tyler'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SPARQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SPARQL beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3572'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-277'
              },
              'Email': {
                'type': 'literal',
                'value': 'Tyler.Traver@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SQL intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2651'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'C++'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'C++ guru'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n370638602'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Relational Database Application Development'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Relational Database Application Development intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701203852'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Sybase'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Sybase intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168524923'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Relational Database Design'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Relational Database Design intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1647277519'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Object Oriented Software Engineering'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Object Oriented Software Engineering advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n980752808'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Linux'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Linux intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1613'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Javascript'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Javascript intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Hudson / Jenkins'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Hudson / Jenkins intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2041232720'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'perl'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'perl intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Subversion'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Subversion intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330304752'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft Word'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft Word intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2131579087'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'C'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'C guru'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1337968289'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'ant'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'ant advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n126545019'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'XML'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'XML intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n869199825'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Oracle'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Oracle beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n643546038'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'MySQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'MySQL intermediate'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Barrett, William'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725'
              },
              'Skill': {
                'type': 'literal',
                'value': 'IDL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'IDL beginner'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738'
              },
              'Office': {
                'type': 'literal',
                'value': 'DIDR-W270'
              },
              'Email': {
                'type': 'literal',
                'value': 'William.Barrett@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-0148'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Bryant, Mike'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1085025965'
              },
              'Skill': {
                'type': 'literal',
                'value': 'PHP'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'PHP (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2185'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-207'
              },
              'Email': {
                'type': 'literal',
                'value': 'Mike.Bryant@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-7714'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Newgord, Alexia'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n695552564'
              },
              'Skill': {
                'type': 'literal',
                'value': 'IDL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'IDL advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536'
              },
              'Email': {
                'type': 'literal',
                'value': 'Alexia.Newgord@lasp.colorado.edu'
              },
              'Position': {
                'type': 'literal',
                'value': 'Undergraduate Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Vanier, Blake'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n585326394'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java advanced'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1613'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-286'
              },
              'Email': {
                'type': 'literal',
                'value': 'Blake.Vanier@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-8185'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SQL (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-210-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'SQL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'SQL (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'IDL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'IDL (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1087137639'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-210-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'IDL'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'IDL (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1087137639'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft Excel'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft Excel (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728291009'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-210-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft Excel'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft Excel (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728291009'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Science Algorithm Development'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Science Algorithm Development (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336617474'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-210-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Science Algorithm Development'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Science Algorithm Development (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336617474'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Confluence'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Confluence (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n169192069'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-210-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Confluence'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Confluence (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n169192069'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-210-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Structured Query Language (SQL)'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Structured Query Language (SQL) (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198943528'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-210-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Structured Query Language (SQL)'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Structured Query Language (SQL) (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198943528'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft Project'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft Project (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1549151088'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-210-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft Project'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft Project (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1549151088'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft PowerPoint'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft PowerPoint (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n601023829'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-210-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft PowerPoint'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft PowerPoint (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n601023829'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Sybase'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Sybase (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n467937305'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-210-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Sybase'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Sybase (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n467937305'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft Word'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft Word (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1858761653'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-210-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Microsoft Word'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Microsoft Word (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1858761653'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'MacOS'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'MacOS (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n257741671'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-210-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Pankratz, Chris'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966'
              },
              'Skill': {
                'type': 'literal',
                'value': 'MacOS'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'MacOS (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n257741671'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-261'
              },
              'Email': {
                'type': 'literal',
                'value': 'Chris.Pankratz@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-0696'
              },
              'Position': {
                'type': 'literal',
                'value': 'Senior Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Lindholm, Doug'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1790175656'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Java'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Java (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-276A'
              },
              'Email': {
                'type': 'literal',
                'value': 'Doug.Lindholm@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-735-1127'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Mission Operations & Data Systems'
              },
              'Group': {
                'type': 'literal',
                'value': 'Data Systems'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Ramas, Joe'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Ruby'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Ruby (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749583954'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-176'
              },
              'Email': {
                'type': 'literal',
                'value': 'Joe.Ramas@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-492-6296'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Engineering'
              },
              'Group': {
                'type': 'literal',
                'value': 'Calibration & Test'
              }
            },
            {
              'Person': {
                'type': 'literal',
                'value': 'Ramas, Joe'
              },
              'personuri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183'
              },
              'Skill': {
                'type': 'literal',
                'value': 'Ruby'
              },
              'SkillLevel': {
                'type': 'literal',
                'value': 'Ruby (unranked)'
              },
              'skillleveluri': {
                'type': 'uri',
                'value': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749583954'
              },
              'Office': {
                'type': 'literal',
                'value': 'LSTB-176'
              },
              'Email': {
                'type': 'literal',
                'value': 'Joe.Ramas@lasp.colorado.edu'
              },
              'PhoneNumber': {
                'type': 'literal',
                'value': '303-885-9111'
              },
              'Position': {
                'type': 'literal',
                'value': 'Professional Research Assistant'
              },
              'Division': {
                'type': 'literal',
                'value': 'Engineering'
              },
              'Group': {
                'type': 'literal',
                'value': 'Calibration & Test'
              }
            }
          ]
        }
      };
    //we'd hope to see this final JSON returned by formatMasterList
    var expectedJSON = [
        {
          'Person': 'Riesberg, Lon',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057',
          'Skill': 'Java (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477',
          'Office': 'LSTB-259',
          'Email': 'Lon.Riesberg@lasp.colorado.edu',
          'PhoneNumber': '303-492-9388',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Riesberg, Lon',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057',
          'Skill': 'HighCharts (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003879660',
          'Office': 'LSTB-259',
          'Email': 'Lon.Riesberg@lasp.colorado.edu',
          'PhoneNumber': '303-492-9388',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Knapp, Barry',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270',
          'Skill': 'IDL advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536',
          'Office': 'DIDR-W280B',
          'Email': 'Barry.Knapp@lasp.colorado.edu',
          'PhoneNumber': '303-492-8970',
          'Position': 'Retiree',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Knapp, Barry',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270',
          'Skill': 'Astronomical Algorithms advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1398263944',
          'Office': 'DIDR-W280B',
          'Email': 'Barry.Knapp@lasp.colorado.edu',
          'PhoneNumber': '303-492-8970',
          'Position': 'Retiree',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Knapp, Barry',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270',
          'Skill': 'FORTRAN advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1694332440',
          'Office': 'DIDR-W280B',
          'Email': 'Barry.Knapp@lasp.colorado.edu',
          'PhoneNumber': '303-492-8970',
          'Position': 'Retiree',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Roughton, Steve',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491',
          'Skill': 'SQL advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565',
          'Office': 'LSTB-217',
          'Email': 'Steve.Roughton@lasp.colorado.edu',
          'PhoneNumber': '303-492-5621',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Roughton, Steve',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491',
          'Skill': 'PHP guru',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15074',
          'Office': 'LSTB-217',
          'Email': 'Steve.Roughton@lasp.colorado.edu',
          'PhoneNumber': '303-492-5621',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Roughton, Steve',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491',
          'Skill': 'UNIX advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038',
          'Office': 'LSTB-217',
          'Email': 'Steve.Roughton@lasp.colorado.edu',
          'PhoneNumber': '303-492-5621',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Roughton, Steve',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491',
          'Skill': 'Python beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313',
          'Office': 'LSTB-217',
          'Email': 'Steve.Roughton@lasp.colorado.edu',
          'PhoneNumber': '303-492-5621',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Roughton, Steve',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491',
          'Skill': 'Java (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477',
          'Office': 'LSTB-217',
          'Email': 'Steve.Roughton@lasp.colorado.edu',
          'PhoneNumber': '303-492-5621',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Dorey, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764',
          'Skill': 'Dygraphs (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n859963165',
          'Office': 'LSTR-288',
          'Email': 'Mike.Dorey@lasp.colorado.edu',
          'PhoneNumber': '303-735-4687',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Dorey, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764',
          'Skill': 'Python advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n531394462',
          'Office': 'LSTR-288',
          'Email': 'Mike.Dorey@lasp.colorado.edu',
          'PhoneNumber': '303-735-4687',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Dorey, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764',
          'Skill': 'Ruby intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n123506868',
          'Office': 'LSTR-288',
          'Email': 'Mike.Dorey@lasp.colorado.edu',
          'PhoneNumber': '303-735-4687',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Dorey, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764',
          'Skill': 'Linux intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087',
          'Office': 'LSTR-288',
          'Email': 'Mike.Dorey@lasp.colorado.edu',
          'PhoneNumber': '303-735-4687',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Dorey, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764',
          'Skill': 'PostgreSQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19546766',
          'Office': 'LSTR-288',
          'Email': 'Mike.Dorey@lasp.colorado.edu',
          'PhoneNumber': '303-735-4687',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Dorey, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764',
          'Skill': 'FORTRAN intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199',
          'Office': 'LSTR-288',
          'Email': 'Mike.Dorey@lasp.colorado.edu',
          'PhoneNumber': '303-735-4687',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Keiser, Brad',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738',
          'Skill': 'UNIX advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038',
          'Office': 'LSTB-213',
          'Email': 'Brad.Keiser@lasp.colorado.edu',
          'PhoneNumber': '720-454-9338, 303-735-5543',
          'Position': 'Professional Research Assistant',
          'Division': 'Administration',
          'Group': 'Information Technology'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'IDL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187718791',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Matlab beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n982331912',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'AMCharts intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115838072',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Dygraphs beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996489377',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Microsoft Excel advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n549514676',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Python beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'JIRA beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004191433',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Graphical User Interface (GUI) design beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n969597673',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Confluence beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1601745543',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Javascript intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Microsoft Word advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n341709716',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'MacOS advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036406957',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'tcsh intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n396073491',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'Science Algorithm Development intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1870781320',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'IDL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187718791',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'Linux advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2100386976',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'AMCharts advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2088524822',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'C (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793602038',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'Javascript intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'perl advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1712511923',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'MySQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'C Shell intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Java beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Science Algorithm Development advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'PHP intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Python beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Numerical methods intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n667100965',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Numerical Recipes intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'UNIX intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1515330233',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Linux intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'perl intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'C++ advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n906704525',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Matlab advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916250560',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'IDL beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'C Shell intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'FORTRAN intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'UNIX advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'C++ beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n455885633',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'PHP beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6849',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'Java beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'JIRA intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1149926731',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'Python intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424885468',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'Linux advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2100386976',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'SQL beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12007',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'SPARQL advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3207',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'AngularJS intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2122206999',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'Javascript intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'MySQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'SQL advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Relational Database Application Development advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154717227',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Google Forms intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485541935',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'UNIX advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Oracle advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465053752',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'PHP intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Wordpress intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1750133670',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Python beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Microsoft Project intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n342920979',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'PostgreSQL beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823456412',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Java (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'bash intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n829159456',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Javascript intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'perl intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'SPARQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3976',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Solaris advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1771893770',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'MySQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Sybase advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1859553074',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'SQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2651',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Least Squares Fitting intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n563249855',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Java intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5409',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'LabView intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1729689433',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'UNIX advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Science Algorithm Development advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Python intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424885468',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'HTML5 intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2144932849',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'C Shell advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n225932203',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Numerical Recipes intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'IDL advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Astronomical Algorithms advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1398263944',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Graphical User Interface (GUI) design intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824061673',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Linux intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'ENVI beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460110611',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Javascript intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'MacOS advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036406957',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'FORTRAN intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'C advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1026055000',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Reukauf, Randy',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n276714883',
          'Skill': 'SQL (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454',
          'Office': 'LSTB-286',
          'Email': 'Randy.Reukauf@lasp.colorado.edu',
          'PhoneNumber': '303-735-2045',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Popescu, Radu',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704',
          'Skill': 'SQL (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454',
          'Office': 'LSTB-225',
          'Email': 'Radu.Popescu@lasp.colorado.edu',
          'PhoneNumber': '303-589-5143, 303-492-5689',
          'Position': 'Professional Research Assistant',
          'Division': 'Administration',
          'Group': 'Information Technology'
        },
        {
          'Person': 'Popescu, Radu',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704',
          'Skill': 'SharePoint (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n915511558',
          'Office': 'LSTB-225',
          'Email': 'Radu.Popescu@lasp.colorado.edu',
          'PhoneNumber': '303-589-5143, 303-492-5689',
          'Position': 'Professional Research Assistant',
          'Division': 'Administration',
          'Group': 'Information Technology'
        },
        {
          'Person': 'Traver, Tyler',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712',
          'Skill': 'Java intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5409',
          'Office': 'LSTB-277',
          'Email': 'Tyler.Traver@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Traver, Tyler',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712',
          'Skill': 'UNIX advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038',
          'Office': 'LSTB-277',
          'Email': 'Tyler.Traver@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Traver, Tyler',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712',
          'Skill': 'Python beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313',
          'Office': 'LSTB-277',
          'Email': 'Tyler.Traver@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Traver, Tyler',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712',
          'Skill': 'Microsoft Excel intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927066295',
          'Office': 'LSTB-277',
          'Email': 'Tyler.Traver@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Traver, Tyler',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712',
          'Skill': 'AngularJS beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n994473475',
          'Office': 'LSTB-277',
          'Email': 'Tyler.Traver@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Traver, Tyler',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712',
          'Skill': 'SPARQL beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3572',
          'Office': 'LSTB-277',
          'Email': 'Tyler.Traver@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'SQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2651',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'C++ guru',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n370638602',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Relational Database Application Development intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701203852',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Sybase intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168524923',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Relational Database Design intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1647277519',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Object Oriented Software Engineering advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n980752808',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Linux intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Java advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1613',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Javascript intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Hudson / Jenkins intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2041232720',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'perl intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Subversion intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330304752',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Microsoft Word intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2131579087',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'C guru',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1337968289',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'ant advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n126545019',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'XML intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n869199825',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Oracle beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n643546038',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'MySQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'IDL beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Bryant, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1085025965',
          'Skill': 'PHP (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2185',
          'Office': 'LSTB-207',
          'Email': 'Mike.Bryant@lasp.colorado.edu',
          'PhoneNumber': '303-492-7714',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Newgord, Alexia',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n695552564',
          'Skill': 'IDL advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536',
          'Office': '',
          'Email': 'Alexia.Newgord@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Vanier, Blake',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n585326394',
          'Skill': 'Java advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1613',
          'Office': 'LSTB-286',
          'Email': 'Blake.Vanier@lasp.colorado.edu',
          'PhoneNumber': '303-492-8185',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'SQL (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'IDL (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1087137639',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Microsoft Excel (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728291009',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Science Algorithm Development (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336617474',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Confluence (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n169192069',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Java (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Structured Query Language (SQL) (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198943528',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Microsoft Project (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1549151088',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Microsoft PowerPoint (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n601023829',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Sybase (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n467937305',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Microsoft Word (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1858761653',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'MacOS (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n257741671',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Lindholm, Doug',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1790175656',
          'Skill': 'Java (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477',
          'Office': 'LSTB-276A',
          'Email': 'Doug.Lindholm@lasp.colorado.edu',
          'PhoneNumber': '303-735-1127',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Ramas, Joe',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183',
          'Skill': 'Ruby (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749583954',
          'Office': 'LSTB-176',
          'Email': 'Joe.Ramas@lasp.colorado.edu',
          'PhoneNumber': '303-492-6296, 303-885-9111',
          'Position': 'Professional Research Assistant',
          'Division': 'Engineering',
          'Group': 'Calibration & Test'
        }
      ];
    //act
    var returnedJSON = $formatFactory.formatMasterList(fakeSPARQLResults);
    //assert
    expect(returnedJSON).toEqual(expectedJSON);
  });
  it('has access to the DeleteButtonPressed function', function () {
    //all assertions since $scope was set up in our beforeEach above
    expect($scope.DeleteButtonPressed).toBeDefined();
  });
});
//all skills quick search filter unit tests:
describe('Filters: allSkillsCtrl', function () {
  beforeEach(module('mapaskillFilters'));
  describe('ViewAllSearch', function () {
    var inputHaystack = [
        {
          'Person': 'Riesberg, Lon',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057',
          'Skill': 'Java (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477',
          'Office': 'LSTB-259',
          'Email': 'Lon.Riesberg@lasp.colorado.edu',
          'PhoneNumber': '303-492-9388',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Riesberg, Lon',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1226686057',
          'Skill': 'HighCharts (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2003879660',
          'Office': 'LSTB-259',
          'Email': 'Lon.Riesberg@lasp.colorado.edu',
          'PhoneNumber': '303-492-9388',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Knapp, Barry',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270',
          'Skill': 'IDL advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536',
          'Office': 'DIDR-W280B',
          'Email': 'Barry.Knapp@lasp.colorado.edu',
          'PhoneNumber': '303-492-8970',
          'Position': 'Retiree',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Knapp, Barry',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270',
          'Skill': 'Astronomical Algorithms advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1398263944',
          'Office': 'DIDR-W280B',
          'Email': 'Barry.Knapp@lasp.colorado.edu',
          'PhoneNumber': '303-492-8970',
          'Position': 'Retiree',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Knapp, Barry',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n317141270',
          'Skill': 'FORTRAN advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1694332440',
          'Office': 'DIDR-W280B',
          'Email': 'Barry.Knapp@lasp.colorado.edu',
          'PhoneNumber': '303-492-8970',
          'Position': 'Retiree',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Roughton, Steve',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491',
          'Skill': 'SQL advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565',
          'Office': 'LSTB-217',
          'Email': 'Steve.Roughton@lasp.colorado.edu',
          'PhoneNumber': '303-492-5621',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Roughton, Steve',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491',
          'Skill': 'PHP guru',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n15074',
          'Office': 'LSTB-217',
          'Email': 'Steve.Roughton@lasp.colorado.edu',
          'PhoneNumber': '303-492-5621',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Roughton, Steve',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491',
          'Skill': 'UNIX advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038',
          'Office': 'LSTB-217',
          'Email': 'Steve.Roughton@lasp.colorado.edu',
          'PhoneNumber': '303-492-5621',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Roughton, Steve',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491',
          'Skill': 'Python beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313',
          'Office': 'LSTB-217',
          'Email': 'Steve.Roughton@lasp.colorado.edu',
          'PhoneNumber': '303-492-5621',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Roughton, Steve',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1471429491',
          'Skill': 'Java (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477',
          'Office': 'LSTB-217',
          'Email': 'Steve.Roughton@lasp.colorado.edu',
          'PhoneNumber': '303-492-5621',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Dorey, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764',
          'Skill': 'Dygraphs (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n859963165',
          'Office': 'LSTR-288',
          'Email': 'Mike.Dorey@lasp.colorado.edu',
          'PhoneNumber': '303-735-4687',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Dorey, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764',
          'Skill': 'Python advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n531394462',
          'Office': 'LSTR-288',
          'Email': 'Mike.Dorey@lasp.colorado.edu',
          'PhoneNumber': '303-735-4687',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Dorey, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764',
          'Skill': 'Ruby intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n123506868',
          'Office': 'LSTR-288',
          'Email': 'Mike.Dorey@lasp.colorado.edu',
          'PhoneNumber': '303-735-4687',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Dorey, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764',
          'Skill': 'Linux intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087',
          'Office': 'LSTR-288',
          'Email': 'Mike.Dorey@lasp.colorado.edu',
          'PhoneNumber': '303-735-4687',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Dorey, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764',
          'Skill': 'PostgreSQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n19546766',
          'Office': 'LSTR-288',
          'Email': 'Mike.Dorey@lasp.colorado.edu',
          'PhoneNumber': '303-735-4687',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Dorey, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2022800764',
          'Skill': 'FORTRAN intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199',
          'Office': 'LSTR-288',
          'Email': 'Mike.Dorey@lasp.colorado.edu',
          'PhoneNumber': '303-735-4687',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Keiser, Brad',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n246671738',
          'Skill': 'UNIX advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038',
          'Office': 'LSTB-213',
          'Email': 'Brad.Keiser@lasp.colorado.edu',
          'PhoneNumber': '720-454-9338, 303-735-5543',
          'Position': 'Professional Research Assistant',
          'Division': 'Administration',
          'Group': 'Information Technology'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'IDL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187718791',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Matlab beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n982331912',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'AMCharts intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1115838072',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Dygraphs beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n996489377',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Microsoft Excel advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n549514676',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Python beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'JIRA beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2004191433',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Graphical User Interface (GUI) design beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n969597673',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Confluence beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1601745543',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Javascript intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'Microsoft Word advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n341709716',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'DeWolfe, Alex',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n299267178',
          'Skill': 'MacOS advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036406957',
          'Office': 'LSTB-278',
          'Email': 'Alex.DeWolfe@lasp.colorado.edu',
          'PhoneNumber': '303-492-6835',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'tcsh intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n396073491',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'Science Algorithm Development intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1870781320',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'IDL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1187718791',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'Linux advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2100386976',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'AMCharts advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2088524822',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'C (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n793602038',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'Javascript intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'perl advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1712511923',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'MySQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Templeman, Brian',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n428073053',
          'Skill': 'C Shell intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185',
          'Office': 'DIDR-W280C',
          'Email': 'Brian.Templeman@lasp.colorado.edu',
          'PhoneNumber': '303-735-5101',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Java beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Science Algorithm Development advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'PHP intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Python beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Numerical methods intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n667100965',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Numerical Recipes intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'UNIX intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1515330233',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Linux intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'perl intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'C++ advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n906704525',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'Matlab advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n916250560',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'IDL beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'C Shell intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1678575185',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Mueller, Steven',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1924225013',
          'Skill': 'FORTRAN intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199',
          'Office': 'DIDR-W280E',
          'Email': 'Steven.Mueller@lasp.colorado.edu',
          'PhoneNumber': '303-885-0512, 303-735-1072',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'UNIX advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'C++ beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n455885633',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'PHP beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n6849',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'Java beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5091',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'JIRA intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1149926731',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'Python intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424885468',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'Linux advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2100386976',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'SQL beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n12007',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'SPARQL advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3207',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'AngularJS intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2122206999',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'Javascript intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Cox, Michael',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n951973931',
          'Skill': 'MySQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921',
          'Office': 'LSTB-226',
          'Email': 'Michael.Cox@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'SQL advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n7565',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Relational Database Application Development advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n154717227',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Google Forms intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1485541935',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'UNIX advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Oracle advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1465053752',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'PHP intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2363',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Wordpress intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1750133670',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Python beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Microsoft Project intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n342920979',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'PostgreSQL beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1823456412',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Java (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'bash intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n829159456',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Javascript intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'perl intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'SPARQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3976',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Solaris advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1771893770',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'MySQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Elsborg, Don',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1441521911',
          'Skill': 'Sybase advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1859553074',
          'Office': 'LSTB-221',
          'Email': 'Don.Elsborg@lasp.colorado.edu',
          'PhoneNumber': '303-641-9442, 303-492-4585',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'SQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2651',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Least Squares Fitting intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n563249855',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Java intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5409',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'LabView intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1729689433',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'UNIX advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Science Algorithm Development advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n281520001',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Python intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n424885468',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'HTML5 intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2144932849',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'C Shell advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n225932203',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Numerical Recipes intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n735547840',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'IDL advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Astronomical Algorithms advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1398263944',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Graphical User Interface (GUI) design intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n824061673',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Linux intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'ENVI beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1460110611',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'Javascript intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'MacOS advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1036406957',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'FORTRAN intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n745263199',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Beland, Stephane',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n675404123',
          'Skill': 'C advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1026055000',
          'Office': 'DIDR-W265',
          'Email': 'Stephane.Beland@lasp.colorado.edu',
          'PhoneNumber': '303-492-3657',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Reukauf, Randy',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n276714883',
          'Skill': 'SQL (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454',
          'Office': 'LSTB-286',
          'Email': 'Randy.Reukauf@lasp.colorado.edu',
          'PhoneNumber': '303-735-2045',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Popescu, Radu',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704',
          'Skill': 'SQL (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454',
          'Office': 'LSTB-225',
          'Email': 'Radu.Popescu@lasp.colorado.edu',
          'PhoneNumber': '303-589-5143, 303-492-5689',
          'Position': 'Professional Research Assistant',
          'Division': 'Administration',
          'Group': 'Information Technology'
        },
        {
          'Person': 'Popescu, Radu',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1791764704',
          'Skill': 'SharePoint (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n915511558',
          'Office': 'LSTB-225',
          'Email': 'Radu.Popescu@lasp.colorado.edu',
          'PhoneNumber': '303-589-5143, 303-492-5689',
          'Position': 'Professional Research Assistant',
          'Division': 'Administration',
          'Group': 'Information Technology'
        },
        {
          'Person': 'Traver, Tyler',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712',
          'Skill': 'Java intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5409',
          'Office': 'LSTB-277',
          'Email': 'Tyler.Traver@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Traver, Tyler',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712',
          'Skill': 'UNIX advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n368975038',
          'Office': 'LSTB-277',
          'Email': 'Tyler.Traver@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Traver, Tyler',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712',
          'Skill': 'Python beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n748690313',
          'Office': 'LSTB-277',
          'Email': 'Tyler.Traver@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Traver, Tyler',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712',
          'Skill': 'Microsoft Excel intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n927066295',
          'Office': 'LSTB-277',
          'Email': 'Tyler.Traver@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Traver, Tyler',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712',
          'Skill': 'AngularJS beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n994473475',
          'Office': 'LSTB-277',
          'Email': 'Tyler.Traver@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Traver, Tyler',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n292897712',
          'Skill': 'SPARQL beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n3572',
          'Office': 'LSTB-277',
          'Email': 'Tyler.Traver@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'SQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2651',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'C++ guru',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n370638602',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Relational Database Application Development intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n701203852',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Sybase intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n168524923',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Relational Database Design intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1647277519',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Object Oriented Software Engineering advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n980752808',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Linux intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1103914087',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Java advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1613',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Javascript intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n262027611',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Hudson / Jenkins intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2041232720',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'perl intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1266249130',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Subversion intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1330304752',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Microsoft Word intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2131579087',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'C guru',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1337968289',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'ant advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n126545019',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'XML intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n869199825',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'Oracle beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n643546038',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'MySQL intermediate',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n159378921',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Barrett, William',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n124710725',
          'Skill': 'IDL beginner',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1646792738',
          'Office': 'DIDR-W270',
          'Email': 'William.Barrett@lasp.colorado.edu',
          'PhoneNumber': '303-735-0148',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Bryant, Mike',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1085025965',
          'Skill': 'PHP (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2185',
          'Office': 'LSTB-207',
          'Email': 'Mike.Bryant@lasp.colorado.edu',
          'PhoneNumber': '303-492-7714',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Newgord, Alexia',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n695552564',
          'Skill': 'IDL advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n800153536',
          'Office': '',
          'Email': 'Alexia.Newgord@lasp.colorado.edu',
          'PhoneNumber': '',
          'Position': 'Undergraduate Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Vanier, Blake',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n585326394',
          'Skill': 'Java advanced',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1613',
          'Office': 'LSTB-286',
          'Email': 'Blake.Vanier@lasp.colorado.edu',
          'PhoneNumber': '303-492-8185',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'SQL (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n2454',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'IDL (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1087137639',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Microsoft Excel (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1728291009',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Science Algorithm Development (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n336617474',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Confluence (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n169192069',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Java (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Structured Query Language (SQL) (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1198943528',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Microsoft Project (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1549151088',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Microsoft PowerPoint (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n601023829',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Sybase (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n467937305',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'Microsoft Word (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1858761653',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Pankratz, Chris',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n525477966',
          'Skill': 'MacOS (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n257741671',
          'Office': 'LSTB-261',
          'Email': 'Chris.Pankratz@lasp.colorado.edu',
          'PhoneNumber': '303-210-0696, 303-492-0696',
          'Position': 'Senior Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Lindholm, Doug',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1790175656',
          'Skill': 'Java (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5477',
          'Office': 'LSTB-276A',
          'Email': 'Doug.Lindholm@lasp.colorado.edu',
          'PhoneNumber': '303-735-1127',
          'Position': 'Professional Research Assistant',
          'Division': 'Mission Operations & Data Systems',
          'Group': 'Data Systems'
        },
        {
          'Person': 'Ramas, Joe',
          'PersonURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n465268183',
          'Skill': 'Ruby (unranked)',
          'SkillURI': 'http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1749583954',
          'Office': 'LSTB-176',
          'Email': 'Joe.Ramas@lasp.colorado.edu',
          'PhoneNumber': '303-492-6296, 303-885-9111',
          'Position': 'Professional Research Assistant',
          'Division': 'Engineering',
          'Group': 'Calibration & Test'
        }
      ];
    it('filters on search input as we would expect', inject(function (ViewAllSearchFilter) {
      expect(ViewAllSearchFilter(inputHaystack, 'Cox, Michael').length).toBe(12);
      expect(ViewAllSearchFilter(inputHaystack, 'cox, michael').length).toBe(12);
      expect(ViewAllSearchFilter(inputHaystack, 'michael cox').length).toBe(12);
      expect(ViewAllSearchFilter(inputHaystack, 'chael co').length).toBe(12);
      expect(ViewAllSearchFilter(inputHaystack, 'Elsborg, Don').length).toBe(18);
      expect(ViewAllSearchFilter(inputHaystack, 'Don Elsborg').length).toBe(18);
      expect(ViewAllSearchFilter(inputHaystack, 'Ty Tra').length).toBe(6);
      expect(ViewAllSearchFilter(inputHaystack, '//eeeeeeee').length).toBe(0);
      expect(ViewAllSearchFilter(inputHaystack, '! @ # $ % ^ & * ( )```').length).toBe(0);
    }));
  });
});