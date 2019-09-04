const moveList = require("../db/moves");
const typeMatrix = require("./typeMatrix")
const typeDict = require("./typeDict")

module.exports = {
    /**
     * Function to be used when playing against AI opponents.
     * Returns string name/title of AI's move choice
     * 
     * 
     * @param {Object} mon1 User1's pokemon
     * @param {Object} mon2 AI's pokemon
     * @returns {String} Name/Title of the move AI decided on
     */
    decide: (mon1,mon2)=>{
        
    },

    /**
     * Runs a damage calculation where mon1 is attacking and mon2 is defending
     * Returns the damage of the move
     * 
     * @param {Object} mon1 Attacking Pokemon
     * @param {Object} mon2 Defending Pokemon
     * @param {String} move Name/Title of the move mon1 is using
     * @returns {Int} Resulting damage to be applied to mon2 
     */ 
    damageCalc: (mon1,mon2,move)=>{
        // For now we use JSON move lost, until we host moves on cloud
        move = moveList[move];
        let moveType = move.type;

        let stabUser,damageToOpp;
        let typeModUser = 1;

        // We use boosthelper to provide accurate calcs taking boosts into account
        // Reason we don't bother changing a pokemon's stats is we would need to revert
        // The stats on a switchout... aint no one got time for that
        let mon1Boost = boostHelper(mon1);
        let mon2Boost = boostHelper(mon2);

        // Damage calc pre modifiers (ie. stab, type effectiveness)
        if (move.category === "Special"){
            damageToOpp = (((100/5+2)*(mon1.stats.spa + mon1Boost.spa)*move.basePower)/(mon2.stats.spd + mon2Boost.spd))
        } else {
            damageToOpp = (((100/5+2)*(mon1.stats.atk + mon1Boost.atk)*move.basePower)/(mon2.stats.def + mon2Boost.def))
        }

        // Here I am just followig their math
        damageToOpp = damageToOpp/50
        damageToOpp += 2

        // This is a STAB check, if it is stab,then the stab modifier goes to 1.5 instead of one
        if (moveType== mon1.type[0] || moveType== mon1.type[1]){
            stabUser = 1.5
        } else{
            stabUser = 1
        }

        // Here we apply the damage modifier
        damageToOpp = damageToOpp * stabUser;


        // Next is type modifier
        // // Loop through opponent pokemons types, and add the corresponding modifier
        for (let j=0;j<mon2.type.length;j++){
            if (typeMatrix[typeDict[moveType]][typeDict[mon2.type[j]]] === 0){
                // 0 is neutral, therefore do nothing to the modifier
            }
            else if (typeMatrix[typeDict[moveType]][typeDict[mon2.type[j]]] === 1){
                typeModUser *= 2
            }
            else if (typeMatrix[typeDict[moveType]][typeDict[mon2.type[j]]] === -1){
                typeModUser *= .5
            }
        }


        // Making use of the typeMod here
        damageToOpp = damageToOpp * typeModUser 


        // Lastly we create an arbitrary number for the final calc step Now we generate a random number between 217 and 255
        arbitraryNum1 = (Math.random() * (255 - 217)) + 217

        damageToOpp = (damageToOpp * arbitraryNum1) / 255


        function boostHelper(mon){
            let returnObj = {}
            for (let boost in mon.boosts){
                let chunk = Math.floor(mon.stats[boost] / 2)
                returnObj[boost] = mon.boosts[boost] * chunk
            }
            return returnObj;
        }

        return damageToOpp;
    },

    /**
     * @param {}
     */
    statusCalc: (move)=>{

    },

    /**
     * 
     */
    effectCalc: (move)=>{

    },

    statusTic: ()=>{

    },
    effectTic: ()=>{

    },
    turnTic: ()=>{

    },
}