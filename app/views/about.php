<div style="color:black;">
	<div class="modal-header">
		<h3> About This App </h3>
	</div>
	<div class="modal-body">
		<p>
		Thank you for using the LEMR Skills App!
		<br><br>
		<span style="font-weight:bold">Please Note:</span> The public version of this app has been populated with representative test data
		for faculty from various universities and their skills.  It therefore does NOT necessarily give an accurate representation of the true skillset of
		any individual it contains, nor of the universities to which they belong.
		<br><br>
		This app uses LASP's metadata repository to store and serve data about faculty skills.  This public version of the application is 
		modifying cached JSON that lives on the server, but the production app is intended to eventually push new skill mappings back to
		the VIVO instance from which the faculty member was pulled.
		<br><br>
		LASP and Brown's personnel information is being served from locally cached JSON files that mimic the results of a query to their SPARQL endpoints.
		UF's personnel information is being generated in real-time from <a href="http://sparql.vivo.ufl.edu">UF's SPARQL endpoint.</a>
		<br><br>
		This app is still very much in development and your feedback is appreciated. 
		Use the links at the bottom of the page to submit a bug report or to suggest a new feature.
		<br><br>
		A huge thanks to Ransom Christofferson for his work cleaning up the CSS in this public version, and to Tyler Traver for his help with the
		development of the original internal skills application!
		</p>
	</div>
	<div class="modal-footer">
		<button class="btn" ng-click="cancel()">Close</button>
	</div>
</div>