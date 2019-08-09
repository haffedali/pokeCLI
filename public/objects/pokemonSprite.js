export default class PokemonSprite extends Phaser.GameObjects.Sprite {
    constructor(scene,mon,x,y){
        super(scene,mon,x,y)
        this.opp = false;
        if (x > 200){
            this.setTexture(mon.name)
        }
        else{
            this.setTexture(mon.name + "User")
        }
        this.setPosition(x,y)
        this.displayWidth *= 2;
        this.displayHeight *= 2;
    }
}

