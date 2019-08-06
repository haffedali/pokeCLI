// This file is now HAFFEDS BEST PRACTICE FOR POKEMON SCHOOL

//  ... for now at least


export default class HealthBox extends Phaser.GameObjects.Sprite {
    constructor(scene, mon, x, y){
        super(scene,x,y)
        if (x > 220){
            this.setTexture('healthBar')
        }
        else{
            this.setTexture('healthBarUser')
        }
        this.setPosition(x,y)
    }


}