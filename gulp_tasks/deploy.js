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

/** DEPLOY **/
gulp.task('aws-deploy', awsDeploy);

function awsDeploy() {
  // Remove mocking
  gulp.src(['dist/index.html'])
    .pipe(replace('var mock = true', 'var mock = false'))
    .pipe(gulp.dest('dist'));

  var subDir = '/membership';

  if (process.env.CI_BRANCH !== 'production') {
    subDir += '/' + process.env.CI_BRANCH;
  }

  // create a new publisher using S3 options taken from the environment
  var publisher = awsPublish.create({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    params: {
      region: process.env.AWSRegion,
      Bucket: process.env.S3Bucket,
      bucketSubDir: subDir,
      distribution: process.env.CFDistribution
    }
  });

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('dist/**/')
    .pipe(rename(function (path) {
      path.dirname = subDir + '/' + path.dirname;
    }))
    // gzip, Set Content-Encoding headers
    .pipe(awsPublish.gzip({ ext: '.gz' }))

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

    // print upload updates to console
    .pipe(awsPublish.reporter());
}