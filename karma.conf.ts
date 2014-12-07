///<reference path='typings/node/node.d.ts'/>

module.exports = (config) => {
    config.set({
        frameworks: ['jasmine', 'mocha'],
        files: ['test/*.test.ts'],
        browsers: ['PhantomJS'],
        browserNoActivityTimeout: 100 * 1000,
        singleRun: true,

        preprocessors: {
            'test/*.test.ts': ['webpack']
        }
    });
};
