// import axios from 'axios';

export default class Move extends Phaser.GameObjects.Sprite {
    constructor(scene, move, x, y){
        super(scene,move,x,y);
        this.setTexture('moveBox')
        this.setPosition(x,y)
        this.move = move
        this.text
        this.setText()
        this.setInteractive().on('pointerdown',()=>{
            this.click();
        })
        this.setInteractive().on('pointerover',()=>{
            this.setTint(0x32CD32)
        })
        this.setInteractive().on('pointerout', ()=>{
            this.clearTint()
        })
    }



    setText(){
        this.text = this.scene.add.text(this.x-30,this.y,this.move).setDepth(3)
        this.text.setOrigin(0.5)
        this.text.setX(this.getCenter().x);
        this.text.setY(this.getCenter().y);
    }


    // Click has access to field, just making sure with the console log here
    click(){
        axios.get('/turnChoice/' + this.move)
            .then((res)=>{
                this.scene.field = res.data;
                // console.log("Response from api call", res.data);
                this.scene.myHealthBar.updateHp();
                this.scene.oppHealthBar.updateHp();
            })
    }

    updateMoveText(){
        for (let i=0;i<this.game.scene.scenes[2].field.user1Mon.moves.length;i++){
            
        }
    }
}

