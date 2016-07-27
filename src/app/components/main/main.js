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
  function MainMembershipController(MembershipService, $location) {
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
      MembershipService.get().then(function (data) {
        vm.membershipTypes = data.accountTypes;
      });
    };

    vm.init();
  }
})();
