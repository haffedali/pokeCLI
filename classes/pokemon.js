const { moveList, pokemon } = require("../db")
// const moveList = db.moves
// const pokemon = db.pokemon
// string,string,obj,arr
class Pokemon {
    constructor(name, moves) {
        this.name = name
        this.type = pokemon[name].types
        this.stats = pokemon[name].baseStats
        // this.moveList = pokemon[name].moveList 
        this.moves = moves;
    }

    printMoves() {
        for (let i = 0; i < this.moves.length; i++) {
            console.log(this.moves[i])
        }
    }

    printStats() {
        console.log(this.stats)
    }
}

module.exports = Pokemon