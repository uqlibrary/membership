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

  // Awaiting Aurion
  this.form.awaitingaurionAddress0 = this.form.element(by.model('vm.form.awaitingaurionAddress_0'));
  this.form.awaitingaurionAddress1 = this.form.element(by.model('vm.form.awaitingaurionAddress_2'));
  this.form.awaitingaurionAddress2 = this.form.element(by.model('vm.form.awaitingaurionAddress_1'));

  // Cyberschool
  this.form.cyberschoolPhoneNum = this.form.element(by.model('vm.form.cyberschoolPhoneNum'));
  this.form.cyberschoolEnrolYear = this.form.all(by.model('vm.form.cyberschoolEnrolYear')).get(0);
  this.form.cyberschoolAddress0 = this.form.element(by.css('#cyberschoolAddress_0'));
  this.form.cyberschoolAddress1 = this.form.element(by.model('vm.form.cyberschoolAddress_1'));
  this.form.cyberschoolAddress2 = this.form.element(by.model('vm.form.cyberschoolAddress_2'));
  this.form.cyberschoolAddress3 = this.form.element(by.model('vm.form.cyberschoolAddress_3'));

  // Hospital
  this.form.hospitalAddress0 = this.form.element(by.model('vm.form.hospitalAddress_0'));
  this.form.hospitalAddress1 = this.form.element(by.model('vm.form.hospitalAddress_1'));
  this.form.hospitalAddress2 = this.form.element(by.model('vm.form.hospitalAddress_2'));
  this.form.hospitalClass = this.form.all(by.model('vm.form.hospitalClass')).get(0);
  this.form.hospitalService = this.form.all(by.model('vm.form.hospitalService')).get(0);
  this.form.hospitalEmpType = this.form.all(by.model('vm.form.hospitalEmpType')).get(0);

  // Proxy
  this.form.proxyOrg = this.form.element(by.model('vm.form.proxyOrg'));
  this.form.proxyDurationFrom = this.form.element(by.model('vm.form.proxyDurationFrom'));
  this.form.proxyDurationTo = this.form.element(by.model('vm.form.proxyDurationTo'));
  this.form.proxyAuthName = this.form.element(by.model('vm.form.proxyAuthName'));
  this.form.proxyAuthOrg = this.form.element(by.model('vm.form.proxyAuthOrg'));

  // Reciprocal
  this.form.reciprocalInstitution = this.form.all(by.model('vm.form.reciprocalInstitution')).get(0);
  this.form.reciprocalLibNo = this.form.element(by.model('vm.form.reciprocalLibNo'));

  // Retired
  this.form.retiredPos = this.form.element(by.model('vm.form.retiredPos'));
  this.form.retiredYears = this.form.element(by.model('vm.form.retiredYears'));
  this.form.retiredNum = this.form.element(by.model('vm.form.retiredNum'));

  // Visitors
  this.form.departamentalAddress = this.form.element(by.model('vm.form.departamentalAddress'));
  this.form.homeInstitution = this.form.element(by.model('vm.form.homeInstitution'));

  // General items
  this.form.helpContent = this.form.element(by.css('#helpContent'));
  this.form.submitButton = this.form.element(by.css('#submitMembership'));
  this.form.errorMessage = this.form.element(by.css('span.md-error'));
};

module.exports = new FormPage();