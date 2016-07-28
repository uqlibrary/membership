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
  function AdminMembershipController(MembershipService, UQLAccountService, $window, lodash, FileService, ToastService, $mdDialog) {
    var vm = this;

    vm.isAllowed = true;
    vm.accountTypes = [];
    vm.cyberschools = [];
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
      vm.openUsers.splice(index, 1);
    };

    /**
     * Calls uqlapp and searches for the given variables
     */
    vm.doSearch = function () {
      vm.isSearching = true;
      vm.hasSearched = true;
      vm.searchResults = [];
      MembershipService.list(vm.search, 100).then(function (data) {
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
     * Re-sends the renewal email to a member
     * @param m
     */
    vm.sendRenewalEmail = function (m) {
      MembershipService.resendEmail(m.id).then(function (value) {
        if (value) {
          ToastService.showSimple('Renewal email sent successfully');
        } else {
          ToastService.showSimple('Unfortunately, the renewal email could not be sent. Please try again later');
        }
      }, function () {
        ToastService.showSimple('Unable to send email');
      });
    };

    /**
     * @description Opens a new window with the file attachment
     * @param {Object} attachment
     * @returns {String}
     */
    vm.openAttachment = function (attachment) {
      FileService.getSignedUrl(attachment.key).then(function (data) {
        $window.open(data);
      }, function () {
        ToastService.showSimple('Unable to load file');
      });
    };

    /**
     * Shows a dialog confirming a member's deletion
     * @param member
     */
    vm.showDeleteDialog = function (member) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this user?')
        .textContent('WARNING: Doing this is irreversible, and should only be done with the utmost caution!')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function () {
        MembershipService.deleteMembership(member.id).then(function () {
          member._deleted = true;
          ToastService.showSimple('Member deleted');
        }, function () {
          ToastService.showSimple('Unable to delete member');
        });
      });
    };

    /**
     * Confirms a member
     * @param member
     */
    vm.confirmMember = function (member) {
      member._confirming = true;
      MembershipService.confirm(member).then(function (data) {
        lodash.merge(member, data.user);
        ToastService.showSimple('Member confirmed');
      }, function (data) {
        lodash.merge(member, data.user);
        ToastService.showSimple(data.message);
      }).finally(function () {
        member._confirming = false;
      });
    };

    /**
     * CSV Headers and data
     * @type {string[]}
     */
    vm.csvHeaders = ['Name', 'Email', 'Type', 'Expiry', 'Barcode'];
    vm.csvData = function () {
      var r = [];
      lodash.forEach(vm.searchResults, function (m) {
        r.push({
          name: m.title + ' ' + m.firstName + ' ' + m.sn,
          email: m.mail,
          type: vm.accountTypes[m.type],
          expiry: m.expiresOn,
          barcode: m.barcode
        });
      });
      return r;
    };

    /**
     * Initiates the controller
     */
    vm.init = function () {
      UQLAccountService.getAccount().then(function (data) {
        if (data.hasSession === false) {
          $window.location.href = "https://www.library.uq.edu.au/";
        } else if (MembershipService.isAdmin(data) === false) {
          vm.isAllowed = false;
        } else {
          vm.isAllowed = true;
        }
      });

      MembershipService.get().then(function (data) {
        vm.accountTypes = data.accountTypes;
      });

      MembershipService.getCyberschools().then(function (data) {
        vm.cyberschools = data;
      });
    };

    vm.init();
  }
})();
