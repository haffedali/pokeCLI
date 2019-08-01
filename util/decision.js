const moveList = require("../db/moves");
const typeMatrix = require("./typeMatrix")
const typeDict = require("./typeDict")



/**
 * Very dumb AI function that returns the "best" course of action for computer opponent 
 * 
 * @param {Object} mon1 user1Mon
 * @param {Object} mon2 user2Mon (Computer Opponent)
 * @returns {string} Name of move
 */
async function decide(mon1, mon2){
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


    /**
     * Iterates through decide()'s selection object and returns the key with the highest (num) value
     * 
     * @see decide 
     * @param {Object} options Used by decide() to keep track of viability on each move
     * @returns {string}
     */
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