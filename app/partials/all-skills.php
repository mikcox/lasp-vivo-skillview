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
				<table ng-table class="table">
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
					</td>
					<td data-title="'Office'">
						{{row.Office.value}}
					</td>
					<td data-title="'Email'">
						{{row.Email.value}}
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
				<p>
				Number of Results: {{(skills.results.bindings|ViewAllSearch:query).length}}
				</p>
				<br><br>
			</div>
		</div>
	</div>	
</div>