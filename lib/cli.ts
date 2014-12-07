///<reference path='../typings/node/node.d.ts'/>
///<reference path='./github-scouter.ts'/>

require('typescript-require')()

var userName = process.argv[2]
if (!userName) {
    process.exit(1)
}

var scouter = new (require('./github-scouter.ts')).GithubScouter()
scouter.measure(userName, (powerLevel) => {
    console.log(powerLevel)
}, (error) => {
    console.log(error)
})
