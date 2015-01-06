///<reference path='../typings/node/node.d.ts'/>
///<reference path='../typings/jasmine/jasmine.d.ts'/>

import Octokit = require("../lib/octokit")

describe("Octokit", () => {
    var server
    var octokit

    beforeEach(() => {
        var util = require("util");
        octokit = new Octokit('http://127.0.0.1:3000')
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

        it("avoids invalid input", (done) => {
            octokit.repositories("wo$rld", (repositories) => {
                // fail()
                expect("failure").toBe("success")
                done()
            }, (error) => {
                expect(error).toEqual("Invalid user name")
                done()
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

        it("avoids invalid input", (done) => {
            octokit.organizations("wo%ld", (organizations) => {
                // fail()
                expect("failure").toBe("success")
                done()
            }, (error) => {
                expect(error).toEqual("Invalid user name")
                done()
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

        it("avoids invalid input", (done) => {
            octokit.organization("wo../ld", (organization) => {
                // fail()
                expect("failure").toBe("success")
                done()
            }, (error) => {
                expect(error).toEqual("Invalid organization name")
                done()
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

        it("avoids invalid input", (done) => {
            octokit.organizationMembers("wo/..ld", (members) => {
                // fail()
                expect("failure").toBe("success")
                done()
            }, (error) => {
                expect(error).toEqual("Invalid organization name")
                done()
            })
        })
    })

    describe("#validUserName", () => {
        it("works!", () => {
            expect(octokit.validUserName("foo-bar1")).toBe(true)
            expect(octokit.validUserName("foo_bar2")).toBe(false)
            expect(octokit.validUserName("foo/bar3")).toBe(false)
        })
    })

    describe("#validOrganizationName", () => {
        it("works!", () => {
            expect(octokit.validOrganizationName("foo-bar1")).toBe(true)
            expect(octokit.validOrganizationName("foo_bar2")).toBe(false)
            expect(octokit.validOrganizationName("foo/bar3")).toBe(false)
        })
    })

    describe("#validToken", () => {
        it("works!", () => {
            expect(octokit.validToken("0123456789abcdefABCDEF")).toBe(true)
            expect(octokit.validToken("abc\ndef")).toBe(false)
        })
    })
})
