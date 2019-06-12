const { moves, pokemon } = require("../db")
// const moveList = db.moves
// const pokemon = db.pokemon
// string,string,obj,arr
class Pokemon {
    constructor(name) {
        this.name = name
        this.type = pokemon[name].types
        this.stats = pokemon[name].baseStats
        this.moves = pokemon[name].moveSet
        this.status = "normal";
        // this.moveList = pokemon[name].moveList 
        this.moves = moves;
        //JUST A BLOCK FOR THE HEALTH CALC, DONT WANT IT GETTING TOO MESSY
        //For now, assuming perfect IV, max level, and decent EV's
        this.health = (((2*pokemon[name].baseStats.hp + 30 + 20) * 78)/100) + 110
    }


    printMoves() {
        for (let i = 0; i < this.moves.length; i++) {
            console.log(this.moves[i])
        }
    }

    printStats() {
        console.log(this.stats)
    }

    takeDamage(damage){//must be a number, generrated form
        this.stats.hp -= damage
    }
    useAttack(attackName, target){//must be a string References
        //will insert thick calculations later, this is just Proof of Concept 
        let dmg = moves[attackName].basePower * 0.15 //<shitty calc that makes no sense, haffed help
        target.takeDamage(Math.floor(dmg)) 
    }

}

module.exports = Pokemon