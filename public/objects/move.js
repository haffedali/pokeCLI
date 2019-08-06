
export default class Move extends Phaser.GameObjects.Sprite {
    constructor(scene, move, x, y){
        super(scene,move,x,y);
        this.setTexture('moveBox')
        this.setPosition(x,y)
        this.move = move
        this.setText()
        this.setInteractive().on('pointerup',()=>{
            this.click()
        })
    }



    setText(){
        let text = this.scene.add.text(this.x-30,this.y,this.move).setDepth(3)
        text.setOrigin(0.5)
        text.setX(this.getCenter().x);
        text.setY(this.getCenter().y);
    }


    // Click has access to field, just making sure with the console log here
    click(){
        console.log(this.scene.field)
    }
}

