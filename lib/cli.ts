///<reference path='../typings/node/node.d.ts'/>
///<reference path='./github-scouter.ts'/>

require('typescript-require')()

var m = require('./github-scouter.ts')
var argv = require('yargs')
    .usage('Usage: $0 [GitHub ID]')
    .example('$0 saturday06', "Show saturday06's power level")
    .demand(1)
    .boolean('json')
    .describe('json', 'Output JSON')
    .boolean('cache')
    .default('cache', true)
    .describe('cache', 'Use the cache server')
    .string('token')
    .describe('token', 'Personal API Access Token')
    .string('api-url')
    .default('api-url', m.API_URL)
    .describe('api-url', 'URL to GitHub API')
    .string('cache-url')
    .default('cache-url', m.CACHE_URL)
    .describe('cache-url', 'URL to the cache server')
    .argv

var scouter = new m.GithubScouter(argv.apiUrl, argv.cache ? argv.cacheUrl : null, argv.token)
scouter.measure(argv._, (powerLevel) => {
    if (argv.json) {
        console.log(powerLevel.toJSONString())
    } else {
        console.log(powerLevel.toString())
    }
    process.exit(0)
}, (error) => {
    if (argv.json) {
        console.log(JSON.stringify({error: error}))
    } else {
        console.log(error)
    }
    process.exit(1)
})
