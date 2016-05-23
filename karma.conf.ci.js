var baseConfig = require('./karma.conf.js');

module.exports = function(config) {
  // Load base config
  baseConfig(config);

  // Override base config
  config.set({

    singleRun: true,

    autoWatch: false,

    browsers: ['PhantomJS'],

    reporters: ['progress', 'junit', 'coverage', 'html'],

    htmlReporter: {
      outputFile: 'karma_unit_test_results.html'
    },

    junitReporter: {
      outputFile: 'reports/junit/TESTS-xunit.xml'
    },

    coverageReporter: {
      type:   'lcov',
      dir:    'reports',
      subdir: 'coverage'
    }
  });
};