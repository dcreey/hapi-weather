/**
 * Created by dcreey on 8/23/2016.
 * Modified version of MEAN.io test.js
 */

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    request = require('request'),
    karmaServer = require('karma').Server,
    merge = require('merge-stream');;
var plugins = gulpLoadPlugins();

process.env.NODE_ENV = 'test';
var config = require('../config/env/test');
var routeConnections = config.connections;

gulp.task('test', ['startServer', 'stopServer']);

gulp.task('startServer', function(done) {
    var promise = require('../server.js');
    promise.then(() => {
        done();
    })
});

gulp.task('stopServer', ['runKarma'], function() {
    process.exit();
});

gulp.task('runMocha', ['startServer'], function () {
    var tasks = [];

    for (var p in routeConnections) {
        tasks.push(gulp.src(routeConnections[p].testpath, {read: false})
            .pipe(plugins.mocha({
                reporter: 'spec'
            }))
            .on('error', function (error) {
                console.error(error);
                this.emit('end');
            })
        )
    }

    return merge(tasks);
});

gulp.task('runKarma', ['runMocha'],  function (done) {
    var karma = new karmaServer({
        configFile: __dirname + '/../karma.conf.js',
        singleRun: true
    }, function () {
        done();
    });

    karma.start();
});