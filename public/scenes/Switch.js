export default class Switch extends Phaser.Scene {
    constructor(){
        super("switch")
        this.team;
    }

    preload(){
        // this.load.image('switchBall', './assets/sprites/switchBall.png');
        // this.load.image('charizard','./assets/sprites/charizard.png');
        // this.load.image('blastoise', './assets/sprites/blastoise.png');
        // this.load.image('venusaur','./assets/sprites/venusaur.png');
        this.load.image('CharizardUser','./assets/sprites/charizardR.png');
        this.load.image('Charizard', './assets/sprites/charizard.png');
        this.load.image('Blastoise','./assets/sprites/blastoise.png');
        this.load.image('BlastoiseUser','./assets/sprites/blastoiseR.png');
        this.load.image('Venusaur','./assets/sprites/venusaur.png');
        this.load.image('VenusaurUser','./assets/sprites/venusaurR.png');
        this.load.image('Clefable', './assets/sprites/clefable.png');
        this.load.image('Jolteon', './assets/sprites/jolteon.png')
        this.load.image('Flareon', './assets/sprites/flareon.png')
        this.load.image('Vaporeon', './assets/sprites/vaporeon.png')
        this.load.image('Pidgeot', './assets/sprites/pidgeot.png')
        this.load.image('Golem', './assets/sprites/golem.png')
        this.load.image('Machamp', './assets/sprites/machamp.png')
    }

    init(){
        this.team = this.game.scene.scenes[2].field.user1
        console.log(this.team)
    }

    create(){
        let first = this.add.sprite(100, 125, 'switchBall');
        let second = this.add.sprite(100,325, 'switchBall');
        let third = this.add.sprite(100,525, 'switchBall')

        let firstSprite = this.add.sprite(0,0, this.team.active.name);
        let secondSprite = this.add.sprite(0,0, this.team.roster[0].name);
        let thirdSprite = this.add.sprite(0,0, this.team.roster[1].name);

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
            this.scene.switch('battle',{switch:'charizard'})
        },this);

        secondSprite.setInteractive().on('pointerup',()=>{
            this.scene.switch('battle'),{switch:'blastoise'}
        },this);

        thirdSprite.setInteractive().on('pointerup',()=>{
            this.scene.switch('battle'),{switch:'venusaur'}
        },this);

    }
}