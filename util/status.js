//here ill put status calculations
const statusEffect = {
    "burn": function(mon){
        console.log("BURN")
        return "burn damage"
    },
    "paralyze": function(mon){
        console.log("PARA")
        return `mon is paralyzed, it can't move`
    },
    "sleep": function(mon){
        console.log("sleep")
        return "mon is asleep it can't move"
    }
}



module.exports = statusEffect;