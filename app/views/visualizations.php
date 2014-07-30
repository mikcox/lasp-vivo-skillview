<div style="color:black; margin-top:20px;" class="thumbnail">
	<h2 style="display:inline; cursor:pointer;" ng-click="skillsBarCollapsed = !skillsBarCollapsed">Skills: Bar</h2>
	<span style="cursor:pointer;" ng-show="skillsBarCollapsed" ng-click="skillsBarCollapsed = false">(click to expand)</span>
	<span style="cursor:pointer;" ng-show="!skillsBarCollapsed" ng-click="skillsBarCollapsed = true">(click to collapse)</span>
	<br>
	<form ng-submit="searchQuery = query" style="display:inline;">
		<input type="text" ng-model="query" placeholder="Search for a Skill"/>
	</form>
	
	<button ng-click="searchQuery = query">Go</button>
	<button ng-click="clearQueries()">Clear</button>
	
	<div style="float:right;" title="Raw number of people who have the skill">
		<label style="cursor:pointer;">
			<input type="radio" ng-model="barCountType" value="basicCount"
			ng-change="prepareCounts(barCountType)" style="display:inline;"/>
				Number of People
		</label>
		<label style="cursor:pointer;" title="Beginner: 1 point, Intermediate: 2 points, etc.">
			<input type="radio" ng-model="barCountType" value="expertise"
			ng-change="prepareCounts(barCountType)" style="display:inline; cursor:pointer;"/>
				Expertise
		</label>
	</div>
	
	<p ng-hide="barData" style="text-align:center;"> 
		<img src="images/loading.gif"/><br>
		Loading...
	</p>
	<div d3-bars bar-height="20" bar-padding="5" data="barData | filter:searchQuery" ng-if="!skillsBarCollapsed"></div>
	
	<br>
</div>