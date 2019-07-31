const moveList = require("../db/moves");
const typeMatrix = require("./typeMatrix")
const typeDict = require("./typeDict")



// mon1 = usermon | mon2 = oppmon
async function decide(mon1, mon2){
    let viability = 0;
    let selection = {}
    let finalChoice;
    let moves = mon2.moves

    for (let i=0;i<moves.length;i++){
        let viabilityScore = 0
        console.log(moves[i])
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

module.exports = decide;