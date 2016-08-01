'use strict';

describe('The main membership view', function () {
  var page;

  beforeEach(function () {
    browser.get('/#!/admin');
    page = require('./admin.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch('Admin');
  });

  it('Should show the optional Cyberschool search input', function () {
    expect(page.search.cyberschool.isDisplayed()).toBeFalsy();
    page.search.type.sendKeys('cyberschool');
    expect(page.search.cyberschool.isDisplayed()).toBeTruthy();
  });

  it('Should allow navigation to the Settings page', function () {
    expect(page.settingsButton.isDisplayed()).toBeTruthy();
    page.settingsButton.click();
    expect(browser.getCurrentUrl()).toMatch(/admin\/settings/);
  });

  it('Should allow searching for members', function () {
    expect(page.results.isDisplayed()).toBeFalsy();
    page.search.submit.click();
    expect(page.results.isDisplayed()).toBeTruthy();
    expect(page.resultRows.count()).not.toBe(0);
  });

  it('Should show the CSV export button if search results are found', function () {
    expect(page.search.csvButton.isDisplayed()).toBeFalsy();
    page.search.submit.click();
    expect(page.search.csvButton.isDisplayed()).toBeTruthy();
  });

  it('Should allow searching by name', function () {
    page.search.name.sendKeys('Cyberschool In Progress');
    page.search.submit.click();
    expect(page.resultRows.count()).toBe(1);
  });

  it('Should allow searching by type', function () {
    page.search.type.sendKeys('alumnifriends');
    page.search.submit.click();
    expect(page.resultRows.count()).toBe(1);
  });

  it('Should allow searching by cyberschool name', function () {
    page.search.type.sendKeys('cyberschool');
    page.search.submit.click();
    expect(page.resultRows.count()).toBe(1);

    page.search.cyberschool.sendKeys('School A');
    page.search.submit.click();
    expect(page.resultRows.count()).toBe(1);

    page.search.cyberschool.sendKeys('does_not_exist');
    page.search.submit.click();
    expect(page.resultRows.count()).toBe(0);
  });

  it('Should allow filtering by unconfirmed members only', function () {
    page.search.unconfirmed.click();
    page.search.submit.click();
    expect(page.resultRows.count()).toBe(4);
  });

  it('Should allow confirming a membership request', function () {
    page.search.unconfirmed.click();
    page.search.submit.click();
    page.resultRows.get(0).all(by.css('.confirm-button')).click();
    expect(page.resultRows.get(0).all(by.css('td')).get(4).getText()).toBe('Confirmed');
  });

  it('Should allow deleting a membership request', function () {
    page.search.unconfirmed.click();
    page.search.submit.click();
    page.resultRows.get(0).all(by.css('.delete-button')).click();

    // Cancel first
    expect(page.modal.isDisplayed()).toBeTruthy();
    expect(page.modal.heading.getText()).toMatch(/Are you sure you want to delete this user?/);
    page.modal.cancel.click();
    expect(page.resultRows.get(0).all(by.css('td')).get(4).getText()).toMatch(/Unconfirmed/);

    // Now accept the deletion
    page.resultRows.get(0).all(by.css('.delete-button')).click();
    page.modal.confirm.click();
    expect(page.resultRows.get(0).all(by.css('td')).get(4).getText()).toMatch(/DELETED/);
  });

  it('Should allow opening and updating a member\'s data', function () {
    page.search.name.sendKeys('Cyberschool In Progress');
    page.search.submit.click();

    expect(page.tabs.headings.active.getText()).toMatch(/SEARCH RESULTS/);
    page.resultRows.get(0).all(by.css('.view-button')).click();
    expect(page.tabs.headings.active.getText()).not.toMatch(/SEARCH RESULTS/);
    expect(page.tabs.contents.active.element(by.model('vm.sacrifice.firstName')).isEnabled()).toBeFalsy();

    // Open for updates
    page.tabs.contents.active.element(by.css('.allow-updating')).click();
    page.modal.confirm.click();
    expect(page.tabs.contents.active.element(by.model('vm.sacrifice.firstName')).isEnabled()).toBeTruthy();

    // Cancel
    page.tabs.contents.active.element(by.css('.cancel-update')).click();
    expect(page.tabs.contents.active.element(by.model('vm.sacrifice.firstName')).isEnabled()).toBeFalsy();

    // Open again and save
    page.tabs.contents.active.element(by.css('.allow-updating')).click();
    page.modal.confirm.click();
    expect(page.tabs.contents.active.element(by.model('vm.sacrifice.firstName')).isEnabled()).toBeTruthy();
    page.tabs.contents.active.element(by.model('vm.sacrifice.firstName')).clear().then(function () {
      page.tabs.contents.active.element(by.model('vm.sacrifice.firstName')).sendKeys('test_name');
      page.tabs.contents.active.element(by.css('.save-update')).click();
      expect(page.tabs.headings.active.getText()).toMatch(/TEST_NAME/);
    });
  });
});