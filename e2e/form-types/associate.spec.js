'use strict';

describe('The Associate form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/form/associate');
    page = require('../form.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch(/UQ Associate/);
  });

  it('Should show the special Associate fields', function () {
    expect(page.form.associateAddress0.isDisplayed()).toBeTruthy();
    expect(page.form.associateAddress1.isDisplayed()).toBeTruthy();
    expect(page.form.associateAddress2.isDisplayed()).toBeTruthy();
  });
});