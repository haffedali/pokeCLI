import typeDict from "../util/typeDict.js";
import Pokemon from "../classes/pokemon.js";
import Team from "../classes/team.js";
import status from "../util/status.js";
import decision from "../util/decision.js";
import calc from "../util/newCalc.js";
import pokemon from "../util/pokemonDb.js";
import moves from "../util/moveDb.js";



export default class Battle extends Phaser.Scene {
    constructor() {
        super("battle");
        var teamType;
        var myTeam;
        var oppTeam;
        var myMon;
        var oppMon;
        var myMove;
    }


    getPokemon(mon){
        let monData = pokemon[mon]
        return monData
    }

    getTeam(mon){
        switch (this.teamType){
            case "fire": {
                this.myTeam = new Team("Charizard")
                this.myTeam.build()
                this.myMon = this.myTeam[0]

                this.oppTeam = new Team("Blastoise")
                this.oppTeam.build()
                this.oppMon = this.oppTeam[0]
            }
        }
    }

    getMove(move){
        let moveData = moves[move]
        return moveData
    }

    buildPokemon(){

    }


    init(data){
        console.log(data)
        switch (data.type){
            case "fire": 
                this.myTeam = new Team("Charizard")
                this.myTeam.build()
                this.myMon = this.myTeam.team[0];

                this.oppTeam = new Team("Blastoise")
                this.oppTeam.build()
                this.oppMon = this.oppTeam.team[0]
                break;
            case "water":
                this.myTeam = new Team("Blastoise")
                this.myTeam.build()
                this.myMon = this.myTeam.team[0];

                this.oppTeam = new Team("Venusaur")
                this.oppTeam.build()
                this.oppMon = this.oppTeam.team[0]
                break;
            case "grass":
                this.myTeam = new Team("Venusaur")
                this.myTeam.build()
                this.myMon = this.myTeam.team[0];
``
                this.oppTeam = new Team("Charizard")
                this.oppTeam.build()
                this.oppMon = this.oppTeam.team[0]
                break;
        }
    }

    preload()
    {
        this.load.image('pokeball', './assets/sprites/pokeballSmall.png');
        this.load.image('CharizardUser','./assets/sprites/charizardR.png');
        this.load.image('Charizard', './assets/sprites/charizard.png')
        this.load.image('Blastoise','./assets/sprites/blastoise.png');
        this.load.image('BlastoiseUser','./assets/sprites/blastoiseR.png');
        this.load.image('Venusaur','./assets/sprites/venusaur.png');
        this.load.image('VenusaurUser','./assets/sprites/venusaurR.png');
    }



    create(){
        this.add.text(20,20,"Battle")

        this.getMove("Flamethrower")

        let testBall = this.add.sprite(300, 300, "pokeball").setDepth(1);


        // Adds string 'User' for dynamic loading (a reversed version of sprite)
        let myMon = this.add.sprite(150, 450, this.myMon.name + "User").setDepth(1);
        let oppMon = this.add.sprite(450, 450, this.oppMon.name).setDepth(1);




        myMon.setInteractive().on("pointerdown", ()=>{
            let x = myMon.x;
            let y = myMon.y;
            console.log("test")
        })
        

        ////////////////////////////////////////////////////////////////


        testBall.setInteractive().on("pointerdown", ()=>{
            console.log()
            console.log(this.myMon)
            console.log(this.myTeam)
        })
    

        ////////////////////////////////////////////////////////////////


        myMon.on('pointerover', function () {
    
            this.setTint(0x00ff00);
    
        });
    
        myMon.on('pointerout', function () {
    
            this.clearTint();
    
        });
    
        this.input.setDraggable(myMon);
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    
            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });
    

    
        //Blastoise on click
        oppMon.setInteractive().on("pointerup", ()=>{
            this.scene.start("start")
        }, this)
    
    }
}