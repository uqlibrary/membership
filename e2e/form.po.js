/**
 * Created by jwwisgerhof on 22/07/2016.
 */
'use strict';

var FormPage = function() {
  this.heading = element(by.css('h1'));
  this.membershipTypes = element.all(by.css('h2'));

  // Account Information
  this.form = element(by.css('form'));
  this.form.alumniPeriod = this.form.element(by.model('vm.form.paymentCode'));
  this.form.title = this.form.all(by.model('vm.form.title')).get(0); // No idea why this returns multiple elements
  this.form.firstName = this.form.element(by.model('vm.form.firstName'));
  this.form.sn = this.form.element(by.model('vm.form.sn'));
  this.form.dob = this.form.element(by.model('vm.form.dateOfBirth'));

  // Contact Information
  this.form.email = this.form.element(by.model('vm.form.mail'));
  this.form.homeAddress0 = this.form.element(by.model('vm.form.homeAddress_0'));
  this.form.homeAddress1 = this.form.element(by.model('vm.form.homeAddress_1'));
  this.form.homeAddressCity = this.form.element(by.model('vm.form.homeAddress_city'));
  this.form.homeAddressState = this.form.all(by.model('vm.form.homeAddress_state')).get(0); // SELECT ALWAYS HAS 2 MODELS
  this.form.homeAddressPostcode = this.form.element(by.model('vm.form.homeAddress_postcode'));
  this.form.phone = this.form.element(by.model('vm.form.phone'));

  this.form.helpContent = this.form.element(by.css('#helpContent'));
  this.form.submitButton = this.form.element(by.css('#submitMembership'));
  this.form.errorMessage = this.form.element(by.css('span.md-error'));
};

module.exports = new FormPage();