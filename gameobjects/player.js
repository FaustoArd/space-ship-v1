import ShootingPatterns from '../gameobjects/shootingpatterns';
import Explosion from "./explosion";
import Flare from "./flare";
import Shot from './shot';


export default class Player extends Phaser.Physics.Arcade.Sprite {

    playerYTurnUp = -300;
    playerYTurnDown = 300;
    playerTurnUp = false;
   // playerTurnDown = false;
   // playerLeftTurnUp = false;
   // playerLeftTurnDown = false;
    directionRight;
    straightShoot;
    rightUp = false;
    rightDown = false;
    leftUp= false;
    leftDown=false;
    flaresLeft = 50;
    constructor(scene, x, y,name="player", health = 10) {
        super(scene, x, y, "ship");


        this.setOrigin(0.5);
        this.name= name;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.spaceBar = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        );
        this.right = true;
        //this.body.setGravity(0);


        this.body.setSize(42, 24);
        this.body.setOffset(12,7)
        this.init();
        this.jumping = false;
        this.building = false;
        this.falling = false;
        this.mjolnir = false;
        this.walkVelocity = 150;
        this.superSpeed = 400;
        this.superSpeedAvailable = 50;
        this.invincible = false;
        this.health = health;
        this.dead = false;
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(true);
        this.ShootingPatterns = new ShootingPatterns(this.scene, 'player1')
        this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.C = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.Z = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.RIGHTUP = this.scene.input.keyboard.addKeys(Phaser.Input.Keyboard.KeyCodes.RIGHT,Phaser.Input.Keyboard.KeyCodes.UP)
        this.cursors = this.scene.input.keyboard.createCursorKeys();
      
    }

    init() {
        this.scene.anims.create({
            key: "playeridle",
            frames: this.scene.anims.generateFrameNumbers("ship", {
                start: 0,
                end: 0,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "playermove",
            frames: this.scene.anims.generateFrameNumbers("ship", {
                start: 0,
                end: 0,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "playerup",
            frames: this.scene.anims.generateFrameNumbers("ship", {
                start: 1,
                end: 1,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "playerdown",
            frames: this.scene.anims.generateFrameNumbers("ship", {
                start: 2,
                end: 2,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "playeridleleft",
            frames: this.scene.anims.generateFrameNumbers("ship", {
                start: 3,
                end: 3,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "playermoveleft",
            frames: this.scene.anims.generateFrameNumbers("ship", {
                start: 3,
                end: 3,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "playerupleft",
            frames: this.scene.anims.generateFrameNumbers("ship", {
                start: 4,
                end: 4,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "playerdownleft",
            frames: this.scene.anims.generateFrameNumbers("ship", {
                start: 5,
                end: 5,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "playerexplosion",
            frames: this.scene.anims.generateFrameNumbers("ship", {
                start: 6,
                end: 9,
            }),
            frameRate: 3,
            repeat: 0,
        });

    }
    gravityEnabled= false;
    update() {
        this.smokeTail(this.directionRight);
        console.log(this.gravityEnabled)
        if(this.y>450){
           this.gravityEnabled = true;
           this.showGravity("G")
        }else{
           this.gravityEnabled = false;
        }
        this.rightUp = false;
        this.rightDown = false;
        this.leftUp= false;
        this.leftDown=false;
        this.bigTankEnabled =  this.scene.foes.update(this.bigTankEnabled,this);
        this.scene.shots.children.entries.forEach((shot)=>{
            if(this.x+600<shot.x||this.x-600>shot.x){
                shot.destroy();
            }
        })
        //RIGHT
        if(this.cursors.right.isDown){
            this.straightShoot =true;
            this.directionRight = true;
            this.playerTurnUp = false;
            this.body.setVelocityX(this.walkVelocity);
            this.anims.play("playermove")
             //LEFT
        }else if(this.cursors.left.isDown){
            this.playerTurnUp = false;
            this.straightShoot =true;
           this.directionRight = false;
            this.body.setVelocityX(-this.walkVelocity);
            this.anims.play("playermoveleft")
            //UP, DIRECTION RIGHT
        } else if(this.cursors.up.isDown&&this.directionRight){
            this.straightShoot =false;
            this.playerTurnUp = true;
            this.directionRight = true;
            this.anims.play("playerup", true);
            this.y -= 1.8;
            this.body.setVelocityX(this.walkVelocity);
        }
        //DOWN, DIRECTION RIGHT
        else if(this.cursors.down.isDown&&this.directionRight){
            this.straightShoot =false;
            this.playerTurnUp = false;
            this.directionRight = true;
            this.anims.play("playerdown", true);
            this.y += 1.8;
            this.body.setVelocityX(this.walkVelocity);
            //DOWN, DIRECTION LEFT
        }else if(this.cursors.down.isDown&&!this.directionRight){
            this.straightShoot =false;
            this.playerTurnUp = false;
            this.directionRight = false;
            this.anims.play("playerdownleft", true);
            this.y += 1.8;
            this.body.setVelocityX(-this.walkVelocity);
            //UP, DIRECTION LEFT
        }else if(this.cursors.up.isDown&&!this.directionRight){
            this.straightShoot =false;
            this.playerTurnUp = true;
            this.directionRight = false;
            this.anims.play("playerupleft", true);
            this.y -= 1.8;
            this.body.setVelocityX(-this.walkVelocity);
        }
        //RIGHT-UP
        if(this.cursors.up.isDown&&this.directionRight){
            this.rightUp= true;
            this.directionRight = true;
            this.straightShoot =false;
            this.playerTurnUp = true;
            this.anims.play("playerup", true);
            this.y -= 1.8;
            this.body.setVelocityX(this.walkVelocity);
        }
        //LEFT-UP 
        if(this.cursors.up.isDown&&!this.directionRight){
            this.leftUp = true;
            this.directionRight = false;
            this.straightShoot =false;
            this.playerTurnUp = true;
            this.anims.play("playerupleft", true);
            this.y -= 1.8;
            this.body.setVelocityX(-this.walkVelocity);
        }
        //RIGHT-DOWN
        if(this.cursors.down.isDown&&this.directionRight){
            this.rightDown = true;
            this.directionRight = true;
            this.straightShoot =false;
            this.playerTurnUp = false;
            this.anims.play("playerdown", true);
            this.y += 1.8;
            this.body.setVelocityX(this.walkVelocity);
        }
        //LEFT-DOWN
        if(this.cursors.down.isDown&&!this.directionRight){
            this.leftDown = true;
            this.directionRight = false;
            this.straightShoot =false;
            this.playerTurnUp = false;
            this.anims.play("playerdownleft", true);
            this.y += 1.8;
            this.body.setVelocityX(-this.walkVelocity);
          
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.shoot();
        }
        if(this.cursors.shift.isDown){
            this.body.setVelocityX(0);
        }
        if(Phaser.Input.Keyboard.JustDown(this.C)){
            if(this.flaresLeft<=0)return;
            this.fireFlare();
            this.flaresLeft -=1;
        }
        if(this.Z.isDown&&this.superSpeedAvailable>0){
            this.y -= 5.8;
            if(this.directionRight){
                this.body.setVelocityX(this.superSpeed);
                this.setVelocityTimeOut(this.walkVelocity);
            }else{
                this.body.setVelocityX(-this.superSpeed);
                this.setVelocityTimeOut(-this.walkVelocity);
            }
           
       
            }

           
       
       if(this.gravityEnabled){
       this.setVelocityY(+150)
       }else{
        this.setVelocityY(0);
       }



       
    }
    setVelocityTimeOut(velocityX){
        setTimeout(() =>{
            this.body.setVelocityX(velocityX);
        },800)
        this.superSpeedAvailable--;
    }

    fireFlare(){
        this.scene.playAudio("flare");
        let radius = 60;
        let explosionRad = 100;
       
        const explosion = this.scene.add.circle(this.x, this.y, 5)
        .setStrokeStyle(20, 0xf8f8f3);
    //this.showPoints(this.points);
    this.scene.tweens.add({

        targets: explosion,
        radius: { from: 10, to: radius },
        alpha: { from: 1, to: 0.3 },
        duration: 550,
        intensity: { from: 0.3, to: 0.7 },
        repeat:0,
        onComplete: () => {
            explosion.destroy();
        },
    });
         const flare = new Flare(this.scene,this.x-10,this.y+20)
         this.scene.flareGroup.add(flare);
         this.scene.cameras.main.shake(10,0.010);
        
    }

    getFlareReward(){
        this.flaresLeft += 5;
    }

    getPlayerX() {
        return this.x;
    }
    getPlayerY() {
        return this.y;
    }


    shoot() {
        this.scene.playAudio("shot");
      if(this.playerTurnUp&&!this.straightShoot&&this.directionRight){
        this.ShootingPatterns.shoot(this.x + 30, this.y-20, 'laser', this.playerYTurnUp,this.directionRight);
      }else if(!this.playerTurnUp&&!this.straightShoot&&this.directionRight){
        this.ShootingPatterns.shoot(this.x + 30, this.y+10, 'laser', this.playerYTurnDown,this.directionRight);
      }else if(this.playerTurnUp&&!this.straightShoot&&this.directionRight){
        this.ShootingPatterns.shoot(this.x - 30, this.y-20, 'laser', this.playerYTurnUp,this.directionRight);
      }
       else if(this.directionRight&&this.straightShoot){
        this.ShootingPatterns.shoot(this.x + 30, this.y-10, 'laser', 0,this.directionRight);
      }else if(!this.directionRight&&this.straightShoot){
        this.ShootingPatterns.shoot(this.x - 30, this.y-10, 'laser', 0,this.directionRight);
      }else if(this.leftUp){
        this.ShootingPatterns.shoot(this.x + 30, this.y-20, 'laser', this.playerYTurnUp,this.directionRight);
      }else if(this.leftDown){
        this.ShootingPatterns.shoot(this.x + 30, this.y+10, 'laser', this.playerYTurnDown,this.directionRight);
      }
      

    }

    destroyPlayer() {
        this.dead = true;
        this.body.enable = false;
       this.destroy();
       
       
    }

    explode() {
        let radius = 100;
        let explosionRad = 100;
        const explosion = this.scene.add.circle(this.x, this.y, 5)
            .setStrokeStyle(20, 0x563b14);
        //this.showPoints(this.points);
        this.scene.tweens.add({
            targets: explosion,
            radius: { from: 10, to: radius },
            alpha: { from: 1, to: 0.3 },
            duration: 550,
            onComplete: () => {
                explosion.destroy();
            },
        });
        this.scene.cameras.main.shake(700,0.010);
        this.anims.play("playerexplosion", true);
        new Explosion(this.scene, this.x, this.y, explosionRad);
       
        this.destroyPlayer();


    }

    showGravity(score, color=0xff0000){
        let text= this.scene.add.bitmapText(this.x +20, this.y -30, "wendy", "+" + score,40,color)
        .setOrigin(1.5);
        this.scene.tweens.add({
            targets: text,
            duration: 30,
            tint: { from:0xff0000, to: 0xff0000 },
            hold:0,
            alpha:{from:1, to:0},
            y: this.y-50,
            onComplete: ()=> {
                text.destroy;
            }
        });
    }

    smokeTail(playerRight){
        if(playerRight){
            const point = new Shot(this.scene, this.x-15, this.y-10, "laser", this.name,0,0);
            this.addSmokeTween(point);
        }else{
            const point = new Shot(this.scene, this.x+15, this.y-10, "laser", this.name,0,0);
            this.addSmokeTween(point);
        }
       
      
      

    }
    //scene, x, y, type = "laser", playerName, velocityX, velocityY
    addSmokeTween(point){
     
        this.scene.tweens.add({
            targets: point,
            duration: 100,
            alpha:{from:0.8, to:0.0},
            y: {from: this.y -10, to: this.y - 10},
             onComplete: ()=> {
                // point.destroy;
             }
            });
    }

    

}