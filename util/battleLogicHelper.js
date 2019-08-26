const controller = require('./controller');


/**
 * 
 * @method speedCheck 
 */
const battleLogicHelper={
    speedCheck: (mon1,mon2)=>{
        if (mon1.stats.spe > mon2.stats.spe){
            return [mon1,mon2]
        }else if (mon2.stats.spe > mon1.stats.spe){
            return [mon2,mon1]
        }else{
            return [mon1,mon2]
        }
    },

    damageCalcSettle: ()=>{

    },

    eachTurn: ([fasterMon,slowerMon])=>{

    },

    turnEnd: ()=>{

    },

    /**
     * 
     */
    runAttack:(state, move)=>{

    }
}

module.exports = battleLogicHelper