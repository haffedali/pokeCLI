const inquirer = require("inquirer")
const damageCalc = require("../util/calc")
const fakeAi = require("../util/decision")
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


    turnAction(target, damage){
        console.log("HOW THE FUCK DOES THIS WORK")
        target.takeDamage(damage)//plug in haffed code here
        console.log(`${target.name} took ${damage} points of damage!`)
    }

    actionCheck(actor, target, damage){
        if(!this.isrunningTurn) throw 'uh oh! this shouldnt be possible!';
        //need to check status, if par, add miss chance, if burn, divide in half if froze/sleep skip turn
        
        if(actor.health <= 0 ) {
            this.isrunningTurn = false
            console.log(`${actor.name} is unable to battle!`)
            if(actor === this.activeMon) return this.switchMon();
            if(actor === this.activeOpp) return this.oppSwitch();//<need to define this action
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
          then it resolve the coices
        */
        inquirer.prompt([
            {
                name: "attack",
                message: "CHOOSE ATTACK",
                type: "list",
                choices: this.activeMon.moves
            }
        ]).then(({ attack }) => {
            console.log(attack)
            //this is where it gets a little murky, we'll have to use a calculation that returnns an attack order? for now its hardcoded for testing
            let oppAttack = fakeAi(this.activeMon, this.activeOpp);
            let damage = damageCalc(this.activeMon, this.activeOpp, attack, oppAttack)
            
            if(this.activeMon.stats.speed > this.activeOpp.stats.speed){ // lets move this to calc
                this.actionCheck(this.activeOpp, this.activeMon, damage[1])
                this.actionCheck(this.activeMon, this.activeOpp, damage[0])
            }else{
                this.actionCheck(this.activeOpp, this.activeMon, damage[1])
                this.actionCheck(this.activeMon, this.activeOpp, damage[0])
            }
            this.fieldLoop()

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
                this.fieldLoop()//will need to check battle state
                console.log("debugheremyman")
                // this.user.team.forEach(mon => {
                //     if (mon.name === select) {
                //         this.user.team[this.activeIn] = { ...this.activeMon }
                //         this.activeMon = {...mon}
                //         if(this.isrunningTurn){
                //             console.log("turnrunning")
                //             //this.calcOppAction()
                //             // let oppAttack = "megapunch"
                //             // actionCheck(this.activeOpp, this.activeMon, oppAttack)
                //         }
                //         this.fieldLoop()//will need to check battle state
                //     }
                // })
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
    }

    
    // loop() {
    //     // console.log("Hello trainer!")
    //     // console.log("Today you are facing off against HoffBot and his trusty " + this.opponent.name + "!")

    //     if (this.isActive){
    //         inquirer.prompt([{
    //             type: 'list',
    //             name: 'move',
    //             message: 'Let the battle begin!',
    //             choices: this.user.moves
    //         }]).then(ans =>{

    //             //Need the AI Opp to pick a move here and replace 'chicken'
    //             let damage = damageCalc(this.user, this.opponent, ans.move, "Gigadrain")
    //             let damageOpp = damage[0]
    //             let damageUser = damage[1]
    //             this.opponent.health -= damageOpp
    //             this.user.health -= damageUser

    //             console.log(`Your ${this.user.name} has ${this.user.health} health remaining!`)
    //             console.log(`HoffBot's ${this.opponent.name} has ${this.opponent.health} remaining!`)

    //             if (this.opponent.health > 0 && this.user.health > 0){
    //                 this.loop()
    //             }
    //             else {
    //                 console.log("GREAT JOB")
    //             }
    //         })
    //     }
    // }

}