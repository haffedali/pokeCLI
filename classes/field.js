const inquirer = require("inquirer")
const damageCalc = require("../util/calc")


module.exports = class Field{
    constructor(user, opponent){
        this.user = user;
        this.opponent = opponent;
        this.isActive = true;
        // this.activeMon = this.user.team[0]//grab the front mon
        // this.activeOpp = this.opponent.team[0]//grab opp starter
    }
    //here we'll ad the methods of game logic. 
    /*methods:
        1) Field loop
        2) Action prompt
            -will iquire:
                forfeit(), switch(), attack() 
        3) Forfeit
        4) Main Attack Action  < discuss these  
        4.1) User Attack Calc ( actMon, actOpp )
        4.2) Opp Attack Calc  ( actMon, actOpp )
        5) switch
    */

    loop() {
        // console.log("Hello trainer!")
        // console.log("Today you are facing off against HoffBot and his trusty " + this.opponent.name + "!")

        if (this.isActive){
            inquirer.prompt([{
                type: 'list',
                name: 'move',
                message: 'Let the battle begin!',
                choices: this.user.moves
            }]).then(ans =>{

                //Need the AI Opp to pick a move here and replace 'chicken'
                let damage = damageCalc(this.user, this.opponent, ans.move, "Gigadrain")
                let damageOpp = damage[0]
                let damageUser = damage[1]
                this.opponent.health -= damageOpp
                this.user.health -= damageUser

                console.log(`Your ${this.user.name} has ${this.user.health} health remaining!`)
                console.log(`HoffBot's ${this.opponent.name} has ${this.opponent.health} remaining!`)

                if (this.opponent.health > 0 && this.user.health > 0){
                    this.loop()
                }
                else {
                    console.log("GREAT JOB")
                }
            })
        }
    }

    faintCheck() {
        if (this.user.stats.hp <= 0){

        }
    }

    playerLoss(){
        this.isActive = false;
        console.log("Good game!!!! Sucker.")
    }
}