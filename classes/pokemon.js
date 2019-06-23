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
        if (this.health <= 0){
            console.log(this.name + " has fainted!")
        }
    }

    
    // Apply and RemoveStatus() are closely tied together. I don't really like the way it is functioning, I feel like it could get bloated
    // BUT it is simple and fast... for now we leave this logic here
    // Once I have time, will abstract this logic to the statusEffect object
    // "burn" will have two functions; tic and apply
    applyStatus(status){
        // console.log(status)
        if (this.status === null && status !== undefined){
            this.status = status
            console.log(this.name + " was " + status + "ed!")
            switch (status){
                case "burn":
                    this.stats.atk = statusEffect[this.status].apply(this)
                    break;
                case "paralyze":
                    this.stats.spe = statusEffect[this.status].apply(this)
                    break;
                default:
                    break;
            }
        }
    }

    removeStatus(status){
        this.status = null;
        switch (status){
            case "burn":
                this.stats.atk = this.stats.atk*2
                break;
            case "paralyze":
                this.stats.spe = this.stats.spe*2
                break;
            default:
                break;
        }
    }

    // ticStatus() checks for damagins statuses and runs the damage (these types of statuses damage your pokemon at the end of the turn)
    ticStatus(){
        // console.log(this.status + " from Pokemon.ticStatus()")
        if (this.status === "burn" || this.status === "poison" || this.status === "poison2"){
            let ticDamage = statusEffect[this.status].active(this)
            this.health -= ticDamage;
        }
    }

    // checkStatus() checks for preventative statuses and runs a check for passing or failing (these types of statuses prevents your from using a move your turn)
    checkStatus(){  
        // This if statement is meant to check to see if the selected pokemon has a status that
        // would leave it unable to execute the move it's trainer instructed it do
        if (this.status === "paralyze" || this.status === "sleep" || this.status === "freeze"){
            
            // returns the result of a helper function (statusEffect()) -- true or false
            return statusEffect[this.status].active(this)

        }else{
            return true
        }
    }
}

module.exports = Pokemon