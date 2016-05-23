module.exports = function(config) {
  var includeCoverage = false;
  var args = process.argv;
  for (var i = 0; i < args.length; i++) {
    if (args[i].indexOf('--coverage') >= 0) {
      console.log('Including coverage');
      includeCoverage = true;
      break;
    }
  }

  var karmaConfig = {
    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],

    files: [
      { pattern: 'tests.webpack.js', watched: false }
    ],

    frameworks: ['jasmine', 'phantomjs-shim'],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
      'src/*.js': ['coverage']
    },

    singleRun: false,

    webpack: {
      devtool: "inline-source-map",
      resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.ts', '.tsx', '.js']
      },
      module: {
        loaders: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          {
            test: /\.tsx?$/,
            loader: 'ts-loader'
          },
        ],
        postLoaders: []
      }
    },
    webpackServer: {
      noInfo: true,
    },

    reporters: ['dots'],
    // Other possible reporters:
    // reporters:  ['dots', 'progress', 'coverage', 'osx']

    osxReporter: {
      host: "localhost",
      port: 1337
    }
  };

  if (includeCoverage) {
    karmaConfig.webpack.module.postLoaders.push({
      test: /\.tsx?$/,
      exclude: /(\/test\/|__tests__|spec|node_modules|bower_components)/,
      loader: 'istanbul-instrumenter'
    });

    karmaConfig.reporters.push('coverage');
  }

  config.set(karmaConfig);
};