const moveList = require("../db/moves")
const Pokemon = require("../classes/pokemon")
const typeMatrix = require("../util/typeMatrix")
const typeDict = require("../util/typeDict")

function calc(mon1, mon2, move1, move2){
    //initializing important variables
    let stab,arbitraryNum,moveType
    let typeMod = 1
    moveType = moveList[move1].type

    // Damage calc pre modifiers (ie. stab, type effectiveness)
    let damage = (((100/5+2)*mon1.stats.spa*moveList[move1].basePower)/mon2.stats.spd)
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
    // Loop through opponent pokemons types, and add the corresponding modifier
    for (let i=0;i<mon2.type.length;i++){
        if (typeMatrix[typeDict[moveType],[mon2.type[i]]] === 0){
            // 0 is neutral, therefore do nothing to the modifier
        }
        else if (typeMatrix[typeDict[moveType],[mon2.type[i]]] === 1){
            typeMod *= 2
        }
        else if (typeMatrix[typeDict[moveType],[mon2.type[i]]] === -1){
            typeMod *= .5
        }
    }
    // Making use of the typeMod here
    damage = damage * typeMod

    // Lastly we create an arbitrary number for the final calc step Now we generate a random number between 217 and 255
    arbitraryNum = (Math.random() * (255 - 217)) + 217
    damage = (damage * arbitraryNum) / 255
    
    return Math.floor(damage)   
}

let moves = ["Flamethrower", "Airslash", "Roost", "Solarbeam"]
let charizard = new Pokemon("Charizard", moves)
let blastoise = new Pokemon("Blastoise", moves)



let test = calc(charizard,blastoise,"Flamethrower","Hyrdopump")
console.log(test)




module.exports = calc