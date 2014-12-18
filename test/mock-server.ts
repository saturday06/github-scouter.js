var express = require('express')
var _ = require('lodash')
var app = express()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    return next()
})

app.get('/users/hello/repos', (req, res) => {
    res.send([
        {id: 1, private: false, fork: false, stargazers_count: 0, language: "Java", forks_count: 0},
        {id: 2, private: true,  fork: false, stargazers_count: 2, language: "Java", forks_count: 2},
        {id: 3, private: false, fork: false, stargazers_count: 3, language: "C++",  forks_count: 3},
        {id: 4, private: false, fork: false, stargazers_count: 4, language: "C++",  forks_count: 4},
        {id: 5, private: false, fork: true,  stargazers_count: 5, language: "C++",  forks_count: 5},
    ])
})

app.get('/users/norepos/repos', (req, res) => {
    res.send([])
})

app.get('/users/hello/orgs', (req, res) => {
    res.send([
        {login: 'cookvideo'},
        {login: 'nicopad'},
    ])
})

app.get('/users/world/repos', (req, res) => {
    var all = _.range(50).map((i) => {
        return {id: i, private: false, fork: false, stargazers_count: 0, language: "Java", forks_count: 0}
    })
    res.send(all)
})

app.get('/users/world/orgs', (req, res) => {
    res.send([])
})

app.get('/orgs/cookvideo', (req, res) => {
    res.send({public_repos: 10})
})

app.get('/orgs/cookvideo/members', (req, res) => {
    res.send([{id: 1}, {id: 2}, {id: 3}])
})

app.get('/orgs/nicopad', (req, res) => {
    res.send({public_repos: 5})
})

app.get('/orgs/nicopad/members', (req, res) => {
    var all = _.range(50).map((i) => {return {id: i}})
    res.send(all)
})

app.get('/users/ratelimited-cached/repos', (req, res) => {
    // TODO: header
    res.status(403).send('Oops!')
})

app.get('/users/ratelimited-nocache/repos', (req, res) => {
    // TODO: header
    res.status(403).send('Oops!')
})

app.get('/cache/powerLevels/ratelimited-cached', (req, res) => {
    res.send({
        attack: 1000,
        intelligence: 2000,
        agility: 3000,
        timestamp: 4000
    })
})

app.get('/cache/powerLevels/ratelimited-nocache', (req, res) => {
    res.status(404).send('Oops!')
})

var port = 3000
app.listen(port)
console.log('mock-server is listening on port ' + port)
