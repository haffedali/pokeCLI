const moveList = require("../db/moves")
const Pokemon = require("../classes/pokemon")
const typeMatrix = require("../util/typeMatrix")
const typeDict = require("../util/typeDict")

function calc(mon1, mon2, move1, move2){
    //initializing important variables
    let stabOpp,stabUser,arbitraryNum,moveTypeOpp,moveTypeUser,damageToOpp,damageToUser
    let typeModUser = 1
    let typeModOpp = 1

    moveTypeUser = moveList[move1].type
    moveTypeOpp = moveList[move2].type

    // Damage calc pre modifiers (ie. stab, type effectiveness)
    if (move1.category === "Special"){
        damageToOpp = (((100/5+2)*mon1.stats.spa*moveList[move1].basePower)/mon2.stats.spd)
    } else {
        damageToOpp = (((100/5+2)*mon1.stats.atk*moveList[move1].basePower)/mon2.stats.def)
    }
    if (move2.category === "Special"){
        damageToUser = (((100/5+2)*mon2.stats.spa*moveList[move2].basePower)/mon1.stats.spd)
    } else {
        damageToUser = (((100/5+2)*mon2.stats.atk*moveList[move2].basePower)/mon1.stats.def)
    }

    damageToUser = damageToUser/50
    damageToUser += 2
    damageToOpp = damageToOpp/50
    damageToOpp += 2

    //STAB goes here, either 1.5 or 1, for this test we will use 1.5
    if (moveTypeUser== mon1.type[0] || moveTypeUser== mon1.type[1]){
        stabUser = 1.5
    } else{
        stabUser = 1
    }

    if (moveTypeOpp== mon2.type[0] || moveTypeOpp== mon2.type[1]){
        stabOpp = 1.5
    } else{
        stabOpp = 1
    }

    damageToUser =  damageToUser * stabOpp
    damageToOpp = damageToOpp * stabUser;

    // Next is type modifier
    // Loop through opponent pokemons types, and add the corresponding modifier
    for (let i=0;i<mon2.type.length;i++){
        if (typeMatrix[typeDict[moveTypeUser]][typeDict[mon2.type[i]]] === 0){
            // 0 is neutral, therefore do nothing to the modifier
        }
        else if (typeMatrix[typeDict[moveTypeUser]][typeDict[mon2.type[i]]] === 1){
            typeModUser *= 2
            console.log("Fire is super effective")
        }
        else if (typeMatrix[typeDict[moveTypeUser]][typeDict[mon2.type[i]]] === -1){
            typeModUser *= .5
        }
    }

    for (let i=0;i<mon1.type.length;i++){
        if (typeMatrix[typeDict[moveTypeOpp]][typeDict[[mon1.type[i]]]] === 0){
            // 0 is neutral, therefore do nothing to the modifier
        }
        else if (typeMatrix[typeDict[moveTypeOpp]][typeDict[[mon1.type[i]]]] === 1){
            typeModOpp *= 2
        }
        else if (typeMatrix[typeDict[moveTypeOpp]][typeDict[[mon1.type[i]]]] === -1){
            typeModOpp *= .5
            console.log("Grass is weak")
        }
    }
    // Making use of the typeMod here
    damageToOpp = damageToOpp * typeModUser
    damageToUser = damageToUser * typeModOpp  


    // Lastly we create an arbitrary number for the final calc step Now we generate a random number between 217 and 255
    arbitraryNum1 = (Math.random() * (255 - 217)) + 217
    arbitraryNum2 = (Math.random() * (255 - 217)) + 217
    damageToOpp = (damageToOpp * arbitraryNum1) / 255
    damageToUser = (damageToUser*arbitraryNum2) / 255
    


    // console.log("Flamethrower " + damageToOpp + "---------------------Typemod " + typeModUser)
    // console.log("Gigadrain " + damageToUser + "---------------------Typemod " + typeModOpp)
    return [Math.floor(damageToOpp),Math.floor(damageToUser)]   
}







// TESTING CODE TESTING CODE TESTING CODE TESTING CODE TESTING CODE TESTING CODE TESTING CODE TESTING CODE TESTING CODE TESTING CODE


// let moves = ["Flamethrower", "Airslash", "Roost", "Solarbeam"]
// let charizard = new Pokemon("Charizard", moves)
// let venusaur = new Pokemon("Venusaur", moves)



// let test = calc(charizard,venusaur,"Flamethrower","Gigadrain")
// // console.log(test)

// console.log(test)




module.exports = calc