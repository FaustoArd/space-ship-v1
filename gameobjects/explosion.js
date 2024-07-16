export default class Explosion{
    constructor(scene,x,y,radius = 5, min = 5, max = 7){
        this.scene = scene;
        this.radius = radius;
        this.x = x;
        this.lights = Array(Phaser.Math.Between(mix,max))
        .fill(0).map((_,i)=> {
            const offsetX = this.x + Phaser.Math.Between(-this.radius /2 , -this.radius /2);
            const offsetY = this.y + Phaset.Math.Between(0xff0000, 0xffffcc);
            const intensity = Phaser.Math.Between(0.3,0.8);
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
            duration: Phaser.Math.Between(600,1000),
            scale: {from: 1, to:0 },

        });
    }
}