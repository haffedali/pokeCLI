/**
 * Object containing keys for each primary status and object values that contain any game logic
 * needed to execute/apply/tic these statuses
 * 
 * NOTE: There is a second Object nested within statusEffect named secStatus; secStatus achieves the 
 * same functionality as the parent object, but it responsible for secondary statuses
 */
const statusEffect = {
    "burn": 
    {
        active(mon){
            let ticDamage = Math.floor(mon.stats.hp/16);
            console.log(mon.name + "'s " + "burn scorched for " + ticDamage + " damage")
            return ticDamage;
        },
        apply(mon){
            let attackLoss = Math.floor(mon.stats.atk/2);
            let attack = mon.stats.atk - attackLoss;
            return attack;
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
                console.log(mon.name + " is paralyzed and couldn't move!")
                return false;
            }else{
                return true;
            }
        },


        apply(mon){
            let speedLoss = Math.floor(mon.stats.spe/2);
            let speed = mon.stats.spe - speedLoss;
            return speed;
        }
    },

    // Sleep and freeze will have an active() and remove(); active calling remove on a 'fail'
    "sleep":
    {
        active(){
            
            let chance = Math.floor(Math.random() * 3);
            let match = Math.floor(Math.random() * 3);
            if (mon.statusCount > 3){
                return true;
            }
            else if (chance === match){
                return true;
            }else{
                return false;
            }
        },
        apply(){

        }
    },
    "freeze":
    {
        active(){
            let chance = Math.floor(Math.random() * 5);
            let match = Math.floor(Math.random() * 5);
            if (mon.statusCount > 5){
                return true;
            }
            else if (chance === match){
                return true;
            }else{
                return false;
            }
        },
        apply(){

        }
    },
    "poison":
    {
        active(mon){
            let ticDamage = Math.floor(mon.baseStats.hp/16);
            console.log("Poison eroded " + mon.name+ " for "+ ticDamage + " damage");
            return ticDamage;
        },

        apply(){

        }
    },
    "poison2":
    {
        active(mon){
            let ticDamage = (mon.statusCount + 1) * Math.floor(mon.baseStats.hp/16);
            console.log("Poison eroded " + mon.name+ " for "+ ticDamage + " damage");
            return ticDamage;
        }
    },

    secStatus: {
        "leechSeed": {
            tic(mon){
                let ticDamage = Math.floor(mon.baseStats.hp/16);
                console.log("Leechseed sapped " + mon.name+ " for "+ ticDamage + " damage");
                return ticDamage;
            },
            apply(mon){

            },
        },
        "confusion": {
            check(mon){
                let chance = Math.floor(Math.random() * 3);
                let match = Math.floor(Math.random() * 3);
                if (match === chance) {
                    console.log(mon.name + " hurt itself in its confusion!")
                    return false;
                }else{
                    return true;
                }
            },
            apply(mon){

            }
        },
        "charm": {
            check(mon){

            },
            apply(mon){

            }
        },
    },
    
    
}



module.exports = statusEffect;