

function getPokemon(mon){

    $.ajax({
        url:"/pokemon/" + mon,
    }).then((res) =>{
        console.log(res)
    })
}

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'gameContainer',
    scene: [{
        preload: preload,
        create: create,
        update: update
    },"Boot"]
};

var bullets;
var ship;
var speed;
var stats;
var cursors;
var lastFired = 0;

var game = new Phaser.Game(config);


function preload ()
{

    this.load.image('pokeball', './assets/sprites/pokeball-small.png');
    this.load.image('charizard','./assets/sprites/charizard.png');
    this.load.image('blastoise','./assets/sprites/blastoise.png');
    this.load.image('venusaur','./assets/sprites/venusaur.png');
}

function create ()
{

}


function update (time, delta)
{

}
