import Start from '../scenes/Start.js'
import Battle from '../scenes/Battle.js'
// function getPokemon(mon){

//     $.ajax({
//         url:"/pokemon/" + mon,
//     }).then((res) =>{
//         console.log(res)
//     })
// }


class BootScene extends Phaser.Scene {
    constructor(){
        super({
            key: "BootScene",
        })
    }

    preload(){
        console.log(this)
        this.scene.start('start')
    }
}


let test = "stillGlobal"




var config = {
    type: Phaser.WEBGL,
    width: 600,
    height: 600,
    backgroundColor: '#ababab',
    parent: 'gameContainer',
    scene: [BootScene,Start,Battle]
};

var game = new Phaser.Game(config);
