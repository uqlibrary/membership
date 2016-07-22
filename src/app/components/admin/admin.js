(function () {
  'use strict';

  angular
    .module('app')
    .component('membershipAdmin', {
      templateUrl: 'app/components/admin/admin.html',
      restrict: 'E',
      controller: AdminMembershipController,
      controllerAs: 'vm'
    });

  /** @ngInject **/
  function AdminMembershipController(MembershipSvc, UQLAccountService, $window) {
    var vm = this;

    vm.isAllowed = true;
    vm.accountTypes = [];
    vm.search = {};
    vm.selectedTabIndex = 0;
    vm.openUsers = [
      {
        name: 'Jan-Willem Wisgerhof'
      },
      {
        name: 'Mahtab Danaee'
      }
    ];

    vm.removeTab = function (index) {
      vm.openUsers.splice(index, 1);
    };

    /**
     * Initiates the controller
     */
    vm.init = function () {
      UQLAccountService.getAccount().then(function (data) {
        if (data.hasSession === false) {
          $window.location.href = "https://www.library.uq.edu.au/";
        } else if (MembershipSvc.isAdmin(data) === false) {
          vm.isAllowed = false;
        } else {
          vm.isAllowed = true;
        }
      });

      MembershipSvc.get().then(function (data) {
        vm.accountTypes = data.accountTypes;
      });
    };

    vm.init();
  }
})();
