///<reference path='../typings/node/node.d.ts'/>

/**
 * http://dragonball.wikia.com/wiki/Power_level
 */
class PowerLevel {
    constructor(public atk: number, public int: number, public agi: number) {
    }

    total(): number {
        return this.atk + this.int + this.agi
    }
}

exports.PowerLevel = PowerLevel
