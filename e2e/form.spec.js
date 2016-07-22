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
    expect(page.form.submitButton.isEnabled()).toBeFalsy();
  });

  it('Should allow the user to submit the form if all fields are entered and valid', function () {
    page.form.alumniPeriod.sendKeys('6');
    page.form.title.sendKeys('Mr');
    page.form.firstName.sendKeys('First name');
    page.form.sn.sendKeys('Last name');
    page.form.dob.sendKeys('1986-11-22');

    page.form.email.sendKeys('j.wisgerhof@library.uq.edu.au');
    page.form.homeAddress0.sendKeys('1 Brisbane Road');
    page.form.homeAddress1.sendKeys('St Lucia');
    page.form.homeAddressCity.sendKeys('Brisbane');
    page.form.homeAddressState.sendKeys('Queensland');
    page.form.homeAddressPostcode.sendKeys('4000');
    page.form.phone.sendKeys('0400000000');

    page.form.alumniNum.sendKeys('s1234567');
    page.form.alumniGraduated.sendKeys('2000');
    page.form.alumniAwards.sendKeys("Bachelor of Procrastination");

    expect(page.form.submitButton.isEnabled()).toBeTruthy();
  });

  it('Should show some text information for the user', function () {
    expect(page.form.helpContent.getText()).toMatch(/The Acceptable Use of UQ ICT Resources/);
    expect(page.form.helpContent.getText()).toMatch(/The Library Code of Practice/);
    expect(page.form.helpContent.getText()).toMatch(/Privacy statement/);
  });
});