///<reference path='../typings/node/node.d.ts'/>
///<reference path='./github-scouter.ts'/>

require('typescript-require')()
var argv = require('yargs')
    .usage('Usage: $0 [GitHub ID]')
    .example('$0 saturday06', "Show saturday06's power level")
    .demand(1)
    .boolean('json')
    .describe('json', 'Output JSON')
    .argv

var scouter = new (require('./github-scouter.ts')).GithubScouter()
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
