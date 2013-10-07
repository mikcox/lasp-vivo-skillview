<!DOCTYPE html>
<html lang="en" ng-app="vivoviz">
	<head>
		<meta charset="utf-8" />
		<title>LEMR : Skills</title>
		<meta name="description" content="" />
		<meta name="author" content="Mik" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		
		<link rel="stylesheet" href="css/bootstrap.css">
		<link rel="stylesheet" href="css/app.css">
		<link rel="stylesheet" href="css/jquery-ui.css">
		<script src="lib/jQuery/jquery-1.10.2.min.js"></script>
		<script src="lib/jQuery/jquery-ui.min.js"></script>
		<script src="lib/angular/angular.min.js"></script>
		<script src="lib/angular/angular-dragdrop.min.js"></script>
		<script src="js/app.js"></script>
		<script src="js/controllers.js"></script>
		<script src="js/directives.js"></script>
		<script src="js/filters.js"></script>
	</head>

	<body class="no-logo fae">
		<header id="branding" role="banner" style="width:271px; height:59px; padding:20px 10px;border-radius: 10px; align:left; margin:0 auto">
			<a href="#/" ><img src="images/cu-lasp-logo.png"/></a>
		</header>
		<div style="width:100%; text-align:center;">
			<p style="margin-bottom: 0; font-size: 30px; line-height: 1; letter-spacing: -1px; color:white;"><a href="#/" style="color: #004C80;">View All Skills</a> | <a href="#/mapaskill" style="color: #004C80;">Map New Skill</a></p>
		</div>
		<div ng-view>
		</div>
		<footer style="margin: 3% 0% 0% 0%">
			<p>Created by the LEMR Development Team</p>
			<h3>Powered By</h3>
			<a href="http://webdev1.lasp.colorado.edu:57529/vivo/">LEMR (The LASP Extended Metadata Repository)</a> and <a href="http://angularjs.org/"><img src="images/AngularJS-small.png"/></a>
		</footer>
	</body>
</html>