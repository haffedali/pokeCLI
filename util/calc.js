const { moveList, pokemon } = require("../db")
function calc(mon1, mon2, move1, move2){
    let stab,typeMod, arbitraryNum
    // Damage calc pre STAB, 
    let damage = (((100/5+2)*mon1.stats.atk*move1.basePower)/mon2.stats.def) + 2


    //STAB goes here, either 1.5 or 1, for this test we will use 1.5
    if (move1.type == mon1.types[0] || move1.type == mon1.types[1]){
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
    

}

let moves = ["Flamethrower", "Airslash", "Roost", "Solarbeam"]
let charizard = new Pokemon("Charizard", moves)
let blastoise = new Pokemon("Blastoise", moves)

console.log(charizard,blastoise)


module.exports = calc