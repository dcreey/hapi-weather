/**
 * Created by dcreey on 8/23/2016.
 */

'use strict';

var request = require('request');
var should = require('should');

var config = require(global.appRoot +'/config/env/' + (process.env.NODE_ENV || 'test'));
var url = config.hostname + ":" + config.connections.web.port;

describe('Web Routing', function() {
    this.timeout(10000);

    it('should return index.html', (done) => {
        request(url, (err, response, body) => {
            if (err) done(err);

            // this is should.js syntax, very clear
            response.statusCode.should.equal(200);
            done();
        });
    })
})