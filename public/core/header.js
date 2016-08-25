/**
 * Created by dcreey on 8/23/2016.
 */

app.controller('HeaderController', ['$scope', '$rootScope', 'Menus', '$state',
    function($scope, $rootScope, Menus, $state) {

        function queryMenu(name) {

            Menus.query({
                name: name
            }, function(menu) {
                vm.menus[name] = menu;
            });
        }

        // Query server for menus and check permissions
        queryMenu('main');
    }
])