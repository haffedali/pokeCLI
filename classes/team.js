//create a class that takes in 3 mon as an argument and builds an array based on that
const { pokemon } = require("../db")
const Pokemon = require("./pokemon")
module.exports = class Team {
    constructor(starter, second, third) {
        this.starter = starter;
        this.second = second;
        this.third = third;
        this.team = [];
    }
    build() {
        let starter = this.starter;
        this.team[0] = new Pokemon(starter)
        switch (starter) {
            case "Charizard":
                this.team[1] = new Pokemon("Jolteon");
                this.team[2] = new Pokemon("Golem");
                break;
            case "Blastoise":
                this.team[1] = new Pokemon("Flareon");
                this.team[2] = new Pokemon("Pidgeot");
                break;
            case "Venusaur":
                this.team[1] = new Pokemon("Vaporeon");
                this.team[2] = new Pokemon("Machamp");
                break;
        }
    }
}