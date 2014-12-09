var express = require('express')
var _ = require('lodash')
var app = express()

app.get('/users/hello/repos', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.send([
        {id: 1, private: false, fork: false, stargazers_count: 0, language: "Java", forks_count: 0},
        {id: 2, private: true,  fork: false, stargazers_count: 2, language: "Java", forks_count: 2},
        {id: 3, private: false, fork: false, stargazers_count: 3, language: "C++",  forks_count: 3},
        {id: 4, private: false, fork: false, stargazers_count: 4, language: "C++",  forks_count: 4},
        {id: 5, private: false, fork: true,  stargazers_count: 5, language: "C++",  forks_count: 5},
    ])
})

app.get('/users/norepos/repos', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.send([])
})

app.get('/users/hello/orgs', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.send([
        {login: 'cookvideo'},
        {login: 'nicopad'},
    ])
})

app.get('/users/world/repos', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    var all = _.range(50).map((i) => {
        return {id: i, private: false, fork: false, stargazers_count: 0, language: "Java", forks_count: 0}
    })
    res.send(all)
})

app.get('/users/world/orgs', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.send([])
})

app.get('/orgs/cookvideo', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.send({public_repos: 10})
})

app.get('/orgs/cookvideo/members', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.send([{id: 1}, {id: 2}, {id: 3}])
})

app.get('/orgs/nicopad', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.send({public_repos: 5})
})

app.get('/orgs/nicopad/members', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    var all = _.range(50).map((i) => {return {id: i}})
    res.send(all)
})

var port = 3000
app.listen(port)
console.log('mock-server is listening on port ' + port)
