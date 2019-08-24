export default class PokemonSprite extends Phaser.GameObjects.Sprite {
    constructor(scene,mon,x,y){
        super(scene,mon,x,y)
        this.opp = false;
        this.setTexture(mon.name)
        this.setPosition(x,y)
        this.displayWidth *= 2;
        this.displayHeight *= 2;
    }

    updateSprite(newTexture){
        this.setTexture(newTexture);
    }
}

