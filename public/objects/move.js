
export default class Move extends Phaser.Scene {
    constructor(scene, move, x, y){
        super(scene);
        this.scene = scene;
        this.move = move;
        this.moveButton;
        this.x = x;
        this.y = y;
    }


    test(){
        console.log(this)
    }
    create(){
        this.moveButton = this.scene.add.sprite(this.x,this.y,"moveBox")
        this.moveButton.setInteractive().on('pointerup', ()=> {this.click()})
        let text = this.scene.add.text(this.x - 30, this.y, this.move)

        text.setOrigin(0.5)
        text.setX(this.moveButton.getCenter().x);
        text.setY(this.moveButton.getCenter().y);


        // Write the name of the move in the center of this sprite
    }

    click(){
        this.scene.field.user1Move = this.move;
        // this.scene.turnActive = true;
    }
}

