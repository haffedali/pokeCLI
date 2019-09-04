const controller = require('./controller');
const battleFunction = require('./battleFunctions');

/**
 * 
 * 
 */
const battleLogicHelper = {
    // Exectutive
    speedCheck: async (state)=>{
        let payLoad = [];
        if (state.user1Mon.stats.spe > state.user2Mon.stats.spe){
            payLoad = [state.user1Mon,state.user2Mon]
            //this.eachTurn()
        }else if (state.user2Mon.stats.spe > state.user1Mon.stats.spe){
            payLoad = [state.user2Mon,state.user1Mon]
        }else{
            payLoad = ['tie','tie']
        }
        return payLoad;
    },

    // Exectutive
    eachTurn: async (speedArr,move)=>{
        // let test = await battleFunction.DamageCalc(speedArr[1],speedArr[0],'Icebeam')
        // Using round as a flag to help pass the correct parameters to damageCalc
        let round = 'first';
        for (let i=0;i<speedArr.length;i++){
            let dmg;
            if (round === 'first'){
                dmg = await battleFunction.damageCalc(speedArr[i],speedArr[i+1],'Gigadrain')
                round = 'second'
                console.log(dmg)
            }else{
                dmg = await battleFunction.damageCalc(speedArr[i],speedArr[i-1],move)
                console.log(dmg)
            }
            
        }
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
        battleLogicHelper.eachTurn(turns,move)

    }
}

module.exports = battleLogicHelper