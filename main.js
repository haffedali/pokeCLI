const inquirer = require('inquirer')
const {pokemon, moveList} = require("./db")//data
const {Pokemon, Field} = require("./classes")//classes
// const pokemon = db.pokemon;
// const moveList = db.moves;
// const Pokemon = classes.pokemon

var test;
var flag = false
// INQUIRE START HERE, ASK TO CHOOSE POKEMON

function validateFourMoves(moves){
    if (moves.length < 4){
        return "You need to add more moves!"
    } else if (moves.length > 4){
        return "You need to removes some moves!"
    }else{
        return true
    }
}

inquirer.prompt([{
    type: 'list',
    name: 'lead',
    message: 'Go ahead and choose a lead pokemon sweetie',
    choices: ['Charizard', 'Blastoise', 'Venusaur']
}]).then(ans => {
    // Store the name in the scope of the parent inquire, to be used in next scope
    var name = ans.lead
    //With this ans, generate a moveOptionsarray by looping through the selected pokemons 
    let moveOptions = pokemon[name].moveSet
    inquirer.prompt([{
        type: 'checkbox',
        name: 'moves',
        message: 'Pick four moves for your pokemon!',
        choices: moveOptions,
        validate: validateFourMoves
    }]).then(ans => {
        const yourMon = new Pokemon(name, ans.moves)
        //From here, we will choose a supporting team
        //After the supporting team inquiry, we will create a new Field() and start the game with it's loop() method
        
        let Field = new Field(yourMon, oppMon)
    })
})






// console.log(myFirstPokemon)
// myFirstPokemon.printStats()
// let cleffa = new Pokemon("Clefable", )
