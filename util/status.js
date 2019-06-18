//here ill put status calculations
const statusEffect = {
    "burn": function(mon){
        let ticDamage = Math.floor(mon/16)
        console.log("BURN for " + ticDamage + " damage")
        return ticDamage
    },
    "paralyze": function(mon){
        console.log("PARA")
        return `mon is paralyzed, it can't move`
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