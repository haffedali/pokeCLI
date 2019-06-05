//No abilities for now, but will definitely be added in later

let pokemonDex = {
    "Charizard": {
        num: 6,
        types: ["Fire", "Flying"],
        baseStats: {hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100},
        name: "Charizard",
        moveSet: ["Flamethrower", "Protect", "Roost", "Hydropump","Tailwind","Airslash","Tailwind"]
    },
    "Blastoise": {
        num: 9,
        types: ["Water"],
        baseStats: {hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78},
        name: "Blastoise",
        moveSet: ["Waterpulse", "Darkpulse", "Superpower", "Surf","Protect","Icebeam","Megapunch","Irondefense","Metalclaw"]
    },
    "Venusaur": {
        num: 3,
        types: ["Grass", "Poison"],
        baseStats: {hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80},
        name: "Venusaur",
        moveSet: ["Sludgebomb", "Leechseed", "Gigadrain","Solarbeam", "Sleeppowder"]
    },
    "Pideot": {//add movesets
        num: 18,
        types: ["Normal", "Flying"],
        baseStats: {hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 101},
        name: "Pideot"
    },
    "Nidoking": {//add movesets
        num: 34,
        types: ["Ground", "Poison"],
        baseStats: {hp: 81, atk: 102, def: 77, spa: 85, spd: 75, spe: 85},
        name: "Nidoking"
    },
    "Clefable": {
        num: 36,
        types: ["Fairy"],
        baseStats: {hp: 95, atk: 70, def: 73, spa: 95, spd: 90, spe: 60},
        name: "Clefable",
        moveSet: ["Flamethrower", "Protect", "Gigadrain", "Hydropump","Airslash"]
    }
}

module.exports = pokemonDex;