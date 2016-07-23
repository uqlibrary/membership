'use strict';

describe('The Alumni form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/#!/form/alumni');
    page = require('../form.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch(/Alumni/);
  });

  it('Should show the special Alumni fields', function () {
    expect(page.form.alumniPeriod.isDisplayed()).toBeTruthy();
    expect(page.form.alumniNum.isDisplayed()).toBeTruthy();
    expect(page.form.alumniGraduated.isDisplayed()).toBeTruthy();
    expect(page.form.alumniAwards.isDisplayed()).toBeTruthy();
  });
});