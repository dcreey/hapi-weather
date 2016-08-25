/**
 * Created by dcreey on 8/23/2016.
 */

if (!global.appRoot) { global.appRoot = require('app-root-path').path; }
var config = require(global.appRoot + '/config/env/' + (process.env.NODE_ENV || 'test'));

var expect = require('expect');

describe('aboutCtrl', function() {
    beforeEach(window.angular.mock.module(config.app.name));

    var scope, ctrl;

    beforeEach(inject(function($controller, $rootScope, $http) {
        scope = $rootScope.$new();

        ctrl = $controller('aboutCtrl', {
            $scope: scope,
            $http: $http
        });
    }));

    it('should expose some global scope', function() {
        expect(scope).toBeTruthy();
    });

    it('should expose profileLink', function() {
        expect(ctrl.emailAddress).toBeTruthy();
    });
});