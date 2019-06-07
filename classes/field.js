const inquirer = require("inquirer")
//this will be the class that holds all game actions
module.exports = class Field {
    constructor(user, opponent) {
        this.user = user;
        this.opponent = opponent;
        this.isActive = true;
        this.activeMon = this.user.team[0]//grab the front mon
        this.activeOpp = this.opponent.team[0]//grab opp starter
    }
    //here we'll ad the methods of game logic. 
    /*methods:

        1) Field loop
        2) Action prompt
            -will iquire:
                forfeit(x), switchMon(), attack() 
        3) Forfeit
        4) Main Attack Action  < discuss these  
        4.1) User Attack Calc ( actMon, actOpp )
        4.2) Opp Attack Calc  ( actMon, actOpp )
        5) switch

    */
    fieldDisplay() {
        console.log(
            `    _____________________________________________

                                    | ${this.activeOpp.name}
                                    | HP: ${this.activeOpp.stats.hp}
                    
    | ${this.activeMon.name}
    | HP:${this.activeMon.stats.hp}     
    _____________________________________________
`
        )
    }

    attackAction() {
        /*loop throiugh the moves to generate choices,
          once the player chooses the move it will store it, and then select the opponetnts move,
          then it resolve the coices
        */
        inquirer.prompt([
            {
                name: "attack",
                message: "CHOOSE ATTACK",
                type: "rawlist",
                choices: this.activeMon.moves.map(mv => mv)
            }
        ]).then(({ attack }) => {
            console.log(attack)
            //this is where it gets a little murky, we'll have to use a calculation that returnns an attack order? for now its hardcoded for testing
            this.activeMon.useAttack(attack, this.activeOpp)
            //check death
            if (this.activeOpp.stats.hp <= 0) {

                console.log(`${this.activeOpp.name} Has Fainted`)
                // this.opponent.switchMon()//hasnt been coded yet
                
                this.activeOpp = this.opponent.team[1]
                
                console.log(`your Opponent sends out ${this.opponent.activeOpp.name}`)//this will go in switch mon

                return this.fieldLoop()//remove this when switch mon is finished
            }
            
            this.activeOpp.useAttack("megapunch", this.activeMon)
            //check death
            
            if (this.activeMon.stats.hp <= 0) {
                console.log(`${this.activeMon.name} Has Fainted!`)
                return this.switchMon()
            }
            this.fieldLoop()

        })
    }


    switchMon() {
        //loop through team to check mons to sitch, if the user selects the same mon, thow an error and rerun this function
    }

    fieldLoop() {
        //display Current mons
        this.fieldDisplay()
        inquirer.prompt([
            {
                name: "action",
                type: "rawlist",
                message: "| SELECT AN ACTION |",
                choices: ["ATTACK", "SWITCH", "FORFEIT"]
            }
        ]).then(({ action }) => {
            switch (action.toLowerCase()) {
                case "attack":
                    this.attackAction();
                    break;
                case "switch":
                    this.switchMon();
                    break;
                case "forfeit":
                default:
                    console.log(`
                |~~~~~~~~~~~~~~~~~~~~~~~|
            ~~~~| THANK YOU FOR PLAYING |~~~~
                |~~~~~~~~~~~~~~~~~~~~~~~|
                    `)
                    process.exit()
                    break;
            }
        })
    }

}