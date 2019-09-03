const controller = require('./controller');
const battleFunction = require('./battleFunctions');

/**
 * 
 * 
 */
const battleLogicHelper = {
    // Exectutive
    speedCheck: async (state)=>{
        let load = [];
        if (state.user1Mon.stats.spe > state.user2Mon.stats.spe){
            load = [state.user1Mon,state.user2Mon]
            //this.eachTurn()
        }else if (state.user2Mon.stats.spe > state.user1Mon.stats.spe){
            load = [state.user2Mon,state.user1Mon]
        }else{
            load = ['tie','tie']
        }
        return load;
    },

    // Exectutive
    eachTurn: async (speedArr)=>{
        // Runs turns for user mon and computer mon
        let test = await battleFunction.DamageCalc(speedArr[1],speedArr[0],'Icebeam')
        console.log(test)
        // console.log(damageCalc(slowerMon,fasterMon,'Icebeam'))
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
    runAttack: async (state, move)=>{
        // return state;
        // console.log(state,move);
        let turns = await battleLogicHelper.speedCheck(state.state)
        battleLogicHelper.eachTurn(turns)

    }
}

module.exports = battleLogicHelper