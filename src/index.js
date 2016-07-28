/* eslint no-use-before-define: "off" */
var mock = mock || false;

(function () {
  var modules = [
    'ui.router',
    'ngMaterial',
    'ngCookies',
    'ngSanitize',
    'ngCsv',
    'ngFileUpload',
    'md.data.table',
    'ngLodash',
    'angularMoment',

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
  function appConfig($mdThemingProvider, $mdDateLocaleProvider, moment, $compileProvider) {
    var uqPurple = $mdThemingProvider.extendPalette('deep-purple', {
      300: '#d2c1d7',
      400: '#6B0C8A',
      500: '#49075E',
      600: '#370546'
    });
    $mdThemingProvider.definePalette('uqPurple', uqPurple);

    var uqBlue = $mdThemingProvider.extendPalette('blue', {
      300: '#D9EEFF',
      400: '#71A3F7',
      500: '#4285f4',
      600: '#005EA5'
    });
    $mdThemingProvider.definePalette('uqBlue', uqBlue);

    $mdThemingProvider.theme('default')
      .primaryPalette('uqPurple')
      .accentPalette('uqBlue');

    $mdDateLocaleProvider.formatDate = function (date) {
      return moment(date).format('DD-MM-YYYY');
    };

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(mailto):/);
  }

  angular.module('app').constant('UQL_PAYMENT_URL', 'https://payments.uq.edu.au/OneStopWeb/aspx/tranadd.aspx?TRAN-TYPE=W01LIB05&');
})();
