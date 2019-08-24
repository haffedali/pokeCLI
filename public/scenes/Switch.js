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
        this.team = this.game.scene.scenes[2].field.user1Team
        // console.log(this.team)
    }

    create(){
        let first = this.add.sprite(100, 125, 'switchBall').setDepth(-3);
        let second = this.add.sprite(100,325, 'switchBall').setDepth(-3);
        let third = this.add.sprite(100,525, 'switchBall').setDepth(-3)

        // let firstSprite = this.add.sprite(0,0, this.team.team['first'].name).setDepth(-2);
        // let secondSprite = this.add.sprite(0,0, this.team.team['second'].name).setDepth(-2);
        // let thirdSprite = this.add.sprite(0,0, this.team.team['third'].name).setDepth(-2);


        for (let i=0;i<this.team.length;i++){
            let sprite = this.add.sprite(0,0, this.team[i].name);
            sprite.name = this.team[i].name;
            switch(i){
                case 0:
                    sprite.setOrigin(0.5);
                    sprite.setX(first.getCenter().x)
                    sprite.setY(first.getCenter().y)
                    break;
                case 1:
                        sprite.setOrigin(0.5);
                        sprite.setX(second.getCenter().x)
                        sprite.setY(second.getCenter().y)
                    break;
                case 2:
                        sprite.setOrigin(0.5);
                        sprite.setX(third.getCenter().x)
                        sprite.setY(third.getCenter().y)
                    break;
            }

            sprite.setInteractive().on('pointerup',()=>{
                this.scene.sleep('switch');
                this.scene.start('battle',{launch:sprite.name})
            },this)
        }
        // firstSprite.name = this.team.team['first'].name
        // secondSprite.name = this.team.team['second'].name
        // thirdSprite.name = this.team.team['third'].name
        
        // firstSprite.setOrigin(0.5);
        // firstSprite.setX(first.getCenter().x)
        // firstSprite.setY(first.getCenter().y)

        // secondSprite.setOrigin(0.5);
        // secondSprite.setX(second.getCenter().x)
        // secondSprite.setY(second.getCenter().y)

        // thirdSprite.setOrigin(0.5);
        // thirdSprite.setX(third.getCenter().x)
        // thirdSprite.setY(third.getCenter().y)

        // firstSprite.setInteractive().on('pointerup',()=>{
        //     console.log(firstSprite.name)
        //     this.scene.sleep('switch');
        //     this.scene.launch('battle',{launch:'charizard'})
        // },this);

        // secondSprite.setInteractive().on('pointerup',()=>{
        //     console.log(secondSprite.name)
        //     this.scene.sleep('switch');
        //     this.scene.launch('battle'),{launch:'blastoise'}
        // },this);

        // thirdSprite.setInteractive().on('pointerup',()=>{
        //     console.log(thirdSprite.name)
        //     this.scene.sleep('switch');
        //     this.scene.launch('battle'),{launch:'venusaur'}
        // },this);

    }
}