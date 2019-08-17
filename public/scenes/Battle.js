import Move from "../objects/move.js";
import TeamBox from '../objects/teamBox.js';
import HealthBox from "../objects/healthBox.js";
import SwitchButton from "../objects/switchButton.js";
import PokemonSprite from "../objects/pokemonSprite.js";
// import axios from "axios";



export default class Battle extends Phaser.Scene {
    // For now team and pokemon will be stored clientside
    // When we roll out multiplay, maybe create a firebase instance for each game
    // Then kill the instance when battle is over
    constructor() {
        super("battle");
        this.myHealthBar;
        this.oppHealthBar;
        this.user1Sprite;
        this.user2Sprite;
        let user1;
        let user2;
        this.moveX = 100

        this.field;

    }

    // Function that fires as soon as this scene's create() method starts
    start(){
            this.buildTeamBoxes();
    }


    //Different tests can be pasted here for quick testing
    // CURRENTLY: 
    static pokeTest(){
        console.log(this.field)
        this.start()

    }




    /**
     * turnReturn is invoked on the return of an updated Field state from the server.
     * 
     * @param {Object} res A new Field state returned by the server
     */
    turnReturn(res){
        // this.battleState = res
        this.field = res;

        this.myHealthBar.updateHp(res.user1Mon.health);
        this.oppHealthBar.updateHp(res.user2Mon.health);

    }


    /**
     * Axios GET request for pokemon teams; populates myTeam, oppTeam, myMon, and oppMon properties
     * Also is responsible for setting up the inital field state   <--- IMPORTANT
     * @param {*} a 
     * @param {*} b 
     */
    getTeams(a,b){
        axios.get('/pokemon/' + a + '/team')
            .then((res)=>{
                this.field = res.data
            })
            .catch((err)=>{
                console.log(err)
            })
    }


    // Function choosing move and POST request to server to take that info (as well as all battle info) and return the result of the turn.
    pickMove(move){
        axios.post('/turnChoice/' + move)
        .then((res)=>{
            console.log(res.data)
            // console.log(this.battleState)
    
            this.turnReturn(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }



    /**
     * A general use function that switches the active pokemon in the field data as well as the gui
     * 
     * @param {string} mon The name of the desired switch 
     */
    switchPokemon(mon){
        switch(mon){
            case "charizard":
                console.log('hello')
                console.log(this)
                break;
            default:
                break;
        }
    }


    // UI Builds move boxes
    buildMoves(){
        let xBuild = 100
        this.field.user1Mon.moves.forEach((move)=>{
            new Move(this, move, xBuild, 550).create()
            xBuild += 135;
        })
    }

    // UI Builds team boxes
    buildTeamBoxes(){
         new TeamBox(this, "team goes here", 80, 70).create()
            .setInteractive().on('pointerup', ()=>{
               this.scene.switch('switch')
            },this);
         new TeamBox(this, "enemy team goes here", 530, 70).create();
    }

    // UI Builds health bars
    // buildHealthBars(){
    //     this.myHealthBar.create();
    //     this.oppHealthBar.create();
    // }

    buildMons(){
        this.user1.create();
        this.user2.create();
    }

    async buildSwitchButton(){
        this.switchButton.create()
    }

    async interactSwitchButton(){
        this.switchButton.setInteractive().on('pointerup',()=>{
            console.log('test it worked please fucking god i am trash at this i need guidance')
        })
    }





    init(data){
        console.log(data)
        if (data.switch){
            switch(data.switch){
                case "charizard": 
                    // this.switchPokemon(data.lead)
                    // SwitchMon method here
                break;
            case "blastoise":
                    // switch pokemon function use here
                break;
            case "venusaur":
                    // switch pokemon function use here
                break;

            }
        }
        else if (data.type){
            switch (data.type){
            case "charizard": 
                this.getTeams("Charizard","Blastoise")
                break;
            case "blastoise":
                this.getTeams("Blastoise","Venusaur")
                break;
            case "venusaur":
                this.getTeams("Venusaur","Charizard")
                break;
            }
        }

    }

    preload()
    {
        this.load.image('switchMon', './assets/sprites/switchMon.png');
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



    // Start refractoring this code and creating class objects for different sprites
    // and buttons
    create(){


        this.add.image(0,0,'battleBackground').setDepth(-1);
        this.add.text(20,20,"Battle")




        let testBall = this.add.sprite(300, 300, "pokeball").setDepth(1);


        // Adds string 'User' for dynamic loading (a reversed version of sprite)
        // let myMon = this.add.sprite(150, 420, this.field.user1Mon.name + "User").setDepth(1);
        // let oppMon = this.add.sprite(450, 420, this.field.user2Mon.name).setDepth(1);

        // myMon.setInteractive().on('pointerdown', ()=>{
        //     console.log()
        // })

        // Adding All Sprites and Objects to the scene
        // Add reference with 'this' for easier access to object methods
        this.myHealthBar =this.add.existing(new HealthBox(this,this.field.user1Mon,220,70));
        this.oppHealthBar = this.add.existing(new HealthBox(this,this.field.user2Mon,380,70));
        
        this.field.user1Mon.moves.forEach((move)=>{
            this.add.existing(new Move(this,move,this.moveX,550))
            if (this.moveX + 135 < 506){
                this.moveX += 135
            }else{
                this.moveX = 100
            }
        })
        
        this.user1Sprite = this.add.existing(new PokemonSprite(this,this.field.user1Mon,150,420))
        this.user2Sprite = this.add.existing(new PokemonSprite(this,this.field.user2Mon,450,420))

//80 70 
//530 70

        this.add.existing(new SwitchButton(this,80,70))   
        this.add.existing(new SwitchButton(this,530,70))
        // this.switchButton = new SwitchButton(this, 600, 400);


        // this.user1.setInteractive().on("pointerdown", ()=>{
        //     let x = this.user1.x;
        //     let y = this.user1.y;
        //     this.buildMoves();
        //     this.buildTeamBoxes();
        //     this.buildHealthBars();
        //     this.buildSwitchButton()
        // })

        // this.user1.displayWidth *=2
        // this.user1.displayHeight *=2
        // this.user2.displayWidth *=2
        // this.user2.displayHeight *=2
        

        ////////////////////////////////////////////////////////////////


        testBall.setInteractive().on("pointerdown", ()=>{
            this.pokeTest();

            // this.pickMove(this.field.user1Move);

        })


        // this.user2.setInteractive().on("pointerup", ()=>{
        //     console.log(this.field)
        // })
    

        ////////////////////////////////////////////////////////////////


        // this.user1.on('pointerover', function () {
    
        //     this.setTint(0x00ff00);
    
        // });
    
        // this.user1.on('pointerout', function () {
    
        //     this.clearTint();
    
        // });
    
        // this.input.setDraggable(this.user1);
    
        // this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    
        //     gameObject.x = dragX;
        //     gameObject.y = dragY;
    
        // });
    

    

    
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