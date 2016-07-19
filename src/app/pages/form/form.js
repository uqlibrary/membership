(function () {
  'use strict';

  angular
      .module('app')
      .component('membershipForm', {
        templateUrl: 'app/pages/form/form.html',
        restrict: 'E',
        controller: MembershipFormController,
        controllerAs: 'vm'
      });

  /** @ngInject **/
  function MembershipFormController(MembershipSvc, $stateParams) {
    var vm = this;

    vm.type = $stateParams.type;
    vm.form = {};

    // Helper variables
    vm.titles = [];
    vm.typeObject = {};
    vm.hospitalData = {};
    vm.reciprocalData = {};
    vm.cyberschools = [];

    /**
     * Helper functions to check the form's type
     * @param type
     * @returns {boolean}
     */
    vm.isType = function (type) {
      return vm.type === type;
    };

    vm.submit = function () {
      // Changed model for alumniPeriod to alumnifriendshipLevel if needed (isType('alumnifriends'))
    };

    /**
     * Initiates the controller
     */
    vm.init = function () {
      MembershipSvc.get().then(function (data) {
        // Set current type object
        angular.forEach(data.accountTypes, function (t) {
          if (t.value === vm.type) {
            vm.typeObject = t;
          }
        });

        vm.titles = data.titles;
        vm.hospitalData = data.hospital;
        vm.reciprocalData = data.reciprocal;
      });

      if (vm.type === 'cyberschool') {
        MembershipSvc.getCyberschools().then(function (data) {
          vm.cyberschools = data;
        });
      }
    };

    vm.init();
  }
})();
