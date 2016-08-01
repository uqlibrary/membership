'use strict';

exports.config = {
  // Capabilities to be passed to the webdriver instance.
  multiCapabilities: [
    {
      'browserName': 'chrome'
    }
  ],
  maxSessions: 1,

  onPrepare: function() {
    browser.manage().window().setSize(1600, 1000);
  },

  baseUrl: 'http://localhost:3000',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../e2e/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    realtimeFailure: true
  }
};