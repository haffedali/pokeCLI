//here ill put status calculations
// FUTURE NOTE burn will have mutiple functions; apply() and tic()


const statusEffect = {
    "burn": 
    {
        active(mon){
            let ticDamage = Math.floor(mon.baseStats.hp/16)
            console.log("BURN scorched "+ mon.name + " for " + ticDamage + " damage")
            return ticDamage
        },
        apply(mon){
            let attackLoss = Math.floor(mon.baseStats.atk)
            let attack = mon.baseStats.atk - attackLoss
            return attack
        }
    },
    "paralyze":
    {
        // On actives like paralyze, return a string communication whether or not the pokemon
        // is moving this turn ("pass" || "fail")
        active(mon){
            let chance = Math.floor(Math.random() * 3);
            let match = Math.floor(Math.random() * 3);
            if (match === chance) {
                return "fail"
            }else{
                return "pass"
            }
        },


        apply(mon){
            let speedLoss = Math.floor(mon.baseStats.spe);
        }
    },

    // Sleep and freeze will have an active() and remove(); active calling remove on a 'fail'
    "sleep":
    {
        active(){

        },
        apply(){

        }
    },
    "freeze":
    {
        active(){

        },
        apply(){
            
        }
    },
    "poison":
    {
        active(mon){
            let ticDamage = Math.floor(mon.baseStats.hp/16)
            console.log("Poison eroded " + mon.name+ " for "+ ticDamage + " damage")
            return ticDamage
        },

        apply(){

        }
    }
}



module.exports = statusEffect;