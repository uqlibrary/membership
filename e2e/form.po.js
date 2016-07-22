/**
 * Created by jwwisgerhof on 22/07/2016.
 */
'use strict';

var FormPage = function() {
  this.heading = element(by.css('h1'));
  this.membershipTypes = element.all(by.css('h2'));

  // Account Information
  this.form = element(by.css('form'));
  this.form.alumniPeriod = this.form.all(by.model('vm.form.paymentCode')).get(0); // md-select
  this.form.title = this.form.all(by.model('vm.form.title')).get(0); // md-select
  this.form.firstName = this.form.element(by.model('vm.form.firstName'));
  this.form.sn = this.form.element(by.model('vm.form.sn'));
  this.form.dob = this.form.element(by.model('vm.form.dateOfBirth'));

  // Contact Information
  this.form.email = this.form.element(by.model('vm.form.mail'));
  this.form.homeAddress0 = this.form.element(by.model('vm.form.homeAddress_0'));
  this.form.homeAddress1 = this.form.element(by.model('vm.form.homeAddress_1'));
  this.form.homeAddressCity = this.form.element(by.model('vm.form.homeAddress_city'));
  this.form.homeAddressState = this.form.all(by.model('vm.form.homeAddress_state')).get(0); // md-select
  this.form.homeAddressPostcode = this.form.element(by.model('vm.form.homeAddress_postcode'));
  this.form.phone = this.form.element(by.model('vm.form.phone'));

  // Alumni Information
  this.form.alumniNum = this.form.element(by.model('vm.form.alumniNum'));
  this.form.alumniGraduated = this.form.element(by.model('vm.form.alumniGraduated'));
  this.form.alumniAwards = this.form.element(by.model('vm.form.alumniAwards'));

  // Alumni New Information
  this.form.alumniNewNum = this.form.element(by.model('vm.form.alumninewNum'));
  this.form.alumniNewGraduated = this.form.element(by.model('vm.form.alumninewGraduated'));
  this.form.alumniNewAwards = this.form.element(by.model('vm.form.alumninewAwards'));

  // Associate
  this.form.associateAddress0 = this.form.element(by.model('vm.form.associateAddress_0'));
  this.form.associateAddress1 = this.form.element(by.model('vm.form.associateAddress_1'));
  this.form.associateAddress2 = this.form.element(by.model('vm.form.associateAddress_2'));

  // General items
  this.form.helpContent = this.form.element(by.css('#helpContent'));
  this.form.submitButton = this.form.element(by.css('#submitMembership'));
  this.form.errorMessage = this.form.element(by.css('span.md-error'));
};

module.exports = new FormPage();