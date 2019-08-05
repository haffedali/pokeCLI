export default class pokemonSprite extends Phaser.Scene {
    constructor(scene, mon, x, y){
        super(scene)
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.pokemonSprite;
        this.name = mon.name;
    }


    create(){
        this.pokemonSprite =  this.scene.add.sprite(this.x,this.y,this.pokemonSprite);


        
    }


}

