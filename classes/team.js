//create a class that takes in 3 mon as an argument and builds an array based on that
const { pokemon } = require("../db")
const Pokemon = require("./pokemon")
module.exports = class Team {
    constructor(starter) {
        this.starter = starter;
        this.team = [];
    }
    build() {
        let starter = this.starter;
        this.team[0] = new Pokemon(starter)
        switch (starter) {
            case "Charizard":
                this.team[1] = new Pokemon(pokemon.Jolteon.name);
                this.team[2] = new Pokemon(pokemon.Golem.name);
                break;
            case "Blastoise":
                this.team[1] = new Pokemon(pokemon.Flareon.name);
                this.team[2] = new Pokemon(pokemon.Pidgeot.name);
                break;
            case "Venusaur":
                this.team[1] = new Pokemon(pokemon.Vaporeon.name);
                this.team[2] = new Pokemon(pokemon.Machamp.name);
                break;
        }
    }
}