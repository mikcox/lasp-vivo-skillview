'use strict';
skillsModule.controller('allSkillsCtrl', [
	'$scope',
	'$filter',
	'dataFactory',
	'formatFactory',
	function ($scope, $filter, dataFactory, formatFactory) {
		$scope.pagedResults = [];
		$scope.currentPageResults = 1;
		$scope.itemsPerPage = 15;
		$scope.maxPages = 10;
		$scope.allSkillsJSONFullPath = '/var/opt/lasp/skills/cached_json/LASP_master_list.json';
		//$scope.allSkillsJSONLocation = 'cached_json/LASP_master_list.json';
		/*
		$scope.urlBase = 'http://lemr-dev:3030/VIVO/query';
		$scope.queryStr = 'PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX obo: <http://purl.obolibrary.org/obo/> PREFIX vcard: <http://www.w3.org/2006/vcard/ns#> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX laspskills: <http://webdev1.lasp.colorado.edu:57529/laspskills#>  SELECT ?Person ?personuri ?Skill ?SkillLevel ?skillleveluri ?Office ?Email ?PhoneNumber ?Position ?Division ?Group WHERE { ?personuri a foaf:Person . ?personuri rdfs:label ?Person . ?personuri laspskills:hasSkill ?skillleveluri . ?skillleveluri rdfs:label ?SkillLevel . ?skillleveluri laspskills:levelForSkill ?skilluri . ?skilluri rdfs:label ?Skill . OPTIONAL{?personuri obo:ARG_2000028 ?contactInfo . ?contactInfo vcard:hasEmail ?email . ?email vcard:email ?Email}. OPTIONAL{?personuri obo:RO_0001025 ?roomuri . ?roomuri rdfs:label ?Office} . OPTIONAL{?personuri obo:ARG_2000028 ?contactInfo . ?contactInfo vcard:hasTelephone ?tphone . ?tphone vcard:telephone ?PhoneNumber} . OPTIONAL{?personuri vivo:relatedBy ?positionuri . ?positionuri rdfs:label ?Position} . OPTIONAL{?personuri obo:RO_0000053 ?roleuri . ?roleuri vivo:roleContributesTo ?groupuri . ?groupuri rdfs:label ?Group . ?groupuri obo:BFO_0000050 ?divisionuri . ?divisionuri rdfs:label ?Division }}';
		*/
		$scope.getPersonnel = function () {
		    /*
			dataFactory.getSPARQLQuery($scope.urlBase, $scope.queryStr).success(function (data) {
				$scope.error = '';
				if (data) {
					$scope.skills = formatFactory.formatMasterList(data);
					$scope.filterResults();
				}
			}).error(function (data, status) {
				$scope.error = 'Fuseki returned: ' + status;
			});
			*/
			dataFactory.getCachedJSONphp( $scope.allSkillsJSONFullPath ).success(function (data) {
                $scope.error = '';
                if (data) {
                    data = JSON.parse(data);
                    $scope.skills = formatFactory.formatMasterList(data);
                    $scope.filterResults();
                    $scope.$apply();
                }
            }).error(function (data, status) {
                $scope.error = 'JSON get returned: ' + status;
            });
			/*
		    dataFactory.getCachedJSON( $scope.allSkillsJSONLocation ).success(function (data) {
                $scope.error = '';
                if (data) {
                    $scope.skills = formatFactory.formatMasterList(data);
                    $scope.filterResults();
                }
            }).error(function (data, status) {
                $scope.error = 'JSON get returned: ' + status;
            });
            */
		};
		$scope.getPersonnel();
		$scope.orderProp = 'Skill';
		$scope.reverse = false;
		$scope.DeleteButtonPressed = function (name, personuri, skill, skilluri) {
			var moveon = confirm('Delete ' + name + '\'s ' + skill + ' skill?');
			if (moveon) {
				ajaxSubmitDeletion(name, personuri, skilluri);
				//alert('Deleted ' + name + '\'s ' + skill + ' skill.');
				location.reload();
			} else {
				return;
			}
		};
		function ajaxSubmitDeletion(person, personuri, skilluri) {
			/*var deletionText = 'personuri,leveluri\n';
			deletionText += personuri + ',' + skilluri + '\n';
			$.ajax({
				type: 'POST',
				url: 'scripts/button_actions/removebuttonaction.php',
				data: { DeletionText: deletionText }
			});*/
			//deletionText = '';
			$.ajax({
				type: 'POST',
				url: 'scripts/button_actions/remove_button_action_public.php',
				data: { person: person, personuri: personuri, skilluri: skilluri }
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
			var filteredResults = [];
			filteredResults = $filter('ViewAllSearch')($scope.skills, $scope.query);
			filteredResults = $filter('orderBy')(filteredResults, $scope.orderProp, $scope.reverse);
			$scope.pagedResults = $scope.groupToPages(filteredResults);
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
			if ($scope.orderProp === sort) {
				$scope.reverse = !$scope.reverse;
			} else {
				$scope.orderProp = sort;
				$scope.reverses = false;
			}
			$scope.filterResults();
		};
		$scope.sortingClass = function (sort) {
			var cls;
			if ($scope.orderProp === sort) {
				if ($scope.reverse) {
					cls = 'sorting_asc';
				} else {
					cls = 'sorting_desc';
				}
			} else {
				cls = 'sorting_both';
			}
			return cls;
		};
	}
]);