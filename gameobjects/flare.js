export default class Flare extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,name="flare",velocityX = 50,velocityY= 100){
        super(scene,x,y,name);
        this.name = name;
        this.id = Math.random();
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setCircle(19);
        this.body.setOffset(12,12);
        this.body.setVelocityX(velocityX);
        this.body.setVelocityY(velocityY);
        this.init();


    }

    init(){
        this.scene.anims.create({
            key:this.name,
            frames: this.scene.anims.generateFrameNumbers(this.name),
            frameRate:15,
            repeat: -1,
        });
        this.anims.play(this.name,true);
    }
   

}