/**
 * General form attributes
 */
'use strict';

describe('The general form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/form/alumni'); // Could be any type
    page = require('./form.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toMatch(/UQ Library Membership/);
  });

  it('Should show account information fields', function () {
    expect(page.form.title.isDisplayed()).toBeTruthy();
    expect(page.form.firstName.isDisplayed()).toBeTruthy();
    expect(page.form.sn.isDisplayed()).toBeTruthy();
    expect(page.form.dob.isDisplayed()).toBeTruthy();
  });

  it('Should show contact information fields', function () {
    expect(page.form.email.isDisplayed()).toBeTruthy();
    expect(page.form.homeAddress0.isDisplayed()).toBeTruthy();
    expect(page.form.homeAddress1.isDisplayed()).toBeTruthy();
    expect(page.form.homeAddressCity.isDisplayed()).toBeTruthy();
    expect(page.form.homeAddressState.isDisplayed()).toBeTruthy();
    expect(page.form.homeAddressPostcode.isDisplayed()).toBeTruthy();
    expect(page.form.phone.isDisplayed()).toBeTruthy();
  });

  it('Should notify the user if not all fields are entered', function () {
    expect(page.form.errorMessage.isDisplayed()).toBeTruthy();
    expect(page.form.email.getAttribute('class')).toMatch(/ng-valid/);

    page.form.submitButton.click();

    expect(page.form.email.getAttribute('class')).toMatch(/ng-invalid/);
  });

  it('Should allow the user to submit the form if all fields are entered and valid', function () {
    // TODO: Not implemented until the submit button is working
  });

  it('Should show some text information for the user', function () {
    expect(page.form.helpContent.getText()).toMatch(/The Acceptable Use of UQ ICT Resources/);
    expect(page.form.helpContent.getText()).toMatch(/The Library Code of Practice/);
    expect(page.form.helpContent.getText()).toMatch(/Privacy statement/);
  });
});