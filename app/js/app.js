'use strict';

/* App Module */
var vivoviz = angular.module('vivoviz', ['ngDragDrop', 'mapaskillFilters']); //dependencies go inside the square brackets

vivoviz.config(function ($routeProvider, $httpProvider) {
$routeProvider. //this controls navigation within our app
when('/', { controller: SkillsCtrl, templateUrl: 'partials/all-skills.php' }).
when('/mapaskill', { controller: AddSkillCtrl, templateUrl: 'partials/map-a-skill.php' }).
otherwise({ redirectTo: '/' });

//enable crossdomain requests
$httpProvider.defaults.withCredentials = true;
delete $httpProvider.defaults.headers.common["X-Requested-With"];
delete $httpProvider.defaults.headers.post["Content-Type"];
});
