'use strict';

describe('The Hospital form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/form/hospital');
    page = require('../form.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch(/at LCCH, Mater or RBWH/);
  });

  it('Should show the special Hospital fields', function () {
    expect(page.form.hospitalAddress0.isDisplayed()).toBeTruthy();
    expect(page.form.hospitalAddress1.isDisplayed()).toBeTruthy();
    expect(page.form.hospitalAddress2.isDisplayed()).toBeTruthy();
    expect(page.form.hospitalClass.isDisplayed()).toBeTruthy();
    expect(page.form.hospitalService.isDisplayed()).toBeTruthy();
    expect(page.form.hospitalEmpType.isDisplayed()).toBeTruthy();
  });
});