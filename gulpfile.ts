///<reference path='typings/node/node.d.ts'/>
///<reference path="typings/gulp/gulp.d.ts" />

import gulp = require('gulp');
var karma = require('karma').server;
var karmaConfigFile =  __dirname + '/karma.conf.ts';

gulp.task('test', (done) => {
    karma.start({
        configFile: karmaConfigFile,
        singleRun: true
    }, done);
});

gulp.task('guard', (done) => {
    karma.start({
        configFile: karmaConfigFile,
        singleRun: false
    }, done);
});

gulp.task('default', ['guard']);
