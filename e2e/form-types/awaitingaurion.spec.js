'use strict';

describe('The Staff Awaiting Aurion form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/form/awaitingaurion');
    page = require('../form.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch(/Staff Awaiting Aurion/);
  });

  it('Should show the special Staff Awaiting Aurion fields', function () {
    expect(page.form.awaitingaurionAddress0.isDisplayed()).toBeTruthy();
    expect(page.form.awaitingaurionAddress2.isDisplayed()).toBeTruthy();
    expect(page.form.awaitingaurionAddress1.isDisplayed()).toBeTruthy();
  });
});