'use strict';
/* Filters */
var filterMod = angular.module('mapaskillFilters', []);
filterMod.filter('QuickSearch', function () {
	return function (haystack, needle, searchkey) {
		var returnList = [];
		if (!needle || needle.length < 1) {
			return haystack;
		} else if (needle === '$all') {
			haystack.sort(function (a, b) {
				if (a[searchkey].toUpperCase() < b[searchkey].toUpperCase()) {
					return -1;
				} else if (a[searchkey].toUpperCase() > b[searchkey].toUpperCase()) {
					return 1;
				}
				return 0;
			});
			return haystack;
		} else {
			//split up our search string into a list of the words
			var needleWordList = needle.split(' ');
			//boolean variable
			var allWordMatch = true;
			//join all the values of each row into a single string that we can search
			for (var i = 0; i < haystack.length; i++) {
				allWordMatch = true;
				for (var j = 0; j < needleWordList.length; j++) {
					if (haystack[i][searchkey].toUpperCase().indexOf(needleWordList[j].toUpperCase()) === -1) {
						allWordMatch = false;
						break;
					}
				}
				if (allWordMatch) {
					returnList.push(haystack[i]);
				}
			}
			returnList.sort(function (a, b) {
				if (a[searchkey].toUpperCase() < b[searchkey].toUpperCase()) {
					return -1;
				} else if (a[searchkey].toUpperCase() > b[searchkey].toUpperCase()) {
					return 1;
				}
				return 0;
			});
			return returnList;
		}
	};
});
filterMod.filter('ViewAllSearch', function () {
	return function (haystack, needle) {
		var returnList = [];
		if (!needle || needle.length < 3) {
			haystack.sort(function (a, b) {
				if (a.Skill.toUpperCase() < b.Skill.toUpperCase()) {
					return -1;
				} else if (a.Skill.toUpperCase() > b.Skill.toUpperCase()) {
					return 1;
				}
				return 0;
			});
			return haystack;
		} else {
			//split up our search string into a list of the words
			var needleWordList = needle.split(' ');
			//boolean variable
			var allWordMatch = true;
			//variable to keep a concatenated version of each row to search through
			var allFieldsString = '';
			//join only the searchable values of each row into a single string that we can search
			for (var i = 0; i < haystack.length; i++) {
				allWordMatch = true;
				allFieldsString = '';
				for (var key in haystack[i]) {
					if (haystack[i].hasOwnProperty(key) && key.toUpperCase().indexOf('URI') === -1) {
						//alert(key + " -> " + haystack[i][key]);
						allFieldsString += haystack[i][key];
					}
				}
				for (var j = 0; j < needleWordList.length; j++) {
					if (allFieldsString.toUpperCase().indexOf(needleWordList[j].toUpperCase()) === -1) {
						allWordMatch = false;
						break;
					}
				}
				if (allWordMatch) {
					returnList.push(haystack[i]);
				}
			}
			return returnList;
		}
	};
});