// This file is now HAFFEDS BEST PRACTICE FOR POKEMON SCHOOL

//  ... for now at least






export default class HealthBox extends Phaser.Scene {
    constructor(scene, mon, x, y){
        super(scene)
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.healthBox;
        this.healthText;
        this.health = mon.health;
        this.opp = false;
        if (x > 220){
            this.opp = true;
        }
    }


    create(){
        if (this.opp === false){
            this.healthBox = this.scene.add.sprite(this.x,this.y,'healthBarUser');
        }
        else{
            this.healthBox = this.scene.add.sprite(this.x,this.y,'healthBar');
        }

        this.healthText = this.scene.add.text(this.x,this.y, this.health);

        this.healthText.setOrigin(0.5);
        this.healthText.setX(this.healthBox.getCenter().x);
        this.healthText.setY(this.healthBox.getCenter().y);
    }

    updateHp(num){

        this.healthText.setText(num)
    }
}