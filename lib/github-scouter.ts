///<reference path='../typings/node/node.d.ts'/>
///<reference path='octokit.ts'/>
///<reference path='power-level.ts'/>

/**
 * http://dragonball.wikia.com/wiki/Scouter
 */
class GithubScouter {
    private octokit: Octokit
    
    constructor(private baseUrl: string = 'https://api.github.com') {
        this.octokit = new (require('./octokit.ts')).Octokit(baseUrl)
    }

    measure(userName: string, onSuccess: (powerLevel: PowerLevel) => any, onFailure: (error) => any) {
        var analyzer = new (require('./analyzer.ts')).Analyzer(this.octokit, userName, onSuccess, onFailure)
        analyzer.analyze()
    }
}

exports.GithubScouter = GithubScouter
