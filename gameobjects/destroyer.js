import Explosion from './explosion';
import bigTankMissile from './bigtankmissile';
const TYPES = {
    destroyer: {points: 3200, lives:1}
}

export default class Destroyer extends Phaser.Physics.Arcade.Sprite{
    animsCreated = false;
    constructor(scene,x,y,name= "destroyer"){
        super(scene,x,y,name);
        this.name = name;
        this.points = TYPES[name].points;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.id = Math.random();
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.scene.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.bigTankMissile;
        this.bigTankDestroyed = false;
        this.init();
    }

    init(){
        this.scene.anims.create({
            key: "destroyer",
            frames: this.scene.anims.generateFrameNumbers("destroyer", {
                start: 0,
                end: 0,
            }),
            frameRate: 5,
            repeat: 0
        });
        this.animsCreated = true;
        this.anims.play("destroyer", true);
    }

    // update(player){
    //     if(this.x-1000<=player.x){
    //         this.shootMissile(player);
    //     }
    // }

}