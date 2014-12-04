///<reference path='../typings/node/node.d.ts'/>
///<reference path='../typings/jasmine/jasmine.d.ts'/>

describe("Octokit", () => {
    var server
    var octokit

    beforeEach(() => {
        var util = require("util");
        octokit = new (require("../lib/octokit.ts")).Octokit('http://127.0.0.1:3000')
    })

    describe("#repositories", () => {
        it("works!", (done) => {
            octokit.repositories("world", (repositories) => {
                //expect(repositories).toEqual([1, 2, 3])
                done()
            }, (error) => {
                expect('').toBe(error)
            })
        })
    })

    describe("#organizations", () => {
        it("works!", (done) => {
            octokit.organizations("world", (organizations) => {
                //expect(organizations).toEqual([1, 2, 3])
                done()
            }, (error) => {
                expect('').toBe(error)
            })
        })
    })

    describe("#organization", () => {
        it("works!", (done) => {
            octokit.organization("cookvideo", (organization) => {
                //expect(organization).toEqual({foo: 1})
                done()
            }, (error) => {
                expect('').toBe(error)
            })
        })
    })

    describe("#organizationMembers", () => {
        it("works!", (done) => {
            octokit.organizationMembers("nicopad", (members) => {
                //expect(members).toEqual([1, 2, 3])
                done()
            }, (error) => {
                expect('').toBe(error)
            })
        })
    })
})
