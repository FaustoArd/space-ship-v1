export default class FlareReward extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,name){
        super(scene,x,y,name= "bigtank");
        this.name = name;
        this.id= Math.random();
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.scene.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.init();
    }

    init(){

    }
}