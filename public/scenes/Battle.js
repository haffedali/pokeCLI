import typeDict from "../util/typeDict.js";
// import decision from "../util/decision.js"
import calc from "../util/newCalc.js"

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
        $.ajax({
            url:"/pokemon/" + mon,
        }).then((res) =>{
           this.myMon = res
        })

        //Ajax for blastoise, then build calc function
        $.ajax({
            url:"/pokemon/Blastoise"
        }).then((res)=>{
            this.oppMon = res
        })
    }

    getTeam(mon){
        $.ajax({
            url:"/pokemon/" + mon + "/team",
        }).then((res) =>{
           this.myTeam = res
        })
    }

    getMove(move){
        $.ajax({
            url:"/moves/" + move,
        }).then((res)=>{
            this.myMove = res
        })
    }

    buildPokemon(){

    }


    init(data){
        console.log(data.type)
        this.teamType = data.type;
        this.getPokemon(data.type)
        this.getTeam(data.type)
        window.localStorage.setItem("pokemon","Are Great");
    }

    preload()
    {
        this.load.image('pokeball', './assets/sprites/pokeball-small.png');
        this.load.image('charizard','./assets/sprites/charizard-r.png');
        this.load.image('blastoise','./assets/sprites/blastoise.png');
        this.load.image('venusaur','./assets/sprites/venusaur.png');
    }
    create(){
        this.add.text(20,20,"Battle")

        this.getMove("Flamethrower")

        let testBall = this.add.sprite(300, 300, "pokeball-small").setDepth(1);
        let charizard = this.add.sprite(200, 500, 'charizard-r').setDepth(1);
        let blastoise = this.add.sprite(400, 500, 'blastoise').setDepth(1);
        charizard.name = "Charizard";
        blastoise.name = "Blastoise";

        charizard.setInteractive().on("pointerdown", ()=>{
            let x = charizard.x;
            let y = charizard.y;
        })
        
        testBall.setInteractive().on("pointerdown", ()=>{
            let damage = calc(this.myMon, this.oppMon, this.myMove)
           console.log(damage)
        })
    
        charizard.on('pointerover', function () {
    
            this.setTint(0x00ff00);
    
        });
    
        charizard.on('pointerout', function () {
    
            this.clearTint();
    
        });
    
        this.input.setDraggable(charizard);
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    
            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });
    

    
        //Blastoise on click
        blastoise.setInteractive().on("pointerup", ()=>{
            this.scene.start("start")
        }, this)
    
    }
}