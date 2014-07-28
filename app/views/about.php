<div style="color:black;">
	<div class="modal-header">
		<h3> About This App </h3>
	</div>
	<div class="modal-body">
		<p>
		Thank you for using the LEMR Skills App!
		<br><br>
		This app uses LASP's metadata repository to store and serve data about faculty skills.  This public version of the application is 
		modifying cached JSON that lives on the server, but the production app is intended to eventually push new skill mappings back to
		the VIVO instance from which the faculty member was pulled.
		<br><br>
		This app is still very much in development and your feedback is appreciated. 
		Use the links at the bottom of the page to submit a bug report or to suggest a new feature.
		<br><br>
		LASP's personnel information is served from a locally cached JSON file.  UF's personnel information is being generated in real-time
		from <a href="http://sparql.vivo.ufl.edu">UF's SPARQL endpoint.</a>
		</p>
	</div>
	<div class="modal-footer">
		<button class="btn" ng-click="cancel()">Close</button>
	</div>
</div>