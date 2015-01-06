///<reference path='../typings/node/node.d.ts'/>

import Analyzer = require('./analyzer')
import Octokit = require('./octokit')
import PowerLevel = require('./power-level')

/**
 * http://dragonball.wikia.com/wiki/Scouter
 */
class GithubScouter {
    static API_URL = 'https://api.github.com'
    static CACHE_URL = 'http://githubscouter.leafytree.jp'
    private octokit: Octokit
    
    constructor(private baseUrl: string = GithubScouter.API_URL,
                private cacheBaseUrl: string = GithubScouter.CACHE_URL,
                private token: string = undefined) {
        this.octokit = new Octokit(baseUrl, token)
    }

    measure(userName: string, onSuccess: (powerLevel: PowerLevel) => any, onFailure: (error) => any) {
        var analyzer = new Analyzer(this.octokit, userName, onSuccess, onFailure, this.cacheBaseUrl)
        analyzer.analyze()
    }
}

export = GithubScouter
