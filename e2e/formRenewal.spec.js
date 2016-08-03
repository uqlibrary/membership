/**
 * General form attributes
 */
'use strict';

describe('The general form attributes', function () {
  var page;

  beforeEach(function () {
    browser.get('/#!/form/alumni/00000000-0000-0000-0000-000000000005/00000000-0000-0000-0000-000000000005');
    page = require('./form.po');
  });

  it('Should allow a user with a valid ID and code to renew a membership', function () {
    expect(page.heading.getText()).toMatch(/UQ Alumni/);
    expect(page.form.submitButton.getText()).toMatch(/RENEW MEMBERSHIP/);
  });

  it('Should disable some fields when the user is renewing', function () {
    // Title, FN, SN, DOB
    expect(page.form.title.getAttribute('disabled')).toBeTruthy();
    expect(page.form.firstName.isEnabled()).toBeFalsy();
    expect(page.form.sn.isEnabled()).toBeFalsy();
    expect(page.form.dob.getAttribute('disabled')).toBeTruthy();
  });

  it('Should pre-fill the form when renewing', function () {
    expect(page.form.firstName.getAttribute('value')).toBe('Alumni');
    expect(page.form.email.getAttribute('value')).toBe('j.wisgerhof@library.uq.edu.au');
    expect(page.form.alumniGraduated.getAttribute('value')).toBe('2010');
    expect(page.form.alumniAwards.getAttribute('value')).toBe('Bachelor of IT');
  });

  it('Should allow the user to renew his/her membership and be taken to the payment page', function () {
    page.form.alumniPeriod.sendKeys('6 months');
    // Close select element
    element.all(by.css('._md-select-menu-container._md-active._md-clickable md-option')).get(0).click();

    page.form.submitButton.click();
    expect(browser.getCurrentUrl()).toMatch(/received/);
  });
});