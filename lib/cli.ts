///<reference path='../typings/node/node.d.ts'/>
///<reference path='./github-scouter.ts'/>

require('typescript-require')()

var userName = process.argv[2]
if (!userName) {
    console.log("Usage: github-scouter [GitHub ID]")
    process.exit(1)
}

var scouter = new (require('./github-scouter.ts')).GithubScouter()
scouter.measure(userName, (powerLevel) => {
    console.log(powerLevel.toString())
}, (error) => {
    console.log(error)
})
