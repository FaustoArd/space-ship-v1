export default class Generator{
    constructor(scene){
        this.scene = scene;
       // this.scene.time.delayedCall(50,() => this.init(),null,this);
       // this.pinos = 0;
       this.init();
    }

    init(){
        this.generateCloud();
    }
    generateCloud(){
        new Cloud(this.scene);
        this.scene.time.delayedCall(
           0,
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
        const alpha = 1 / Phaser.Math.Between(30,31);
        this.setScale(alpha);
        this.init();
    }
    init(){
        this.scene.tweens.add({
            targets : this,

            x: {from: 0, to: 18000},
            duration : 12000,
             onComplete: () => {
             this.destroy();
             } ,
        });
    }

}