

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
    parent: 'poop',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var bullets;
var ship;
var speed;
var stats;
var cursors;
var lastFired = 0;

var game = new Phaser.Game(config);



function fire(x,y){
    let bullet = bullets.get();

    if (bullet)
    {
        bullet.fire(x, y);

    }
}

function preload ()
{
    this.load.image('pokeball', './assets/sprites/pokeball-small.png');
    this.load.image('charizard','./assets/sprites/charizard.png');
    this.load.image('blastoise','./assets/sprites/blastoise.png');
    this.load.image('venusaur','./assets/sprites/venusaur.png');
}

function create ()
{
    var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'pokeball');

            this.speed = Phaser.Math.GetSpeed(400, 1);
        },

        fire: function (x, y)
        {
            this.setPosition(x, y - 50);

            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta)
        {
            this.y -= this.speed * delta;

            if (this.y < -50)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    bullets = this.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
    });

    ship = this.add.sprite(400, 500, 'charizard').setDepth(1);
    ship2 = this.add.sprite(200, 500, 'blastoise').setDepth(1);
    ship.name = "Charizard";
    ship2.name = "Blastoise";

    ship.setInteractive().on("pointerdown", ()=>{
        let x = ship.x;
        let y = ship.y;
        fire(x,y)
        console.log("ship 1 was clicked")
        getPokemon(ship.name);
    })


    ship.on('pointerover', function () {

        this.setTint(0x00ff00);

    });

    ship.on('pointerout', function () {

        this.clearTint();

    });

    this.input.setDraggable(ship);

    this.input.on('dragstart', function (pointer, gameObject) {

        gameObject.setTint(0xff0000);

    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragend', function (pointer, gameObject) {

        gameObject.clearTint();

    });

    
    ship2.setInteractive().on("pointerdown", ()=>{
        let x = ship2.x;
        let y = ship2.y;
        fire(x,y)
        console.log("ship 2 was clicked")
        getPokemon(ship2.name)
    })

    


    cursors = this.input.keyboard.createCursorKeys();

    speed = Phaser.Math.GetSpeed(300, 1);
}


function update (time, delta)
{



    if (cursors.left.isDown)
    {
        ship.x -= speed * delta;
    }
    else if (cursors.right.isDown)
    {
        ship.x += speed * delta;
    }

    if (cursors.up.isDown && time > lastFired)
    {
        var bullet = bullets.get();

        if (bullet)
        {
            bullet.fire(ship.x, ship.y);

            lastFired = time + 50;
        }
    }
}
