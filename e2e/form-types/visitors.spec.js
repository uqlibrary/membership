'use strict';

describe('The Visitors form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/#!/form/visitors');
    page = require('../form.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch(/Visitors/);
  });

  it('Should show the special Visitors fields', function () {
    expect(page.form.departamentalAddress.isDisplayed()).toBeTruthy();
    expect(page.form.homeInstitution.isDisplayed()).toBeTruthy();
  });
});