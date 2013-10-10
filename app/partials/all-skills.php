<div class="container-fluid">
	<div id="circle">&nbsp;</div>
		<div class="row-fluid">
			<div>
				<!--Sidebar content-->
				Quick text search:<br>
				<input ng-model="query">
			</div>
			<div>
				<!--Body content-->
				<p class="error">{{error}}</p>
				<p ng-hide="skills.results.bindings"> Loading...</p>
				<table ng-table class="table" ng-show="skills.results.bindings">
				<th> Name </th>
				<th> Skill </th>
				<th> Office </th>
				<th> Email </th>
				<th> Phone Number </th>
				<th> Position </th>
				<th> Division </th>
				<th> Group </th>
				<tr ng-repeat="row in skills.results.bindings | ViewAllSearch:query | orderBy:orderProp">
					<td>
						{{row.Person.value}}
					</td>
					<td data-title="'Skill'">
						{{row.Skill.value}}
						<button class="removeButton" ng-click="DeleteButtonPressed(row.Person.value, row.PersonURI.value, row.Skill.value, row.SkillURI.value, $index)" title="Remove Skill"><img src="images/remove-button.png" width="20px" height="20px"/></button>
					</td>
					<td data-title="'Office'">
						{{row.Office.value}}
					</td>
					<td data-title="'Email'">
						<a href="mailto:{{row.Email.value}}">{{row.Email.value}}</a>
					</td>
					<td data-title="'Phone Number'">
						{{row.PhoneNumber.value}}
					</td>
					<td data-title="'Position'">
						{{row.Position.value}}
					</td>
					<td data-title="'Division'">
						{{row.Division.value}}
					</td>
					<td data-title="'Group'">
						{{row.Group.value}}
					</td>
				</tr>
				</table>
				<p ng-show="skills.results.bindings">
				Number of Results: {{(skills.results.bindings|ViewAllSearch:query).length}}
				</p>
				<br><br>
			</div>
		</div>
	</div>	
</div>