<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <title>LEMR : Skills</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <!-- build:css styles/main.css -->
    <link rel="stylesheet" href="styles/bootstrap.css">
    <link rel="stylesheet" href="styles/app.css">
    <!-- endbuild -->
  </head>
  <body class="no-logo fae" ng-app="skillsModule">
    <!--[if lt IE 7]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <!-- Add your site or application content here -->
    <header id="branding" role="banner" style="width:271px; height:59px; padding:20px 10px;border-radius: 10px; align:left; margin:0 auto">
        <a id="logo" href="#/" ><img src="images/cu-lasp-logo.png"/></a>
    </header>
    
    <div style="width:100%; text-align:center;" ng-controller="modalCtrl">
        <p style="margin-bottom: 0; font-size: 30px; line-height: 1; letter-spacing: -1px; color:black;">
        	<a id="viewAllSkills" href="#/" style="color: white;">View All Skills</a>
        	 | 
        	<a id="mapASkill" href="#/mapaskill" style="color: white;">Map New Skill</a>
        	 | 
        	<a id="about" href="javascript:void(0)" ng-click="open()" style="color: white;">About</a></p>
    </div>
    
    <div ng-view></div>

	<footer style="margin: 3% 0% 0% 0%">
	    <p> <a href="mailto:michael.cox@lasp.colorado.edu?subject=LEMR Skills App Bug&body=I found a bug with the LEMR Skills app and wanted to tell you!  Details:">Report A Bug</a>
	    	 | 
	    	<a href="mailto:michael.cox@lasp.colorado.edu?subject=LEMR Skills App Suggestion&body=I want to suggest a way to improve the LEMR skills app!  Details:">Suggestions</a></p>
	    <p>Skills App Version 1.0, 11/18/2013</p>
	    <p>Created by the LEMR Development Team</p>
	    <h3>Powered By</h3>
	    <a href="http://lemr.lasp.colorado.edu">LEMR (The LASP Extended Metadata Repository)</a> and <a href="http://angularjs.org/"><img src="images/AngularJS-small.png"/></a>
	</footer>

    <!-- build:js scripts/vendor.js -->
    <!-- bower:js -->
    <script src="components/jquery/dist/jquery.js"></script>
    <script src="components/es5-shim/es5-shim.js"></script>
    <script src="components/angular/angular.js"></script>
    <script src="components/json3/lib/json3.min.js"></script>
    <script src="components/angular-route/angular-route.js"></script>
    <script src="components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script src="components/jquery-ui/ui/jquery-ui.js"></script>
    <script src="components/angular-dragdrop/src/angular-dragdrop.js"></script>
    <!-- endbower -->
    <!-- endbuild -->

        <!-- build:js({.tmp,app}) scripts/scripts.js -->
        <script src="scripts/app.js"></script>
        <script src="scripts/controllers/allSkillsCtrl.js"></script>
        <script src="scripts/filters.js"></script>
        <script src="scripts/services/factories.js"></script>
        <script src="scripts/controllers/aboutModalCtrl.js"></script>
        <script src="scripts/controllers/mapASkillCtrl.js"></script>
        <!-- endbuild -->
</body>
</html>
