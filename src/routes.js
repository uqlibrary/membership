angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      template: '<membership-app></membership-app>'
    })
    .state('form/:type', {
      url: '/form/:type',
      template: '<membership-form></membership-form>'
    })
    .state('/payment/:id', {
      url: '/payment/:id',
      template: '<membership-payment></membership-payment>'
    });
}
