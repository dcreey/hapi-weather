/**
 * Created by dcreey on 8/22/2016.
 * Register Temperature API Routes
 */

var temperatureCtrl = require('./temperatureCtrl')();

// define temperature api routes
exports.register = function (server, options, next) {
    const api = server.select('api');

    // accepts two optional query parameters in search
    // frequency: day, week, month
    // measurement: min, max
    // defaults to both min and max values at frequency of days
    api.route({
        method: 'GET',
        path: '/api/temperature/search',
        handler: function(request, reply) {
            var freq = request.query.frequency || 'day';
            var measurement = request.query.measurement || '';
            var toDate = request.query.toDate || '';
            var toDate = request.query.fromDate || '';
            temperatureCtrl.getTemperatureData(freq.toLowerCase(), measurement.toLowerCase()).then((data) => {
                reply(data);
            })
        }
    });

    // Example REST API
    // Post, put, delete methods
    // These methods weren't necessary for the front-end
    api.route({
        method: 'GET',
        path: '/api/temperature/{date}',
        handler: function(request, reply) {
            // get temperature data
        }
    });

    api.route({
        method: 'PUT',
        path: '/api/temperature/{date}',
        handler: function(request, reply) {
            // update temperature data
        }
    });

    api.route({
        method: 'DELETE',
        path: '/api/temperature/{date}',
        handler: function(request, reply) {
            // delete temperature data
        }
    });

    api.route({
        method: 'POST',
        path: '/api/temperature/{date}',
        handler: function(request, reply) {
            // Create temperature data
        }
    });
};