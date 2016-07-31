(function () {
  'use strict';

  angular
      .module('app')
      .component('membershipAdminSettings', {
        templateUrl: 'app/components/adminSettings/adminSettings.html',
        restrict: 'E',
        controller: AdminSettingsMembershipController,
        controllerAs: 'vm'
      });

  /** @ngInject **/
  function AdminSettingsMembershipController(MembershipService, $state, lodash, ToastService) {
    var vm = this;

    vm.accountTypes = [];
    vm.defaultExpiry = '';

    /**
     * Navigates the user back to the admin page
     */
    vm.goToAdmin = function () {
      $state.go('admin');
    };

    /**
     * Updates the global expiry date
     */
    vm.updateGlobalExpiry = function () {
      vm.updateExpiry({
        value: 'global',
        expiry: vm.defaultExpiry
      });
    };

    /**
     * Updates the type's expiry date
     * @param type
     */
    vm.updateExpiry = function (type) {
      MembershipService.updateType(type).then(function () {
        ToastService.showSimple('Expiry date updated');
      }, function () {
        ToastService.showSimple('Could not update expiry date');
      });
    };

    /**
     * Initiates the controller
     */
    vm.init = function () {
      MembershipService.getTypes().then(function (data) {
        var expiryDates = {};
        lodash.forEach(data, function (value) {
          expiryDates[value.id] = value.expiry;

          if (value.id === 'global') {
            vm.defaultExpiry = value.expiry;
          }
        });

        MembershipService.get().then(function (data) {
          lodash.forEach(data.accountTypes, function (item) {
            item.expiry = expiryDates[item.value];
          });
          vm.accountTypes = data.accountTypes;
        });
      });
    };

    vm.init();
  }
})();
