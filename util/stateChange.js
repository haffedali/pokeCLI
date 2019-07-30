const damageCalc = require("./newCalc")
const status = require('./status')
const decision = require('./decision')
const typeDict = require('./typeDict')
const typeMatrix = require('./typeMatrix')

async function stateChange(state){
    oppMove = await decision(state.myMon, state.oppMon)

    await damageCalc(state.myMon,state.oppMon,state.myMove)
        .then((result)=>{
            // Using true/false as a flag for each pokemon's attack
            settleCalc(result, true)
        })

    await damageCalc(state.oppMon,state.myMon,oppMove)
        .then((result)=>{
            settleCalc(result,false)
        })

    
    function settleCalc(calc, v){
        let dmg,status,type,last
        dmg = calc[0]
        status = calc[1]
        type = calc[2]
        last = calc[3]

        if (status && v){
            state.oppMon.applyStatus(status)
        }
        else if (status && !v){
            state.myMon.applyStatus(status)
        }

        if (dmg && v){
            state.oppMon.health -= dmg
        }
        else if (dmg && !v){
            state.myMon.health -= dmg
        }
    }

    return field
}


module.exports = stateChange