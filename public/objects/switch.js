import Battle from "../scenes/Battle.js"

export default class SwitchButton extends Phaser.Scene {
    constructor(scene,x,y){
        super(scene);
        this.scene = scene;
        this.switchButton;
        this.x = x;
        this.y = y;
    }

    create(){
        this.switchButton = this.scene.add.sprite(this.x,this.y,'switchMon')
        this.switchButton.setInteractive().on('pointerup', ()=>{this.click()})
    }

    click(){
        console.log('click')
        this.scene.start('switch');
    }
}