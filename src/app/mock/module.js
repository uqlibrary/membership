(function () {
  'use strict';

  angular
    .module('app.mock', ['ngMockE2E', 'uql.app.config'])
    .run(runBlock);

  /** @ngInject **/
  function runBlock($httpBackend, UQL_APP_CONFIG, MockMembershipFormData, MockMembershipCyberschools, MockMemberships) {
    var api = UQL_APP_CONFIG.apiUrl + 'membership';

    function escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }

    // General GET requests
    $httpBackend.whenGET(api).respond(200, MockMembershipFormData);
    $httpBackend.whenGET(api + '/cyberschools').respond(200, MockMembershipCyberschools);
    $httpBackend.whenGET(new RegExp(escapeRegExp(api + '_types?') + '([0-9]*)')).respond(200, MockMembershipFormData.type);

    // Get members. Working filter included
    $httpBackend.whenGET(new RegExp(escapeRegExp(api + 's?') + '([0-9]*)')).respond(function (method, url, data, headers, params) {
      var r = [];
      angular.forEach(MockMemberships, function (member) {
        // Name filter
        if (params['filter[name]']) {
          var fullName = member.firstName + ' ' + member.sn;
          if (!fullName.match(new RegExp(params['filter[name]']))) {
            return false;
          }
        }

        // Type filter
        if (params['filter[type]']) {
          if (!member.type.match(new RegExp(params['filter[type]']))) {
            return false;
          }
        }

        r.push(member);
      });
      // Return members that fit the filter
      return [200, r];
    });

    // Get specific member
    $httpBackend.whenGET(new RegExp(escapeRegExp(api + '/') + '*')).respond(function (method, url) {
      var id = url.split("/").pop();
      var statusCode = 404;
      var memberFound = false;
      angular.forEach(MockMemberships, function (member) {
        if (member.id === id) {
          statusCode = 200;
          memberFound = member;
        }
      });

      return [statusCode, memberFound ? memberFound : "Not found"];
    });

    // New membership / update
    $httpBackend.whenPOST(new RegExp(escapeRegExp(api + '/') + '*')).respond(function (method, url, data) {
      data = angular.fromJson(data);
      if (!data.id) {
        data.id = '00000000-0000-0000-0000-000000000001';
      }
      return [200, data];
    });

    // File attachments
    var returnURL = 'http://localhost:3000/some-file.pdf';
    console.log(new RegExp(escapeRegExp(UQL_APP_CONFIG.apiUrl + 'file/membership/') + '*'));
    $httpBackend.whenGET(new RegExp(escapeRegExp(UQL_APP_CONFIG.apiUrl + 'file/membership/') + '*')).respond(200, returnURL);

/*

    $httpBackend.whenPOST(
      new RegExp(
        escapeRegExp(api + '_type/') + '[a-zA-Z]*'
      )
    )
      .respond(200, MembershipMockData.type[0]);

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

    angular.forEach(MembershipMockData.memberships, function (val) {
      d = angular.copy(val);
      $httpBackend.whenGET(api + '/' + d.id)
        .respond(200, d);
    });

    d = angular.copy(MembershipMockData.memberships[2]);
    $httpBackend.whenGET(api + '/' + d.id + '/' + d.code)
      .respond(200, d);

    // File uploads
    var fileResponse = [
      {
        key: "613d0f00-4ee1-11e6-8b92-759f374d1f6b.png",
        type: "image/png",
        name: "some-upload.png",
        size: 166365
      }
    ];
    $httpBackend.whenPOST(UQL_APP_CONFIG.apiUrl + 'file/membership').respond(200, fileResponse);
*/
    $httpBackend.whenGET().passThrough();
  }
})();
