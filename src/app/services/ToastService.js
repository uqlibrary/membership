/**
 * Author: Jan-Willem Wisgerhof <j.wisgerhof@library.uq.edu.au>
 * Date: 28/07/2016
 *
 * Toast Service. A simple wrapper around $mdToast
 */
(function () {
  'use strict';

  angular.module('app')
    .factory('ToastService', ToastService);

  /** @ngInject **/
  function ToastService($mdToast, $document) {
    /**
     * Shows a simple toast message
     * @param message
     */
    var showSimple = function (message) {
      var toast = $mdToast.simple({
        textContent: message,
        position: 'top right',
        parent: $document[0].querySelector('#app-container')
      });
      $mdToast.show(toast);
    };

    // Public API
    return {
      showSimple: showSimple
    };
  }
})();
