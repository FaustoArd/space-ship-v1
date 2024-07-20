import Explosion from './explosion';
import BlackHole from './blackhole';

const TYPES = {
    star: { points: 400,lives: 1}
}
export default class Star extends Phaser.Physics.Arcade.Sprite{
animsCreated= false;

   constructor(scene, x, y, name= "star", velocityX = 0, velocityY = 0){
    super(scene, x, y, name);
    this.name = name;
    this.scene = scene;
    this.points = TYPES[name].points;
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
    if(this.animsCreated)return;
    this.scene.anims.create({
        key: "starIdle",
        frames: this.scene.anims.generateFrameNumbers("star",{
            start:0,
            end:0,
        }),
        frameRate:3,
        repeat: -1,
    });
    this.scene.anims.create({
        key: "stardestroy",
        frames: this.scene.anims.generateFrameNumbers("star",{
            start:1,
            end:3,
        }),
        frameRate:3,
        repeat: -1,
    });
    // this.scene.anims.create({
    //     key: "blackhole",
    //     frames: this.scene.anims.generateFrameNumbers("star",{
    //         start:4,
    //         end:6,
    //     }),
    //     frameRate:3,
    //     repeat: -1,
    // });
    this.anims.play("starIdle", true);
    this.direction = -1;
    this.animsCreated = true;
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

   createBlackHole(star){
    const blackHole = new BlackHole(this.scene,star.x,star.y,"blackhole",0,0);
    this.scene.foeGroup.add(blackHole);
   }

   explode() {
    let radius = 100;
    let explosionRad = 100;
    const explosion = this.scene.add.circle(this.x, this.y, 5)
        .setStrokeStyle(20, 0x563b14);
        if(this.name==="star"){
            this.showPoints(this.points);
        }
   
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
    this.createBlackHole(this);
   this.destroy();



}

   
showPoints(score, color=0xff0000){
    let text= this.scene.add.bitmapText(this.x +20, this.y -30, "wendy", "+" + score,40,color)
    .setOrigin(0.5);
    this.scene.tweens.add({
        targets: text,
        duration: 800,
        alpha:{from:1, to:0},
        y: {from: this.y -20, to: this.y - 80},
        onComplete: ()=> {
            text.destroy;
        }
    });
}

}