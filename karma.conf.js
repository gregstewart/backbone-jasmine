// Karma configuration
// Generated on Tue Aug 20 2013 19:33:55 GMT+0200 (CEST)

module.exports = function (config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],
    //, 'requirejs'


    // list of files / patterns to load in the browser
    files: [
      //'test-main.js',
      'javascript/vendor/jquery-1.7.2.min.js',
      'javascript/vendor/json2.js',
      'javascript/vendor/underscore-min.js',
      'javascript/vendor/backbone-min.js',
      'javascript/vendor/sinon-1.3.4.js',
      'javascript/vendor/jasmine-jquery.js',
      'javascript/vendor/jasmine-sinon.js',

      {pattern: 'javascript/src/*.js'}, //, included: false
      {pattern: 'test/spec/**/*.js'}, //, included: false
      {pattern: 'test/fixtures/*.html', served: true},
      {pattern: 'test/fixtures/*.json', served: true}
    ],


    // list of files to exclude
    exclude: [

    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
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
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
