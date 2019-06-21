//here ill put status calculations
// FUTURE NOTE burn will have mutiple functions; apply() and tic()

const statusEffect = {
    "burn": function(monHp){
        let ticDamage = Math.floor(monHp/16)
        console.log("BURN for " + ticDamage + " damage")
        return ticDamage
    },
    "paralyze": function(mon){
        let chance = Math.floor(Math.random() * 3);
        let match = Math.floor(Math.random() * 3);
        if (match === chance) {
            return "procced"
        }else{
            return "passed"
        }
    },
    "sleep": function(mon){
        console.log("sleep")
        return "mon is asleep it can't move"
    },
    "poison": function(mon){
        console.log("poison")
        return "mon is poisoned"
    }
}



module.exports = statusEffect;