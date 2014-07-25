'use strict';
/* Services */
skillsModule.factory('dataFactory', function ($http) {
	var dataFactory = {};
	dataFactory.getSPARQLQuery = function (urlBase, queryStr) {
		var query = 'query=' + escape(queryStr);
		return $http.post(urlBase, query, {
			headers: {
				'Accept': 'application/sparql-results+json',
				'Content-type': 'application/x-www-form-urlencoded'
			}
		});
	};
	dataFactory.submitSPARQLUpdate = function (urlBase, queryStr) {
		var query = 'query=' + escape(queryStr);
		return $http.post(urlBase, query, {
			headers: {
				'update':query,
				'email': 'vivoroot@mydomain.edu',
				'password': 'application/x-www-form-urlencoded'
			}
		});
	};
	dataFactory.getCachedJSON = function ( location ) {
        return $http.get( location ); 
	};
	return dataFactory;
});

skillsModule.factory('formatFactory', function () {
	var formatFactory = {};
	formatFactory.formatMasterList = function formatData(data) {
		//Create a list in which to combine duplicate entries from SPARQL query into one cell
		var fixedList = [];
		var tmpPerson = '';
		var tmpSkill = '';
		var tmpOffice = '';
		var tmpEmail = '';
		var tmpPhone = '';
		var tmpPosition = '';
		var tmpDivision = '';
		var tmpGroup = '';
		var tmpPersonURI = '';
		var tmpSkillURI = '';
		//search for duplicates in person name and skill columns and combine where both match
		//an array to store indexes of any duplicate rows
		var duplicateRows = [];
		var cursor = 0;
		for (var i = 0; i < data.results.bindings.length; i++) {
			//ignore the rows that have already been marked as duplicates.
			if (duplicateRows.indexOf(i) === -1) {
				//set the temp variables to the results from each row
				tmpPerson = data.results.bindings[i].Person.value;
				tmpPersonURI = data.results.bindings[i].personuri.value;
				tmpSkill = data.results.bindings[i].SkillLevel.value;
				tmpSkillURI = data.results.bindings[i].skillleveluri.value;
				//if a person doesn't have an entry for a cell, that cell's key does not show up in the results JSON, so we must be careful and watch for that.
				if (data.results.bindings[i].hasOwnProperty('Office')) {
					tmpOffice = data.results.bindings[i].Office.value;
				} else {
					tmpOffice = '';
				}
				if (data.results.bindings[i].hasOwnProperty('Email')) {
					tmpEmail = data.results.bindings[i].Email.value;
				} else {
					tmpEmail = '';
				}
				if (data.results.bindings[i].hasOwnProperty('PhoneNumber')) {
					tmpPhone = data.results.bindings[i].PhoneNumber.value;
				} else {
					tmpPhone = '';
				}
				if (data.results.bindings[i].hasOwnProperty('Position')) {
					tmpPosition = data.results.bindings[i].Position.value;
				} else {
					tmpPosition = '';
				}
				if (data.results.bindings[i].hasOwnProperty('Division')) {
					tmpDivision = data.results.bindings[i].Division.value;
				} else {
					tmpDivision = '';
				}
				if (data.results.bindings[i].hasOwnProperty('Group')) {
					tmpGroup = data.results.bindings[i].Group.value;
				} else {
					tmpGroup = '';
				}
				//send a cursor looking through the rest of the list for duplicates
				for (cursor = i + 1; cursor < data.results.bindings.length; cursor++) {
					//if we find a match between the current person/skill and the cursor's person/skill...
					if (data.results.bindings[i].Person.value === data.results.bindings[cursor].Person.value && data.results.bindings[i].SkillLevel.value === data.results.bindings[cursor].SkillLevel.value) {
						//add the cursor's row to the list of duplicate indexes
						duplicateRows.push(cursor);
						//concatenate the results from the duplicate row with the temp variable
						if(data.results.bindings[i].Office != null){
							if (data.results.bindings[i].Office.value !== data.results.bindings[cursor].Office.value) {
								tmpOffice = tmpOffice + ', ' + data.results.bindings[cursor].Office.value;
							}
						}
						if(data.results.bindings[i].PhoneNumber != null){
							if (data.results.bindings[i].PhoneNumber.value !== data.results.bindings[cursor].PhoneNumber.value) {
								tmpPhone = tmpPhone + ', ' + data.results.bindings[cursor].PhoneNumber.value;
							}
						}
						if(data.results.bindings[i].Position != null){
							if (data.results.bindings[i].Position.value !== data.results.bindings[cursor].Position.value) {
								tmpPosition = tmpPosition + ', ' + data.results.bindings[cursor].Position.value;
							}
						}
						if(data.results.bindings[i].Division != null){
							if (data.results.bindings[i].Division.value !== data.results.bindings[cursor].Division.value) {
								tmpDivision = tmpDivision + ', ' + data.results.bindings[cursor].Division.value;
							}
						}
						if(data.results.bindings[i].Group != null){
							if (data.results.bindings[i].Group.value !== data.results.bindings[cursor].Group.value) {
								tmpGroup = tmpGroup + ', ' + data.results.bindings[cursor].Group.value;
							}
						}
						
					}
				}
				//push the temp variables into our fixed list in pretty JSON format
				fixedList.push({
					'Person': tmpPerson,
					'PersonURI': tmpPersonURI,
					'Skill': tmpSkill,
					'SkillURI': tmpSkillURI,
					'Office': tmpOffice,
					'Email': tmpEmail,
					'PhoneNumber': tmpPhone,
					'Position': tmpPosition,
					'Division': tmpDivision,
					'Group': tmpGroup
				});
			}
		}
		//set the results to be our entire fixed list rather than the raw SPARQL results
		data = fixedList;
		return data;
	};
	formatFactory.formatPersonnelList = function (data) {
		var list = [];
		for (var i = 0; i < data.results.bindings.length; i++) {
		    if( typeof data.results.bindings[i].person === 'undefined'){
		        alert(JSON.stringify(data.results.bindings[i]));
		    }
			list.push({
				'person': data.results.bindings[i].person.value,
				'uri': data.results.bindings[i].personuri.value
			});
		}
		return list;
	};
	formatFactory.formatSkillList = function (data) {
		//create empty array to build representation of all skill levels
		var levelList = [];
		var list = [];
		//alert(JSON.stringify(data.results.bindings));
		for (var i = 0; i < data.results.bindings.length;) {
			//empty the level list and prepare a cursor...
			levelList = [];
			var cursor = i + 1;
			//add the first skill level
			levelList.push({
				'skilllevel': data.results.bindings[i].skilllevel.value,
				'skillleveluri': data.results.bindings[i].skillleveluri.value
			});
			//iterate down through list of results while the skill name at the cursor is still the same as the skill name at i
			while (data.results.bindings[i].skill.value === data.results.bindings[cursor].skill.value) {
				//add the skill level from the cursor row to the levelList
				levelList.push({
					'skilllevel': data.results.bindings[cursor].skilllevel.value,
					'skillleveluri': data.results.bindings[cursor].skillleveluri.value
				});
				//check that another row exists
				if (cursor + 1 < data.results.bindings.length) {
					cursor++;
				}//otherwise, we're done
				else {
					break;
				}
			}
			//add the skill and all its levels into a finalized JSON object and append it to our final skill list
			list.push({
				'skill': data.results.bindings[i].skill.value,
				'levels': levelList
			});
			//if there are more skills...
			if (cursor + 1 < data.results.bindings.length) {
				//move i to the cursor and continue
				i = cursor;
			}//otherwise, we're done
			else {
				break;
			}
		}
		return list;
	};

	return formatFactory;
});