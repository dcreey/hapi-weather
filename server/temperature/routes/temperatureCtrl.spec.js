/**
 * Created by dcreey on 8/25/2016.
 */

'use strict';
if (!global.appRoot) { global.appRoot = require('app-root-path').path; }

var tempCtrl = require('./temperatureCtrl')();
var should = require('should');

describe('Test Temperature Server Controller', function() {
    it('should return list of temperatures', (done) => {
        var defaultToDate = new Date(2015,11,1);
        var defaultFromDate = new Date(2014, 11, 30);

        tempCtrl.getTemperatureData('day', 'min', Date.parse(defaultToDate), Date.parse(defaultFromDate)).then((returnObj) =>{
            returnObj.length.should.greaterThan(0);
            done();
        })
    })

    it('should return no temperatures', (done) => {
        var defaultToDate = new Date(2014,11,1);
        var defaultFromDate = new Date(2014, 11, 1);

        tempCtrl.getTemperatureData('day', 'min', Date.parse(defaultToDate), Date.parse(defaultFromDate)).then((returnObj) =>{
            returnObj.length.should.equal(0);
            done();
        })
    })
})