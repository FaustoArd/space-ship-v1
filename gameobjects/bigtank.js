import Explosion from "./explosion";
import BigTankMissile from './bigtankmissile';

const TYPES = {
    bigTank: { points: 800,lives: 1}
}

export default class BigTank extends Phaser.Physics.Arcade.Sprite {
    animsCreated= false;
    constructor(scene, x, y,name) {
        super(scene, x, y, "bigtank");
        this.name = "bigtank";
        this.points = TYPES[name].points;
        this.scene = scene;
        this.id = Math.random();
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.scene.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.bigTankMissile;
        this.bigTankDestroyed = false;
        this.init();

    }

    init() {
        if(this.animsCreated)return;
        this.scene.anims.create({
            key: "bigtankidle",
            frames: this.scene.anims.generateFrameNumbers("bigtank", {
                start: 0,
                end: 0,
            }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: "bigtankopen",
            frames: this.scene.anims.generateFrameNumbers("bigtank", {
                start: 1,
                end: 2,
            }),
            frameRate: 5,
            repeat: 0
        });

        this.scene.anims.create({
            key: "bigtankFullopen",
            frames: this.scene.anims.generateFrameNumbers("bigtank", {
                start: 3,
                end: 3,
            }),
            frameRate: 5,
            repeat: 0
        });

         this.scene.anims.create({
             key: "bigtankdestroyed",
             frames: this.scene.anims.generateFrameNumbers("bigtank", {
                 start: 4,
                 end: 4,
             }),

             frameRate: 5,
             repeat: 0
         });
        this.animsCreated = true;

    }

    update(bigTankEnabled,player) {
       
       if(this.dead)return;
        if (bigTankEnabled) {
            this.anims.play("bigtankFullopen", true);
            
            return false;
        } else {
            if (this.x - player.x < 400 ) {
                this.shootMissile(player);
                this.anims.play("bigtankopen", true);
                return true;
            }
            return false;

        }
        


    }

    shootMissile(player){
      
        if(this.bigTankMissile){
           this.bigTankMissile.update(this.scene,this,player);
        }else{
            this.scene.playAudio("foemissile")
            this.bigTankMissile  =  new BigTankMissile(this.scene,this.x-10,this.y-50,"bigtank_missile");
            this.scene.bigTankMissileGroup.add(this.bigTankMissile);
        }
   
    
    }
    destroy() {
        this.dead = true;
       this.bigTankDestroyed = true;
       
    }

  

    bigTankX = 0;
    bigTankY= 0;
    explode() {
        if(!this.bigTankDestroyed){
            this.bigTankX = this.x;
            this.bigTankY = this.y;
            let radius = 100;
            let explosionRad = 100;
            const explosion = this.scene.add.circle(this.x, this.y, 5)
                .setStrokeStyle(20, 0x563b14);
            this.showPoints(this.points);
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
            this.anims.play("bigtankdestroyed", true);
             this.destroy();
        }else{
            return;
        }
       


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