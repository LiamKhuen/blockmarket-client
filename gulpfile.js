require('es6-promise').polyfill();

'use strict';

var gulp       = require('gulp-help')(require('gulp')),
  source       = require('vinyl-source-stream'),
  del          = require('del'),
  sass         = require('gulp-sass'),
  sequence     = require('gulp-sequence'),
  gutil        = require('gulp-util'),
  sourcemaps   = require('gulp-sourcemaps'),
  webpack      = require('webpack'),
  deepAssign   = require('deep-assign'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  WebpackDS    = require('webpack-dev-server'),
  autoprefixer = require('gulp-autoprefixer');

var webpackConfig = require('./webpack.config.js');

//config object for source inputs and desired output paths, makes it easier to change the locations of various assets
//without having to actually modify the gulp tasks
var config = require('./gulp.config.js');

//SASS
gulp.task('sass', 'Compiles SCSS to CSS and copies to dist', function () {
  return gulp.src(config.src.sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer()) // right now only appending "-webkit-*". Enhance in the future if needed.
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(config.dest.cssDir));
});

//COPY NON-SOURCE-CODE ASSETS
gulp.task('copyAssets', 'Copies assets (fonts, icons, images, etc) from source folders to dist folders', function () {
  gulp.src([config.src.fontsDir + '/**/*.*'])
    .pipe(gulp.dest(config.dest.fontsDir));

  gulp.src([config.src.iconsDir + '/**/*.*'])
    .pipe(gulp.dest(config.dest.iconsDir));

  gulp.src([config.src.svgDir + '/**/*.*'])
    .pipe(gulp.dest(config.dest.svgDir));

  gulp.src([config.src.imagesDir + '/**/*.*'])
    .pipe(gulp.dest(config.dest.imagesDir));

  //make sure not to copy scss here
  return gulp.src([config.src.cssDir + '/**/*.css'])
    .pipe(gulp.dest(config.dest.cssDir));
});

gulp.task('webpack', 'Transpiles TS files to JS and then bundles the resulting JS to a single file in dist folder', [], function (done) {
  var PRODUCTION_CONFIG_OVERRIDES = {
    entry: {
      app: [
          config.src.tsRoot
      ]
    },
    watch: false,
    cache: false,
    debug: false
  };

  var compiler = webpack(deepAssign({}, webpackConfig, PRODUCTION_CONFIG_OVERRIDES));
  compiler
    .run(function(err, stats) {
      if(err) {
        console.log('Webpack Error', err);
      }
      else {
        console.log(stats.toString());
      }
      done();
    });
});

gulp.task('dev-server', 'Runs webpack dev server', [], function () {

  var pathToWebpackClient = config.webPack.proxyBaseUrl ? 'webpack-dev-server/client?' + config.webPack.proxyBaseUrl
    : 'webpack-dev-server/client?http://localhost:' + config.webPack.port;
  //
  var WEBPACK_DEV_SERVER_CONFIG_OVERRIDES = {
    entry: {
      app: [
        pathToWebpackClient,
        config.src.tsRoot
      ]
    },
    watch: true,
    cache: true,
    debug: true,
    plugins: [
      // this injects JS scripts that are processed by webpack into the HTML file we specify
      new HtmlWebpackPlugin({
        template: config.src.indexFile,
        inject: 'body',
        filename: 'index.html' // file where output will be written (dist/index.html in our case)
      })
    ]
  };

  var compiler = webpack(deepAssign({}, webpackConfig, WEBPACK_DEV_SERVER_CONFIG_OVERRIDES));

  new WebpackDS(compiler, {
    publicPath: '/',
    contentBase: 'dist/',
    proxy: {/*
      '/dl3-service*': {
          target: config.webPack.apiBaseUrl,
          secure: false
      },
      '/dlm-service*': {
          target: config.webPack.apiBaseUrl,
          secure: false
      }
    */}
  }).listen(config.webPack.port, "0.0.0.0", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:" + config.webPack.port + "/");

    // keep the server alive or continue?
    // callback();
  });
});

// Clean dir
gulp.task('clean', 'Deletes all build artifacts', function () {
  return del([config.dest.outputDir]);
});

gulp.task('cleanJs', 'Deletes bundled JS/sourcemap from dist, leaves other files untouched', function () {
  return del(config.dest.jsDir + "/*.*");
});

//BUILD AND BUNDLE
//deletes temp dir so cannot be used for incremental compilation
gulp.task('dist', 'Builds code for production deployment (clean, webpack, sass, copyAssets)', sequence('clean', ['sass', 'copyAssets'], 'webpack'));

//does not deletes temp dir so cannot be used for incremental compilation
gulp.task('dev', 'Builds code for development (clean, sass, copyAssets)', sequence('clean', ['sass', 'copyAssets']));

//WATCH
gulp.task('watch', 'Watches all assets NOT built by webpack, rebuilds on change', function () {
  gulp.watch([config.src.fontsDir + '/**/*.*',
    config.src.iconsDir + '/**/*.*',
    config.src.svgDir + '/**/*.*',
    config.src.imagesDir + '/**/*.*',
    config.dest.cssDir + '/**/*.css'],
    ['copyAssets']);

  gulp.watch('./**/*.scss', ['sass']);
});

gulp.task('default', false, sequence('dev', ['watch', 'dev-server']));