export default class FlareReward extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,name){
        super(scene,x,y,name= "flarereward");
        this.name = name;
        this.id= Math.random();
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.scene.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.setScale(3);
        this.init();
    }

    init(){
        this.scene.anims.create({
            key: "flarereward",
            frames: this.scene.anims.generateFrameNumbers("flarereward", {
                start: 0,
                end: 0,
            }),
            frameRate: 5,
            repeat: -1
        });
    }

    getFlareReward(){
        
        this.dead = true;
        this.body.enable = false;
        this.destroy(true);
       
    }
}