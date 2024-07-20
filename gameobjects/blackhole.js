export default class BlackHole extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y, name= "blackhole", velocityX = 0, velocityY = 0){
        super(scene,x,y,name);
        this.name = name;
        this.scene = scene;
       // this.points = TYPES[name].points;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.id = Math.random();
        this.body.setGravity(2000);
        this.body.setGravityX(0);
        this.body.setGravityY(0)
        this.rotation += 0.01;
        this.body.setAllowGravity(true);
        this.body.setCircle(19);
         this.body.setOffset(12, 12);
         this.body.setVelocityX(velocityX);
         this.body.setVelocityY(velocityY);
         this.body.setCollideWorldBounds(true);
         this.init();
    }

    init(){
        this.scene.anims.create({
            key: "blackhole",
            frames: this.scene.anims.generateFrameNumbers("blackhole",{
                start:0,
                end:8,
            }),
            frameRate:15,
            repeat: -1,
        });
        this.anims.play("blackhole", true);
        this.direction = -1;
        this.animsCreated = true;
    }
}