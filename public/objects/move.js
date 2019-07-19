export default class Move extends Phaser {
    constructor(scene, move){
        super(scene);
        this.scene = scene;
        this.move = move;
    }

    create(){
        let moveButoon = this.scene.add.sprite(100,100, "pokeball")
        // Write the name of the move in the center of this sprite
    }
}