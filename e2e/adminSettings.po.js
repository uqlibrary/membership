'use strict';

var AdminSettingsPage = function() {
  this.heading = element(by.css('h1'));
  this.subHeadings = element.all(by.css('h2'));

  this.inputs = element.all(by.model('item.expiry'))
};

module.exports = new AdminSettingsPage();