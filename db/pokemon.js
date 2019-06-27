//No abilities for now, but will definitely be added in later
//switching to fixed movestes. Will prevent having to randomly generating opp teams movests. 
let pokemonDex = {
    "Charizard": {
        num: 6,
        types: ["Fire", "Flying"],
        baseStats: {hp: 78, atk: 84, def: 78, spa: 85, spd: 85, spe: 100},
        name: "Charizard",
        moveSet: ["Flamethrower", "Earthquake","Roost", "Airslash"]
    },
    "Blastoise": {
        num: 9,
        types: ["Water"],
        baseStats: {hp: 79, atk: 83, def: 100, spa: 85, spd: 85, spe: 78},
        name: "Blastoise",
        moveSet: ["Icebeam", "Gigadrain", "Surf", "Hydropump"]
    },
    "Venusaur": {
        num: 3,
        types: ["Grass", "Poison"],
        baseStats: {hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80},
        name: "Venusaur",
        moveSet: ["Megapunch", "Megapunch" ,"Megapunch", "Megapunch"]
    },
    "Pidgeot": {//add movesets
        num: 18,
        types: ["Normal", "Flying"],
        baseStats: {hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 101},
        name: "Pidgeot",
        moveSet: ["Aerialace", "Hyper Beam", "Agility", "Mirror Move"]
    },
    // "Nidoking": {//add movesets
    //     num: 34,
    //     types: ["Ground", "Poison"],
    //     baseStats: {hp: 81, atk: 102, def: 77, spa: 85, spd: 75, spe: 85},
    //     name: "Nidoking"
    // },
    "Clefable": {
        num: 36,
        types: ["Normal"],
        baseStats: {hp: 95, atk: 70, def: 73, spa: 95, spd: 90, spe: 60},
        name: "Clefable",
        moveSet: ["Blizard", "Body Slam", "Thunderbolt", "Thunder Wave"]
    },
    "Jolteon": {
        num: 135,
        types: ["Electric"],
        baseStats: {hp: 65, atk: 65, def: 60, spa: 110, spd: 110, spe: 130},
        name: "Jolteon",
        moveSet: ["Thunderbolt", "Thunder Wave", "Pin Missile", "Body Slam"]
    },
    "Flareon": {
        num: 136,
        types: ["Fire"],
        baseStats: {hp: 65, atk: 130, def: 60, spa: 110, spd: 110, spe: 65},
        name: "Flareon",
        moveSet: ["Fire Blast", "Body Slam", "Hyper Beam", "Qucik Attack"]//fix moves
    },
    "Vaporeon": {
        num: 134,
        types: ["Water"],
        baseStats: {hp: 130, atk: 65, def: 60, spa: 110, spd: 110, spe: 65},
        name: "Vaporeon",
        moveSet: ["Surf", "Airslash", "Icebeam", "Sludgebomb"]
    },
    "Golem": {
        num: 76,
        types: ["Rock", "Ground"],
		baseStats: {hp: 80, atk: 120, def: 130, spa: 55, spd: 65, spe: 45},
        name: "Golem",
        moveSet: ["Megapunch", "Flamethrower", "Rockslide", "Explosion"]
    },
    "Machamp": {
        num: 68,
        types: ["Fighting"],
		baseStats: {hp: 90, atk: 130, def: 80, spa: 65, spd: 65, spe: 55},
        name: "Machamp",
        moveSet: ["Body Slam", "Earthquake", "Rock Throw", "Submission"]
    },
}

module.exports = pokemonDex;