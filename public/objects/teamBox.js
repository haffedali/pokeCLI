export default class TeamBox extends Phaser.Scene {
    constructor(scene, team, x, y){
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.teamBox;
        this.ballOne;
        this.ballTwo;
        this.ballThree;
    }

    create(){
        return this.teamBox = this.scene.add.sprite(this.x,this.y,'switchBall');

    }
}