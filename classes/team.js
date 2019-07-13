//create a class that takes in 3 mon as an argument and builds an array based on that
// const Pokemon = require("./pokemon")
const Pokemon = require("./pokemon");
module.exports = class Team {
    constructor(starter, second, third) {
        this.starter = starter;
        this.second = second;
        this.third = third;
        this.team = [];
    }
    build() {
        let bTeam = (backup, last) => {
            this.team[1] = new Pokemon(backup);
            this.team[2] = new Pokemon(last)
        }
        let starter = this.starter;
        this.team[0] = new Pokemon(starter)
        switch (starter) {
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
