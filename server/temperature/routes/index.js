/**
 * Created by dcreey on 8/22/2016.
 */

var temperatureCtrl = require('./temperatureCtrl')();

exports.register = function (server, options, next) {
    const api = server.select('api');

    api.route({
        method: 'GET',
        path: '/api/temperature/{frequency?}',
        handler: temperatureCtrl.getTemperatureData
    })

    api.route({
        method: 'GET',
        path: '/api/temperature/min',
        handler: temperatureCtrl.getMinTemperatureData
    })

    api.route({
        method: 'GET',
        path: '/api/temperature/max',
        handler: temperatureCtrl.getMaxTemperatureData
    })

    api.route({
        method: 'GET',
        path: '/api/temperature/average',
        handler: function (request, reply) {
            reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
        }
    })
};