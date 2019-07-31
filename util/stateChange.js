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

    
    // @params {boolean} f just a flag for each pokemon's attack
    function settleCalc(calc, f){
        let dmg,status,type,last
        dmg = calc[0]
        status = calc[1]
        type = calc[2]
        last = calc[3]

        // This code is not working because a ref to the class doesn't have access to the class's methods
        if (status && f){
            state.oppMon.applyStatus(status)
        }
        else if (status && !f){
            state.myMon.applyStatus(status)
        }

        if (dmg && f){
            state.oppMon.health -= dmg
        }
        else if (dmg && !f){
            state.myMon.health -= dmg
        }
    }

    return field
}


module.exports = stateChange