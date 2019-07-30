//Copying, or if that leaves a bad taste in your mouth, 'reverse engineering'
// the move list from pokemon showdown.
// 


/**@type {{[k: string]: MoveData}} */
const moveList = {
	"Doubleedge": {
		basePower: 120,
		recoil: .5,
		type: "Normal",
		priority: 0,
		category: "Physical"
	},
    "Flamethrower": {
        num: 1,
        accuracy: 100,
        basePower: 90,
        category: "Special",
        name: "Flamethrower",
        pp: 15,
        priority: 0,
        type: "Fire",
		target: "normal",
		effect: {
			"burn": 10
		}
				
	},
	"Agility": {
		basePower: 0,
		type: "Boost",
		priority: 0,
		boost: {
			spe: 2
		}
	},
    "Gigadrain": {
        num: 2,
        accuracy: 100,
        basePower: 75,
        category: "Special",
        name: "Giga Drain",
        pp: 10,
		priority: 0,
		drain: .5,
        // how to recover hp?
        type: "Grass"
    },
    "Protect": {
        num: 3,
        // accuracy `true` for moves that CANNOT miss
        accuracy: true,
        basePower: 0,
        category: "Protect",
        name: "Protect",
        pp: 10,
        priority: 4,
        // showdown leaves and effect key pointing to an object which contains
        // relevant functions deducing the success and the exact effect the move has
        // on either pokemon
    },
    "Hydropump": {
        num: 4,
        accuracy: 80,
        basePower: 110,
        category: 'Special',
        name: "Hydro Pump",
        pp: 5,
        priority: 0,
		type: "Water",
		secEffect: {
			"leechSeed": 100,
		}
    },
    "Airslash": {
		category: "Special",
        num: 5,
        accuracy: 95,
        basePower: 75,
        pp: 15,
        name: "Air Slash",
        priority: 0,
        type: "Flying"
    },
    "Roost": {
		num: 355,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up. Until the end of the turn, Flying-type users lose their Flying type and pure Flying-type users become Normal type. Does nothing if the user's HP is full.",
		shortDesc: "Heals 50% HP. Flying-type removed 'til turn ends.",
		id: "roost",
		isViable: true,
		name: "Roost",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		self: {
			volatileStatus: 'roost',
		},
		effect: {
			duration: 1,
			onResidualOrder: 20,
			onStart(target) {
				this.add('-singleturn', target, 'move: Roost');
			},
			onTypePriority: -1,
			onType(types, pokemon) {
				this.effectData.typeWas = types;
				return types.filter(type => type !== 'Flying');
			},
		},
		secondary: null,
		target: "self",
		type: "Flying",
	},
	
	"Leechseed":{
		basePower: 0,
		type: "Grass",
		category: "SecStatus",
		secEffect: "leechSeed",
		priority: 0,
		//Toying with `immune` now
		immune: {"grass": true}
	},
	
	"Withdraw":{
		category: "Boost",
		boost: {
			def: 1
		},
		name: "Withdraw",
		type: 'Normal'
	},
    
    "Sleeppowder": {
		num: 79,
		accuracy: 75,
		basePower: 0,
		category: "Status",
		shortDesc: "Causes the target to fall asleep.",
		id: "sleeppowder",
		isViable: true,
		name: "Sleep Powder",
		pp: 15,
		priority: 0,
		flags: {powder: 1, protect: 1, reflectable: 1, mirror: 1},
		status: 'slp',
		secondary: null,
		target: "normal",
		type: "Grass",
		zMoveBoost: {spe: 1},
		contestType: "Clever",
    },
    "Solarbeam": {
		num: 76,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "This attack charges on the first turn and executes on the second. Power is halved if the weather is Hail, Primordial Sea, Rain Dance, or Sandstorm. If the user is holding a Power Herb or the weather is Desolate Land or Sunny Day, the move completes in one turn.",
		shortDesc: "Charges turn 1. Hits turn 2. No charge in sunlight.",
		id: "solarbeam",
		name: "Solar Beam",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onBasePower(basePower, pokemon, target) {
			if (this.field.isWeather(['raindance', 'primordialsea', 'sandstorm', 'hail'])) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMovePower: 190,
		contestType: "Cool",
    },
    "Fly": {
		num: 19,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Gust, Hurricane, Sky Uppercut, Smack Down, Thousand Arrows, Thunder, and Twister, and Gust and Twister have doubled power when used against it. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Flies up on first turn, then strikes the next turn.",
		id: "fly",
		name: "Fly",
		pp: 15,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		effect: {
			duration: 2,
			onTryImmunity(target, source, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return;
				}
				if (move.id === 'skyuppercut' || move.id === 'thunder' || move.id === 'hurricane' || move.id === 'smackdown' || move.id === 'thousandarrows' || move.id === 'helpinghand') {
					return;
				}
				if (source.hasAbility('noguard') || target.hasAbility('noguard')) {
					return;
				}
				if (source.volatiles['lockon'] && target === source.volatiles['lockon'].source) return;
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
		},
		secondary: null,
		target: "any",
		type: "Flying",
		zMovePower: 175,
		contestType: "Clever",
    },
    "Gigadrain": {
		num: 202,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "gigadrain",
		isViable: true,
		name: "Giga Drain",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
		zMovePower: 140,
		contestType: "Clever",
    },
    "Waterpulse": {
		num: 352,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "Has a 20% chance to confuse the target.",
		shortDesc: "20% chance to confuse the target.",
		id: "waterpulse",
		name: "Water Pulse",
		pp: 20,
		priority: 0,
		flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "any",
		type: "Water",
		zMovePower: 120,
		contestType: "Beautiful",
    },
    "Tailwind": {
		num: 366,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 4 turns, the user and its party members have their Speed doubled. Fails if this move is already in effect for the user's side.",
		shortDesc: "For 4 turns, allies' Speed is doubled.",
		id: "tailwind",
		isViable: true,
		name: "Tailwind",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'tailwind',
		effect: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 6;
				}
				return 4;
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Tailwind');
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd(side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Flying",
		zMoveEffect: 'crit2',
		contestType: "Cool",
    },
    "Surf": {
		num: 57,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Damage doubles if the target is using Dive.",
		shortDesc: "Hits adjacent Pokemon. Double damage on Dive.",
		id: "surf",
		isViable: true,
		name: "Surf",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: null,
		target: "allAdjacent",
		type: "Water",
		zMovePower: 175,
		contestType: "Beautiful",
    },
    "Superpower": {
		num: 276,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Lowers the user's Attack and Defense by 1 stage.",
		shortDesc: "Lowers the user's Attack and Defense by 1.",
		id: "superpower",
		isViable: true,
		name: "Superpower",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				atk: -1,
				def: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMovePower: 190,
		contestType: "Tough",
    },
    "Darkpulse": {
		num: 399,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 20% chance to flinch the target.",
		shortDesc: "20% chance to flinch the target.",
		id: "darkpulse",
		isViable: true,
		name: "Dark Pulse",
		pp: 15,
		priority: 0,
		flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "any",
		type: "Dark",
		zMovePower: 160,
		contestType: "Cool",
    },
    "Sludgebomb": {
		num: 188,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 30% chance to poison the target.",
		shortDesc: "30% chance to poison the target.",
		id: "sludgebomb",
		isViable: true,
		name: "Sludge Bomb",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		effect: {
			"poison":20
		},
		target: "normal",
		type: "Poison",
		zMovePower: 175,
		contestType: "Tough",
    },
    "Icebeam": {
		num: 58,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 10% chance to freeze the target.",
		shortDesc: "10% chance to freeze the target.",
		id: "icebeam",
		isViable: true,
		name: "Ice Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		// effect: {
		// 	"burn": 100
		// },
		target: "normal",
		type: "Ice",
		zMovePower: 175,
		contestType: "Beautiful",
    },
    "Metalclaw": {
		num: 232,
		accuracy: 95,
		basePower: 50,
		category: "Physical",
		desc: "Has a 10% chance to raise the user's Attack by 1 stage.",
		shortDesc: "10% chance to raise the user's Attack by 1.",
		id: "metalclaw",
		name: "Metal Claw",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Steel",
		zMovePower: 100,
		contestType: "Cool",
    },
    "Megapunch": {
		num: 5,
		accuracy: 85,
		basePower: 80,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "megapunch",
		name: "Mega Punch",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 160,
		contestType: "Tough",
    },
    "Megakick": {
		num: 25,
		accuracy: 75,
		basePower: 120,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "megakick",
		name: "Mega Kick",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 190,
		contestType: "Cool",
    },
    "Irondefense": {
		num: 334,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Defense by 2 stages.",
		shortDesc: "Raises the user's Defense by 2.",
		id: "irondefense",
		name: "Iron Defense",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: 2,
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Tough",
	},
	"Fire Blast": {
		basePower: 110,
		desc: "Has a 30% chance to burn the target.",
		shortDesc: "30% chance to burn the target.",
		secondary: {
			chance: 30,
			status: 'brn',
		},
	},
		"Thunderbolt": {
			num: 85,
			accuracy: 100,
			basePower: 90,
			category: "Special",
			desc: "Has a 10% chance to paralyze the target.",
			shortDesc: "10% chance to paralyze the target.",
			id: "thunderbolt",
			isViable: true,
			name: "Thunderbolt",
			pp: 15,
			priority: 0,
			flags: {protect: 1, mirror: 1},
			secondary: {
				chance: 10,
				status: 'par',
			},
			target: "normal",
			type: "Electric",
			zMovePower: 175,
			contestType: "Cool",
		},
		"Earthquake": {
			num: 89,
			accuracy: 100,
			basePower: 100,
			category: "Physical",
			desc: "Damage doubles if the target is using Dig.",
			shortDesc: "Hits adjacent Pokemon. Double damage on Dig.",
			id: "earthquake",
			isViable: true,
			name: "Earthquake",
			pp: 10,
			priority: 0,
			flags: {protect: 1, mirror: 1, nonsky: 1},
			secondary: null,
			target: "allAdjacent",
			type: "Ground",
			zMovePower: 180,
			contestType: "Tough",
		},
		"Explosion": {
			num: 153,
			accuracy: 100,
			basePower: 250,
			category: "Physical",
			desc: "The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokemon has the Damp Ability.",
			shortDesc: "Hits adjacent Pokemon. The user faints.",
			id: "explosion",
			isViable: true,
			name: "Explosion",
			pp: 5,
			priority: 0,
			flags: {protect: 1, mirror: 1},
			selfdestruct: "always",
			secondary: null,
			target: "allAdjacent",
			type: "Normal",
			zMovePower: 200,
			contestType: "Beautiful",
		},
		"Rockslide": {
			num: 157,
			accuracy: 90,
			basePower: 75,
			category: "Physical",
			desc: "Has a 30% chance to flinch the target.",
			shortDesc: "30% chance to flinch the foe(s).",
			id: "rockslide",
			isViable: true,
			name: "Rock Slide",
			pp: 10,
			priority: 0,
			flags: {protect: 1, mirror: 1},
			secondary: {
				chance: 30,
				volatileStatus: 'flinch',
			},
			target: "allAdjacentFoes",
			type: "Rock",
			zMovePower: 140,
			contestType: "Tough",
		},
		"Signalbeam": {
			num: 324,
			accuracy: 100,
			basePower: 75,
			category: "Special",
			desc: "Has a 10% chance to confuse the target.",
			shortDesc: "10% chance to confuse the target.",
			id: "signalbeam",
			isViable: true,
			name: "Signal Beam",
			pp: 15,
			priority: 0,
			flags: {protect: 1, mirror: 1},
			secondary: {
				chance: 10,
				volatileStatus: 'confusion',
			},
			target: "normal",
			type: "Bug",
			zMovePower: 140,
			contestType: "Beautiful",
		},
		"Shadowball": {
			num: 247,
			accuracy: 100,
			basePower: 80,
			category: "Special",
			desc: "Has a 20% chance to lower the target's Special Defense by 1 stage.",
			shortDesc: "20% chance to lower the target's Sp. Def by 1.",
			id: "shadowball",
			isViable: true,
			name: "Shadow Ball",
			pp: 15,
			priority: 0,
			flags: {bullet: 1, protect: 1, mirror: 1},
			secondary: {
				chance: 20,
				boosts: {
					spd: -1,
				},
			},
			target: "normal",
			type: "Ghost",
			zMovePower: 160,
			contestType: "Clever",
		},
		"Aerialace": {
			num: 332,
			accuracy: true,
			basePower: 60,
			category: "Physical",
			shortDesc: "This move does not check accuracy.",
			id: "aerialace",
			isViable: true,
			name: "Aerial Ace",
			pp: 20,
			priority: 0,
			flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
			secondary: null,
			target: "any",
			type: "Flying",
			zMovePower: 120,
			contestType: "Cool",
		},
	
    
    
}
 
module.exports = moveList;