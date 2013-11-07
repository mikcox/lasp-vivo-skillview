var shared = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: ['Chrome'],
    autoWatch: true,

    // these are default values anyway
    singleRun: false,
    colors: true,
  });
};

shared.files = [
  //3rd Party Code
  'components/angularjs/index.js',
  'app/scripts/lib/router.js',

  //App-specific Code
  'app/scripts/config/config.js',
  'app/scripts/services/**/*.js',
  'app/scripts/directives/**/*.js',
  'app/scripts/controllers/**/*.js',
  'app/scripts/filters/**/*.js',
  'app/scripts/config/routes.js',
  'app/scripts/app.js',
];

module.exports = shared;
