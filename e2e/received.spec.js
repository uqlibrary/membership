'use strict';

describe('The membership received view', function () {
  var page;

  beforeEach(function () {
    page = require('./received.po');
  });

  it('Should load the page', function() {
    browser.get('/#!/received/00000000-0000-0000-0000-000000000001');

    expect(page.cardContent.getText()).toMatch(/Thank you for your membership application./);
    expect(page.cardContent.getText()).toMatch(/You will be notified/);
    expect(page.cardContent.getText()).toMatch(/Back to UQ Library home page/);
  });

  it('Should hide the payment buttons if a user is already confirmed', function () {
    browser.get('/#!/received/00000000-0000-0000-0000-000000000007');
    expect(page.checkbox.isDisplayed()).toBeFalsy();
    expect(page.submitButton.isDisplayed()).toBeFalsy();
  });

  it('Should automatically redirect the user to UQ payments if the type is alumnifriends or community', function () {
    browser.ignoreSynchronization = true;
    browser.get('/#!/received/00000000-0000-0000-0000-000000000008');

    expect(browser.getCurrentUrl()).toMatch(/payments.uq.edu.au/);
    browser.ignoreSynchronization = false;
  });

  it('Should show a checkbox asking the user to accept the ToS of UQ', function () {
    browser.get('/#!/received/00000000-0000-0000-0000-000000000004');

    expect(page.checkbox.isDisplayed()).toBeTruthy();
    expect(page.submitButton.isDisplayed()).toBeTruthy();
    expect(page.submitButton.isEnabled()).toBeFalsy();

    page.checkbox.click();

    expect(page.submitButton.isEnabled()).toBeTruthy();
  });
});