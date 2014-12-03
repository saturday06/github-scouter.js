///<reference path='typings/node/node.d.ts'/>

module.exports = (config) => {
    config.set({
        frameworks: ['jasmine', 'mocha'],
        files: ['src/test/*.ts'],
        browsers: ['PhantomJS'],

        preprocessors: {
            'src/test/**/*.ts': ['webpack']
        },

        webpack: {
            module: {
                loaders: [
                    { test: /\.ts$/, loader: "typescript-loader" }
                ]
            }
        },

        webpackServer: {
            stats: {
                colors: true
            }
        }
    });
};
