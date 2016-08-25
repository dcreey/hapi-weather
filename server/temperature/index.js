/**
 * Created by dcreey on 8/23/2016.
 */

exports.register = function (server, options, next) {
    const web = server.select('web-ui');

    // register temperature web end-points
    web.route({
        path: '/temperature',
        method: 'GET',
        handler: require('./temperature')
    });

    // register temperature api end-points
    require('./routes').register(server, options, next);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};