/**
 * Created by dcreey on 8/23/2016.
 */
var menu = require('./menuCtrl')();

exports.register = function (server, options, next) {
    const api = server.select('api');

    api.route({
        method: 'GET',
        path: '/api/menu',
        handler: menu.getMenus
    })

};