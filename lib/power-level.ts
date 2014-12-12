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

    toString(): string {
        // TODO: i18n
        return "戦闘力: " + this.total() + "\n"
            + "攻撃力: " + this.atk
            + " 知力: " + this.int
            + " すばやさ: " + this.agi
    }

    toJSONString(): string {
        return JSON.stringify({
            atk: this.atk,
            int: this.int,
            agi: this.agi,
        })
    }
}

exports.PowerLevel = PowerLevel
