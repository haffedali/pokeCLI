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
        let mon = this.team['first'].name;
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
    switchMon(place){
        switch(place){
            case "first":
                this.active = place
                break;
            case "second":
                this.active = place
                break;
            case "third":
                this.active = place
                break;
        }
    }

    test(){
        console.log(this)
    }
}