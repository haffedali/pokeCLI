const inquirer = require("inquirer")
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
        2) Action prompt
            -will iquire:
                forfeit(x), switchMon(), attack(X) 
        3) Forfeit [X]
        4) Main Attack Action  < discuss these  
        4.1) User Attack Calc ( actMon, actOpp )
        4.2) Opp Attack Calc  ( actMon, actOpp )
        5) switchMon

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
            blankSpaceGen(JSON.stringify(this.activeOpp.stats.hp), 8),
            blankSpaceGen(JSON.stringify(this.activeMon.stats.hp), 8),
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


    turnAction(actor, target, action){
        actor.useAttack(action, target)
        console.log(`${actor} used ${action}!`)
    }

    actionCheck(actor, target, action, cb){
        if(!this.isrunningTurn) throw 'uh oh! this shouldnt be possible!';
        if(actor.stats.hp <= 0 ) {
            console.log(`${actor.name} is unable to battle!`)
            if(actor === this.activeMon) return this.switchMon();
            if(actor === this.activeOpp) return this.oppSwicth();//<need to define this action
        }
        cb(actor, target, action)
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
            //this.calcOppAction() <need to figure this out
            let oppAttack = "megapunch"
            if(this.activeMon.stats.speed > this.activeOpp.stats.speed){
                actionCheck(this.activeMon, this.activeOpp, attack, this.turnAction)
                actionCheck(this.activeOpp, this.activeMon, oppAttack, this.turnAction)
            }else{
                actionCheck(this.activeOpp, this.activeMon, oppAttack, this.turnAction)
                actionCheck(this.activeMon, this.activeOpp, attack, this.turnAction)
            }
            this.fieldLoop()

        })
    }


    switchMon() {///MEMORY LEAK DONT USE TILL ITS FIXED

        //loop through team to check mons to sitch, if the user selects the same mon, thow an error and rerun this function
        inquirer.prompt([
            {
                name: "select",
                type: "rawlist",
                message: "SELECT A MON",
                choices: [...this.user.team.map(mon => mon.name), "RETURN"]
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
                for (let mon of this.user.team) {
                    if (mon.name === select) {
                        this.user.team[this.activeIn] = { ...this.activeMon }
                        this.activeMon = mon
                        if(this.isrunningTurn){
                            //this.calcOppAction()
                            let oppAttack = "megapunch"
                            actionCheck(this.activeOpp, this.activeMon, oppAttack, this.turnAction)
                        }
                        this.fieldLoop()//will need to check battle state
                    }
                }
            }
        })
    }

    fieldLoop() {
        //display Current mons
        this.fieldDisplay()
        inquirer.prompt([
            {
                name: "action",
                type: "rawlist",
                message: "|0>- SELECT AN ACTION -<0|",
                choices: ["ATTACK", "SWITCH", "FORFEIT"]
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
    }

}