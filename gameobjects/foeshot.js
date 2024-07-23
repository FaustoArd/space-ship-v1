const TYPES= {
    normal:{color: 0xfff01f, radius: 4, intensity: 0.4  }

};

export default class FoeShot extends Phaser.GameObjects.PointLight{
    constructor(scene,x,y, type="normal", playerName, velocityX = -300, velocityY = 0){
        const { color, radius, intensity } = TYPES[type];
        super(scene, x, y, color, radius, intensity);
        this.name = "foeShot";
        this.scene = scene;
        this.playerName = playerName;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.body.setCircle(10);
    this.body.setOffset(6, 9);

    this.init();
    }

    init(){
        this.scene.tweens.add({
            targets: this,
            duration:200,
            intensity: {from: 0.3, to:0.7},
            repeat: -1,
        });
    }

    shot() {
        const explosion = this.scene.add
          .circle(this.x, this.y, 5)
          .setStrokeStyle(10, 0xffffff);
        this.showPoints(50);
        this.scene.tweens.add({
          targets: explosion,
          radius: { from: 1, to: 5 },
          alpha: { from: 1, to: 0 },
          duration: 250,
          onComplete: () => {
            explosion.destroy();
          },
        });
        this.destroy();
      }
}