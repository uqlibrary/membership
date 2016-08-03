'use strict';

describe('The membership received view', function () {
  var page;

  beforeEach(function () {
    page = require('./paymentConfirmation.po');
  });

  it('Should load the page', function() {
    browser.get('/#!/paymentconfirmation');
    expect(page.heading.getText()).toBe('UQ Library Membership');
  });

  it('Should show a receipt number if given to the URL', function () {
    browser.get('/#!/paymentconfirmation?UQ_LIB_ID=1&ReceiptNo=12345');
    expect(page.receiptNumber.getText()).toMatch(/12345/);
  });
});