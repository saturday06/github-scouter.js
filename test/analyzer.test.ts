///<reference path='../typings/node/node.d.ts'/>
///<reference path='../typings/jasmine/jasmine.d.ts' />

import Analyzer = require('../lib/analyzer')
import Octokit = require('../lib/octokit')

describe("Analyzer", () => {
    var octokit

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000
        octokit = new Octokit('http://127.0.0.1:3000')
    })

    describe("#atk", () => {
        it("works!", (done) => {
            var analyzer = new Analyzer(octokit, "hello", () => {}, () => {})
            analyzer.atk((atk) => {
                expect(atk).toBe(43)
                done()
            })
        })

        it("works for a user with no repository", (done) => {
            var analyzer = new Analyzer(octokit, "norepos", () => {}, () => {})
            analyzer.atk((atk) => {
                expect(atk).toBe(0)
                done()
            })
        })
    })

    describe("When rate limit exceeded", () => {
        describe("#analyze", () => {
            it("works if cache exists", (done) => {
                var onSuccess = (powerLevel) => {
                    expect(powerLevel.atk).toBe(1000)
                    expect(powerLevel.int).toBe(2000)
                    expect(powerLevel.agi).toBe(3000)
                    expect(powerLevel.timestamp.unix()).toBe(4000)
                    done()
                }
                var onFailure = (e) => {
                    console.log(e)
                    expect("onSuccess").toBe("onFailure")
                    done()
                }
                var analyzer = new Analyzer(
                    octokit, "ratelimited-cached", onSuccess, onFailure, 'http://127.0.0.1:3000/cache')
                analyzer.analyze()
            })

            it("doesn't work if cache exists but cache is disabled", (done) => {
                var onSuccess = (powerLevel) => {
                    console.log(powerLevel)
                    expect("onFailure").toBe("onSuccess")
                    done()
                }
                var onFailure = (e) => {
                    done()
                }
                var analyzer = new Analyzer(octokit, "ratelimited-cached", onSuccess, onFailure)
                analyzer.analyze()
            })

            it("doesn't work if cache doesn't exist", (done) => {
                var onSuccess = (powerLevel) => {
                    console.log(powerLevel)
                    expect("onFailure").toBe("onSuccess")
                    done()
                }
                var onFailure = (e) => {
                    done()
                }
                var analyzer = new Analyzer(
                    octokit, "ratelimited-nocache", onSuccess, onFailure, 'http://127.0.0.1:3000/cache')
                analyzer.analyze()
            })
        })
    })
})
