const moveList = require("../db/moves");
const typeMatrix = require("../util/typeMatrix")
const typeDict = require("../util/typeDict")

function decide(mon1, mon2){
    let selection = []
    let moves = mon2.moves

    for (let i=0;i<moves.length;i++){
        let moveType = moveList[moves[i]]
        console.log(moveType)
        for (let j=0;j<mon1.type.length;j++){
            if (typeMatrix[typeDict[moveType]][typeDict[mon1.type[j]]] === 1){
                selection.push(moves[i])
            }
        }
    }
    console.log("-------------")
    console.log(selection)
    console.log("-------------")
}

module.exports = decide;