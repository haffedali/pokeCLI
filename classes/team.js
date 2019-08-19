const Pokemon = require('./pokemon')

module.exports = class Team {
    constructor(mon){
        this.team = {
            'first': new Pokemon(mon)
        };
        this.active = 'first';
    }

    build(){
        let bTeam = (backup, last) => {
            this.team['second'] = new Pokemon(backup);
            this.team['third'] = new Pokemon(last);
        }
        let mon = this.active.name;
        switch (mon) {
            case "Charizard":
                bTeam("Jolteon","Golem")
                break;
            case "Blastoise":
                bTeam("Flareon", "Pidgeot")
                break;
            case "Venusaur":
                bTeam("Vaporeon", "Machamp")
                break;
        }
    }


    /**
     * 
     * 
     */
    switchMon(monChoice){
        console.log('Switch pokemon')
    }

    test(){
        console.log(this)
    }
}