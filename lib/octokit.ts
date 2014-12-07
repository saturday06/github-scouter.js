///<reference path='../typings/node/node.d.ts'/>
///<reference path='../typings/superagent/superagent.d.ts'/>

var _ = require('lodash')

class Octokit {
    private agent
    private perPage = 100

    constructor(private baseUrl, private token: string = undefined) {
        this.agent = require('superagent')
    }

    requestHeaders() {
        var result = {}
        result["Accept"] = "application/vnd.github.v3+json"
        if (this.token) {
            result["Authorization"] = this.token
        }
        return result
    }

    repositories(userName: string, onSuccess: (repositories: any[]) => any, onFailure: (error) => any, result = [], page = 1) {
        // TODO: Embedding unchecked string is danger.
        this.agent
            .get(this.baseUrl + '/users/' + userName + '/repos')
            .query({page: page, per_page: this.perPage})
            .set(this.requestHeaders())
            .end((response) => {
                if (response.error) {
                    onFailure(response.error)
                    return
                }
                result = result.concat(response.body) // body is always array?
                if (response.body.length < this.perPage) {
                    onSuccess(result)
                } else {
                    this.repositories(userName, onSuccess, onFailure, result, page + 1)
                }
            })
    }

    organizations(userName: string, onSuccess: (repositories: any[]) => any, onFailure: (error) => any, result = [], page = 1) {
        // TODO: Embedding unchecked string is danger.
        this.agent
            .get(this.baseUrl + '/users/' + userName + '/orgs')
            .query({page: page, per_page: this.perPage})
            .set(this.requestHeaders())
            .end((response) => {
                if (response.error) {
                    onFailure(response.error)
                    return
                }
                result = result.concat(response.body) // body is always array?
                if (response.body.length < this.perPage) {
                    onSuccess(result)
                } else {
                    this.organizations(userName, onSuccess, onFailure, result, page + 1)
                }
            })
    }

    organization(organizationName: string, onSuccess: (organization) => any, onFailure: (error) => any) {
        // TODO: Embedding unchecked string is danger.
        this.agent
            .get(this.baseUrl + '/orgs/' + organizationName)
            .set(this.requestHeaders())
            .end((error, response) => {
                if (response.error) {
                    onFailure(response.error)
                    return
                }
                onSuccess(response.body)
            })
    }

    organizationMembers(organizationName: string, onSuccess: (members: any[]) => any, onFailure: (error) => any, result = [], page = 1) {
        // TODO: Embedding unchecked string is danger.
        this.agent
            .get(this.baseUrl + '/orgs/' + organizationName + '/members')
            .query({page: page, per_page: this.perPage})
            .set(this.requestHeaders())
            .end((error, response) => {
                if (response.error) {
                    onFailure(response.error)
                    return
                }
                result = result.concat(response.body) // body is always array?
                if (response.body.length < this.perPage) {
                    onSuccess(result)
                } else {
                    this.organizationMembers(organizationName, onSuccess, onFailure, result, page + 1)
                }
            })
    }
}

exports.Octokit = Octokit
