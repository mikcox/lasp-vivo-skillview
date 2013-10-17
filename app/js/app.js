'use strict';

/* App Module */
var skillsmodule = angular.module('skillsmodule', ['ngDragDrop', 'mapaskillFilters', 'ui.bootstrap']); //dependencies go inside the square brackets

skillsmodule.config(function ($routeProvider, $httpProvider) {
$routeProvider. //this controls navigation within our app
when('/', { controller: 'allSkillsCtrl', templateUrl: 'partials/all-skills.php' }).
when('/mapaskill', { controller: 'mapASkillCtrl', templateUrl: 'partials/map-a-skill.php' }).
otherwise({ redirectTo: '/' });

//enable crossdomain requests
$httpProvider.defaults.withCredentials = true;
delete $httpProvider.defaults.headers.common["X-Requested-With"];
delete $httpProvider.defaults.headers.post["Content-Type"];
});

