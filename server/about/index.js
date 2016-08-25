/**
 * Created by dcreey on 8/23/2016.
 */

exports.register = function (server, options, next) {
    const web = server.select('web-ui');

    web.route({
        path: '/about',
        method: 'GET',
        handler: require('./about')
    });

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};