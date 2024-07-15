
const TYPES = {
    star: { points: 400,lives: 1}
}
export default class Foe extends Phaser.GameObjects.Sprite{
   constructor(scene, x, y, name= "star", velocityX = 0, velocityY = 0){
    super(scene, x, y, name);
    this.name = name;
    //this.points = TYPES[name].points;
    //this.lievs = TYPES[name].lives;
    this.id = Math.random();
   this.spawnShadow(x,y);
   scene.add.existing(this);
   scene.physics.add.existing(this);
   this.body.setAllowGravity(false);
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
    this.anims.play("star", true);
    this.direction = -1;
   }

   update(){
    this.anims.play("star", true);
    this.shadow.destroy();
    this.destroy();
   }

   

}