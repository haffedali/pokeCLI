export default class Start extends Phaser.Scene {
    constructor() {
        super("start")

    }


    preload(){
        this.load.image("fire","./assets/sprites/fire.png")
        this.load.image("water","./assets/sprites/water.png")
        this.load.image("leaf","./assets/sprites/leaf.png")
    }


    create(){
        // console.log("start")
        // var fireCircle = new Phaser.Geom.Circle(300, 200, 100);
        // var waterCircle = new Phaser.Geom.Circle(200, 400, 100);
        // var leafCircle = new Phaser.Geom.Circle(400, 400, 100);
        
        let fireType = this.add.sprite(300,200,'fire').setDepth(1)
        let waterType = this.add.sprite(200,400,'water')
        let leafType = this.add.sprite(400,400,'leaf')
        
        fireType.type = "Charizard"
        waterType.type = "Blastoise"
        leafType.type = "Venusaur"

        fireType.setInteractive().on("pointerdown", ()=>{
            this.scene.start("battle", {type:fireType.type})
        })

        waterType.setInteractive().on("pointerdown", ()=>{
            this.scene.start("battle",{type:waterType.type})
        })

        leafType.setInteractive().on("pointerdown", ()=>{
            this.scene.start("battle",{type:leafType.type})
        })

    }
}