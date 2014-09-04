'use strict';
skillsModule.controller('visualizationsCtrl', [
	'$scope',
	'dataFactory',
	'formatFactory',
	function ($scope, dataFactory, formatFactory) {	
		var tmpIndex;
		var tmpString;
		var tmpObject;
		$scope.prepareCounts = function( mode ) {
			var alreadySeen = [];
			$scope.barData = [];
			if ( mode === 'basicCount' ) {
				//first, strip out all the skill level strings
				for ( var i = 0; i < $scope.skills.length; i++ ) {
					tmpIndex = $scope.skills[i].Skill.lastIndexOf( " " );
					tmpString = $scope.skills[i].Skill.substring( 0, tmpIndex );
					//if we haven't seen that skill yet, add it to the object.
					if ( alreadySeen.indexOf(tmpString) === -1 ) {
						tmpObject = {skill: tmpString,
								     number: 1};
						$scope.barData.push( tmpObject );
						alreadySeen.push( tmpString );
					} else { //otherwise, just increment that skill's counter by 1
						$scope.barData[alreadySeen.indexOf( tmpString )].number += 1;
					}
				}
			}
			else if ( mode === 'expertise' ) {
				var skillLevel;
				var numberToAdd;
				//first, strip out all the skill level strings
				for ( var i = 0; i < $scope.skills.length; i++ ) {
					tmpIndex = $scope.skills[i].Skill.lastIndexOf( " " );
					tmpString = $scope.skills[i].Skill.substring( 0, tmpIndex );
					skillLevel = $scope.skills[i].Skill.substring( tmpIndex + 1 );
					switch(skillLevel) {
						case '(unranked)':
							numberToAdd = 1;
							break;
						case 'beginner':
							numberToAdd = 1;
							break;
						case 'intermediate':
							numberToAdd = 2;
							break;
						case 'advanced':
							numberToAdd = 3;
							break;
						case 'guru':
							numberToAdd = 4;
							break;
						default:
							numberToAdd = 1;
					}
					//if we haven't seen that skill yet, add it to the object.
					if ( alreadySeen.indexOf(tmpString) === -1 ) {
						tmpObject = {skill: tmpString,
								     number: numberToAdd};
						$scope.barData.push( tmpObject );
						alreadySeen.push( tmpString );
					} else { //otherwise, just increment that skill's counter
						$scope.barData[alreadySeen.indexOf( tmpString )].number += numberToAdd;
					}
				}
			}
			//then sort the array in descending order
			$scope.barData.sort(function (a, b) {
				if (a.number < b.number) {
					return 1;
				} else if (a.number > b.number) {
					return -1;
				}
				return 0;
			});
		};
		
		$scope.clearQueries = function() {
			$scope.query = '';
			$scope.searchQuery = '';
		}
		
		$scope.skillsBarCollapsed = false;
		$scope.barCountType = 'expertise';
		$scope.allSkillsJSONFullPath = '/var/opt/lasp/skills/cached_json/LASP_master_list.json';
		//$scope.allSkillsJSONLocation = 'cached_json/LASP_master_list.json';
		
		dataFactory.getCachedJSONphp( $scope.allSkillsJSONFullPath ).success(function (data) {
            $scope.error = '';
            if (data) {
                data = JSON.parse(data);
                $scope.skills = formatFactory.formatMasterList(data);
                $scope.prepareCounts( $scope.barCountType );
                $scope.$apply();
            }
        }).error(function (data, status) {
            $scope.error = 'JSON get returned: ' + status;
        });
		
		/*
		dataFactory.getCachedJSON( $scope.allSkillsJSONLocation ).success(function ( data ) {
            $scope.error = '';
            if ( data ) {
                $scope.skills = formatFactory.formatMasterList( data );
                $scope.prepareCounts( $scope.barCountType );
            }
        }).error(function (data, status) {
            $scope.error = 'JSON get returned: ' + status;
        });
        */
		
		
	}
]);