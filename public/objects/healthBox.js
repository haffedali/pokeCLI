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
        this.health = mon.health
        this.text;
        this.setPosition(x,y)

        this.setInteractive().on('pointerup',()=>{
            this.click()
        })

        this.setText();
    }

    setText(){
        this.text = this.scene.add.text(this.x,this.y,this.health).setDepth(3);
        this.text.setOrigin(0.5)
        this.text.setX(this.getCenter().x)
        this.text.setY(this.getCenter().y)
    }

    click(){
        this.health -= 30
        this.text.setText(this.health)
    }


}