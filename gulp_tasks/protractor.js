'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('../conf/gulp.conf');
const protractor = require('gulp-protractor');

var sauceConnectLauncher = require('sauce-connect-launcher');

var browserSync = require('browser-sync');

// Downloads the selenium webdriver
gulp.task('webdriver-update', protractor.webdriver_update);

gulp.task('webdriver-standalone', protractor.webdriver_standalone);

function runProtractor (done) {
  var params = process.argv;
  var args = params.length > 3 ? [params[3], params[4]] : [];

  gulp.src(path.join(conf.paths.e2e, '/**/*.js'))
    .pipe(protractor.protractor({
      configFile: 'conf/protractor.conf.js',
      args: args
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    })
    .on('end', function () {
      // Close browser sync server
      browserSync.exit();
      done();
    });
}

function runProtractorProduction (done) {
  var params = process.argv;
  var args = params.length > 3 ? [params[3], params[4]] : [];

  sauceConnectLauncher({
  }, function (err, sauceConnectProcess) {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("Sauce Connect ready");

    gulp.src(path.join(conf.paths.e2e, '/**/*.js'))
      .pipe(protractor.protractor({
        configFile: 'protractor.production.conf.js',
        args: args
      }))
      .on('error', function (err) {
        // Make sure failed tests cause gulp to exit non-zero
        sauceConnectProcess.close(function () {
          console.log("Closed Sauce Connect process");
        });
        throw err;
      })
      .on('end', function () {
        // Close browser sync server
        sauceConnectProcess.close(function () {
          console.log("Closed Sauce Connect process");
        });

        browserSync.exit();
        done();
      });
  });
}

gulp.task('protractor', runProtractor);