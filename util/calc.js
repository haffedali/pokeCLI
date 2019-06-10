const moveList = require("../db/moves")
const Pokemon = require("../classes/pokemon")
function calc(mon1, mon2, move1, move2){
    let stab,typeMod,arbitraryNumm,moveType
    moveType = moveList[move1].type
    // Damage calc pre STAB, 
    let damage = (((1/5+2)*mon1.stats.atk*moveList[move1].basePower)/mon2.stats.def)
    damage = damage/50
    damage += 2


    //STAB goes here, either 1.5 or 1, for this test we will use 1.5
    if (moveType== mon1.type[0] || moveType== mon1.type[1]){
        stab = 1.5
    } else{
        stab = 1
    }

    
    damage = damage * stab;

    // Next is type modifier
    damage = damage * 2

    // Now we generate a random number between 217 and 255
    arbitraryNum = (Math.random() * (255 - 217)) + 217
    
    damage = (damage * arbitraryNum) / 255
    
    return Math.floor(damage)   
}

let moves = ["Flamethrower", "Airslash", "Roost", "Solarbeam"]
let charizard = new Pokemon("Charizard", moves)
let blastoise = new Pokemon("Blastoise", moves)

console.log(charizard)
console.log(blastoise)

let test = calc(charizard,blastoise,"Flamethrower","Hyrdopump")
console.log(test)




module.exports = calc