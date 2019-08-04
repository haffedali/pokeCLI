import Start from '../scenes/Start.js'
import Battle from '../scenes/Battle.js'
import Switch from '../scenes/Switch.js'

class BootScene extends Phaser.Scene {
    constructor(){
        super({
            key: "BootScene",
        })
    }

    preload(){
        this.scene.start('start')
    }
}


var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#ababab',
    parent: 'gameContainer',
    scene: [BootScene,Start,Battle,Switch]
};

const socket = io.connect('http://localhost:8080')


var game = new Phaser.Game(config);
