/**
 * Created by dcreey on 8/25/2016.
 */

'use strict';
if (!global.appRoot) { global.appRoot = require('app-root-path').path; }

var menu = require('./menuCtrl')();
var should = require('should');

describe('Test Menu Server Controller', function() {
    it('should return list of menus', (done) => {
        menu.getMenus(null, (returnObj) =>{
            returnObj.length.should.greaterThan(0);
            done();
        })
    })
})