'use strict';
skillsModule.controller('allSkillsCtrl', [
  '$scope',
  '$filter',
  'dataFactory',
  'formatFactory',
  function ($scope, $filter, dataFactory, formatFactory) {
    $scope.filteredResults = [];
    $scope.pagedResults = [];
    $scope.currentPageResults = 1;
    $scope.itemsPerPage = 20;
    $scope.maxPages = 10;
    $scope.urlBase = 'http://lasp-db-dev:3030/VIVO/query';
    $scope.queryStr = 'PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#>  SELECT ?Person ?personuri ?Skill ?SkillLevel ?skillleveluri ?Office ?Email ?PhoneNumber ?Position ?Division ?Group WHERE { ?personuri a foaf:Person . ?personuri rdfs:label ?Person . ?personuri laspskills:hasSkill ?skillleveluri . ?skillleveluri rdfs:label ?SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?Skill . OPTIONAL{?personuri vivo:primaryEmail ?Email}. OPTIONAL{?personuri vivo:hasFacility ?roomuri . ?roomuri rdfs:label ?Office} . OPTIONAL{?personuri vivo:phoneNumber ?PhoneNumber} . OPTIONAL{?personuri vivo:personInPosition ?positionuri . ?positionuri rdfs:label ?Position . ?positionuri vivo:positionInOrganization ?groupuri . ?groupuri rdfs:label ?Group . ?groupuri vivo:subOrganizationWithin ?divisionuri . ?divisionuri rdfs:label ?Division }}';
    $scope.getPersonnel = function () {
      dataFactory.getSPARQLQuery($scope.urlBase, $scope.queryStr).success(function (data) {
        $scope.error = '';
        if (data) {
          $scope.skills = formatFactory.formatMasterList(data);
          $scope.filterResults();
        }
      }).error(function (data, status) {
        $scope.error = 'Fuseki returned: ' + status;
      });
    };
    $scope.getPersonnel();
    $scope.orderProp = 'Skill';
    $scope.reverse = false;
    $scope.DeleteButtonPressed = function (name, personuri, skill, skilluri, $index) {
      var moveon = confirm('Delete ' + name + '\'s ' + skill + ' skill?');
      if (moveon) {
        alert('Deleting ' + name + '\'s ' + skill + ' skill.  Wait a moment and refresh your page to see the change.');
        ajaxSubmitDeletion(personuri, skilluri);
      } else {
        return;
      }
    };
    function ajaxSubmitDeletion(personuri, skilluri) {
      var deletionText = 'personuri,leveluri\n';
      deletionText += personuri + ',' + skilluri + '\n';
      $.ajax({
        type: 'POST',
        url: 'scripts/button_actions/removebuttonaction.php',
        data: { DeletionText: deletionText }
      });
    }
    //search functions
    $scope.searchResults = function (person) {
      if (person.length > 0) {
        $scope.currentPageResults = 1;
      }
      return $scope.filterResults();
    };
    $scope.filterResults = function () {
      $scope.filteredResults = $filter('ViewAllSearch')($scope.skills, $scope.query);
      $scope.filteredResults = $filter('orderBy')($scope.filteredResults, $scope.orderProp, $scope.reverse);
      //groupToPages() does not filter input
      $scope.pagedResults = $scope.groupToPages($scope.filteredResults);
      return $scope.filteredResults;
    };
    //Pagination Functions 
    //groupToPages() does not filter input
    $scope.groupToPages = function (list) {
      var pagedList = [];
      for (var i = 0; i < list.length; i++) {
        if (i % $scope.itemsPerPage === 0) {
          pagedList[Math.floor(i / $scope.itemsPerPage)] = [list[i]];
        } else {
          pagedList[Math.floor(i / $scope.itemsPerPage)].push(list[i]);
        }
      }
      return pagedList;
    };
    $scope.countPagedList = function (list) {
      var count = 0;
      if (typeof list === 'undefined') {
        return count;
      }
      for (var i = 0; i < list.length; i++) {
        count += list[i].length;
      }
      return count;
    };
    //Sorting Function
    $scope.changeSorting = function (sort) {
      if ($scope.orderProp == sort) {
        $scope.reverse = !$scope.reverse;
      } else {
        $scope.orderProp = sort;
        $scope.reverses = false;
      }
      $scope.filterResults();
    };
    $scope.sortingClass = function (sort) {
      var cls;
      if ($scope.orderProp == sort) {
        if ($scope.reverse)
          cls = 'sorting_asc';
        else
          cls = 'sorting_desc';
      } else {
        cls = 'sorting_both';
      }
      return cls;
    };
  }
]);