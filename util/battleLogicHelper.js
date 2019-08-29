const controller = require('./controller');


/**
 * 
 * 
 */
const battleLogicHelper={
    // Exectutive
    speedCheck: (mon1,mon2)=>{
        if (mon1.stats.spe > mon2.stats.spe){
            return [mon1,mon2]
        }else if (mon2.stats.spe > mon1.stats.spe){
            return [mon2,mon1]
        }else{
            return [mon1,mon2]
        }
    },

    // Exectutive
    eachTurn: ([fasterMon,slowerMon])=>{

    },


    // Exectutive
    turnEnd: ()=>{

    },

    // Functional
    damageCalcSettle: ()=>{

    },

    /**
     * First function to be fired off. Takes game state and returns it mutated according to the turn logic.
     * Sort of brain of battleLogicHelper; uses other 'executive' functions to run the correct logic on the correct parts
     * of state at the correct times.
     * 
     * @see eachTurn()
     * @see turnEnd()
     * @see speedCheck()
     */
    runAttack:(state, move)=>{
        return state;
    }
}

module.exports = battleLogicHelper