/**
 * Created by dcreey on 8/23/2016.
 */

var expect = require('expect');
var appName = 'cwv';

describe('aboutCtrl', function() {
    beforeEach(window.angular.mock.module(appName));

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