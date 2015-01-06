///<reference path='typings/node/node.d.ts'/>

module.exports = (config) => {
    config.set({
        frameworks: ['webpack', 'jasmine', 'mocha'],
        files: ['test/run-browser.ts'],
        browsers: ['PhantomJS'],
        browserNoActivityTimeout: 100 * 1000,
        singleRun: true,

        preprocessors: {
            'test/run-browser.ts': ['webpack']
        }
    });
};
