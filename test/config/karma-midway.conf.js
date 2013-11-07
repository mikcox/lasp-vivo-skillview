// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../..',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [

      //app specific code

      'app/components/angular/angular.js',
      'app/components/jquery/jquery.min.js',
      'app/components/angular-mocks/angular-mocks.js',
      'app/scripts/lib/ui-bootstrap-tpls-0.6.0.js',
      'app/scripts/lib/angular-dragdrop.min.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',

      //test specific code

      'node_modules/mocha/lib/*.js',
      'node_modules/chai/chai.js',
      'test/lib/chai-should.js',
      'test/lib/chai-expect.js',
      'test/midway/*.js',
      'node_modules/ng-midway-tester/src/ngMidwayTester.js'
      ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9999,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'
          ]


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    //singleRun: false
  });
};
