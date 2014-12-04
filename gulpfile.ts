///<reference path='typings/node/node.d.ts'/>
///<reference path="typings/gulp/gulp.d.ts" />

import gulp = require('gulp')
var karma = require('karma').server
var tslint = require('gulp-tslint')
var tsc = require('gulp-tsc')
var jasmine = require('gulp-jasmine')
var runSequence = require('run-sequence')
var child_process = require('child_process')
var sleep = require('sleep')
var webpack = require('gulp-webpack')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var _ = require('lodash')
var src = ['lib/*.ts', 'test/*.ts']
var webpackConfig = {
    module: {
        loaders: [
            { test: /\.ts$/, loader: "typescript-loader" }
        ]
    }
}

//function start_mock_server(callback: (mock_server) => any) {
function start_mock_server() {
    var server = child_process.spawn(process.execPath, [__dirname + '/test/mock-server.js'], {
        NODE_ENV: "development"
    })
    server.stdout.setEncoding('utf8');
    server.stderr.setEncoding('utf8');
    server.stdout.on('data', (data) => {
        console.log(data.trim());
    })
    server.stderr.on('data', (data) => {
        console.log(data.trim());
    })
    process.on('exit', (code, sig) => {
        server.kill('SIGINT')
    })

    // TODO: wait for server
    //setTimeout(() => {
    //    callback(server)
    //}, 500)
    sleep.usleep(500 * 1000)
    return server
}

gulp.task('webpack', () => {
    return gulp.src('lib/github-scouter.ts')
        .pipe(webpack(_.assign(
            webpackConfig, {
                devtool: "source-map",
                output: {
                    filename: "github-scouter.js"
                }
            })))
        .pipe(gulp.dest('browser/'))
})

gulp.task('webpack-min', ['webpack'], () => {
    return gulp.src('browser/github-scouter.js')
        .pipe(uglify())
        .pipe(rename("github-scouter.min.js"))
        .pipe(gulp.dest('browser/'))
})

gulp.task('test-browser', ['tsc'], (done) => {
    var server = start_mock_server()
    karma.start({
        configFile: __dirname + '/karma.conf.ts',
        webpack: _.assign(webpackConfig,{
            debug: true
        })
    }, () => {
        server.kill('SIGINT')
        done()
    })
})

gulp.task('test-node', ['tsc'], () => {
    var server = start_mock_server()
    return gulp
        .src('test/run.js')
        .pipe(jasmine())
        .on('error', function (error) {
            server.kill('SIGINT')
            //console.log(error || "undefined")
            //this.emit('end')
        })
        .on('end', () => {
            server.kill('SIGINT')
        })
})

gulp.task('tsc', () => {
    return gulp.src(src)
        .pipe(tsc())
        .pipe(gulp.dest('.'))
})

gulp.task('tslint', () => {
    return gulp.src(src)
        .pipe(tslint())
        .pipe(tslint.report())
})

gulp.task('test', () => {
    runSequence('tsc', 'tslint', 'test-node', 'test-browser', 'webpack-min')
})

gulp.task('guard', () => {
    gulp.watch(src, ['test'])
})

gulp.task('default', ['guard'])
