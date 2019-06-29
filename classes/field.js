const inquirer = require("inquirer")
const { fakeAi, damageCalc} = require("../util")
const {moveList} = require("../db");
//this will be the class that holds all game actions
module.exports = class Field {
    constructor(user, opponent) {
        this.user = user;//you
        this.opponent = opponent;//them
        this.isActive = true;//battle state
        this.activeMon = this.user.team[0]//grab the front mon
        this.activeIn = this.user.team.indexOf(this.activeMon)// used to store the index of current mon to reinsert it later.
        this.activeOpp = this.opponent.team[0];//grab opp starter
        this.isrunningTurn = false; //used to control flow
    }
    //here we'll ad the methods of game logic. 
    /*methods:

        1) Field loop [X]
        2) Action prompt[X]
            -will iquire:
                forfeit(x), switchMon(X), attack(X) 
        3) Forfeit [X]
        4) Main Attack Action  < discuss these  
        4.1) User Attack Calc ( actMon, actOpp )
        4.2) Opp Attack Calc  ( actMon, actOpp )
        5) switchMon[x]
        6) status
    */

    //got to high to code anything too complex so i made it look pretty-ish
    fieldDisplay() {
        //styling stuff
        //way to generte empty space after dynamic variables     
        let blankSpaceGen = (str = "", offset = 0) => `${str}${` `.repeat(offset - str.length)}`

        let display = [
            blankSpaceGen(this.activeOpp.name, 11),
            blankSpaceGen(this.activeMon.name, 11),
            blankSpaceGen(this.user.team[0].name, 12),
            blankSpaceGen(this.user.team[1].name, 12),
            blankSpaceGen(this.user.team[2].name, 12),
            blankSpaceGen(JSON.stringify(this.activeOpp.health), 8),
            blankSpaceGen(JSON.stringify(this.activeMon.health), 8),
            blankSpaceGen("", 32)
        ]


        console.log(
                     `  
             ____________________________________________________________
            | Roster      |                                | ${display[0]}|
            | _________   |                                | HP:${display[5]}|
            | ${display[2]}|                                |____________|
            | ${display[3]}|                                             |
            | ${display[4]}|____________                                 |
            |             | ${display[1]}|${display[7]}|
            |             | HP:${display[6]}|${display[7]}|
            |_____________|____________|________________________________|
                     `
                 )
    }


    //Applies damage and status
    turnAction(actingMon, targetMon, attack){
        // This entire function will be split into 2 pieces of functionality; conditionally fired off using an if statement
        // abtstract this logic to 2 seperate turn actions, one more attacking moves, and one for status moves (maybe another for boosts and terrains)
        // result is equal to the result of damageCalc() coupled checkStatus()

            let result = () => {
                let success = actingMon.checkStatus()
                let attackResult = damageCalc(actingMon, targetMon, attack)
                let damage = attackResult[0]
                let status = attackResult[1]
                let category = attackResult[2]
                let effect = attackResult[3]
    
                return [damage,status,success,category,effect]
            }
    
            result = result()
            

            // console.log(actingMon.name + "        " + result);
            if (result[2] === true && actingMon.health > 0 && result[3] !== "Status" && result[3] !== "SecStatus"){
                if (result[0] > 0){
                    console.log(targetMon.name + " has taken " + result[0] + " damage from " + attack + "!")
                    targetMon.takeDamage(result[0])
                    if (result[4] === "drain"){
                        // if result4 is true, it means the move is a draining move, in which a pokemon restores health equal
                        // to half the damage it dealt
                        let heal = Math.floor(result[0]/2)
                        actingMon.heal(heal)
                    }
                    else if (result[4] === "recoil"){
                        let recoil = Math.floor(result[0]/2)
                        actingMon.recoil(recoil)
                    }
                }
                

                // Feel like this will bread a bug in the future
                // Because of the way i am storing this values in an array and just checking for nulls
                if(targetMon.status === null && result[1] !== undefined && result[1] !== null){
                    // console.log(result[1] + "   -- fired from turnaction")
                    targetMon.applyStatus(result[1])
                }
            }

            // JUST FOR NOW, the damageCalc function will return different values if used for a move like leechseed/confuse ray
            // refractoring this is going to be a bitch...
            else if (result[3] === "SecStatus"){
                targetMon.applySecStatus(result[1])
            }
            else if (result[3] === "Status"){
                targetMon.applyStatus(result[1])
            }
            else if (result[2] === false && actingMon.health > 0)
            {
                console.log(actingMon.name + " is " + actingMon.status + ", it no move!");
            }


            // console.log("New category works")
            // if (targetMon.secStatus[attack]){
            //     console.log("target isn't seeded... yet")
            // }
        

    }

    // Turn end checks for poison, burn, and leech seed tics by running a Pokemon method
    // Will need to further abstract this logic, STATUS and secSTATUS ARE VERY DIFFERENT
    turnEnd(){
        // pokemon.applyStatus()
        this.activeMon.ticStatus();
        let healActive = this.activeOpp.secTicStatus();
        this.activeOpp.ticStatus();
        let healOpp = this.activeMon.secTicStatus();

        if (healActive > 0){
            this.activeMon.heal(healACtive)
        }
        if (healOpp > 0){
            this.activeOpp.heal(healOpp)
        }
        
    }


    // Grabs the user attack and generate opponent's attack
    // For now, sequences two moves!
    attackAction() {
        /*
          loop throiugh the moves to generate choices,
          once the player chooses the move it will store it, and then select the opponetnts move,
          then it 
           the coices
        */
        inquirer.prompt([
            {
                name: "attack",
                message: "CHOOSE ATTACK",
                type: "list",
                choices: this.activeMon.moves
            }
        ]).then(({ attack }) => {
            let oppAttack = fakeAi(this.activeMon, this.activeOpp);
            let sequence = this.speedCheck()




            // Conditional logic combining the result of the speedcheck()
            // Utilizes sequence built from speedCheck as well as moveList.db for priority checking
            if (moveList[oppAttack].priority === moveList[attack].priority){
                for (let i=0;i<sequence.length;i++){
                    if (sequence[i] === "activeMon"){
                        this.turnAction(this.activeMon,this.activeOpp,attack)
                    }else{
                        this.turnAction(this.activeOpp, this.activeMon, oppAttack)
                    }
                }
            }else {
                if (moveList[oppAttack].priority > moveList[attack].priority){
                    this.turnAction(this.activeOpp, this.activeMon, oppAttack)
                }else{
                    this.turnAction(this.activeMon,this.activeOpp,attack)
                }
            }


            // Hacky way to give time for turnActions before ending the turn and starting a new one
            setTimeout(() => this.turnEnd(), 2000)
            setTimeout(() => this.fieldLoop(),3000)

        })
    }

    // User's switch method
    switchMon() {
        this.activeMon.statusCount = 0;
        this.activeMon.secStatusCount = 0;
        this.activeMon.removeSecStatus();
        let team = [];
        for (let i=0;i<this.user.team.length;i++){
            if (this.user.team[i] !== this.activeMon && this.user.team[i].health > 0){
                team.push(this.user.team[i])
            }
        }
        
        //loop through team to check mons to sitch, if the user selects the same mon, thow an error and rerun this function
        inquirer.prompt([
            {
                name: "select",
                type: "rawlist",
                message: "SELECT A MON",
                choices: [...team, "RETURN"]
                // choices: [...this.user.team.map(mon => mon.name), "RETURN"]
            }
        ]).then(({ select }) => {
            if (select === this.activeMon.name) {
                console.log("This pokemon is already out!")
                this.switchMon()
            }
            if (select === "RETURN") {
                this.fieldLoop()
            }
            else {
                let choice = 0
                for (let i=0;i<this.user.team.length;i++){
                    if (this.user.team[i].name === select){
                        choice = i
                    }
                }
                
                this.activeMon = this.user.team[choice];

                //Conditional before fieldLoop to check if we need to execute and attack/damage
                this.fieldLoop()
            }
        })
    }

    // Opp switch method (fires when their mon's faint)
    oppSwitch(){
        // Logic to clean up counters and other active info
        this.activeOpp.secStatusCount = 0;
        this.activeOpp.statusCount = 0;
        this.activeOpp.removeSecStatus();
        let team = [];
        for (let i=0;i<this.opponent.team.length;i++){
            if (this.opponent.team[i].health > 0 && this.opponent.team[i] !== this.activeOpp){
                team.push(this.opponent.team[i])
            }
        }
        if (team[0]){
            this.activeOpp = team[0];
        }else{
            console.log("loser")
        }

        //Conditional before fieldLoop to check if we need to execute and attack/damage
        this.fieldLoop()
        
    }

    // Returns sequenced turn order (firstMon, secondMon)
    speedCheck(){
        if (this.activeMon.stats.spe > this.activeOpp.stats.spe){
            return ["activeMon","activeOpp"]
        }else if (this.activeMon.stats.spe === this.activeOpp.stats.spe){
            return "tie"
        }else {
            return ["activeOpp","activeMon"]
        }
    }

    // The main game loop
    fieldLoop() {
        //display Current mons

        // Check for wining/losing -- hard coded in so i can show a friend the game
        if (this.opponent.team[0].health < 0 && this.opponent.team[1].health < 0 && this.opponent.team[2].health < 0){
            this.gameOver()
        }else{

        
        this.fieldDisplay()
        if (this.activeMon.health > 0 && this.activeOpp.health > 0){
            inquirer.prompt([
                {
                    name: "action",
                    type: "rawlist",
                    message: "|0>- SELECT AN ACTION -<0|",
                    choices: ["ATTACK", "SWITCH", "FORFEIT","TEST"]
                }
            ]).then(({ action }) => {
                switch (action.toLowerCase()) {
                    
                    case "attack":
                        this.isrunningTurn = true;
                        this.attackAction();
                        break;
    
                    case "switch":
                        this.switchMon();
                        break;
                    
                    case "test":
                        this.activeMon.test();
                        this.activeOpp.test();
    
                    case "forfeit":
                    default: 
                        console.log(`
                       _______________________   +
                     /[                       ]  |~+ + ~+ ~
                    ||[                       ]  |~ (^_^) +~
                    |+[ THANK YOU FOR PLAYING!]  |~+ + ~+ ~
                    ||[                       ]  |
                    |+[_______________________]  |
                    |/(/)(/(/)(/(/)/(/)(/(/)(/  [=]     
                                    `)
                        process.exit()
                        break;
                }
            })
        }else if (this.activeMon.health <= 0){
            this.switchMon()
        }else if (this.activeOpp.health <= 0){
            this.oppSwitch()
        }
    }
    }

    gameOver(){
        console.log("GAME OVER TURN THIS SHIT OFF")
    }
}