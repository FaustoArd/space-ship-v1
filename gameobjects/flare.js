const TYPES = {
    flare: {color: 0xffffff, radius: 3, intensity: 0.4 },
}

export default class Flare extends Phaser.GameObjects.PointLight{

    

    constructor(scene,x,y,type="flare",name="flare",velocityX = 50,velocityY= 60){
     
       const { color, radius, intensity } = TYPES[type];


       super(scene,x,y,color, radius, intensity);
        this.name = name;
        this.radius = 5;
        this.type = "flare";
        this.id = Math.random();
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setCircle(19);
        this.body.setOffset(12,12);
        this.body.setVelocityX(velocityX);
        this.body.setVelocityY(velocityY);
        this.lights = Array(Phaser.Math.Between(5, 7))
      .fill(0)
      .map((_, i) => {
        const offsetX =
          this.x + Phaser.Math.Between(-this.radius / 2, this.radius / 2);
        const offsetY =
          this.y + Phaser.Math.Between(-this.radius / 2, -this.radius / 2);
        const color = Phaser.Math.Between(0xff0000, 0xffffcc);
        const radius = Phaser.Math.Between(this.radius / 2, this.radius);
        const intensity = Phaser.Math.Between(0.3, 0.8);
        return scene.lights.addPointLight(
          offsetX,
          offsetY,
          color,
          radius,
          intensity
        );
      });
        this.init();


    }

    init(){
        this.scene.tweens.add({
            targets: this.lights,
            duration: Phaser.Math.Between(600, 1000),
            
            scale: { from: 1, to: 0 },
          });
        
    }
   

}