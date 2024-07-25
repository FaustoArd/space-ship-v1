import Explosion from './explosion';

const TYPES = {
  asteroid: {color: 0x716F60,radius:16, intensity: 0.4 },
}

export default class Asteroid extends Phaser.GameObjects.PointLight{

   

    constructor(scene,x,y ,type= "asteroid", playerName, velocityX, velocityY,circleSize){

        const {color,radius, intensity} = TYPES[type];
        super(scene,x,y,color,radius,intensity);
        this.name = "shot";
        this.playerName = playerName;
        this.circleSize = circleSize;
        var randomRadius = Phaser.Math.Between(8,30);
        this.radius = randomRadius;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setVelocityX(velocityX);

        this.body.setVelocityY(velocityY);
        this.body.setCircle(randomRadius);
        this.body.setOffset(1,2);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
       // this.spawnShadow(x, y, velocityX, velocityY);
        this.init();
    }

    init() {
        this.scene.tweens.add({
          targets: this,
          duration: 200,
          intensity: { from: 0.2, to: 0.4 },
          repeat: 0,
        });
      }

      explode(){
        let radius = 100;
        let explosionRad = 100;
        const explosion = this.scene.add.circle(this.x, this.y, 5)
            .setStrokeStyle(20, 0x563b14);
       // this.showPoints(this.points);
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
      }
}