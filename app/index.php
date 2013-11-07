<!DOCTYPE html>
<html lang="en" ng-app="skillsmodule">
    <head>
        <meta charset="utf-8" />
        <title>LEMR : Skills</title>
        <meta name="description" content="" />
        <meta name="author" content="Mik" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" href="styles/bootstrap.css">
        <link rel="stylesheet" href="styles/app.css">
        <script src="components/jquery/jquery.min.js"></script>
        <script src="components/angular/angular.min.js"></script>
        <script src="scripts/lib/jquery-ui.min.js"></script>
        <script src="scripts/lib/angular-dragdrop.min.js"></script>
        <script src="scripts/lib/ui-bootstrap-tpls-0.6.0.js"></script>
        <script src="scripts/app.js"></script>
        <script src="scripts/controllers/allSkillsCtrl.js"></script>
        <script src="scripts/controllers/mapASkillCtrl.js"></script>
        <script src="scripts/filters/filters.js"></script>
        <script src="scripts/services/factories.js"></script>
    </head>

    <body class="no-logo fae">
        <header id="branding" role="banner" style="width:271px; height:59px; padding:20px 10px;border-radius: 10px; align:left; margin:0 auto">
            <a id="logo" href="#/" ><img src="images/cu-lasp-logo.png"/></a>
        </header>
        <div style="width:100%; text-align:center;">
            <p style="margin-bottom: 0; font-size: 30px; line-height: 1; letter-spacing: -1px; color:white;"><a id="viewAllSkills" href="#/" style="color: #004C80;">View All Skills</a> | <a id="mapASkill" href="#/mapaskill" style="color: #004C80;">Map New Skill</a></p>
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
