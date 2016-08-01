'use strict';

describe('The admin settings view', function () {
  var page;

  beforeEach(function () {
    browser.get('/#!/admin/settings');
    page = require('./adminSettings.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch('Settings');
    expect(page.subHeadings.count()).toBe(2);
    expect(page.subHeadings.get(0).getText()).toBe('Global Expiry Date');
    expect(page.subHeadings.get(1).getText()).toBe('Expiry Dates By Type');
  });

  it('Should show an input for each account type', function () {
    expect(page.inputs.count()).toBe(12);
  });
});