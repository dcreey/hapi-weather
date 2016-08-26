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
    var defaultFreq = 'day';
    var defaultToDate = new Date(2015,11,1);
    var defaultFromDate = new Date(2014, 11, 30);
    api.route({
        method: 'GET',
        path: '/temperatures',
        handler: function(request, reply) {
            var freq = request.query.frequency || defaultFreq;
            var measurement = request.query.measurement || '';
            var toDate = request.query.toDate || Date.parse(defaultToDate);
            var fromDate = request.query.fromDate || Date.parse(defaultFromDate);
            temperatureCtrl.getTemperatureData(freq.toLowerCase(), measurement.toLowerCase(), toDate, fromDate).then((data) => {
                // no values returned
                if (!data.length) reply({ error : "No temperature values found" }).code(404);
                // send array of values
                else reply(data);
            })
        }
    });

    // Example REST API
    // Post, put, delete methods
    // These methods weren't necessary for the front-end
    api.route({
        method: 'GET',
        path: '/temperatures/{date}',
        handler: function(request, reply) {
            // get temperature data
            // not implemented
            reply({ error : "Temperature measurement(s) do not exist for the given date." }).code(404);
        }
    });

    api.route({
        method: 'PUT',
        path: '/temperatures/{date}',
        handler: function(request, reply) {
            // update temperature data
            // not implemented
            reply({ error : "Temperature measurement(s) do not exist for the given date." }).code(404);
        }
    });

    api.route({
        method: 'DELETE',
        path: '/temperatures/{date}',
        handler: function(request, reply) {
            // delete temperature data
            // not implemented
            reply({ error : "Temperature measurement(s) do not exist for the given date." }).code(404);
        }
    });

    api.route({
        method: 'POST',
        path: '/temperatures/{date}',
        handler: function(request, reply) {
            // Create temperature data
            // not implemented
            reply({ error : "This is not a real API. Do not request back again." }).code(404);
        }
    });
};