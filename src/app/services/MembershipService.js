/**
 * Author: Jan-Willem Wisgerhof <j.wisgerhof at library.uq.edu.au>
 * Date: 17/07/2016
 *
 * Membership service
 */
(function () {
  'use strict';

  angular.module('app')
    .factory('MembershipService', ['$http', '$q', '$log', '$timeout', 'UQL_APP_CONFIG', 'lodash',
      function ($http, $q, $log, $timeout, UQL_APP_CONFIG, lodash) {
        var api = UQL_APP_CONFIG.apiUrl + 'membership';
        var memberships = {};
        var types = [];
        var tracker = null;
        var current = {};

        /**
         * @description Converts a membership's attachments
         * @param {Object} membership
         * @returns {Object}
         */
        var convertAttachments = function (membership) {
          var m = angular.copy(membership);
          if (m && m.hasOwnProperty('attachment_0')) {
            m.attachments = [];
            for (var i = 0; i < 4; i++) {
              if (m.hasOwnProperty('attachment_' + i)) {
                m.attachments.push(angular.fromJson(m['attachment_' + i]));
              }
            }
          }
          return m;
        };

        /**
         * @description Gets a membership entry if an ID is specified else returns form data
         * @return {Deferred} A deferred promise
         */
        var get = function (id) {
          var url = api;
          if (typeof id !== 'undefined') {
            url += '/' + id;
          }
          var deferred = $q.defer();
          $http.get(url)
            .success(function (success) {
              if (typeof id === 'undefined') {
                deferred.resolve(convertAttachments(success));
              } else {
                current = convertAttachments(success);
                deferred.resolve(current);
              }
            })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        /**
         * @description Deletes a membership entry
         * @return {Deferred} A deferred promise
         */
        var deleteMembership = function (id) {
          var url = api + '/' + id;
          var deferred = $q.defer();
          $http.delete(url)
            .success(function () {
              deferred.resolve();
            })
            .error(function () {
              deferred.reject();
            });
          return deferred.promise;
        };

        /**
         * @description Gets a list of Cyberschools
         * @return {Deferred} A deferred promise
         */
        var getCyberschools = function () {
          var url = api + '/cyberschools';
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

        /**
         * @description Gets a membership entry if an ID is specified else returns form data
         * @return {Deferred} A deferred promise
         */
        var getWithCode = function (id, code) {
          var url = api;
          if (typeof id !== 'undefined' && typeof code !== 'undefined') {
            url += '/' + id + '/' + code;
          }
          var deferred = $q.defer();
          tracker = $http.get(url)
            .success(function (success) {
              current = convertAttachments(success);
              deferred.resolve(current);
            })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        /**
         * @description Submits the form data
         * @param {Object} membership
         * @return {Deferred} A deferred promise
         */
        var submit = function (membership) {
          var deferred = $q.defer();
          var url = api;
          if (membership.hasOwnProperty('id')) {
            url += '/' + membership.id;
          }
          if (membership.hasOwnProperty('attachments')) {
            for (var i = 0; i < membership.attachments.length; i++) {
              membership['attachment_' + i] = angular.toJson(membership.attachments[i]);
            }
          }
          $http({
            method: 'POST',
            data: membership,
            url: url
          })
            .success(function (success) {
              current = convertAttachments(success);
              deferred.resolve(current);
            })
            .error(function (error) {
              deferred.reject(JSON.parse(error));
            });
          return deferred.promise;
        };

        /**
         * @description Returns a list of applications in the system
         * @param {Object} filter Optionally filter application listing by name matching
         * @param {Integer} limit Optionally limit the number of results returned
         * @return {Deferred} A deferred promise
         */
        var list = function (filter, limit) {
          var timestamp = new Date().getTime();
          var url = api + 's?' + timestamp;

          if (typeof filter !== 'undefined') {
            angular.forEach(filter, function (v, k) {
              if (v !== null && v !== '') {
                if (angular.isObject(v) && v.hasOwnProperty('id')) {
                  url += '&filter[' + k + ']=' + v.id;
                } else {
                  url += '&filter[' + k + ']=' + v;
                }
              }
            });
          }
          if (typeof limit !== 'undefined') {
            url += '&limit=' + limit;
          }

          var deferred = $q.defer();
          tracker = $http.get(url)
            .success(function (success) {
              memberships = [];
              for (var m = 0; m < success.length; m++) {
                memberships.push(convertAttachments(success[m]));
              }
              deferred.resolve(memberships);
            })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        /**
         * @description Updates payment receipt
         * @param {Object} membership
         * @return {Deferred} A deferred promise
         */
        var payment = function (membership) {
          var deferred = $q.defer();
          $http({
            method: 'POST',
            data: membership,
            url: api + '/' + membership.id + '/payment'
          })
            .success(function (success) {
              deferred.resolve(success);
            })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        /**
         * @description Confirms an application
         * @param {Object} membership
         * @return {Deferred} A deferred promise
         */
        var confirm = function (membership) {
          var deferred = $q.defer();
          $http({
            method: 'POST',
            data: membership,
            url: api + '/' + membership.id + '/confirm'
          })
            .success(function (data) {
              if (data.error) {
                data.user = convertAttachments(data.user);
                deferred.reject(data);
              } else {
                data.user = convertAttachments(data.user);
                deferred.resolve(data);
              }
            })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        /**
         * @description Confirms an application
         * @param {Object} membership
         * @return {Deferred} A deferred promise
         */
        var renew = function (membership) {
          var deferred = $q.defer();
          $http({
            method: 'POST',
            data: membership,
            url: api + '/' + membership.id + '/' + membership.code + '/renew'
          })
            .success(function (success) {
              deferred.resolve(success);
            })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        var resendEmail = function (id) {
          var deferred = $q.defer();
          $http({
            method: 'GET',
            url: api + '/' + id + '/mail'
          }).then(function (value) {
            deferred.resolve(value);
          }, function (error) {
            deferred.reject(error);
          });
          return deferred.promise;
        };

        /**
         * @description Getter for memberships returned by the service
         * @returns {Object}
         */
        var getMemberships = function () {
          return memberships;
        };

        /**
         * @description Returns the current membership
         * @returns {{}}
         */
        var getCurrent = function () {
          return current;
        };

        /**
         * @description Updates the default expiry date for a membership type
         * @param {Object} type
         * @return {Deferred} A deferred promise
         */
        var updateType = function (type) {
          var deferred = $q.defer();
          $http({
            method: 'POST',
            data: type,
            url: api + '_type/' + type.value
          })
            .success(function (success) {
              deferred.resolve(success);
            })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        /**
         * @description Updates the default expiry date for a membership type
         * @return {Deferred} A deferred promise
         */
        var getTypes = function () {
          var timestamp = new Date().getTime();
          var url = api + '_types?' + timestamp;

          var deferred = $q.defer();
          tracker = $http.get(url)
            .success(function (success) {
              types = [];
              for (var m = 0; m < success.length; m++) {
                types.push(success[m]);
              }
              deferred.resolve(types);
            })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        /**
         * @description Returns the tracker name
         * @returns {string}
         */
        var getTracker = function () {
          return tracker;
        };

        var isAdmin = function (account) {
          var admin = false;
          lodash.forEach(account.groups, function (val) {
            if (val === 'CN=lib_staff,OU=LIB-groups,OU=University of Queensland Library,OU=Deputy Vice-Chancellor (Academic),OU=Vice-Chancellor,DC=uq,DC=edu,DC=au') {
              admin = true;
            }
          });
          return admin;
        };

        // Public API
        return {
          get: get,
          getCurrent: getCurrent,
          deleteMembership: deleteMembership,
          getCyberschools: getCyberschools,
          getWithCode: getWithCode,
          submit: submit,
          payment: payment,
          confirm: confirm,
          renew: renew,
          resendEmail: resendEmail,
          list: list,
          getMemberships: getMemberships,
          updateType: updateType,
          getTypes: getTypes,
          getTracker: getTracker,
          isAdmin: isAdmin
        };
      }]);
})();
