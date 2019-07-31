
const {Pokemon, Team, Status} = require("./classes")
const moveList = require("./db/moves")
const Util = require('./util')
const { fakeAi, damageCalc, decision} = require("./util")
const {moves} = require("./db");
//this will be the class that holds all game actions
module.exports = class Field {
    constructor(user1, user2) {
        this.user1Mon = user1.active;//you
        this.user2Mon = user2.active;//them
        this.user1Team = user1.roster;
        this.user2Team = user2.roster;
        this.user1Move;
        this.user2Move;
        this.turnNum = 0;
    }


    //Applies damage and status
    turnAction(actingMon, targetMon, attack){
        // This entire function will be split into 2 pieces of functionality; conditionally fired off using an if statement
        // abtstract this logic to 2 seperate turn actions, one more attacking moves, and one for status moves (maybe another for boosts and terrains)
        // result is equal to the result of damageCalc() coupled checkStatus()
        // again, damageCalc being neccessary to the battle logic is super damaging.
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
            


            if (result[2] === true && actingMon.health > 0 && result[3] !== "Status" && result[3] !== "SecStatus" && result[3] !== "Protect" && result[3] !== "Boost"){
                if (targetMon.isProtected !== true){
                    if (result[0] > 0){
                        console.log(targetMon.name + " has taken " + result[0] + " damage from " + attack + "!")
                        targetMon.takeDamage(result[0])
                        if (result[4] === "drain"){
                            // if result4 is true, it means the move is a draining move, in which a pokemon restores health equal
                            // to half the damage it dealt
                            let heal = Math.floor(result[0]/2)
                            console.log(attack + " healed " + actingMon.name + " for " + heal + " health points!")
                            actingMon.heal(heal)
                        }
                        else if (result[4] === "recoil"){
                            let recoil = Math.floor(result[0]/2)
                            actingMon.recoil(recoil)
                        }
                    }
                }else{
                    console.log(actingMon.name + " used " + attack + " but " + targetMon.name + " protected itself from any harm!")
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
            else if (result[2] === true && result[3] === "SecStatus" && targetMon.isProtected !== true){
                targetMon.applySecStatus(result[1]);
            }
            else if (result[2] === true && result[3] === "Status" && targetMon.isProtected !== true){
                targetMon.applyStatus(result[1]);
            }
            else if (result[2] === true && result[3] === "Protect"){
                console.log(actingMon.name + " protected itself!")
                actingMon.protect();
            }
            else if (result[2] === true && result[3] === "Boost"){
                actingMon.boost(moves[attack].boost);
            }
            else if (result[2] === false && actingMon.health > 0 )
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

        this.activeOpp.endProtect()
        this.activeMon.endProtect()
        
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
            if (moves[oppAttack].priority === moves[attack].priority){
                for (let i=0;i<sequence.length;i++){
                    if (sequence[i] === "activeMon"){
                        this.turnAction(this.activeMon,this.activeOpp,attack)
                    }else{
                        this.turnAction(this.activeOpp, this.activeMon, oppAttack)
                    }
                }
            }else {
                if (moves[oppAttack].priority > moves[attack].priority){
                    this.turnAction(this.activeOpp, this.activeMon, oppAttack)
                    this.turnAction(this.activeMon,this.activeOpp,attack)

                }else{
                    this.turnAction(this.activeMon,this.activeOpp,attack)
                    this.turnAction(this.activeOpp, this.activeMon, oppAttack)
                }
            }


            // Hacky way to give time for turnActions before ending the turn and starting a new one
            setTimeout(() => this.turnEnd(), 2000)
            setTimeout(() => this.fieldLoop(),2400)

        })
    }

    // User's switch method
    switchMon() {

        // Resets status related counters
        this.activeMon.statusCount = 0;
        this.activeMon.secStatusCount = 0;
        this.activeMon.removeSecStatus();
        this.activeMon.endProtect();
        this.activeMon.boosts = {atk:0,def:0,spa:0,spd:0,spe:0}

        
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
                
                if (this.activeMon.health > 0){
                    this.activeMon = this.user.team[choice];
                    let oppAttack = fakeAi(this.activeMon,this.activeOpp)
                    this.turnAction(this.activeOpp, this.activeMon,oppAttack)
                }else{
                    this.activeMon = this.user.team[choice];
                }
                

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
        this.activeOpp.endProtect();
        this.activeOpp.boosts = {atk:0,def:0,spa:0,spd:0,spe:0}


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
        if (this.user1Mon.stats.spe > this.user2Mon.stats.spe){
            return ["user1Mon","user2Mon"]
        }else if (this.user1Mon.stats.spe === this.user2Mon.stats.spe){
            return "tie"
        }else {
            return ["user2Mon","user1Mon"]
        }
    }

    // The main game loop
    fieldLoop() {
    }

    gameOver(){
        console.log("GAME OVER TURN THIS SHIT OFF")
    }









    // We have simple damage working on the user side, will need to work in
    // The AI for the user2 attack
    async eachTurn(arr){
        arr.forEach((mon)=>{
            if (mon == "user1Mon"){
                console.log(this.user1Move)
                damageCalc(this.user1Mon,this.user2Mon,this.user1Move)
                    .then((res)=>{
                        // this.user2Mon.takeDamage(res[0])
                        this.damageCalcSettle(res, this.user2Mon)
                    })
            }
            else {
                damageCalc(this.user2Mon,this.user1Mon,this.user2Move)
                    .then((res)=>{
                        this.damageCalcSettle(res, this.user1Mon)
                    })

            }
        })
    }

    async turnStart(move){
        this.user2Move = decision(this.user1Mon,this.user2Mon)
        this.eachTurn(this.speedCheck())
    }

    exeMove(move){

    }

    damageCalcSettle(result, target){

        target.takeDamage(result[0])

        if (result[1]){
            target.applyStatus(result[1])
        }
    }
}