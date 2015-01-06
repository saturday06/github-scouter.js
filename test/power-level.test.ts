///<reference path='../typings/node/node.d.ts'/>
///<reference path='../typings/jasmine/jasmine.d.ts' />

import PowerLevel = require('../lib/power-level')

describe("PowerLevel", () => {
    describe("#total", () => {
        it("calculates total", () => {
            var powerLevel = new PowerLevel(1, 2, 3)
            expect(powerLevel.total()).toBe(6)
        })
    })

    describe(".fromJSON", () => {
        it("works!", () => {
            var powerLevel = PowerLevel.fromJSONString("{ \
                \"attack\": 10,        \
                \"intelligence\": 20,  \
                \"agility\": 30,       \
                \"timestamp\": 40      \
            }")
            expect(powerLevel.atk).toBe(10)
            expect(powerLevel.int).toBe(20)
            expect(powerLevel.agi).toBe(30)
            expect(powerLevel.timestamp.unix()).toBe(40)
        })
    })
})
