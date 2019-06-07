//this will be the class that holds all game actions
module.exports = class Field{
    constructor(user, opponent){
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
                forfeit(), switch(), attack() 
        3) Forfeit
        4) Main Attack Action  < discuss these  
        4.1) User Attack Calc ( actMon, actOpp )
        4.2) Opp Attack Calc  ( actMon, actOpp )
        5) switch

    */
}