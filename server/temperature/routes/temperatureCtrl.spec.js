/**
 * Created by dcreey on 8/25/2016.
 */

'use strict';
if (!global.appRoot) { global.appRoot = require('app-root-path').path; }

var tempCtrl = require('./temperatureCtrl')();
var should = require('should');

describe('Test Temperature Server Controller', function() {
    it('should return list of temperatures', (done) => {
        tempCtrl.getTemperatureData('day', 'min').getMenus(null, (returnObj) =>{
            returnObj.length.should.greaterThan(0);
            done();
        })
    })
})