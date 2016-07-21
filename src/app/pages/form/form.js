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
  function MembershipFormController(MembershipSvc, $stateParams, UQL_APP_CONFIG, lodash, UploadBase) {
    var vm = this;

    vm.type = $stateParams.type;
    vm.form = {
      attachments: []
    };
    vm.files = [];

    // Helper variables
    vm.titles = [];
    vm.typeObject = {};
    vm.hospitalData = {};
    vm.reciprocalData = {};
    vm.cyberschools = [];

    /**
     * Adds files to the list
     * @param files
     */
    vm.addFiles = function (files) {
      angular.forEach(files, function (val) {
        val.upload = { status: '' };
        vm.files.push(val);
      });
    };

    /**
     * Whether the user has pending files
     * @returns {boolean}
     */
    vm.canUploadFiles = function () {
      var uploadable = vm.files.filter(function (val) {
        return val.hasOwnProperty('upload') && val.upload.status !== 'uploaded'
      });

      return uploadable.length > 0;
    };

    vm.uploadFiles = function () {
      if (vm.files.length === 0) return false;

      lodash.forEach(vm.files, function (file, index) {
        if (file.upload.status === 'uploaded') {
          return;
        }
        vm.uploadFile(index);
      });
    };

    /**
     * Uploads a single file
     * @param index
     */
    vm.uploadFile = function (index) {
      var file = vm.files[index];
      file.upload.status = 'uploading';

      UploadBase.upload({
        url: UQL_APP_CONFIG.apiUrl + 'file/membership',
        method: 'POST',
        data: {},
        file: file
      }).success(function (data) {
        file.upload.status = 'uploaded';
        vm.form.attachments.push(data[0]);
      }).error(function () {
        file.upload.status = 'failed';
      });
    };

    /**
     * Removes a file from the list
     * @param index
     */
    vm.removeFile = function (index) {
      vm.files.splice(index, 1);
    };

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
