const moveList = require("../db/moves");
const typeMatrix = require("../util/typeMatrix")
const typeDict = require("../util/typeDict")


<<<<<<< HEAD
=======

>>>>>>> 0e3e30fdf66c61fe1aba026df82af5e27bc7e964
function decide(mon1, mon2){
    let viability = 0;
    let selection = {}
    let finalChoice;
    let moves = mon2.moves

    for (let i=0;i<moves.length;i++){
        let viabilityScore = 0
        let moveType = moveList[moves[i]].type
        for (let j=0;j<mon1.type.length;j++){
            if (typeMatrix[typeDict[moveType]][typeDict[mon1.type[j]]] === 1){
                viabilityScore += 1
            }
            else if (typeMatrix[typeDict[moveType]][typeDict[mon1.type[j]]] === -1){
                viabilityScore -= 1
            }
            // if (viabilityScore >= viability){
            //     viability = viabilityScore
            //     selection.push(moves[i])
            // }
        }
        selection[moves[i]] = viabilityScore
        // console.log(moves[i] + " "+  viabilityScore + " while viability is " + viability)

    }

    function selectionCheck(options){
        let top = -5
        let result = "";
        for (let x in options){
            console.log(options[x])
            if (options[x] > top){
                top = options[x];
                result = x;
            }
        }
        return result
        // console.log(options)
        // if (options.length > 1) {
        //     let top = 0
        //     for (let i=0;i<options.length;i++){
        //         // console.log(moveList[options[i]].basePower);
        //         if (moveList[options[i]].basePower > top){
        //             top = moveList[options[i]].basePower
        //         }else{
    
        //             options = options.splice(i,1)
        //         }
        //     }
        // }
        // return options
    }

    
    
    finalChoice = selectionCheck(selection)
    // console.log(finalChoice)
    return finalChoice
}

module.exports = decide;