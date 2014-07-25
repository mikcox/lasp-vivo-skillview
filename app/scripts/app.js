'use strict';

/* App Module */
var skillsModule = angular.module('skillsModule',
    [ 
      'ngDragDrop',
      'mapaskillFilters',
      'ngRoute',
      'ui.bootstrap'
    ]); //dependencies go inside the square brackets

skillsModule.config(function ($routeProvider) {
    $routeProvider.
        when('/', { controller: 'allSkillsCtrl', templateUrl: 'views/all-skills.php'}).
        when('/mapaskill', { controller: 'mapASkillCtrl', templateUrl: 'views/map-a-skill.php' }).
        otherwise({ redirectTo: '/' });
});

