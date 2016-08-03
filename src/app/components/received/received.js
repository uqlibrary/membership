(function () {
  'use strict';

  angular
    .module('app')
    .component('membershipReceived', {
      templateUrl: 'app/components/received/received.html',
      restrict: 'E',
      controller: ReceivedMembershipController,
      controllerAs: 'vm'
    });

  /** @ngInject **/
  function ReceivedMembershipController(MembershipService, $location, $stateParams, lodash, $window, UQL_PAYMENT_URL) {
    var vm = this;

    vm.member = {};
    vm.canPay = false;
    vm.tosAccepted = false;
    vm.showWarning = false;
    vm.redirecting = false;

    /**
     * Redirects the user to the payment gateway
     */
    vm.pay = function () {
      if (vm.member.id) {
        vm.redirecting = true;
        $window.location.href = UQL_PAYMENT_URL +
          'UQ_TITLE=' + encodeURIComponent(vm.member.title) +
          '&UQ_FIRST_NAME=' + encodeURIComponent(vm.member.firstName) +
          '&UQ_LAST_NAME=' + encodeURIComponent(vm.member.sn) +
          '&EMAIL=' + encodeURIComponent(vm.member.mail) +
          '&UQ_BIRTH_DATE=' + encodeURIComponent(vm.member.dateOfBirth) +
          '&UQ_LIB_MEMBERSHIP=' + encodeURIComponent(vm.member.paymentCode) +
          '&UQ_LIB_ID=' + encodeURIComponent(vm.member.id);
      }
    };

    /**
     * Initiates the controller
     */
    vm.init = function () {
      MembershipService.get($stateParams.id).then(function (data) {
        vm.member = data;

        if (vm.member.status === 'confirmed') {
          vm.canPay = false;
          vm.showWarning = false;
        } else {
          var paymentTypes = ['alumni', 'community', 'alumnifriends'];
          if (lodash.indexOf(paymentTypes, vm.member.type) >= 0) {
            vm.canPay = true;

            if (vm.member.type === 'alumni') {
              vm.showWarning = true;
            } else {
              vm.showWarning = false;
              vm.pay();
            }
          }
        }
      });
    };

    vm.init();
  }
})();
