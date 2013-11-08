'use strict';

/* App Module */
var skillsModule = angular.module('skillsModule',
	['ngDragDrop',
	 'mapaskillFilters',
	 'ui.bootstrap']); //dependencies go inside the square brackets

skillsModule.config(function ($routeProvider, $httpProvider) {
$routeProvider. //this controls navigation within our app
when('/', { controller: 'allSkillsCtrl', templateUrl: 'views/all-skills.php' }).
when('/mapaskill', { controller: 'mapASkillCtrl', templateUrl: 'views/map-a-skill.php' }).
otherwise({ redirectTo: '/' });

//enable crossdomain requests
$httpProvider.defaults.withCredentials = true;
delete $httpProvider.defaults.headers.common["X-Requested-With"];
delete $httpProvider.defaults.headers.post["Content-Type"];
});

