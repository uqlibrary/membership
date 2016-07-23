'use strict';

/**
 * The deployment process expects certain environment variables to be set. Full list:
 * - CI_BRANCH (Branch that is being deployed)
 * - AWSAccessKeyId
 * - AWSSecretKey
 * - AWSRegion
 * - S3Bucket
 * - S3BucketSubDir
 * - CFDistribution (CloudFront distribution)
 */

var path = require('path');
var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var cloudFront = require('gulp-invalidate-cloudfront');
var awsPublish = require('gulp-awspublish');

var subDir = '/membership';

gulp.task('pre-deploy', preDeploy);

function preDeploy() {
  if (process.env.CI_BRANCH !== 'production') {
    subDir += '/' + process.env.CI_BRANCH;
  }

  // Remove mocking
  return gulp.src(['dist/index.html'])
    .pipe(replace('var mock = true', 'var mock = false'))
    .pipe(replace('<base href="/">', '<base href="' + subDir + '/">'))
    .pipe(gulp.dest('dist'));
}

/** DEPLOY **/
gulp.task('aws-deploy', awsDeploy);

function awsDeploy() {
  // Expects the variable 'subDir' to be updated by the pre-deploy task
  var awsConfig = {
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    params: {
      region: process.env.AWSRegion,
      Bucket: process.env.S3Bucket,
      bucketSubDir: subDir,
      distribution: process.env.CFDistribution
    }
  };

  // create a new publisher using S3 options taken from the environment
  var publisher = awsPublish.create(awsConfig, {});

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('dist/**/*')
    .pipe(rename(function (path) {
      path.dirname = subDir + '/' + path.dirname;
    }))
    .pipe(awsPublish.gzip())
    .pipe(publisher.publish(headers, { force: true }))
    .pipe(awsPublish.reporter());
}