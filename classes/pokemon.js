const { moves, pokemon } = require("../db")
const {statusEffect} = require("../util")

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

    takeDamage(damage){//must be a number, generrated form
        this.health -= damage
    }

    
    // Apply and RemoveStatus() are closely tied together. I don't really like the way it is functioning, I feel like it could get bloated
    // BUT it is simple and fast... for now we leave this logic here
    // Once I have time, will abstract this logic to the statusEffect object
    // "burn" will have two functions; tic and apply
    applyStatus(status){
        this.status = status
        switch (status){
            case "burn":
                this.stats.atk = Math.floor(this.stats.atk/2)
                break;
            case "paralyze":
                this.stats.spe = Math.floor(this.stats.spe/2)
                break;
            default:
                break;
        }
    }

    removeStatus(status){
        this.status = null;
        switch (status){
            case "burn":
                this.stats.atk = pokemon[this.name].baseStats[atk]
                break;
            case "paralyze":
                this.stats.spe = pokemon[this.name].baseStats[spe]
                break;
            default:
                break;
        }
    }

    // statusEffect is a helper function for ticStatus; it returns amount of damage the tic results in
    ticStatus(){
        if (this.status === "burn" || this.status === "poison" || this.status === "poison2"){
            let ticDamage = statusEffect[this.status["active"]](this)
            this.health -= ticDamage;
        }
    }

    checkStatus(){
        if (this.status === "paralyze" || this.status === "sleep" || this.status === "freeze"){
            let result = statusEffect[this.status]()
        }
    }
}

module.exports = Pokemon