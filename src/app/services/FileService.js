/**
 * Author: Jan-Willem Wisgerhof <j.wisgerhof@library.uq.edu.au>
 * Date: 27/07/2016
 *
 * File service
 */
(function () {
  'use strict';

  angular.module('app')
    .factory('FileService', FileService);

  /** @ngInject **/
  function FileService($http, $q, $log, UQL_APP_CONFIG) {
    var api = UQL_APP_CONFIG.apiUrl + 'file';

    /**
     * Returns a URL for a file
     * @param id
     * @returns {Function}
     */
    var getSignedUrl = function (id) {
      var url = api + '/membership/' + id;
      var deferred = $q.defer();
      $http.get(url)
        .success(function (success) {
          deferred.resolve(success);
        })
        .error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    };

    // Public API
    return {
      getSignedUrl: getSignedUrl
    };
  }
})();
