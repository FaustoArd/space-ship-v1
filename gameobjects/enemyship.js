import FoeShot from './foeshot';
import Explosion from './explosion';
import BigTankMissile from './bigtankmissile';
const TYPES = {
    enemyship: { points: 1000, lives: 1 },
}

export default class EnemyShip extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name = "enemyship", velocityX = 0, velocityY = 0) {
        super(scene, x, y, name);
        this.x = x;
        this.y = y;
        this.name = name;
        this.dead;
        this.bigTankMissile;
       this.points = TYPES[name].points;
        this.lives = TYPES[name].lives;
        this.id = Math.random();
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setCircle(19);
        this.body.setOffset(12, 12);
        this.body.setVelocityX(velocityX);
        this.setData("vector", new Phaser.Math.Vector2());
      

        this.init();
    }

    init() {
        this.scene.anims.create({
            key: "enemyship",
            frames: this.scene.anims.generateFrameNumbers("enemyship", {
                start: 1,
                end: 1,
            }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.play("enemyship", true);
    }

    shotCompleted = false;
    flag = 1;
    update(shotEnabled,player) {
        this.scene.physics.moveToObject(this, player, 100);
        if(this.dead)return;
        if (shotEnabled) {
           return false;
        } else {
            if (this.x - player.x < 600&& this.x - player.x > -1 ) {
              this.shootMissile(player);
               return true;
            }
            return false;

        }




    }

    generateShot() {
        this.generateEvent1 = this.scene.time.addEvent({
            delay: 3000,
            callback: () => this.shot(),
            callbackScope: this,
            repeat:0,
        });
       // this.shot();
    }
    shot() {
        let shot = new FoeShot(this.scene, this.x - 25, this.y, "normal", this.name);
        this.scene.foeShots.add(shot);
        this.scene.physics.moveTo(
            shot,
            this.scene.player.x,
            this.scene.player.y,

            500
        );
        this.flag++;
      
       
    }
    shootMissile(player){
       
        this.flag++;
        if(this.bigTankMissile){
           this.bigTankMissile.update(this.scene,this,player);
        }else{
            this.scene.playAudio("foemissile")
            this.bigTankMissile  =  new BigTankMissile(this.scene,this.x-10,this.y-50,"bigtank_missile");
            this.scene.bigTankMissileGroup.add(this.bigTankMissile);
        }
   
    
    }

    // destroy(){

    //     this.dead = true;
    //     this.body.enable = false;
    //     this.destroy(true);
    //      }
    explode() {

        let radius = 100;
        let explosionRad = 100;
        const explosion = this.scene.add.circle(this.x, this.y, 5)
            .setStrokeStyle(20, 0x563b14);
        if (this.name === "enemyship") {
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
        this.scene.cameras.main.shake(200, 0.010);
        new Explosion(this.scene, this.x, this.y, explosionRad);
        this.dead = true;
        this.destroy();



    }

    showPoints(score, color = 0xff0000) {
        let text = this.scene.add.bitmapText(this.x + 20, this.y - 30, "wendy", "+" + score, 40, color)
            .setOrigin(0.5);
        this.scene.tweens.add({
            targets: text,
            duration: 800,
            alpha: { from: 1, to: 0 },
            y: { from: this.y - 20, to: this.y - 80 },
            onComplete: () => {
                text.destroy;
            }
        });
    }


}