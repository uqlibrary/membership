'use strict';

describe('The main membership view', function () {
  var page;

  beforeEach(function () {
    browser.get('/');
    page = require('./main.po');
  });

  it('Should load the page', function() {
    expect(page.heading.getText()).toBe('UQ Library Membership');
    expect(page.membershipTypes.count()).toBe(12);
  });

  it('Should show all membership form options', function () {
    expect(page.membershipTypes.get(0).getText()).toMatch(/UQ Alumni/);
    expect(page.membershipTypes.get(1).getText()).toMatch(/at LCCH, Mater or RBWH/);
    expect(page.membershipTypes.get(2).getText()).toMatch(/Retired UQ Staff/);
    expect(page.membershipTypes.get(3).getText()).toMatch(/Reciprocal Borrower/);
    expect(page.membershipTypes.get(4).getText()).toMatch(/Proxy Borrower/);
    expect(page.membershipTypes.get(5).getText()).toMatch(/Alumni Friends/);
    expect(page.membershipTypes.get(6).getText()).toMatch(/Community/);
    expect(page.membershipTypes.get(7).getText()).toMatch(/UQ Associate/);
    expect(page.membershipTypes.get(8).getText()).toMatch(/Cyberschool/);
    expect(page.membershipTypes.get(9).getText()).toMatch(/New Graduates/);
    expect(page.membershipTypes.get(10).getText()).toMatch(/Staff Awaiting Aurion/);
    expect(page.membershipTypes.get(11).getText()).toMatch(/Official Visitors/);
  });
});