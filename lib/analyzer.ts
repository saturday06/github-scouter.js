///<reference path='../typings/node/node.d.ts'/>
///<reference path='octokit.ts'/>
///<reference path='power-level.ts'/>

var _ = require('lodash')

class Analyzer {
    private cachedRepositories: any[]

    constructor(private octokit: Octokit,
                private userName: string,
                private onSuccess: (powerLevel: PowerLevel) => any,
                private onFailure: (error) => any) {
    }

    atk(callback: (atk: number) => any) {
        this.repositories((repositories) => {
            var atk = _.chain(repositories).map((repository) => {
                return this.repositoryAtk(repository)
            }).reduce((l, r) => {
                return l + r
            }).value() || 0
            callback(atk)
        })
    }

    repositoryAtk(repository: any) {
        if (repository.private) {
            return 0
        }

        var forks_count = repository.forks_count
        var stargazers_count = repository.stargazers_count
        if (repository.fork) {
            return (forks_count + stargazers_count) / 10
        } else {
            return 1 + (forks_count + 2) * stargazers_count
        }
    }

    int(callback: (int: number) => any) {
        this.repositories((repositories) => {
            var languageCounts = _.chain(repositories).pluck('language').filter((language) => {
                return language
            }).groupBy((language) => {
                return language
            }).map((value, key) => {
                return {language: key, count: value.length}
            }).sortBy((languageCount) => {
                return -languageCount.count
            }).value();
            var sum = 0
            _.each(languageCounts, (languageCount, index) => {
                sum += Math.floor(languageCount.count / (languageCounts.length - index))
            })
            callback(languageCounts.length * sum)
        })
    }

    agi(callback: (agi: number) => any) {
        this.octokit.organizations(this.userName, (organizations) => {
            var logins = _.pluck(organizations, 'login')
            this.sumOrganizationAgi(logins, 0, (agi) => {
                callback(agi)
            })
        }, this.onFailure)
    }

    sumOrganizationAgi(logins, totalAgi, callback: (agi: number) => any) {
        if (_.isEmpty(logins)) {
            callback(totalAgi)
            return
        }
        var login = _.first(logins)
        this.octokit.organization(login, (organization) => {
            this.octokit.organizationMembers(login, (members) => {
                var agi = totalAgi + organization.public_repos + members.length
                this.sumOrganizationAgi(_.rest(logins), agi, callback)
            }, this.onFailure)
        }, this.onFailure)
    }

    repositories(callback: (repositories: any[]) => any) {
        if (this.cachedRepositories) {
            callback(this.cachedRepositories)
            return
        }
        this.octokit.repositories(this.userName, (repositories: any[]) => {
            this.cachedRepositories = repositories
            callback(repositories)
        }, this.onFailure)
    }

    analyze() {
        // OOOOOoops! Callback hell is here!
        this.atk((atk) => {
            this.int((int) => {
                this.agi((agi) => {
                    this.onSuccess(new (require('./power-level.ts')).PowerLevel(atk, int, agi))
                })
            })
        })
        this.cachedRepositories = null
    }
}

exports.Analyzer = Analyzer
