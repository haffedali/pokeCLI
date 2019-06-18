const inquirer = require("inquirer")
const { fakeAi, damageCalc} = require("../util")
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


    turnAction(target, damage, status){
        //Status check here, if status apply like so
        // status(this.status, damage) //return damage       0 if sleep, .5 if burn
        target.takeDamage(damage)//plug in haffed code here
        target.applyStatus(status)
        console.log(`${target.name} took ${damage} points of damage!`)
    }

    // Turn end checks for poison, burn, and leech seed tics by running a Pokemon method
    turnEnd(){
        // pokemon.applyStatus()
        this.activeMon.ticStatus();
        this.activeOpp.ticStatus();
    }

    actionCheck(actor, target, damage){
        // if(!this.isrunningTurn) throw 'uh oh! this shouldnt be possible!';
        //need to check status, if par, add miss chance, if burn, divide in half if froze/sleep skip turn
        
        if(actor.health <= 0 ) {
            this.isrunningTurn = false
            console.log(`${actor.name} is unable to battle!`)
            if(actor === this.activeMon) return this.switchMon();
            if(actor === this.activeOpp) return this.oppSwitch();
        }else{
            this.turnAction(target, damage)
        }
        // Was firing off on switches
        // this.turnAction(target, damage)
    }
    
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
            //this is where it gets a little murky, we'll have to use a calculation that returnns an attack order? for now its hardcoded for testing
            let oppAttack = fakeAi(this.activeMon, this.activeOpp);

            //ALL THIS IS CURRENTLY USED IN TEST; abstract to turnPhase() or something like that

            let status1,status2;
            let attackResult1 = damageCalc(this.activeMon, this.activeOpp, attack)
            let attackResult2 = damageCalc(this.activeOpp,this.activeMon, oppAttack)

            let damage1 =  attackResult1[0]
            let damage2 = attackResult2[0]

            if (attackResult1[1] !== null) {
                status1 = attackResult1[1]
            }
            if (attackResult2[1] !== null){
                status2 =  attackResult2[1]
            }

            this.turnAction(this.activeOpp, damage1, status1)
            this.turnAction(this.activeMon, damage2, status2)

            setTimeout(() => this.turnEnd(), 3000)
            setTimeout(() => this.fieldLoop(),6000)

        })
    }


    switchMon() {
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

    oppSwitch(){
        let team = []
        for (let i=0;i<this.opponent.team.length;i++){
            if (this.opponent.team[i].health > 0 && this.opponent.team[i] !== this.activeOpp){
                team.push(this.opponent.team[i])
            }
        }
        if (team[0]){
            this.activeOpp = team[0]
        }else{
            console.log("loser")
        }

        //Conditional before fieldLoop to check if we need to execute and attack/damage
        this.fieldLoop()
        
    }

    speedCheck(){
        if (this.activeMon.baseStats.spe > this.activeOpp.baseStats.spe){
            return [0,1]
        }else if (this.activeMon.baseStats.spe > this.activeOpp.baseStats.spe){
            return [0,0]
        }else {
            return [1,0]
        }
    }
    fieldLoop() {
        //display Current mons
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
                        console.log(this.user.team[2])
    
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