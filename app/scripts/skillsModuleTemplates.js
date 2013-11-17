angular.module('skillsModule').run(['$templateCache', function($templateCache) {

  $templateCache.put('app/views/all-skills.php',
    "<div class=\"container-fluid\">\n" +
    "\t<div id=\"circle\">&nbsp;</div>\n" +
    "\t\t<div class=\"row-fluid\">\n" +
    "\t\t\t<div>\n" +
    "\t\t\t\t<!--Sidebar content-->\n" +
    "\t\t\t\tQuick text search:<br>\n" +
    "\t\t\t\t<input ng-model=\"query\" placeholder=\"Search for text\" ng-change=\"searchResults(query)\">\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div>\n" +
    "\t\t\t\t<!--Body content-->\n" +
    "\t\t\t\t<p class=\"error\">{{error}}</p>\n" +
    "\t\t\t\t<p ng-hide=\"skills\"> Loading...</p>\n" +
    "\t\t\t\t<table ng-table class=\"table\" ng-show=\"skills\">\n" +
    "\t\t\t\t\t<th class=\"columnHeader\" ng-class=\"sortingClass('Person')\" ng-click=\"changeSorting('Person')\"> Name </th>\n" +
    "\t\t\t\t\t<th class=\"columnHeader\" ng-class=\"sortingClass('Skill')\" ng-click=\"changeSorting('Skill')\"> Skill </th>\n" +
    "\t\t\t\t\t<th class=\"columnHeader\" ng-class=\"sortingClass('Office')\" ng-click=\"changeSorting('Office')\"> Office </th>\n" +
    "\t\t\t\t\t<th class=\"columnHeader\" ng-class=\"sortingClass('Email')\" ng-click=\"changeSorting('Email')\"> Email </th>\n" +
    "\t\t\t\t\t<th class=\"columnHeader\" ng-class=\"sortingClass('PhoneNumber')\" ng-click=\"changeSorting('PhoneNumber')\"> Phone Number </th>\n" +
    "\t\t\t\t\t<th class=\"columnHeader\" ng-class=\"sortingClass('Position')\" ng-click=\"changeSorting('Position')\"> Position </th>\n" +
    "\t\t\t\t\t<th class=\"columnHeader\" ng-class=\"sortingClass('Division')\" ng-click=\"changeSorting('Division')\"> Division </th>\n" +
    "\t\t\t\t\t<th class=\"columnHeader\" ng-class=\"sortingClass('Group')\" ng-click=\"changeSorting('Group')\"> Group </th>\n" +
    "\t\t\t\t\t<tr ng-repeat=\"row in pagedResults[currentPageResults-1]\">\n" +
    "\t\t\t\t\t\t<td>\n" +
    "\t\t\t\t\t\t\t{{row.Person}}\n" +
    "\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t\t<td data-title=\"'Skill'\">\n" +
    "\t\t\t\t\t\t\t{{row.Skill}}\n" +
    "\t\t\t\t\t\t\t<button class=\"removeButton\" ng-click=\"DeleteButtonPressed(row.Person, row.PersonURI, row.Skill, row.SkillURI, $index)\" title=\"Remove Skill\"><img src=\"images/remove-button.png\" width=\"20px\" height=\"20px\"/></button>\n" +
    "\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t\t<td data-title=\"'Office'\">\n" +
    "\t\t\t\t\t\t\t{{row.Office}}\n" +
    "\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t\t<td data-title=\"'Email'\">\n" +
    "\t\t\t\t\t\t\t<a href=\"mailto:{{row.Email}}\">{{row.Email}}</a>\n" +
    "\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t\t<td data-title=\"'Phone Number'\">\n" +
    "\t\t\t\t\t\t\t{{row.PhoneNumber}}\n" +
    "\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t\t<td data-title=\"'Position'\">\n" +
    "\t\t\t\t\t\t\t{{row.Position}}\n" +
    "\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t\t<td data-title=\"'Division'\">\n" +
    "\t\t\t\t\t\t\t{{row.Division}}\n" +
    "\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t\t<td data-title=\"'Group'\">\n" +
    "\t\t\t\t\t\t\t{{row.Group}}\n" +
    "\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t</tr>\n" +
    "\t\t\t\t</table>\n" +
    "\t\t\t\t<div ng-hide=\"!skills\" class=\"center\">\n" +
    "\t\t\t\t\t<pagination boundary-links=\"true\" total-items=\"countPagedList(pagedResults)\" page=\"currentPageResults\" items-per-page=\"itemsPerPage\" max-size=\"maxPages\" class=\"pagination-small\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\"></pagination>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<p ng-hide=\"!skills\">\n" +
    "\t\t\t\tNumber of Results: {{countPagedList(pagedResults)}}\n" +
    "\t\t\t\t</p>\n" +
    "\t\t\t\t<br><br>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\t\n" +
    "</div>"
  );


  $templateCache.put('app/views/map-a-skill.php',
    "<div class=\"container-fluid\">\n" +
    "\t<div class=\"row-fluid\" style=\"width:100%; align:center; text-align:center;\">\n" +
    "\t\t<div style=\"width:25%; display:inline-block; text-align:left; vertical-align:top;\">\n" +
    "\t\t\t<h2>People</h2>\n" +
    "\t\t\t<input type=\"text\" class=\"input-large search-query\" data-ng-model=\"personquery\" placeholder=\"Search for a Person ($all = show all)\" ng-change=\"searchPeople(personquery)\"/><br/>\n" +
    "\t\t\t<p class=\"error\">{{error}}</p>\n" +
    "\t\t\t<ul id=\"table1\" class=\"people\">\n" +
    "\t\t\t\t<p ng-show=\"peoplelist\">People Found: {{countPagedList(pagedPeople)}}</p>\n" +
    "\t\t\t\t<p ng-hide=\"peoplelist\"> Loading...</p>\n" +
    "\t\t\t\t<li class=\"thumbnail\" ng-repeat=\"person in pagedPeople[currentPagePeople-1]\" data-drop=\"true\" ng-model=\"peoplelist\" jqyoui-droppable=\"{multiple: true, onDrop: 'filterPeople'}\" data-jqyoui-options=\"{accept:'.btn-draggable:not([ng-model!=addPersonList])'}\"> \n" +
    "\t\t\t\t\t<div class=\"btn btn-primary btn-draggable\" data-drag=\"true\" data-jqyoui-options=\"{revert: 'invalid'}\" ng-model=\"peoplelist\" jqyoui-draggable=\"{index: {{$index+(currentPagePeople-1)*15}}, animate: false, applyFilter: 'filterPeople'}\" ng-hide=\"!person.person\">{{person.person}}</div>\n" +
    "\t\t\t\t\t<button class=\"addButton\" ng-click=\"addToPeople(person)\" title=\"Add Person\" style=\"padding:2px\"><img src=\"images/add-button.png\" height=\"25px\" width=\"25px\"/></button>\n" +
    "\t\t\t\t</li>\n" +
    "\t\t\t</ul>\n" +
    "\t\t\t<div class=\"center\" ng-hide=\"countPagedList(pagedPeople) < 1\">\n" +
    "\t\t\t\t<pagination boundary-links=\"true\" total-items=\"countPagedList(pagedPeople)\" page=\"currentPagePeople\" items-per-page=\"itemsPerPage\" max-size=\"maxPages\" class=\"pagination-small\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\"></pagination>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div id=\"spacer container\" style=\"width:45%; display:inline-block; align:center; text-align:center;\">\n" +
    "\t\t\t<div style=\"width: 100%; padding: 10% 0%; align:center;\">\n" +
    "\t\t\t\t<div>\n" +
    "\t\t\t\t\t<img src=\"images/map-a-skill-page-directions.png\"/>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div>\n" +
    "\t\t\t\t\t<h4 style=\"width:45%; display:inline-block;\">Person</h4>\n" +
    "\t\t\t\t\t<h4 style=\"width:45%; display:inline-block;\">Has Skills</h4>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div style=\"width:90%; height:50%; padding:0% 5%;\">\n" +
    "\t\t\t\t\t<div class=\"thumbnail\" data-drop=\"true\" ng-model=\"addPersonList\" data-jqyoui-options=\"{accept:'.btn-draggable:not([ng-model!=peoplelist])'}\" jqyoui-droppable=\"{multiple: true, onDrop: 'filterPeople'}\" style='margin: 0% 2% 0% 0%; padding:3% 3%; width:40%; display:inline-block; vertical-align:middle;'>\n" +
    "\t\t\t\t\t\t<p ng-hide=\"addPersonList.length > 0\" style=\"color:#333333\">Drag people here or click the green '+' button next to a name to add them.</p>\n" +
    "\t\t\t\t\t\t<div class=\"btn btn-primary btn-draggable\" data-drag=\"true\" ng-repeat=\"item in addPersonList\" data-jqyoui-options=\"{revert: 'invalid'}\" ng-model=\"addPersonList\" jqyoui-draggable=\"{index: {{$index}}}\" style='width:75%;'>\n" +
    "\t\t\t\t\t\t\t{{item.person}}\n" +
    "\t\t\t\t\t\t\t<button class=\"removeButton\" ng-click=\"removeFromAddPerson($index)\" title=\"Remove\"><img src=\"images/remove-button.png\"/></button>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"thumbnail\" data-drop=\"true\"\tng-model=\"addSkillList\"\tdata-jqyoui-options=\"{accept:'.btn-draggable:not([ng-model!=skilllist])'}\" jqyoui-droppable=\"{multiple: true, onDrop: 'filterSkills'}\" style='margin: 0% 2% 0% 0%; padding: 3% 3%; width:40%; display:inline-block; vertical-align:middle;'>\n" +
    "\t\t\t\t\t\t<p ng-hide=\"addSkillList.length > 0\" style=\"color:#333333\">Drag skills here or click the green '+' button next to a skill to add it.</p>\n" +
    "\t\t\t\t\t\t<div class=\"btn btn-info btn-draggable\"\tdata-drag=\"true\" ng-repeat=\"item in addSkillList\" data-jqyoui-options=\"{revert: 'invalid'}\" ng-model=\"addSkillList\"\tjqyoui-draggable=\"{index: {{$index}}}\" style='width:75%;'>\n" +
    "\t\t\t\t\t\t\t{{item.skill}}\n" +
    "\t\t\t\t\t\t\t<select style=\"width: 50%;\" id=\"{{item.skill}}\">\n" +
    "\t\t\t\t\t\t\t\t<option ng-repeat=\"level in item.levels\" value=\"{{level.skillleveluri}}\">{{skillLevelDisplay(item.skill, level.skilllevel)}}</option>\n" +
    "\t\t\t\t\t\t\t</select> \n" +
    "\t\t\t\t\t\t\t<button class=\"removeButton\" ng-click=\"removeFromAddSkill($index)\" title=\"Remove\"><img src=\"images/remove-button.png\"/></button>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div id=\"submitButtonDiv\">\n" +
    "\t\t\t\t\t\t<button class=\"btn btn-success\" ng-click=\"SubmitButtonPressed()\" style=\"padding:3% 0%; width: 30%; font-size:20px; margin: 3% 0% 0% 0%;\">Submit</button>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div style=\"width:25%; display:inline-block; text-align:left; vertical-align:top;\">\n" +
    "\t\t\t<h2>Skills</h2>\n" +
    "\t\t\t<input type=\"text\" class=\"input-large search-query\" data-ng-model=\"skillquery\" placeholder=\"Search for a Skill ($all = show all)\" ng-change=\"searchSkills(skillquery)\"/><br/>\n" +
    "\t\t\t<p class=\"error\">{{error}}</p>\n" +
    "\t\t\t<ul id=\"table2\" class=\"skills\">\n" +
    "\t\t\t\t<p ng-hide=\"!skilllist ||(skillquery && countPagedList(pagedSkills) == 0 && (addSkillList | filter: {skill: skillquery}).length == 0)\">Skills Found: {{countPagedList(pagedSkills)}}</p>\n" +
    "\t\t\t\t<p ng-hide=\"skilllist\"> Loading...</p>\n" +
    "\t\t\t\t<p id=\"addSkillButtonDiv\" ng-show=\"skilllist && skillquery && countPagedList(pagedSkills) == 0 && (addSkillList | filter: {skill: skillquery}).length == 0\">\n" +
    "\t\t\t\t\tNo Skills Found.  \n" +
    "\t\t\t\t\t<button id=\"addNewSkillButton\" class=\"btn\" ng-click=\"addNewSkill(skillquery)\" >Add this skill?</button>\n" +
    "\t\t\t\t</p>\n" +
    "\t\t\t\t<li class=\"thumbnail\" ng-repeat=\"skill in pagedSkills[currentPageSkills-1]\" data-drop=\"true\" ng-model=\"skilllist\" jqyoui-droppable=\"{multiple: true, onDrop: 'filterSkills'}\" data-jqyoui-options=\"{accept:'.btn-draggable:not([ng-model!=addSkillList])'}\"> \n" +
    "\t\t\t\t\t<div class=\"btn btn-info btn-draggable\" data-drag=\"true\" data-jqyoui-options=\"{revert: 'invalid'}\" ng-model=\"skilllist\" jqyoui-draggable=\"{index: {{$index+(currentPageSkills-1)*15}}, animate: false, applyFilter: 'filterSkills'}\" ng-hide=\"!skill.skill\">{{skill.skill}}</div>\n" +
    "\t\t\t\t\t<button class=\"addButton\" ng-click=\"addToSkills(skill)\" title=\"Add Skill\" style=\"padding:2px\"><img src=\"images/add-button.png\" height=\"25px\" width=\"25px\"/></button>\n" +
    "\t\t\t\t</li>\n" +
    "\t\t\t</ul>\n" +
    "\t\t\t<div class=\"center\" ng-hide=\"countPagedList(pagedSkills) < 1\">\n" +
    "\t\t\t\t<pagination boundary-links=\"true\" total-items=\"countPagedList(pagedSkills)\" page=\"currentPageSkills\" items-per-page=\"itemsPerPage\" max-size=\"maxPages\" class=\"pagination-small\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\"></pagination>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "</div>"
  );

}]);
