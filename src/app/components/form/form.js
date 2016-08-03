(function () {
  'use strict';

  angular
      .module('app')
      .component('membershipForm', {
        templateUrl: 'app/components/form/form.html',
        restrict: 'E',
        controller: MembershipFormController,
        controllerAs: 'vm'
      });

  /** @ngInject **/
  function MembershipFormController(MembershipService, $stateParams, UQL_APP_CONFIG, lodash, UploadBase,
                                    $state, UQLAccountService, $timeout, moment) {
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
    vm.isSubmitting = false;
    vm.isRenewing = false;
    vm.errorList = [];

    /**
     * Adds files to the list
     * @param files
     */
    vm.addFiles = function (files) {
      angular.forEach(files, function (val) {
        val.upload = {status: ''};
        vm.files.push(val);
      });
    };

    /**
     * Whether the user has pending files
     * @returns {boolean}
     */
    vm.canUploadFiles = function () {
      var uploadable = vm.files.filter(function (val) {
        return val.hasOwnProperty('upload') && val.upload.status !== 'uploaded';
      });

      return uploadable.length > 0;
    };

    /**
     * Uploads files to uqlapp
     * @returns {boolean}
     */
    vm.uploadFiles = function () {
      if (vm.files.length === 0) {
        return false;
      }

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

    /**
     * @description The text to display on the submit button
     * @returns {String}
     */
    vm.submitLabel = function () {
      var r = '';
      if (vm.isRenewing) {
        r = vm.isSubmitting ? 'Renewing..' : 'Renew membership';
      } else {
        r = vm.isSubmitting ? 'Applying..' : 'Apply for membership';
      }

      return r;
    };

    /**
     * Submits the membership application / renewal
     */
    vm.submit = function () {
      vm.formController.$setSubmitted();
      vm.isSubmitting = true;
      vm.form.dateOfBirth = moment(vm.dateOfBirth).format("DD-MM-YYYY");

      if (vm.isType('community')) {
        vm.form.paymentCode = vm.typeObject.paymentOptions[0].code;
      }

      var promise;
      if (vm.form.status && vm.form.status === 'renewing') {
        promise = MembershipService.renew(vm.form);
      } else {
        promise = MembershipService.submit(vm.form);
      }

      promise.then(function (response) {
        $state.go('received', {id: response.id});
        vm.isSubmitting = false;
      }, function (errors) {
        vm.isSubmitting = false;
        vm.errorList = errors;
      });
    };

    /**
     * Touches the form to make it dirty
     */
    vm.dirtifyForm = function () {
      $timeout(function () {
        angular.forEach(vm.formController.$error, function (type) {
          angular.forEach(type, function (field) {
            field.$setTouched();
            field.$setDirty();
          });
        });
      });
    };

    /**
     * Initiates the controller
     */
    vm.init = function () {
      // Load general membership data
      MembershipService.get().then(function (data) {
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

      // Handle renewals
      if ($stateParams.hasOwnProperty('code') && $stateParams.hasOwnProperty('id')) {
        // The user has to be logged in
        UQLAccountService.getAccount().then(function (user) {
          if (user.hasSession) {
            // Get member by given ID and code
            MembershipService.getWithCode($stateParams.id, $stateParams.code).then(function (data) {
              vm.isRenewing = true;
              vm.form = data;

              var dateParts = data.dateOfBirth.split('-');
              vm.dateOfBirth = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

              // Force all error fields to be dirty and touched
              vm.dirtifyForm();
            }, function () {
              $state.go('renewed');
            });
          } else {
            UQLAccountService.login();
          }
        }, function () {
          UQLAccountService.login();
        });
      }

      if (vm.type === 'cyberschool') {
        MembershipService.getCyberschools().then(function (data) {
          vm.cyberschools = data;
        });
      }
    };

    vm.init();
  }
})();
