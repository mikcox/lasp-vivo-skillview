<div class="container-fluid">
	<div id="circle">&nbsp;</div>
		<div class="row-fluid">
			<div>
				<!--Sidebar content-->
				Quick text search:<br>
				<input ng-model="query" placeholder="Search for text" ng-change="searchResults(query)">
			</div>
			<div>
				<!--Body content-->
				<p class="error">{{error}}</p>
				<p ng-hide="skills"> Loading...</p>
				<table ng-table class="table" ng-show="skills">
					<th> Name </th>
					<th> Skill </th>
					<th> Office </th>
					<th> Email </th>
					<th> Phone Number </th>
					<th> Position </th>
					<th> Division </th>
					<th> Group </th>
					<tr ng-repeat="row in pagedResults[currentPageResults-1]">
						<td>
							{{row.Person}}
						</td>
						<td data-title="'Skill'">
							{{row.Skill}}
							<button class="removeButton" ng-click="DeleteButtonPressed(row.Person, row.PersonURI, row.Skill, row.SkillURI, $index)" title="Remove Skill"><img src="images/remove-button.png" width="20px" height="20px"/></button>
						</td>
						<td data-title="'Office'">
							{{row.Office}}
						</td>
						<td data-title="'Email'">
							<a href="mailto:{{row.Email}}">{{row.Email}}</a>
						</td>
						<td data-title="'Phone Number'">
							{{row.PhoneNumber}}
						</td>
						<td data-title="'Position'">
							{{row.Position}}
						</td>
						<td data-title="'Division'">
							{{row.Division}}
						</td>
						<td data-title="'Group'">
							{{row.Group}}
						</td>
					</tr>
				</table>
				<div class="center">
					<pagination boundary-links="true" total-items="countPagedList(pagedResults)" page="currentPageResults" items-per-page="itemsPerPage" max-size="maxPages" class="pagination-small" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></pagination>
				</div>
				<p ng-show="skills">
				Number of Results: {{countPagedList(pagedResults)}}
				{{skills}}
				</p>
				<br><br>
			</div>
		</div>
	</div>	
</div>