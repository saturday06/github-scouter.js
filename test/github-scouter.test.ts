///<reference path='../typings/node/node.d.ts'/>
///<reference path='../typings/jasmine/jasmine.d.ts' />

import GithubScouter = require('../lib/github-scouter')

describe("GithubScouter", () => {
    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000
    })

    describe("#measure", () => {
        it("measures target's power level", (done) => {
            var scouter = new GithubScouter('http://localhost:3000')
            scouter.measure("hello", (powerLevel) => {
                expect(powerLevel.atk).toBe(43)
                expect(powerLevel.int).toBe(6)
                expect(powerLevel.agi).toBe(68)
                expect(powerLevel.total()).toBe(117)
                done()
            }, (error) => {
                expect('success').toBe(error)
                done()
            })
        })

        it("measures target's power level (real target!)", (done) => {
            return done()
            var scouter = new GithubScouter()
            scouter.measure("saturday06", (powerLevel) => {
                console.log(powerLevel)
                done()
            }, (error) => {
                expect('success').toBe(error)
                done()
            })
        })
    })
})
