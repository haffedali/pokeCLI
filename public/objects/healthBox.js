// This file is now HAFFEDS BEST PRACTICE FOR POKEMON SCHOOL

//  ... for now at least




/**
 * 
 * 
 * 
 * 
 * @param scene Reference and access to scene
 * @param mon 
 */
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

    

    updateHp(){
        if (this.x>220){
            this.text.setText(this.scene.field.user2Mon.health)
            if (this.scene.field.user2Mon.health <= 0){
                console.log("fainted")
            }
        } else {
            this.text.setText(this.scene.field.user1Mon.health)
            if (this.scene.field.user1Mon.health <= 0){
                console.log(this.scene.user1Sprite)
                this.scene.user1Sprite.angle -= 90;
            }
        }
    }



}