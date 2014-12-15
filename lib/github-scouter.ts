///<reference path='../typings/node/node.d.ts'/>
///<reference path='octokit.ts'/>
///<reference path='power-level.ts'/>

var API_URL = 'https://api.github.com'
var CACHE_URL = 'http://githubscouter.leafytree.jp'

/**
 * http://dragonball.wikia.com/wiki/Scouter
 */
class GithubScouter {
    private octokit: Octokit
    
    constructor(private baseUrl: string = API_URL,
                private cacheBaseUrl: string = CACHE_URL) {
        this.octokit = new (require('./octokit.ts')).Octokit(baseUrl)
    }

    measure(userName: string, onSuccess: (powerLevel: PowerLevel) => any, onFailure: (error) => any) {
        var analyzer = new (require('./analyzer.ts')).Analyzer(this.octokit, userName, onSuccess, onFailure, this.cacheBaseUrl)
        analyzer.analyze()
    }
}

exports.GithubScouter = GithubScouter
exports.API_URL = API_URL
exports.CACHE_URL = CACHE_URL
