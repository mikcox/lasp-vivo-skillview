<div style="color:black; margin-top:20px;" class="thumbnail">
	<h2 style="display:inline; cursor:pointer;" ng-click="skillsBarCollapsed = !skillsBarCollapsed">Skills: Bar</h2>
	<span style="cursor:pointer;" ng-show="skillsBarCollapsed" ng-click="skillsBarCollapsed = false">(click to expand)</span>
	<span style="cursor:pointer;" ng-show="!skillsBarCollapsed" ng-click="skillsBarCollapsed = true">(click to collapse)</span>
	
	<div style="float:right;">
		<label><input type="radio" ng-model="barCountType" value="basicCount" ng-change="prepareCounts(barCountType)" style="display:inline;">Number of People</label>
		<label><input type="radio" ng-model="barCountType" value="expertise" ng-change="prepareCounts(barCountType)" style="display:inline;">Expertise</label>
	</div>
	
	<div d3-bars bar-height="20" bar-padding="5" data="barData" ng-if="!skillsBarCollapsed"></div>
	
	<br>
</div>