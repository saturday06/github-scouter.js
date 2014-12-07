///<reference path='../typings/node/node.d.ts'/>
///<reference path='github-scouter.ts'/>

require('typescript-require')()

module.exports = new (require("github-scouter.ts")).GithubScouter()
