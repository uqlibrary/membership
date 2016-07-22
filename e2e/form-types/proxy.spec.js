'use strict';

describe('The Proxy form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/form/proxy');
    page = require('../form.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch(/Proxy Borrower/);
  });

  it('Should show the special Proxy fields', function () {
    expect(page.form.proxyOrg.isDisplayed()).toBeTruthy();
    expect(page.form.proxyDurationFrom.isDisplayed()).toBeTruthy();
    expect(page.form.proxyDurationTo.isDisplayed()).toBeTruthy();
    expect(page.form.proxyAuthName.isDisplayed()).toBeTruthy();
    expect(page.form.proxyAuthOrg.isDisplayed()).toBeTruthy();
  });
});