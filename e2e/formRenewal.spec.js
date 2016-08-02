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

  });
});