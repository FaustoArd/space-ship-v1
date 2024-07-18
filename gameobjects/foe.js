import Explosion from './explosion';

const TYPES = {
    star: { points: 400,lives: 1}
}
export default class Foe extends Phaser.Physics.Arcade.Sprite{
   constructor(scene, x, y, name= "star", velocityX = 0, velocityY = 0){
    super(scene, x, y, name);
    this.name = name;
    this.scene = scene;
    //this.points = TYPES[name].points;
    //this.lievs = TYPES[name].lives;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.id = Math.random();
  // this.spawnShadow(x,y);
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

   spawnShadow(x,y){
    this.shadow = this.scene.add.image(x +20, y +20, this.name)
    .setScale(0.7)
    .setTint(0x000000)
    .setAlpha(0.4);
   }

   updateShadow(){
    this.shadow.x = this.x + 20;
    this.shadow.y = this.y + 20;
   }

   init(){
    this.scene.anims.create({
        key: "star",
        frames: this.scene.anims.generateFrameNumbers("star",{
            start:0,
            end:2,
        }),
        frameRate:3,
        repeat: -1,
    });
    this.scene.anims.create({
        key: "stardestroy",
        frames: this.scene.anims.generateFrameNumbers("star",{
            start:3,
            end:3,
        }),
        frameRate:3,
        repeat: -1,
    });
    this.scene.anims.create({
        key: "blackhole",
        frames: this.scene.anims.generateFrameNumbers("star",{
            start:4,
            end:6,
        }),
        frameRate:3,
        repeat: -1,
    });
    this.anims.play("star", true);
    this.direction = -1;
   }

   update(){
    
   // this.anims.play("star", true);
    // this.shadow.destroy();
    // this.destroy();
   }

   destroy(){
    this.dead = true;
    this.body.enable = false;
   }

   explode() {
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
    this.anims.play("blackhole", true);
   // this.destroy();


}
   

}