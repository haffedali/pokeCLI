export default class Battle extends Phaser.Scene {
    constructor() {
        super("battle");
        var teamType;
        var myTeam;
        var oppTeam;
        var myMon;
        var oppMon;
    }


    getPokemon(mon){
        let response;
        $.ajax({
            url:"/pokemon/" + mon,
        }).then((res) =>{
           this.myMon = res
        })

    }

    buildPokemon(){

    }


    init(data){
        console.log(data.type)
        this.teamType = data.type;
        this.getPokemon(data.type)
        window.localStorage.setItem("pokemon","Are Great");
    }

    preload()
    {
        this.load.image('pokeball', './assets/sprites/pokeball-small.png');
        this.load.image('charizard','./assets/sprites/charizard.png');
        this.load.image('blastoise','./assets/sprites/blastoise.png');
        this.load.image('venusaur','./assets/sprites/venusaur.png');
    }
    create(){
        this.add.text(20,20,"Battle")



        let charizard = this.add.sprite(400, 500, 'charizard').setDepth(1);
        let blastoise = this.add.sprite(200, 500, 'blastoise').setDepth(1);
        charizard.name = "Charizard";
        blastoise.name = "Blastoise";

        charizard.setInteractive().on("pointerdown", ()=>{
            let x = charizard.x;
            let y = charizard.y;
            console.log(this.myMon)
            console.log(this.teamType)
        })
    
    
        charizard.on('pointerover', function () {
    
            this.setTint(0x00ff00);
    
        });
    
        charizard.on('pointerout', function () {
    
            this.clearTint();
    
        });
    
        this.input.setDraggable(charizard);
    
        this.input.on('dragstart', function (pointer, gameObject) {
    
            gameObject.setTint(0xff0000);
    
        });
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    
            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });
    
        this.input.on('dragend', function (pointer, gameObject) {
    
            gameObject.clearTint();
    
        });
    
        //Blastoise on click
        blastoise.setInteractive().on("pointerup", ()=>{
            this.scene.start("start")
        }, this)
    
    }
}