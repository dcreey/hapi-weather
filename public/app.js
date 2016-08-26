/**
 * Created by dcreey on 8/23/2016.
 */

var app = angular.module("cwv", ['ui.router'])
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.webUrl = "http://127.0.0.1:80";
                $rootScope.apiUrl = "http://127.0.0.1:9000/";
            }]
    );
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'temperature/temperature.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'about/about.html'
        })
});

app.directive('header', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: "/core/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) { }]
    }
});

app.directive('footer', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: "/core/footer.html",
        controller: ['$scope', '$filter', function ($scope, $filter) { }]
    }
});

app.controller("appCtrl", function($http){
    var app = this;
})