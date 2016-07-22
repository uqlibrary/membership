'use strict';

describe('The Alumni Friends form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/form/alumnifriends');
    page = require('../form.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch(/Alumni Friends/);
  });

  it('Should show the special Alumni Friends fields', function () {
    expect(page.form.alumniPeriod.isDisplayed()).toBeTruthy();
  });
});