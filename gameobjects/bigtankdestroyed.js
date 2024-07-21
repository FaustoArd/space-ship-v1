export default class BigTankDestroyed extends Phaser.Physics.Arcade.Sprite{
    animsCreated= false;
    constructor(scene,x,y,name = "bigtankdestroyed"){
        super(scene,x,y,name);
        this.name = name;
        this.scene = scene;
        this.id = Math.random();
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.scene.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.init();
    }

    init(){
        if(this.animsCreated)return;
        this.scene.anims.create({
            key: "bigtankdestroyed",
            frames: this.scene.anims.generateFrameNumbers("bigtankdestroyed", {
                start: 0,
                end: 0,
            }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.play("bigtankdestroyed", true);
    }
}