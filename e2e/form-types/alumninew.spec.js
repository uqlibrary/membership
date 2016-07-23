'use strict';

describe('The New Graduates form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/#!/form/alumninew');
    page = require('../form.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch(/New Graduates/);
  });

  it('Should show the special New Graduates fields', function () {
    expect(page.form.alumniNewNum.isDisplayed()).toBeTruthy();
    expect(page.form.alumniNewGraduated.isDisplayed()).toBeTruthy();
    expect(page.form.alumniNewAwards.isDisplayed()).toBeTruthy();
  });
});