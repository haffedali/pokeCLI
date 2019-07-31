const moveList = require("../db/moves")
const Pokemon = require("../classes/pokemon")
const typeMatrix = require("../util/typeMatrix")
const typeDict = require("../util/typeDict")

/**
 * Runs a damage calculation and handles other attack logic
 * 
 * @param {Object} mon1 Attacking Pokemon
 * @param {Object} mon2 Defending Pokemon
 * @param {string} move1 Attack choice
 * @returns {Array} [damage,status,moveCategory,moveEffect]
 */
async function calc(mon1, mon2, move1){
    move = moveList[move1]
    //initializing important variables
    let stabUser,moveTypeUser,damageToOpp,status,effect
    let typeModUser = 1

    moveTypeUser = move.type
    if (move.category === "Special" || move.category === "Physical"){

        let mon1Boost = boostHelper(mon1);
        let mon2Boost = boostHelper(mon2);

        // Damage calc pre modifiers (ie. stab, type effectiveness)
        // These four if statements cover getting a basic damage for a special for physical attack
        if (move.category === "Special"){
            damageToOpp = (((100/5+2)*(mon1.stats.spa + mon1Boost.spa)*move.basePower)/(mon2.stats.spd + mon2Boost.spd))
        } else {
            damageToOpp = (((100/5+2)*(mon1.stats.atk + mon1Boost.atk)*move.basePower)/(mon2.stats.def + mon2Boost.def))
        }


        // Here I am just followig their math

        damageToOpp = damageToOpp/50
        damageToOpp += 2

        // This is a STAB check, if it is stab,then the stab modifier goes to 1.5 instead of one
        if (moveTypeUser== mon1.type[0] || moveTypeUser== mon1.type[1]){
            stabUser = 1.5
        } else{
            stabUser = 1
        }



        // Here we apply the damage modifier
        damageToOpp = damageToOpp * stabUser;

        // Next is type modifier
        // Loop through opponent pokemons types, and add the corresponding modifier
        for (let j=0;j<mon2.type.length;j++){
            if (typeMatrix[typeDict[moveTypeUser]][typeDict[mon2.type[j]]] === 0){
                // 0 is neutral, therefore do nothing to the modifier
            }
            else if (typeMatrix[typeDict[moveTypeUser]][typeDict[mon2.type[j]]] === 1){
                typeModUser *= 2
            }
            else if (typeMatrix[typeDict[moveTypeUser]][typeDict[mon2.type[j]]] === -1){
                typeModUser *= .5
            }
        }

        // Making use of the typeMod here
        damageToOpp = damageToOpp * typeModUser 


        // Lastly we create an arbitrary number for the final calc step Now we generate a random number between 217 and 255
        arbitraryNum1 = (Math.random() * (255 - 217)) + 217

        damageToOpp = (damageToOpp * arbitraryNum1) / 255

        status = statusHelper(move)


        // Here I am checking to see if the move has either of these properties
        // Which will allow me to reduce or heal the active mon based on their own attack
        if (move.drain){
            effect = "drain";
        }
        else if (move.recoil){
            effect = "recoil";
        }



        // Here we check if the opposing pokemon is protected, if so, we can't do shiiit
        if (mon2.isProtected){
            return [null,null,null,"Protect"]
        }
        return [Math.floor(damageToOpp),status, move.category, effect]
    }
    // This else statement covers status and secStatus moves
    else{
        return [0, move.secEffect, move.category, false];
    }
 
    
    
    /**
     * Runs through secondary effects of selected moves and returns a string of the effect if triggered
     * 
     * @param {string} move
     * @returns {string} or returns null if secondary effect doesn't trigger   
     */
    function statusHelper(move){
        if (move.effect) {
            for (let x in move.effect){
                let chance = move.effect[x]
                if (Math.random() * 100 < chance){
                    return x
                }else{
                    return null
                }
            }
        }
    }


    /**
     * Helper function to temporarily boost stats for damage rolls
     * 
     * @param {object} mon
     * @returns {object} an object to apply boosts to a Pokemon's base stats 
     */
    function boostHelper(mon){
        let returnObj = {}
        for (let boost in mon.boosts){
            let chunk = Math.floor(mon.stats[boost] / 2)
            returnObj[boost] = mon.boosts[boost] * chunk
        }
        return returnObj;
    }

}







// TESTING CODE TESTING CODE TESTING CODE TESTING CODE TESTING CODE TESTING CODE TESTING CODE TESTING CODE TESTING CODE TESTING CODE


// let blastoise = new Pokemon("Blastoise")
// let venusaur = new Pokemon("Venusaur")



// let test = calc(blastoise,venusaur,"Surf")



// console.log(test)




module.exports = calc