# uqlapp-membership

The main membership application located at https://app.library.uq.edu.au/membership/. Consists 
of two parts: public and restricted. The restricted admin panel can be found 
at https://app.library.uq.edu.au/membership/admin.

## Development

Setup your environment first:
-  ```npm install -g gulp-cli bower protractor```
-  ```npm install```
-  ```bower install```

Then serve:
-  ```gulp serve``` - for development
-  ```gulp serve:dist``` - to test minification etc

## Testing

Tests are run using Protractor, and all tests are located in ```./e2e/```. 
Test coverage is currently 100%, and should stay that way. Each bugfix / 
change **should** be joined by an extra test / assertion.

```gulp test```

## Deployment

Deployment is done via ```gulp deploy``` and requires the following environment
variables to be set:
 * CI_BRANCH (Branch that is being deployed)
 * AWSAccessKeyId
 * AWSSecretKey
 * AWSRegion
 * S3Bucket
 * CFDistribution (CloudFront distribution)