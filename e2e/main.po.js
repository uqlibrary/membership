'use strict';

var MainPage = function() {
  this.heading = element(by.css('h1'));
  this.membershipTypes = element.all(by.css('h2'));
};

module.exports = new MainPage();