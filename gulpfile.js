'use strict';

var gulp       = require('gulp-help')(require('gulp')),
  source       = require('vinyl-source-stream'),
  del          = require('del'),
  sass         = require('gulp-sass'),
  sequence     = require('gulp-sequence'),
  gutil        = require('gulp-util'),
  sourcemaps   = require('gulp-sourcemaps'),
  autoprefixer = require('autoprefixer'),
  ts           = require('gulp-typescript'),
  concat = require('gulp-concat');

var browserSync = require('browser-sync').create();

//config object for source inputs and desired output paths, makes it easier to change the locations of various assets
//without having to actually modify the gulp tasks
var config = require('./gulp.config.js');

//SASS
gulp.task('sass', 'Compiles SCSS to CSS and copies to dist', function () {
  return gulp.src(config.src.sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
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

//HTML
gulp.task('copyHtml', 'Copies HTML to dist folder', function() {
  return gulp.src(config.src.sourceDir + '/**/*.html').pipe(gulp.dest(config.dest.outputDir));
});


gulp.task('js-watch', ['bundleJs'], browserSync.reload);
gulp.task('ts-watch', ['bundleTs'], browserSync.reload);
gulp.task('html-watch', ['copyHtml'], browserSync.reload);

gulp.task('dev-server', 'Runs browser sync dev server', ['bundleJs'], function () {
  browserSync.init({
    server: {
      baseDir: config.dest.outputDir
    }
  });

  gulp.watch("**/*.js", ['js-watch']);
  gulp.watch("**/*.ts", ['ts-watch']);
  gulp.watch("**/*.html", ['html-watch']);
});

//BUNDLE JS
gulp.task('bundleJs', function() {
  return gulp.src(['bower_components/angular/angular.js', 'bower_components/angular-ui-router/release/angular-ui-router.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.jsDir));
});


//TS
gulp.task('bundleTs', function() {
  var tsProject = ts.createProject('tsconfig.json');
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(concat('tsbundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.outputDir));
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
gulp.task('dist', 'Builds code for production deployment (clean, sass, copyAssets)', sequence('clean', ['sass', 'copyAssets', 'bundleJs', 'bundleTs', 'copyHtml']));

//does not deletes temp dir so cannot be used for incremental compilation
gulp.task('dev', 'Builds code for development (clean, sass, copyAssets)', sequence('clean', ['sass', 'copyAssets', 'bundleJs', 'bundleTs', 'copyHtml']));

//WATCH
gulp.task('watch', 'Watches all assets NOT built by webpack, rebuilds on change', function () {
  gulp.watch([config.src.fontsDir + '/**/*.*',
    config.src.iconsDir + '/**/*.*',
    config.src.svgDir + '/**/*.*',
    config.src.imagesDir + '/**/*.*',
    config.dest.cssDir + '/**/*.css'],
    ['copyAssets']);

  gulp.watch('./**/*.scss', ['sass']);

  gulp.watch('./**/*.ts', ['bundleTs']);
});

gulp.task('default', false, sequence('dev', ['watch', 'dev-server']));