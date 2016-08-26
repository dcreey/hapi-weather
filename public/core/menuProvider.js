/**
 * Created by dcreey on 8/23/2016.
 * NOT IMPLEMENTED
 */

//app.provider('menu', function MenuProvider() {
//
//    this.setMenu = function() {
//        this.menu =
//    }
//
//    this.$get = ["menuItems", function menuFactory($http) {
//        $http.get($rootScope.apiUrl + 'menu').then(function(items){
//            return items;
//        })
//    }];
//});
//
//'use strict';

app.factory('Menus', ['$resource',
    function($resource) {
        return $resource($rootScope.apiUrl + 'menus');
    }
]);
