///<reference path='../typings/node/node.d.ts'/>
///<reference path='../typings/jasmine/jasmine.d.ts' />

describe("PowerLevel", () => {
    describe("#total", () => {
        it("calculates total", () => {
            var powerLevel = new (require('../lib/power-level.ts')).PowerLevel(1, 2, 3)
            expect(powerLevel.total()).toBe(6)
        })
    })
})
