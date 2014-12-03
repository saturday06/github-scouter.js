///<reference path='../../typings/node/node.d.ts'/>
///<reference path="../../typings/jasmine/jasmine.d.ts" />

describe("a-test", function() {
    it("should run a test", () => {
        var ok = 1
    });

    it("should require a file", () => {
        var module = require("../lib/github-scouter.ts")
        var gs = new module.GithubScouter()
        expect(gs.name()).toBe("gs")
    });
});
