'use strict';

var MainPage = function() {
  this.heading = element(by.css('h1'));

  this.cardContent = element(by.css('md-card'));

  this.checkbox = element(by.model('vm.tosAccepted'));
  this.submitButton = element(by.css('button.md-button.md-primary'));
};

module.exports = new MainPage();