const Pokemon = require('./pokemon')

module.exports = class Team {
    constructor(mon){
        this.active = new Pokemon(mon)
        this.roster = [];
    }

    build(){
        let bTeam = (backup, last) => {
            this.roster[0] = new Pokemon(backup);
            this.roster[1] = new Pokemon(last)
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
}