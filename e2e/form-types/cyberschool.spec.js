'use strict';

describe('The Cyberschool form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/#!/form/cyberschool');
    page = require('../form.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch(/Cyberschool/);
  });

  it('Should show the special Staff Awaiting Aurion fields', function () {
    expect(page.form.cyberschoolPhoneNum.isDisplayed()).toBeTruthy();
    expect(page.form.cyberschoolEnrolYear.isDisplayed()).toBeTruthy();

    expect(page.form.cyberschoolAddress0.isDisplayed()).toBeTruthy();
    expect(page.form.cyberschoolAddress1.isDisplayed()).toBeTruthy();
    expect(page.form.cyberschoolAddress2.isDisplayed()).toBeTruthy();
    expect(page.form.cyberschoolAddress3.isDisplayed()).toBeTruthy();
  });
});