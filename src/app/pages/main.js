(function () {
  'use strict';

  angular
    .module('app')
    .component('app', {
      templateUrl: 'app/pages/main.html',
      restrict: 'E',
      controller: MainMembershipController,
      controllerAs: 'vm'
    });

  /** @ngInject **/
  function MainMembershipController(MembershipSvc) {
    var vm = this;

    vm.membershipTypes = [];

    vm.init = function () {
      MembershipSvc.get().then(function (data) {
        vm.membershipTypes = data.accountTypes;
      });
    };

    vm.init();
  }
})();
