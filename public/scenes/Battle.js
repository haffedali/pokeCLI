import typeDict from "../util/typeDict.js";
import Pokemon from "../classes/pokemon.js";
import Team from "../classes/team.js";
import status from "../util/status.js";
import decision from "../util/decision.js";
import calc from "../util/newCalc.js";
import pokemon from "../util/pokemonDb.js";
import moves from "../util/moveDb.js";
import Move from "../objects/move.js";
import TeamBox from '../objects/teamBox.js';
import HealthBox from "../objects/healthBox.js";



export default class Battle extends Phaser.Scene {
    constructor() {
        super("battle");
        var teamType;
        var myTeam;
        var oppTeam;
        var myMon;
        var oppMon;
        var myMove;
        var myMonHappy;
        var oppMonHappy;
        var turnNum = 0;
        var turnActive = false;
    }



    async pickMove(){
        this.oppMove = await decision(this.myMon, this.oppMon)
        return Promise.resolve(this.myMove, this.oppMove)

        // this.turnAction(this.myMove, this.oppMove)
    }

    async turnAction(move, oppMove){
        let result = await this.speedCheck()

        // After getting turn sequence, run a move for each
        result.forEach((mon)=>{
            if (this.myMon.name = mon){
                this.runMove(this.myMon, this.myMove)
            }
            this.runMove(this.oppMon, this.oppMove)
        })
    }

    async runMove(mon, move){
        console.log(moves[move])
        // switch (moves[move].category){
        //     case "Physical":
        //         console.log(`{move} is a physical move`)
        //         break;
        //     case "Special":
        //         console.log(`{move} is a special move`)
        //         break;
        //     case "Status":
        //         console.log(`{move} is a status move`)
                
        // }
    }

    async speedCheck(){
        //returns 2 length array
        if (this.myMon.stats.spe > this.oppMon.stats.spe){
            return Promise.resolve([this.myMon.name,this.oppMon.name])
        }else if (this.myMon.stats.spe === this.oppMon.stats.spe){
            return Promise.resolve("tie")
        }else {
            return Promise.resolve([this.oppMon.name,this.myMon.name])
        }
    }

    statusCheck(){

    }

    turnEnd(){

    }

    statusMove(){

    }

    specialMove(){

    }

    physicalMove(){

    }






    getPokemon(mon){
        let monData = pokemon[mon]
        return monData
    }

    start(){
        this.myMonHappy = true
        this.oppMonHappy = true
    }

    getMove(move){
        let moveData = moves[move]
        return moveData
    }

    buildPokemon(){

    }

    buildMoves(){
        let xBuild = 100
        this.myMon.moves.forEach((move)=>{
            new Move(this, move, xBuild, 550).create()
            xBuild += 135;
        })


    }

    buildTeams(){
         this.myTeam = new TeamBox(this, "team goes here", 80, 70).create()
         .setInteractive().on('pointerup', ()=>{
            this.scene.start('switch')
         },this);
         
         this.oppTeam = new TeamBox(this, "enemy team goes here", 530, 70).create();


    }

    buildHealthBars(){
        const myHealthBar = new HealthBox(this, this.myMon,220, 70).create();
        const oppHealthBar = new HealthBox(this, this.oppMon, 380, 70).create();
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
        this.load.image('battleBackground','./assets/sprites/battleBackground.png');
        this.load.image('healthBar', './assets/sprites/healthBar.png');
        this.load.image('healthBarUser','./assets/sprites/healthBarR.png');
        this.load.image('switchBall', './assets/sprites/switchBall.png');
        this.load.image('teamBox','./assets/sprites/teamContainer.png');
        this.load.image('moveBox', './assets/sprites/moveContainer.png');
        this.load.image('pokeball', './assets/sprites/pokeballSmall.png');
        this.load.image('CharizardUser','./assets/sprites/charizardR.png');
        this.load.image('Charizard', './assets/sprites/charizard.png');
        this.load.image('Blastoise','./assets/sprites/blastoise.png');
        this.load.image('BlastoiseUser','./assets/sprites/blastoiseR.png');
        this.load.image('Venusaur','./assets/sprites/venusaur.png');
        this.load.image('VenusaurUser','./assets/sprites/venusaurR.png');
    }



    create(){
        this.start();


        this.add.image(0,0,'battleBackground').setDepth(-1);
        this.add.text(20,20,"Battle")




        let testBall = this.add.sprite(300, 300, "pokeball").setDepth(1);

        // Adds string 'User' for dynamic loading (a reversed version of sprite)
        let myMon = this.add.sprite(150, 420, this.myMon.name + "User").setDepth(1);
        let oppMon = this.add.sprite(450, 420, this.oppMon.name).setDepth(1);


        myMon.setInteractive().on("pointerdown", ()=>{
            let x = myMon.x;
            let y = myMon.y;
            this.buildMoves();
            this.buildTeams();
            this.buildHealthBars();
            
        })

        myMon.displayWidth *=2
        myMon.displayHeight *=2
        oppMon.displayWidth *=2
        oppMon.displayHeight *=2
        

        ////////////////////////////////////////////////////////////////


        testBall.setInteractive().on("pointerdown", ()=>{
            // this.scene.start('switch')
            console.log(this.myMove)
            console.log(this.oppMove)
            this.pickMove().then(console.log(this.oppMove))
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
            // this routes to a different scene
            this.scene.start("start")
        }, this)
    
    }
    update(){
        // if (this.turnActive === true){
        //     this.add.text(200,200, 'turn is active')
        //     this.pickMove(this.myMove)
        // }
        // else if(!this.turnAction){
            
        // }
    }
}