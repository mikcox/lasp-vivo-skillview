<div class="container-fluid">
	<div class="row-fluid" style="width:100%; align:center; text-align:center;">
		<div id="table1" style="width:25%; display:inline-block; text-align:left; vertical-align:top;">
			<input type="text" class="input-large search-query" data-ng-model="personquery" placeholder="Search for a Person" ng-change="searchPeople(personquery)"/><br/>
			<p class="error">{{error}}</p>
			<ul class="people">
				<h2>People</h2>
				<p ng-show="peoplelist">People Found: {{countPeople()}}</p>
				<p ng-hide="peoplelist"> Loading...</p>
				<li class="thumbnail" ng-repeat="person in pagedPeople[currentPagePeople]" data-drop="true" ng-model="peoplelist" jqyoui-droppable="{multiple: true, onDrop: 'filterPeople'}" data-jqyoui-options="{accept:'.btn-draggable:not([ng-model!=addPersonList])'}"> 
					<div class="btn btn-primary btn-draggable" data-drag="true" data-jqyoui-options="{revert: 'invalid'}" ng-model="peoplelist" jqyoui-draggable="{index: {{$index+currentPagePeople*15}}, animate: false, applyFilter: 'filterPeople'}" ng-hide="!person.person">{{person.person}}</div>
					<button class="addButton" ng-click="addToPeople(person)" title="Add Person" style="padding:2px"><img src="images/add-button.png" height="25px" width="25px"/></button>
				</li>
			</ul>
			<div class="center">
				<div class="pagination">
					<ul>
					  <li ng-class="{disabled: currentPagePeople == 0}">
						<a href ng-click="prevPeoplePage()">« Prev</a>
					  </li>
					  <li ng-repeat="n in range(currentPagePeople,pagedPeople.length)"
						ng-class="{active: n == currentPagePeople}"
						ng-click="setPeoplePage()">
						<a href ng-bind="n + 1" style="width:15px">1</a>
					  </li>
					  <li ng-class="{disabled: currentPagePeople == pagedPeople.length - 1}">
						<a href ng-click="nextPeoplePage()">Next »</a>
					  </li>
					</ul>
				</div>
			</div>
		</div>
		<div id="spacer container" style="width:45%; display:inline-block; align:center; text-align:center;">
			<div style="width: 100%; padding: 10% 0%; align:center;">
				<div>
					<img src="images/map-a-skill-page-directions.png"/>
				</div>
				<div>
					<h4 style="width:45%; display:inline-block;">Person</h4>
					<h4 style="width:45%; display:inline-block;">Has Skills</h4>
				</div>
				<div style="width:90%; height:50%; padding:0% 5%;">
					<div class="thumbnail" data-drop="true" ng-model="addPersonList" data-jqyoui-options="{accept:'.btn-draggable:not([ng-model!=peoplelist])'}" jqyoui-droppable="{multiple: true, onDrop: 'filterPeople'}" style='margin: 0% 2% 0% 0%; padding:3% 3%; width:40%; display:inline-block; vertical-align:middle;'>
						<p ng-hide="addPersonList.length > 0" style="color:#333333">Drag people here or click the green '+' button next to a name to add them.</p>
						<div class="btn btn-primary btn-draggable" data-drag="true" ng-repeat="item in addPersonList" data-jqyoui-options="{revert: 'invalid'}" ng-model="addPersonList" jqyoui-draggable="{index: {{$index}}}" style='width:75%;'>
							{{item.person}}
							<button class="removeButton" ng-click="removeFromAddPerson($index)" title="Remove"><img src="images/remove-button.png"/></button>
						</div>
					</div>
					<div class="thumbnail" data-drop="true"	ng-model="addSkillList"	data-jqyoui-options="{accept:'.btn-draggable:not([ng-model!=skilllist])'}" jqyoui-droppable="{multiple: true, onDrop: 'filterSkills'}" style='margin: 0% 2% 0% 0%; padding: 3% 3%; width:40%; display:inline-block; vertical-align:middle;'>
						<p ng-hide="addSkillList.length > 0" style="color:#333333">Drag skills here or click the green '+' button next to a skill to add it.</p>
						<div class="btn btn-info btn-draggable"	data-drag="true" ng-repeat="item in addSkillList" data-jqyoui-options="{revert: 'invalid'}" ng-model="addSkillList"	jqyoui-draggable="{index: {{$index}}}" style='width:75%;'>
							{{item.skill}}
							<select style="width: 50%;" id="{{item.skill}}">
								<option ng-repeat="level in item.levels" value="{{level.skillleveluri}}">{{skillLevelDisplay(item.skill, level.skilllevel)}}</option>
							</select> 
							<button class="removeButton" ng-click="removeFromAddSkill($index)" title="Remove"><img src="images/remove-button.png"/></button>
						</div>
					</div>
					<button class="btn btn-success" ng-click="SubmitButtonPressed()" style="padding:3% 0%; width: 30%; font-size:20px; margin: 3% 0% 0% 0%;">Submit</button>
				</div>
			</div>
		</div>
		<div id="table2" style="width:25%; display:inline-block; text-align:left; vertical-align:top;">
			<input type="text" class="input-large search-query" data-ng-model="skillquery" placeholder="Search for a Skill" ng-change="searchSkills(skillquery)"/><br/>
			<p class="error">{{error}}</p>
			<ul class="skills">
				<h2>Skills</h2>
				<p ng-show="skilllist">Skills Found: {{countSkills()}}</p>
				<p ng-hide="skilllist"> Loading...</p>
				<li class="thumbnail" ng-repeat="skill in pagedSkills[currentPageSkills]" data-drop="true" ng-model="skilllist" jqyoui-droppable="{multiple: true, onDrop: 'filterSkills'}" data-jqyoui-options="{accept:'.btn-draggable:not([ng-model!=addSkillList])'}"> 
					<div class="btn btn-info btn-draggable" data-drag="true" data-jqyoui-options="{revert: 'invalid'}" ng-model="skilllist" jqyoui-draggable="{index: {{$index+currentPageSkills*15}}, animate: false, applyFilter: 'filterSkills'}" ng-hide="!skill.skill">{{skill.skill}}</div>
					<button class="addButton" ng-click="addToSkills(skill)" title="Add Skill" style="padding:2px"><img src="images/add-button.png" height="25px" width="25px"/></button>
				</li>
			</ul>
			<div class="center">
				<div class="pagination">
					<ul>
					  <li ng-class="{disabled: currentPageSkills == 0}">
						<a href ng-click="prevSkillsPage()">« Prev</a>
					  </li>
					  <li ng-repeat="n in range(currentPageSkills,pagedSkills.length)"
						ng-class="{active: n == currentPageSkills}"
						ng-click="setSkillsPage()">
						<a href ng-bind="n + 1" style="width:15px">1</a>
					  </li>
					  <li ng-class="{disabled: currentPageSkills == pagedSkills.length - 1}">
						<a href ng-click="nextSkillsPage()">Next »</a>
					  </li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>