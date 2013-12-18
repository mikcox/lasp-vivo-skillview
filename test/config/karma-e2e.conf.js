// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../..',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['ng-scenario'],

  // list of files / patterns to load in the browser
    files: [
      'test/e2e/*.js',
      'app/scripts/app.js',
      'app/scripts/controllers/*.js',
      'app/scripts/directives/*.js',
      'app/scripts/filters/*.js',
      'app/scripts/services/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9998,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome',
    		   'Firefox'
    			],

    // Uncomment the following lines if you are using grunt's server to run the tests
     proxies: {
       '/': 'http://localhost:8000/'
     },
    // URL root prevent conflicts with the site root
     urlRoot: '/_e2e/'
  });
};
