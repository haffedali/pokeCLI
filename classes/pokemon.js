const { moves, pokemon } = require("../db")

class Pokemon {
    constructor(name) {
        this.name = name
        this.type = pokemon[name].types
        this.stats = pokemon[name].baseStats
        this.moves = pokemon[name].moveSet
        this.status = null;
        // this.moveList = pokemon[name].moveList 
        // this.moves = moves;
        //JUST A BLOCK FOR THE HEALTH CALC, DONT WANT IT GETTING TOO MESSY
        //For now, assuming perfect IV, max level, and decent EV's
        this.health = Math.floor((((2*pokemon[name].baseStats.hp + 30 + 20) * 78)/100) + 110)
    }

    takeDamage(damage, status = null){//must be a number, generrated form
        this.status = status
        this.health -= damage
    }



}

module.exports = Pokemon