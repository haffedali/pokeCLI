//here ill put status calculations
// FUTURE NOTE burn will have mutiple functions; apply() and tic()


const statusEffect = {
    "burn": 
    {
        active(mon){
            let ticDamage = Math.floor(mon.health/16)
            console.log("BURN for " + ticDamage + " damage")
            return ticDamage
        },
        apply(mon){
            let attackLoss = Math.floor(mon.baseStats.atk)
            mon.baseStats.atk -= attackLoss
            mon.status = "burn"
            return mon
        }
    },
    "paralyze":
    {
        "active": function(mon){
            let chance = Math.floor(Math.random() * 3);
            let match = Math.floor(Math.random() * 3);
            if (match === chance) {
                return "fail"
            }else{
                return "pass"
            }
        },

        "apply": function(mon){
            let speedLoss = Math.floor(mon.baseStats.spe);
        }
    },
    "sleep":
    {
        "active": function(){

        },
        "apply": function(){

        }
    },
    "freeze":
    {
        "active": function(){

        },
        "apply": function(){

        }
    }
}



module.exports = statusEffect;