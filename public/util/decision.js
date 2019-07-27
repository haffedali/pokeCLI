import typeMatrix from "./typeMatrix.js"
import typeDict from "./typeDict.js"


export default async function decide(mon1, mon2){
    let selectComplete = false
    let viability = 0;
    let selection = {}
    let finalChoice;
    let moves = mon2.moves
    let moveType;
    let movesArr = []

    moves.forEach((move)=>{
        let viabilityScore = 0
        $.ajax({
            url: "/moves/" + move
        })
        .then((response)=>{
            movesArr.push(response)
            moveType = response.type
            for (let j=0;j<mon1.type.length;j++){
                // console.log(typeMatrix[typeDict[moveType]][typeDict[mon1.type[j]]])
                if (typeMatrix[typeDict[moveType]][typeDict[mon1.type[j]]] === 1){
                    viabilityScore += 1
                }
                else if (typeMatrix[typeDict[moveType]][typeDict[mon1.type[j]]] === -1){
                    viabilityScore -= 1
                }
            }
            selection[move] = viabilityScore

            if (movesArr.length === 4){
                selectComplete = true;
            }
            console.log(movesArr)
        })
    })

        // console.log(moves[i] + " "+  viabilityScore + " while viability is " + viability)

    async function selectionCheck(options){
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

    console.log(movesArr)
    if (movesArr.length === 4 && selectComplete === true){
        console.log(selection)
        finalChoice = selectionCheck(selection)
    }

    if (finalChoice !== null && finalChoice !== undefined){
        return finalChoice
    }
 
    
}



