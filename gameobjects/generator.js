export default class Generator{
    constructor(scene){
        this.scene = scene;
        this.scene.time.delayedCall(Phaser.Math.Between(20, 200),() => this.init(),null,this);
       // this.pinos = 0;
    }

    init(){
        this.generateCloud();
    }
    generateCloud(){
      new Cloud(this.scene);
      this.scene.time.delayedCall(
        Phaser.Math.Between(50,100),
        ()=> this.generateCloud(),
        null,
        this
      );
    }
   

}

class Cloud extends Phaser.GameObjects.Rectangle{
    constructor(scene,x,y){
        const finalY = y || Phaser.Math.Between(0,550);
        super(scene, x, finalY, 98, 32, 0xffffff);
        scene.add.existing(this);
        const alpha = 1 / Phaser.Math.Between(35,40);
        this.setScale(alpha);
        this.init();
    }
    init(){
        this.scene.tweens.add({
            targets : this,
            x: {from: 20000, to: -100},
            duration : 10000,
            onComplete: () => {
                this.destroy();
            } ,
        });
    }

}