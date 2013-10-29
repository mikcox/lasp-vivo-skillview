## Important note for local development in VM ##
---
Note that a number of places in our code state to pull data from the SPARQL endpoint on lasp-db-dev.  You should run a global find and replace on the project after checking it out
if you want to pull from your local SPARQL endpoint instead (changing https://lasp-db-dev:3030 to https://localhost:3030).  Note that the harvester code isn't currently included
with the VM, so none of the submit or delete buttons will actually work, so for the time being it will always be safe to let the app pull from lasp-db-dev.


## Naming Conventions ##
 ---
- *Controllers* will be UpperCamelCase, as we can think of them as classes
that instantiate our models and create scope variables `Ex: "SkillsCtrl"`
- *Everything else* will be lowerCamelCase, `Ex: ng-app "timeExampleModule"`
- *Files* will be seperated by - `Ex: skill-app-ctrl.js`
- *Directories* will be seperated by _ `Ex: bower_components/`

## Helpful Articles/Videos ##
---
- [angular unit/midway/e2e testing] [5]
- [angular unit testing] [1]
- [angular rest api guide] [2]
- [awesome markdown guide] [3]
- [all of angular js in 60 min, good for review] [4]

## Grunt/Bower/Yo guideline ##
---
- the only global npm module should be the grunt cli, other wise use
`--save-dev` for example, `npm install grunt-contrib --save-dev`, that way it will be placed on the package.json list for easy deployment
- the Gruntfile is essentially composed of registered tasks where we call them through grunt.
- Bower should manage it's own libaries/updates, we shouldn't place any of our own libraries in bower components


[1]: http://andyshora.com/unit-testing-best-practices-angularjs.html
[2]: http://weblogs.asp.net/dwahlin/archive/2013/08/16/using-an-angularjs-factory-to-interact-with-a-restful-service.aspx
[3]: http://dillinger.io/
[4]: http://www.youtube.com/watch?v=i9MHigUZKEM
[5]: http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html

## Deployment

- Dependencies
    $ sudo apt-get install php5-cgi
    $ git clone git@github.com:revathskumar/yeoman-php.git
    $ cd yeoman-php
    $ npm install
    $ bower install
    $ grunt server



