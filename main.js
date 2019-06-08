const inquirer = require('inquirer')
// const { pokemon, moveList } = require("./db")//data
const { Field, Team } = require("./classes")//classes

// INQUIRE START HERE, ASK TO CHOOSE POKEMON

inquirer.prompt([{
    type: 'list',
    name: 'lead',
    message: `
               
             /|=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+|
            ||+                                +
            +||    WELCOME TO CMD STADIUM!     |
            ||+                                +
            +||        CHOOSE A STARTER        |
            ||+                                +
            +||=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+|
            |/(/)/)/(/)/)/(/)/)/(/)/)/(/)/)/(/)/
    `,
    choices: ['Charizard', 'Blastoise', 'Venusaur']
}]).then(ans => {
    //grab the name
    let name = ans.leadn
    //genrate a team using the team class
    let yourTeam = new Team(name)
    //initiallize the oppteam
    let oppTeam;
    //Give the opp an Advantagous starter
    switch (name) {
        case "Charizard":
            oppTeam = new Team("Blastoise")
            break;
        case "Blastoise":
            oppTeam = new Team("Venusaur")
            break;
        case "Venusaur":
            oppTeam = new Team("Charizard")
            break;
    }
    //run build for both team objects
    oppTeam.build()
    // console.log("oppTeam",oppTeam.team) test
    yourTeam.build()
    // console.log("your team",yourTeam.team) test

    //create the field and  start the loop
    let field = new Field(yourTeam, oppTeam)
    field.fieldLoop()

})