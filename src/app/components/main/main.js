(function () {
  'use strict';

  angular
    .module('app')
    .component('membershipApp', {
      templateUrl: 'app/components/main/main.html',
      restrict: 'E',
      controller: MainMembershipController,
      controllerAs: 'vm'
    });

  /** @ngInject **/
  function MainMembershipController(MembershipSvc, $location) {
    var vm = this;

    vm.membershipTypes = [];

    /**
     * Navigates the user to a given membership type
     * @param type
     */
    vm.navigateToForm = function (type) {
      $location.path('form/' + type.value);
    };

    /**
     * Initiates the controller
     */
    vm.init = function () {
      MembershipSvc.get().then(function (data) {
        vm.membershipTypes = data.accountTypes;
      });
    };

    vm.init();
  }
})();
