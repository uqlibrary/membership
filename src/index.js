/* eslint no-use-before-define: "off" */
var mock = mock || false;

(function () {
  var modules = [
    'ui.router',
    'ngMaterial',
    'ngCookies',
    'ngSanitize',

    /** UQL APP dependencies */
    'uql.app.account',
    'uql.app.config'
  ];

  if (mock) {
    modules.push('app.mock');
  }

  angular
    .module('app', modules);

  angular.module('app').config(appConfig);

  /** @ngInject */
  function appConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default');
  }
})();
