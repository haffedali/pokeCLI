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
    let result;



    processMoves(moves, viabilityCheck).then((err)=>{
        console.log(result)
    });


    // moves.forEach((move)=>{
    //     let viabilityScore = 0
    //     $.ajax({
    //         url: "/moves/" + move
    //     })
    //     .then((response)=>{
    //         movesArr.push(response)
    //         moveType = response.type
    //         for (let j=0;j<mon1.type.length;j++){
    //             // console.log(typeMatrix[typeDict[moveType]][typeDict[mon1.type[j]]])
    //             if (typeMatrix[typeDict[moveType]][typeDict[mon1.type[j]]] === 1){
    //                 viabilityScore += 1
    //             }
    //             else if (typeMatrix[typeDict[moveType]][typeDict[mon1.type[j]]] === -1){
    //                 viabilityScore -= 1
    //             }
    //         }
    //         selection[move] = viabilityScore

    //         if (movesArr.length === 4){
    //             selectComplete = true;
    //         }
    //     })
    // })

    // .then(()=>{
        // console.log(selection)
        // if (movesArr.length === 4 && selectComplete === true){
        //     console.log(selection)
        //     finalChoice = selectionCheck(selection)
        // }
    
        // if (finalChoice !== null && finalChoice !== undefined){
        //     return finalChoice
        // }
    // })

        // console.log(moves[i] + " "+  viabilityScore + " while viability is " + viability)

    async function selectionCheck(options){
        let top = -100
        for (let x in options){
            console.log(options[x])
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
    }

    async function processMoves(array, func){
        await array.forEach(async (move)=>{
            func(move)
            movesArr.push(move)
        })

        selectionCheck(selection)
    }


    async function viabilityCheck(move){
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

            console.log(move,viabilityScore)
            selection[move] = viabilityScore

            if (movesArr.length === 4){
                selectComplete = true;
            }
        })
    }
    
}



