'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const envify = require('envify');
const watchify = require('watchify');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const electron = require('electron-connect').server.create();

var lintPaths = [
  'frontend/**/*.js',
  'gulpfile.js',
  'main.js'
];

gulp.task('lint', function() {
  return gulp.src(lintPaths)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('reload-electron', ['build'], function() {
  electron.reload();
});

gulp.task('restart-electron', ['build'], function() {
  electron.restart();
});

function compile(watch) {
  var bundler = browserify('./frontend/index.js', { debug: true }).transform([babelify, envify]);

  if(watch) {
    bundler = watchify(bundler);
  }

  function rebundle() {
    console.log('bundling');
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'));
  }

  bundler.on('update', rebundle);
  return rebundle();
}

function watchit() {
  return compile(true);
}

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watchit(); });

gulp.watch(['./dist/app.js', './index.html', './css/app.css', './i18n/*.js'], electron.reload);
gulp.watch('./main.js', electron.restart);

gulp.task('default', ['watch'], function() {
  process.env.NODE_ENV = 'dev';
  electron.start();
});
