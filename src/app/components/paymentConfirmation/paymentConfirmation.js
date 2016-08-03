(function () {
  'use strict';

  angular
    .module('app')
    .component('membershipPaymentConfirmation', {
      templateUrl: 'app/components/paymentConfirmation/paymentConfirmation.html',
      restrict: 'E',
      controller: MembershipPaymentConfirmationController,
      controllerAs: 'vm'
    });

  /** @ngInject **/
  function MembershipPaymentConfirmationController($location, MembershipService) {
    var vm = this;

    vm.processed = false;
    vm.paymentDetails = {};

    /**
     * Saves the payment details for the membership
     * @param {Object} membership
     */
    vm.savePaymentDetails = function (membership) {
      vm.paymentDetails = membership;
      MembershipService.payment(membership)
        .finally(function () {
          vm.processed = true;
        });
    };

    /**
     * Initiates the controller
     */
    vm.init = function () {
      var params = $location.search();

      vm.savePaymentDetails({
        id: params.UQ_LIB_ID,
        paymentReceipt: params.ReceiptNo,
        paymentCode: params.MembershipCode,
        Success: params.Success,
        AmountPaid: params.AmountPaid
      });
    };

    vm.init();
  }
})();
