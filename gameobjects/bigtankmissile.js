
export default class BigTankMissile extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, name ="bigtank_missile", velocityX = 20, velocityY = 20) {
       
        super(scene, x, y, name);
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
       
        //this.setData("vector", new Phaser.Math.Vector2());
    }

    init(){
        this.scene.anims.create({
            key:this.name,
            frames: this.scene.anims.generateFrameNumbers(this.name),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.play(this.name,true);
        this.direction = -1;
    }

    update(scene,enemy,player){
        this.enemyFollows(scene,enemy,player);
    }

    enemyFollows(scene,enemy,player){
        scene.physics.moveToObject(this, player, 120);
    }

    
}
