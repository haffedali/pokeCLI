const { moves, pokemon } = require("../db")
const {statusEffect} = require("../util")

class Pokemon {
    constructor(name) {
        this.name = name;
        this.type = pokemon[name].types;
        this.baseStats = pokemon[name].baseStats;
        this.stats = pokemon[name].baseStats;
        this.moves = pokemon[name].moveSet;
        this.status = null;
        this.secStatus = {};
        this.statusCount = 0;
        this.secStatusCount = 0;
        this.isProtected = null;
        //atk,spa,def,spd,spe,eva
        this.boosts = {atk: 0, spa: 0, def: 0, spd: 0, spe: 0, eva: 0},
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
        if (this.status === null){
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

    boost(boostData){
        for (let boost in boostData){
            this.boosts[boost] = this.boosts[boost] + boostData[boost];
        }
    }

    // Apply and RemoveStatus() are closely tied together. I don't really like the way it is functioning, I feel like it could get bloated
    // BUT it is simple and fast... for now we leave this logic here
    // Just a reminder copied over, but this will mirror those functions, but work for a property named secStatus
    applySecStatus(status){
        // I think the structure for this second status board is much better, will note the differences
        if (!this.secStatus[status]){
            // passing down the function may make for cleaner/shorter code
            this.secStatus[status] = true;
        }
    }

    removeSecStatus(status){
        if (!status){
            for (let x in this.secStatus){
                this.secStatus[x] = null
            }
        }
        else if(this.secStatus[status]){
            this.secStatus[status] = null;
        }
    }

    // ticStatus() checks for damagins statuses and runs the damage (these types of statuses damage your pokemon at the end of the turn)
    ticStatus(){
        // console.log(this.status + " from Pokemon.ticStatus()")
        if (this.status === "burn" || this.status === "poison" || this.status === "poison2"){
            let ticDamage = statusEffect[this.status].active(this)
            this.health -= ticDamage;
            this.statusCount ++;
        }
    }

    secTicStatus(){
        let regen = 0;
        for (let secStatus in this.secStatus){
            //HARD CODING GOING ON HERE LOOK AWAY
            if (this.secStatus[secStatus] === "leechSeed"){
                let ticDamage = statusEffect.secStatus[secStatus].tic(this);
                regen = ticDamage;
                this.health -= ticDamage;
                return regen
            }
        }
    }

    heal(amt){
        // as long as no effects make healing weaker...
        console.log(this.name + " has healed for " + amt)
        this.health += amt;
    }

    recoil(amt){
        console.log(this.name + " took " + amt + " recoil damage!")
        this.health -= amt
    }

    protect(){
        this.isProtected = true;
    }

    endProtect(){
        this.isProtected = null;
    }

    // checkStatus() checks for preventative statuses and runs a check for passing or failing (these types of statuses prevents your from using a move your turn)
    checkStatus(){
        let chance = true  
        // This if statement is meant to check to see if the selected pokemon has a status that
        // would leave it unable to execute the move it's trainer instructed it do
        if (this.status === "paralyze" || this.status === "sleep" || this.status === "freeze"){
            this.statusCount ++;

            // returns the result of a helper function (statusEffect()) -- true or false
            chance = statusEffect[this.status].active(this);
        }


        // Then use loop through     to see if they stop the pokemon
        // Checking if chance first because if the pokemon already can't move, it wont move
        // AND otherwise I would overwrite the fail with a success
        for (let x in this.secStatus){
            if (chance && !this.secStatus[x]){
                if (x === "confusion" || x === "charm"){
                    chance = statusEffect.secStatus[x].check(this);
                }
            }
        }

        return chance
    }

    // Function can change depending on tests I want to run... overloading would be useful here
    test(){
        console.log(this);
    }
}

module.exports = Pokemon