//Copying, or if that leaves a bad taste in your mouth, 'reverse engineering'
// the move list from pokemon showdown.
// 


/**@type {{[k: string]: MoveData}} */
let moveList = {
    "flamethrower": {
        num: 1,
        accuracy: 100,
        basePower: 90,
        category: "Special",
        name: "Flamethrower",
        pp: 15,
        priority: 0,
        type: "Fire"
    },
    "gigadrain": {
        num: 2,
        accuracy: 100,
        basePower: 75,
        category: "Special",
        name: "Giga Drain",
        pp: 10,
        priority: 0,
        // how to recover hp?
        type: "Grass"
    },
    "protect": {
        num: 3,
        // accuracy `true` for moves that CANNOT miss
        accuracy: true,
        basePower: 0,
        category: "Status",
        name: "Protect",
        pp: 10,
        priority: 4,
        // showdown leaves and effect key pointing to an object which contains
        // relevant functions deducing the success and the exact effect the move has
        // on either pokemon
    },
    "hydropump": {
        num: 4,
        accuracy: 80,
        basePower: 110,
        categroy: 'Special',
        name: "Hydro Pump",
        pp: 5,
        priority: 0,
        type: "Water"
    },
    "airslash": {
        num: 5,
        accuracy: 95,
        basePower: 75,
        pp: 15,
        name: "Air Slash",
        priority: 0,
        type: "Flying"
    }
    
}
 
module.exports = moveList;