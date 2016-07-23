'use strict';

describe('The Reciprocal form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/#!/form/reciprocal');
    page = require('../form.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch(/Reciprocal Borrower/);
  });

  it('Should show the special Reciprocal fields', function () {
    expect(page.form.reciprocalInstitution.isDisplayed()).toBeTruthy();
    expect(page.form.reciprocalLibNo.isDisplayed()).toBeTruthy();
  });
});