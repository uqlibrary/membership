'use strict';

var PaymentConfirmationPage = function() {
  this.heading = element(by.css('h1'));

  this.receiptNumber = element(by.css('.receipt-number'));
};

module.exports = new PaymentConfirmationPage();