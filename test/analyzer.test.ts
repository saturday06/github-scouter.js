///<reference path='../typings/node/node.d.ts'/>
///<reference path='../typings/jasmine/jasmine.d.ts' />

describe("Analyzer", () => {
    var octokit

    beforeEach(() => {
        octokit = new (require("../lib/octokit.ts")).Octokit('http://127.0.0.1:3000')
    })

    describe("#atk", () => {
        it("works!", (done) => {
            var analyzer = new (require("../lib/analyzer.ts")).Analyzer(octokit, "hello", () => {}, () => {})
            analyzer.atk((atk) => {
                expect(atk).toBe(43)
                done()
            })
        })

        it("works for a user with no repository", (done) => {
            var analyzer = new (require("../lib/analyzer.ts")).Analyzer(octokit, "norepos", () => {}, () => {})
            analyzer.atk((atk) => {
                expect(atk).toBe(0)
                done()
            })
        })
    })
})
