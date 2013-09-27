'use strict';

/* Filters */
var filterMod = angular.module('mapaskillFilters', []);

filterMod.filter('QuickSearch', function() {
		return function(haystack, needle, searchkey) {
			var returnList = [];
			if(!needle || needle.length < 3){
				haystack.sort(function(a,b) { 
					if(a[searchkey] < b[searchkey]){
						return -1;
					}
					else if(a[searchkey] > b[searchkey]){
						return 1;
					}
						return 0;
					});
				return haystack;
			}
			else{
				//split up our search string into a list of the words
				var needleWordList = needle.split(" ");
				//boolean variable
				var allWordMatch = true;
				//variable to keep a concatenated version of each row to search through
				var allFieldsString = "";
				
				//join all the values of each row into a single string that we can search
				for(var i = 0; i < haystack.length; i++){
					allWordMatch = true;
					for(var j = 0; j < needleWordList.length; j++){
						if(haystack[i][searchkey].toUpperCase().indexOf(needleWordList[j].toUpperCase()) == -1){
							allWordMatch = false;
							break;
						}
					}
					if(allWordMatch){
						returnList.push(haystack[i]);
					}
				}
				returnList.sort(function(a,b) { 
					if(a[searchkey] < b[searchkey]){
						return -1;
					}
					else if(a[searchkey] > b[searchkey]){
						return 1;
					}
						return 0;
					});
				return returnList;
			}
		}
	});
	
filterMod.filter('ViewAllSearch', function() {
		return function(haystack, needle) {
			var returnList = [];
			if(!needle || needle.length < 3){
				return haystack;
			}
			else{
				//split up our search string into a list of the words
				var needleWordList = needle.split(" ");
				//boolean variable
				var allWordMatch = true;
				//variable to keep a concatenated version of each row to search through
				var allFieldsString = "";
				
				//join all the values of each row into a single string that we can search
				for(var i = 0; i < haystack.length; i++){
					allWordMatch = true;
					for(var j = 0; j < needleWordList.length; j++){
						if(JSON.stringify(haystack[i]).toUpperCase().indexOf(needleWordList[j].toUpperCase()) == -1){
							allWordMatch = false;
							break;
						}
					}
					if(allWordMatch){
						returnList.push(haystack[i]);
					}
				}
				return returnList;
			}
		}
	});