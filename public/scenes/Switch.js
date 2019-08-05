export default class Switch extends Phaser.Scene {
    constructor(){
        super("switch")
    }

    preload(){
        this.load.image('switchBall', './assets/sprites/switchBall.png');
        this.load.image('charizard','./assets/sprites/charizard.png');
        this.load.image('blastoise', './assets/sprites/blastoise.png');
        this.load.image('venusaur','./assets/sprites/venusaur.png');
    }

    create(){
        let first = this.add.sprite(100, 125, 'switchBall');
        let second = this.add.sprite(100,325, 'switchBall');
        let third = this.add.sprite(100,525, 'switchBall')

        let firstSprite = this.add.sprite(0,0, 'charizard');
        let secondSprite = this.add.sprite(0,0, 'blastoise');
        let thirdSprite = this.add.sprite(0,0, 'venusaur');

        firstSprite.setOrigin(0.5);
        firstSprite.setX(first.getCenter().x)
        firstSprite.setY(first.getCenter().y)

        secondSprite.setOrigin(0.5);
        secondSprite.setX(second.getCenter().x)
        secondSprite.setY(second.getCenter().y)

        thirdSprite.setOrigin(0.5);
        thirdSprite.setX(third.getCenter().x)
        thirdSprite.setY(third.getCenter().y)

        firstSprite.setInteractive().on('pointerup',()=>{
            this.scene.start('battle',{lead:'charizard'})
        },this);

        secondSprite.setInteractive().on('pointerup',()=>{
            this.scene.start('battle'),{lead:'blastoise'}
        },this);

        thirdSprite.setInteractive().on('pointerup',()=>{
            this.scene.start('battle'),{lead:'venusaur'}
        },this);

    }
}