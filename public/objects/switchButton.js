

// export default class SwitchButton extends Phaser.Scene {
//     constructor(scene,x,y){
//         super(scene);
//         this.scene = scene;
//         this.switchButton;
//         this.x = x;
//         this.y = y;
//     }

//     create(){
//        this.switchButton = this.scene.add.sprite(this.x,this.y,'switchMon')

//     //    this.switchButton.setInteractive().on('pointerup', ()=>{
//     //        this.scene.start('switch')
//     //    },this);

//         // this.switchButton.setInteractive().on('pointerup',()=>{
//         //     this.click()
//         // })
//     }

//     click(){
//         // console.log('click')
//         // this.scene.start('switch');
//     }
// }

export default class SwitchButton extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene, x, y)
        this.setTexture('switchBall')
        this.setPosition(x,y)
        this.setInteractive().on('pointerup',()=>{
            this.click()
        })

    }

    click(){
        this.scene.scene.start('switch')
    }        
}