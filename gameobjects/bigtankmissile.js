import Explosion from "./explosion";

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

    destroy() {
        this.dead = true;
        this.body.enable = false;
    }

    explode() {
        console.log("bigtank_missile explode!!!")
        let radius = 100;
        let explosionRad = 100;
        const explosion = this.scene.add.circle(this.x, this.y, 5)
            .setStrokeStyle(20, 0x563b14);
        //this.showPoints(this.points);
        this.scene.tweens.add({
            targets: explosion,
            radius: { from: 10, to: radius },
            alpha: { from: 1, to: 0.3 },
            duration: 550,
            onComplete: () => {
                explosion.destroy();
            },
        });
        new Explosion(this.scene, this.x, this.y, explosionRad);
        this.destroy();


    }
}
