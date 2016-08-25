/**
 * Created by dcreey on 8/23/2016.
 */
"use strict";

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

var Promise = require('bluebird');

var config = require('./config/env/' + (process.env.NODE_ENV || 'development'));
var goodOptions = require('./config/good')(config);

var port = config.port || 3000;
process.env.PORT = port;

process.env.HOST = config.hostname;
global.appRoot = Path.resolve(__dirname);

var Glue = require('glue');

// manafest.js defines all plugins and server options
// good.js defines all logging options
var promise = new Promise((res, rej) => {
    Glue.compose(require('./config/manifest')(config, goodOptions), { relativeTo: process.cwd() }, (err, server) => {
        if (err) rej(console.error(err));

        server.start((err) => {
            if (err) rej(console.error(err));
            // UI running on port 80,
            // API running on port 9000
            server.connections.forEach((con) => {
                console.info(`${con.settings.labels[0]} Server started at port ${con.settings.port}`);
            });
            res(server);
        });

    });
})

// return promise containing server
// used for testing
module.exports = Promise.resolve(promise);
