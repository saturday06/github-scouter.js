///<reference path='../typings/node/node.d.ts'/>
///<reference path='../typings/moment/moment.d.ts'/>

/**
 * http://dragonball.wikia.com/wiki/Power_level
 */
class PowerLevel {
    constructor(public atk: number, public int: number, public agi: number,
                public cached: boolean = false, public timestamp: Moment = (require("moment"))()) {
        // TODO: moment usage
    }

    static fromJSONString(json: string): PowerLevel {
        var obj = JSON.parse(json)
        // TODO: validation
        // TODO: moment usage
        return new PowerLevel(obj.attack, obj.intelligence, obj.agility,
                              !!obj.cached, (require("moment")).unix(obj.timestamp))
    }

    total(): number {
        return this.atk + this.int + this.agi
    }

    toString(): string {
        // TODO: i18n
        var str = "戦闘力: " + this.total() + "\n"
            + "攻撃力: " + this.atk
            + " 知力: " + this.int
            + " すばやさ: " + this.agi
        if (this.cached) {
            str += "\n\nキャッシュから取得しました"
                + "\nデータ取得時刻: " + this.timestamp.format("YYYY-MM-DDTHH:mm:ssZZ")
        }
        return str
    }

    toJSONString(): string {
        return JSON.stringify({
            attack: this.atk,
            intelligence: this.int,
            agility: this.agi,
            cached: this.cached,
            timestamp: this.timestamp.unix()
        })
    }
}

exports.PowerLevel = PowerLevel
