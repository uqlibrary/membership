(function () {
  'use strict';

  angular
    .module('app.mock', ['ngMockE2E', 'uql.app.config'])
    .run(runBlock);

  /** @ngInject **/
  function runBlock($httpBackend, UQL_APP_CONFIG, MembershipMockData) {
    var api = UQL_APP_CONFIG.apiUrl + 'membership';
    var d = {};

    function escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }

    $httpBackend.whenGET(api)
      .respond(200, MembershipMockData.form);

    $httpBackend.whenGET(api + '/cyberschools')
      .respond(200, MembershipMockData.cyberschools);

    $httpBackend.whenPOST(api)
      .respond(200, MembershipMockData.submit);

    $httpBackend.whenGET(new RegExp(api + '_types?([0-9]*)')).respond(200, MembershipMockData.type);

    $httpBackend.whenPOST(
      new RegExp(
        escapeRegExp(api + '_type/') + '[a-zA-Z]*'
      )
    )
      .respond(200, MembershipMockData.type[0]);

    $httpBackend.whenGET(
      new RegExp(
        escapeRegExp(api + 's?') + '[0-9]*' + escapeRegExp('&filter[name]=Hospital')
      )
    )
      .respond(200, [MembershipMockData.memberships[0]]);

    var urlRegex = escapeRegExp(api + 's?');
    $httpBackend.whenGET(new RegExp(urlRegex + '([0-9]*)'))
      .respond(200, [MembershipMockData.memberships[0], MembershipMockData.memberships[1], MembershipMockData.memberships[2],
        MembershipMockData.memberships[3], MembershipMockData.memberships[4], MembershipMockData.memberships[5]]);

    d = angular.copy(MembershipMockData.memberships[0]);
    d.confirmedOn = '09-09-2013 16:11:24';
    d.expiresOn = '28-03-2014';
    d.status = 'confirmed';
    $httpBackend.whenPOST(api + '/' + d.id)
      .respond(200, d);

    d = {
      error: false,
      user: angular.copy(MembershipMockData.memberships[0])
    };
    d.user.confirmedOn = '09-09-2013 16:11:24';
    d.user.expiresOn = '28-02-2014';
    d.user.status = 'confirmed';
    $httpBackend.whenPOST(api + '/' + d.user.id + '/confirm')
      .respond(200, d);

    d = {
      error: false,
      user: angular.copy(MembershipMockData.memberships[1])
    };
    d.user.confirmedOn = '09-09-2013 16:11:24';
    d.user.expiresOn = '28-02-2014';
    d.user.status = 'confirmed';
    d.user = angular.copy(d);
    $httpBackend.whenPOST(api + '/' + d.user.id + '/confirm')
      .respond(200, d);

    d = {
      error: true,
      user: angular.copy(MembershipMockData.memberships[3])
    };
    d.user.status = 'unconfirmed';
    d.user.confirmStep = 2;
    $httpBackend.whenPOST(api + '/' + d.user.id + '/confirm')
      .respond(200, d);

    d = angular.copy(MembershipMockData.memberships[0]);
    d.confirmedOn = '09-09-2013 16:11:24';
    d.expiresOn = '28-03-2014';
    d.status = 'confirmed';
    $httpBackend.whenGET(api + '/1/2')
      .respond(200, d);

    d = angular.copy(MembershipMockData.memberships[2]);
    $httpBackend.whenGET(api + '/' + d.id + '/' + d.code)
      .respond(200, d);

    d = angular.copy(MembershipMockData.memberships[2]);
    $httpBackend.whenPOST(api + '/' + d.id + '/' + d.code + '/renew')
      .respond(200, MembershipMockData.renew);

    $httpBackend.whenGET().passThrough();

    // File uploads
    var fileResponse = [{"key":"613d0f00-4ee1-11e6-8b92-759f374d1f6b.png","type":"image\/png","name":"some-upload.png","size":166365}];
    $httpBackend.whenPOST(UQL_APP_CONFIG.apiUrl + 'file/membership').respond(200, fileResponse);
  }
})();
