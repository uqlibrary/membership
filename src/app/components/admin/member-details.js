(function () {
  'use strict';

  angular
    .module('app')
    .component('membershipDetails', {
      templateUrl: 'app/components/admin/member-details.html',
      bindings: {
        member: '='
      },
      restrict: 'E',
      controller: AdminDetailsMembershipController,
      controllerAs: 'vm'
    });

  /** @ngInject **/
  function AdminDetailsMembershipController(lodash, $mdDialog, MembershipService, $mdToast) {
    var vm = this;

    vm.isUpdating = false;
    vm.sacrifice = {};
    vm.fabOpen = false;

    /**
     * Opens up a member for editing
     */
    vm.allowUpdates = function () {
      var confirm = $mdDialog.confirm()
        .title('Would you like to update this user?')
        .textContent('WARNING: Doing this is irreversible, and should only be done with the utmost caution!')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function () {
        // Recreate the sacrifice
        vm.createSacrifice();
        vm.isUpdating = true;
      });
    };

    /**
     * Creates a sacrificial copy of the member object
     */
    vm.createSacrifice = function () {
      var obj = {};

      lodash.forEach(vm.member, function (value, key) {
        if (vm.member.hasOwnProperty(key) && key.startsWith('_') === false && key.startsWith('$') === false) {
          obj[key] = value;
        }
      });

      vm.sacrifice = obj;
    };

    /**
     * Cancels the update process
     */
    vm.cancel = function () {
      vm.createSacrifice();
      vm.isUpdating = false;
    };

    /**
     * Saves the user information to the DB and models
     */
    vm.save = function () {
      // Merge sacrifice over Member
      lodash.merge(vm.member, vm.sacrifice);

      // Save in DB
      MembershipService.submit(vm.member).then(function (data) {
        $mdToast.show(
          $mdToast.simple().textContent('Membership was updated')
        );

        // Update the open instance of this data
        vm.member = data;
        vm.createSacrifice();
        vm.isUpdating = false;
      }, function (error) {
        $mdToast.show($mdToast.simple().textContent(error));
      });
    };

    /**
     * Fields to show inputs for
     * @returns {Array}
     */
    vm.otherFields = function () {
      var ignoredFields = ['title', 'firstName', 'sn', 'homeAddress_0', 'homeAddress_1',
        'homeAddress_city', 'homeAddress_state', 'homeAddress_postcode', 'phone', 'mail', 'expiresOn'];
      var fields = [];

      lodash.forEach(vm.member, function (value, key) {
        if (vm.member.hasOwnProperty(key) && ignoredFields.indexOf(key) === -1 &&
          key.startsWith('_') === false && key.startsWith('$') === false &&
          key.startsWith('attachment') === false) {
          fields.push(key);
        }
      });

      return fields;
    };

    /**
     * Initiates the component and creates the temporary member
     */
    vm.init = function () {
      vm.createSacrifice();
    };

    vm.init();
  }
})();
