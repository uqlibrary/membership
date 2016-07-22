'use strict';

describe('The Retired form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/form/retired');
    page = require('../form.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch(/Retired UQ Staff/);
  });

  it('Should show the special Retired fields', function () {
    expect(page.form.retiredPos.isDisplayed()).toBeTruthy();
    expect(page.form.retiredNum.isDisplayed()).toBeTruthy();
    expect(page.form.retiredYears.isDisplayed()).toBeTruthy();
  });
});