angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('!');
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
    .state('form/:type/:id/:code', {
      url: '/form/:type/:id/:code',
      template: '<membership-form></membership-form>'
    })
    .state('received', {
      url: '/received/:id',
      template: '<membership-received></membership-received>'
    })
    .state('paymentconfirmation', {
      url: '/paymentconfirmation',
      template: '<membership-payment-confirmation></membership-payment-confirmation>'
    })
    .state('admin', {
      url: '/admin',
      template: '<membership-admin></membership-admin>'
    })
    .state('admin/settings', {
      url: '/admin/settings',
      template: '<membership-admin-settings></membership-admin-settings>'
    });
}
