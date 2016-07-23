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
  function AdminMembershipController(MembershipSvc, UQLAccountService, $window, lodash, $mdToast) {
    var vm = this;

    vm.isAllowed = true;
    vm.accountTypes = [];
    vm.search = {};
    vm.selectedTabIndex = 0;
    vm.isSearching = false;
    vm.hasSearched = false;

    /**
     * A list of all search results
     * @type []
     */
    vm.searchResults = [];

    /**
     * A list of all memberships currently open in tabs
     * @type []
     */
    vm.openUsers = [];

    /**
     * Removes a tab
     * @param index
     */
    vm.removeTab = function (index) {
      vm.openUsers = vm.openUsers.slice(index, 1);
    };

    /**
     * Calls uqlapp and searches for the given variables
     */
    vm.doSearch = function () {
      vm.isSearching = true;
      vm.hasSearched = true;
      vm.searchResults = [];
      MembershipSvc.list(vm.search, 100).then(function (data) {
        vm.searchResults = data;
      }).finally(function () {
        vm.isSearching = false;
      });
    };

    /**
     * Finds an account type by value
     * @param value
     * @returns {*}
     */
    vm.accountTypeByValue = function (value) {
      return lodash.find(vm.accountTypes, {value: value});
    };

    /**
     * Opens up a member record. Resets data if necessary
     * @param m
     */
    vm.openMember = function (m) {
      var i = lodash.findIndex(vm.openUsers, {id: m.id});
      if (i === -1) {
        vm.openUsers.push(m);
        i = vm.openUsers.length - 1;
      } else {
        vm.openUsers[i] = m;
      }

      vm.selectedTabIndex = i + 1;
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
