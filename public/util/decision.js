const moveList = require("../db/moves");
const typeMatrix = require("../util/typeMatrix")
const typeDict = require("../util/typeDict")


export default function decide(mon1, mon2){
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
        }
        selection[moves[i]] = viabilityScore
        // console.log(moves[i] + " "+  viabilityScore + " while viability is " + viability)

    }

    function selectionCheck(options){
        let top = -100
        let result = "";
        for (let x in options){
            if (options[x] > top){
                top = options[x];
                result = x;
            }else if (options[x] === top){
                let chance = Math.floor(Math.random() * 2)
                if (chance === 1){
                    result = x;
                }
            }
        }

        return result

    }

    
    
    finalChoice = selectionCheck(selection)

    return finalChoice
}