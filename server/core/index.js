/**
 * Created by dcreey on 8/23/2016.
 */
'use strict';

exports.register = function (server, options, next) {
    const web = server.select('web-ui');

    // register core web end-points
    web.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });

    // register core api end-points
    require('./routes').register(server, options, next);

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};