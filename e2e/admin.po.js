'use strict';

var AdminPage = function() {
  this.heading = element(by.css('h1'));
  this.settingsButton = element(by.css('.settings-button'));
  this.backdrop = element(by.css('md-backdrop'));

  // Search card
  this.search = element(by.css('.search-section'));
  this.search.name = this.search.element(by.model('vm.search.name'));
  this.search.type = this.search.element(by.model('vm.search.type'));
  this.search.submit = this.search.element(by.css('.search-button'));
  this.search.unconfirmed = this.search.element(by.model('vm.search.status'));
  this.search.cyberschool = this.search.element(by.css('#cyberschoolAddress_0')).element(by.css('input'));
  this.search.csvButton = this.search.element(by.css('.csv-button'));

  // Tabs
  this.tabs = element(by.css('md-tabs'));
  this.tabs.headings = this.tabs.all(by.css('md-tab-item'));
  this.tabs.headings.active = this.tabs.element(by.css('md-tab-item.md-active'));
  this.tabs.contents = this.tabs.all(by.css('md-tab-content'));
  this.tabs.contents.active = this.tabs.element(by.css('md-tab-content.md-active'));

  // Results
  this.results = element(by.css('md-table-container'));
  this.resultRows = this.results.all(by.css('tbody tr'));

  this.modal = element(by.css('md-dialog'));
  this.modal.heading = this.modal.element(by.css('h2'));
  this.modal.cancel = this.modal.all(by.css('md-dialog-actions button')).get(0);
  this.modal.confirm = this.modal.all(by.css('md-dialog-actions button')).get(1);
};

module.exports = new AdminPage();