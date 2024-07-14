export default class Generator{
    constructor(scene){
        this.scene = scene;
        this.scene.time.delayedCall(2000,() => this.init(),null,this);
       // this.pinos = 0;
    }

    init(){
        this.generateCloud();
    }
    generateCloud(){
      new Cloud(this.scene);
      this.scene.time.delayedCall(
        Phaser.Math.Between(200,500),
        ()=> this.generateCloud(),
        null,
        this
      );
    }
   

}

class Cloud extends Phaser.GameObjects.Rectangle{
    constructor(scene,x,y){
        const finalY = y || Phaser.Math.Between(0,700);
        super(scene, x, finalY, 98, 32, 0xffffff);
        scene.add.existing(this);
        const alpha = 1 / Phaser.Math.Between(35,40);
        this.setScale(alpha);
        this.init();
    }
    init(){
        this.scene.tweens.add({
            targets : this,
            x: {from: 1366, to: -100},
            duration : 2000 / this.scale,
            onComplete: () => {
                this.destroy();
            } ,
        });
    }

}