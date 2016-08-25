/**
 * Created by dcreey on 8/23/2016.
 * Modified version of MEAN.io protractor.config.js
 */
var jasmineReporters = require('jasmine-reporters');

if (!global.appRoot) { global.appRoot = require('app-root-path').path; }

var config = require(global.appRoot + '/config/env/' + (process.env.NODE_ENV || 'test'));
var url = config.hostname + ":" + config.connections.web.port;


exports.config = {
    baseUrl: url + '/index.html',
    framework: 'jasmine2',
    specs: [
        '../tests/*.spec.js',
        '../tests/**/*.spec.js'
    ],
    multiCapabilities: [
        {
            browserName: 'chrome'
        }
    ],

    onPrepare: function(){
        //Creates independent results files for each browser
        //Otherwise they run at the same time and overwrite each other
        /*var capsPromise = browser.getCapabilities();

        return capsPromise.then(function(caps){
            var browserName = caps.caps_.browserName;
            var browserVersion = caps.caps_.version;
            var browserPrefix = browserName + '-' + browserVersion + '-';
            jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
                savePath: 'tests/results/e2e/junit',
                filePrefix: browserPrefix,
                consolidateAll: false
            }));
        });*/
    }
};
