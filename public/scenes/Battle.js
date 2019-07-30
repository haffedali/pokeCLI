import Move from "../objects/move.js";
import TeamBox from '../objects/teamBox.js';
import HealthBox from "../objects/healthBox.js";
// import axios from "axios";



export default class Battle extends Phaser.Scene {
    // For now team and pokemon will be stored clientside
    // When we roll out multiplay, maybe create a firebase instance for each game
    // Then kill the instance when battle is over
    constructor() {
        super("battle");


        // IF CODE WORKS, DELETE THIS COMMENT BLOCK
        // this.teamType;
        // this.myMon;
        // this.oppMon;
        // this.myTeam;
        // this.oppTeam;
        // this.myMove;
        // this.turnNum;

        let myHealthBar;
        let oppHealthBar;

        this.battleState = {
            teamType: null,
            myMon: null,
            oppMon: null,
            myTeam: null,
            oppTeam: null,
            myMove: null,
            turnNum: 0
        }

    }

    // Function that fires as soon as this scene's create() method starts
    start(){

    }


    //Different tests can be pasted here for quick testing
    // CURRENTLY: 
    pokeTest(){
        console.log(this.battleState.myMon)
    }

    turnReturn(res){
        // this.battleState = res
        this.battleState = res

        this.myHealthBar.updateHp(res.myMon.health)
        this.oppHealthBar.updateHp(res.oppMon.health)

        
        // this.myHealthBar.updateHp();
        // this.oppHealthBar.updateHp();

    }


    // Axios GET request for pokemon teams; populates myTeam, oppTeam, myMon, and oppMon properties
    getTeams(a,b){
        axios.get('/pokemon/' + a + '/team')
            .then((res)=>{
                this.battleState.myMon = res.data.active
                this.battleState.myTeam = res.data.roster
            })
            .catch((err)=>{
                console.log(err)
            })
        axios.get('/pokemon/' + b + "/team")
            .then((res)=>{
                this.battleState.oppMon = res.data.active
                this.battleState.oppTeam = res.data.roster
            })
            .catch((err)=>{
                console.log(err)
            })
    }


    // Function choosing move and POST request to server to take that info (as well as all battle info) and return the result of the turn.
    pickMove(move){
        axios.post('/turnChoice/' + move,
        {
            // In the future; maybe treeshake battleState?
            battleState: this.battleState
        })
        .then((res)=>{
            // console.log(res.data)
            // console.log(this.battleState)

            this.turnReturn(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    // UI Builds move boxes
    buildMoves(){
        let xBuild = 100
        this.battleState.myMon.moves.forEach((move)=>{
            new Move(this, move, xBuild, 550).create()
            xBuild += 135;
        })
    }

    // UI Builds team boxes
    buildTeams(){
         new TeamBox(this, "team goes here", 80, 70).create()
            .setInteractive().on('pointerup', ()=>{
               this.scene.start('switch')
            },this);
         new TeamBox(this, "enemy team goes here", 530, 70).create();
    }

    // UI Builds health bars
    buildHealthBars(){
        this.myHealthBar.create();
        this.oppHealthBar.create();
    }

    init(data){
        console.log(data)
        switch (data.type){
            case "fire": 
                this.getTeams("Charizard","Blastoise")
                break;
            case "water":
                this.getTeams("Blastoise","Venusaur")
                break;
            case "grass":
                this.getTeams("Venusaur","Charizard")
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
        let myMon = this.add.sprite(150, 420, this.battleState.myMon.name + "User").setDepth(1);
        let oppMon = this.add.sprite(450, 420, this.battleState.oppMon.name).setDepth(1);
        this.myHealthBar = new HealthBox(this, this.battleState.myMon,220, 70)
        this.oppHealthBar = new HealthBox(this, this.battleState.oppMon, 380, 70)

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
            this.pokeTest();

            // this.pickMove(this.myMove);
            // this.battleState.myMon.takeDamage(10)

        })


        oppMon.setInteractive().on("pointerup", ()=>{
            // this routes to a different scene
            console.log(this.battleState)
        }, this)
    

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