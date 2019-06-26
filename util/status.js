//here ill put status calculations
// FUTURE NOTE burn will have mutiple functions; apply() and tic()


const statusEffect = {
    "burn": 
    {
        active(mon){
            let ticDamage = Math.floor(mon.stats.hp/16)
            console.log(mon.name + "'s " + "burn scorched for " + ticDamage + " damage")
            return ticDamage
        },
        apply(mon){
            let attackLoss = Math.floor(mon.stats.atk/2)
            let attack = mon.stats.atk - attackLoss
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
            // let chance = 1;
            // let match = 1;
            if (match === chance) {
                console.log(mon.name + " is paralyzed and couldn't move!")
                return false
            }else{
                return true
            }
        },


        apply(mon){
            let speedLoss = Math.floor(mon.stats.spe/2);
            let speed = mon.stats.spe - speedLoss
            return speed
        }
    },

    // Sleep and freeze will have an active() and remove(); active calling remove on a 'fail'
    "sleep":
    {
        active(){
            let chance = Math.floor(Math.random() * 3);
            let match = Math.floor(Math.random() * 3);
            if (chance === match){
                return true
            }else{
                return false
            }
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