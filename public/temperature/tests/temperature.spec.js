/**
 * Created by dcreey on 8/26/2016.
 */

var appName = 'cwv';
var expect = require('expect');

describe('aboutCtrl', function() {
    beforeEach(window.angular.mock.module(appName));

    var scope, temperature;

    beforeEach(inject(function($controller, $rootScope, $http) {
        scope = $rootScope.$new();

        temperature = $controller('temperatureCtrl', {
            $scope: scope,
            $http: $http,
            $rootScope: $rootScope
        });
    }));

    it('should expose some global scope', function() {
        expect(scope).toBeTruthy();
    });

    it('should have graph object in graph container', function() {
        expect(temperature.graphContainer.select("svg")).toBeTruthy();
    });
});