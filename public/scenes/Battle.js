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
        this.moves = [];
        this.moveX = 100;
        this.socket;

        // Must persist for user, grants access to document with unique string
        this.docRef;

        this.field;

    }

    // Function that fires as soon as this scene's create() method starts
    start(){
            this.buildTeamBoxes();
    }

    updateState(){
        axios.get('/pullGame')
            .then((res)=>{
                this.field = res.data
                this.updateClientUi();
            })
    }

    updateClientUi(){
        // Update pokemonSprite
        this.user1Sprite.updateSprite(this.field.user1Mon.name);
        // Destroy move boxes using array
        this.moves.forEach((moveSpriteBox)=>{
            moveSpriteBox.text.destroy();
            moveSpriteBox.destroy();
        })
        // Update move boxes and push to moves array
        this.buildMoves();
        // Update health box
        this.myHealthBar.updateHp();

        
    }


    //Different tests can be pasted here for quick testing
    // CURRENTLY: testing for firestore turnNum increment
    pokeTest(){
        // axios.post('test')
        //     .then((res)=>{
                
        //     })
        console.log(this.field);    
        axios.get('pullGame')
            .then((res)=>{
                console.log(res.data)
            })    
        // this.updateClientUi();
    }




    /**
     * turnReturn is invoked on the return of an updated Field state from the server.
     * 
     * @param {Object} res A new Field state returned by the server
     */
    turnReturn(res){
        // this.battleState = res
        console.log(res)
        this.field = res.data;

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

                // this.docRef.set({
                //     state:this.field
                // })

                // res.docref.set({
                //     state:this.field
                // })

                // .then(()=>{

                // })
                // .catch((err)=>{
                //     console.log(err)
                // })
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
        this.field.user1Mon.moves.forEach((move)=>{
            let tempMove = this.add.existing(new Move(this,move,this.moveX,550))
            if (this.moveX + 135 < 506){
                this.moveX += 135
            }else{
                this.moveX = 100
            }
            this.moves.push(tempMove);
        })
    }

    // UI Builds team boxes
    buildTeamBoxes(){
         new TeamBox(this, "team goes here", 80, 70).create()
            .setInteractive().on('pointerup', ()=>{
               this.scene.sleep('battle')
               this.scene.launch('switch')
            },this);
         new TeamBox(this, "enemy team goes here", 530, 70).create();
    }


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
        // this.docRef = db.collection('gameRooms').doc();

        if (data.launch){

            switch(data.launch){
                case "Blastoise": 
                    // this.switchPokemon(data.lead)
                    // SwitchMon method here

                    // Instead of post requests to handle business logic, we should build client side code to run turn logic and only send the modified state
                    axios.post('turnChoice/switch/' + data.launch,{
                        state:this.field
                    })
                    .then((res)=>{
                        this.updateState();
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                break;
            case "Flareon":
                    // switch pokemon function use here
                    axios.post('turnChoice/switch/' + data.launch,{
                        state:this.field
                    })
                    .then((res)=>{
                        this.updateState();
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                break;
            case "Pidgeot":
                    // switch pokemon function use here
                    axios.post('turnChoice/switch/' + data.launch,{
                        state:this.field
                    })
                    .then((res)=>{
                        this.updateState();
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                break;

            }
        }
        else if (data.type){
            console.log('Should fire only on first start')
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
        this.load.image('Clefable', './assets/sprites/clefable.png');
        this.load.image('Jolteon', './assets/sprites/jolteon.png')
        this.load.image('Flareon', './assets/sprites/flareon.png')
        this.load.image('Vaporeon', './assets/sprites/vaporeon.png')
        this.load.image('Pidgeot', './assets/sprites/pidgeot.png')
        this.load.image('Golem', './assets/sprites/golem.png')
        this.load.image('Machamp', './assets/sprites/machamp.png')
    }



    // Start refractoring this code and creating class objects for different sprites
    // and buttons
    create(){


        this.add.image(0,0,'battleBackground').setDepth(-1);
        this.add.text(20,20,"Battle")




        let testBall = this.add.sprite(300, 300, "pokeball").setDepth(1);




        // Adding All Sprites and Objects to the scene
        // Add reference with 'this' for easier access to object methods
        this.myHealthBar =this.add.existing(new HealthBox(this,this.field.user1Mon,220,70));
        this.oppHealthBar = this.add.existing(new HealthBox(this,this.field.user2Mon,380,70));
        


        this.buildMoves()
        
        this.user1Sprite = this.add.existing(new PokemonSprite(this,this.field.user1Mon,150,420))
        this.user1Sprite.flipX = true;
        this.user2Sprite = this.add.existing(new PokemonSprite(this,this.field.user2Mon,450,420))


        this.add.existing(new SwitchButton(this,80,70))   
        this.add.existing(new SwitchButton(this,530,70))
        // this.switchButton = new SwitchButton(this, 600, 400);



        

        ////////////////////////////////////////////////////////////////


        testBall.setInteractive().on("pointerdown", ()=>{
            this.pokeTest();

            // this.pickMove(this.field.user1Move);

        })


        // this.user2.setInteractive().on("pointerup", ()=>{
        //     console.log(this.field)
        // })
    

        ////////////////////////////////////////////////////////////////
    }

    
    update(){

    }
}