/**
 * Created by dcreey on 8/25/2016.
 */

'use strict';

var request = require('request');
var should = require('should');

if (!global.appRoot) { global.appRoot = require('app-root-path').path; }

var config = require(global.appRoot + '/config/env/' + (process.env.NODE_ENV || 'test'));
var url = config.hostname + ":" + config.connections.api.port;

describe('API Routing', function() {
    this.timeout(10000);

    it('should return a list of menus', (done) => {
        request.get(url + '/api/menu', {timeout: 10500}, (err, response, body) => {
            if (err) done(err);

            var menus = JSON.parse(body)

            response.statusCode.should.equal(200);
            menus.length.should.greaterThan(0);

            done();
        });
    })
})