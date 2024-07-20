import ShootingPatterns from '../gameobjects/shootingpatterns';
import Explosion from "./explosion";
import Flare from "./flare";


export default class Player extends Phaser.Physics.Arcade.Sprite {
    playerYTurnUp = -300;
    playerYTurnDown = 300;
    playerTurnUp = false;
    playerTurnDown = false;
    playerLeftTurnUp = false;
    playerLeftTurnDown = false;
    directionRight;
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
        this.body.setGravity(0);
        this.body.setSize(42, 24);
        this.init();
        this.jumping = false;
        this.building = false;
        this.falling = false;
        this.mjolnir = false;
        this.walkVelocity = 150;
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

    update() {
        this.bigTankEnabled =  this.scene.foes.update(this.bigTankEnabled,this);
        //RIGHT
        if(this.cursors.right.isDown){
            this.directionRight = true;
            this.body.setVelocityX(this.walkVelocity);
            this.anims.play("playermove")
             //LEFT
        }else if(this.cursors.left.isDown){
            this.directionRight = false;
            this.body.setVelocityX(-this.walkVelocity);
            this.anims.play("playermoveleft")
            //UP, DIRECTION RIGHT
        } else if(this.cursors.up.isDown&&this.directionRight){
            this.anims.play("playerup", true);
            this.y -= 1.8;
            this.body.setVelocityX(this.walkVelocity);
        }
        //DOWN, DIRECTION RIGHT
        else if(this.cursors.down.isDown&&this.directionRight){
            this.anims.play("playerdown", true);
            this.y += 1.8;
            //DOWN, DIRECTION LEFT
        }else if(this.cursors.down.isDown&&!this.directionRight){
            this.anims.play("playerdownleft", true);
            this.y += 1.8;
            this.body.setVelocityX(-this.walkVelocity);
            //UP, DIRECTION LEFT
        }else if(this.cursors.up.isDown&&!this.directionRight){
            this.anims.play("playerupleft", true);
            this.y -= 1.8;
        }
        //UP RIGHT
        if(this.cursors.up.isDown&&this.directionRight){
            this.anims.play("playerup", true);
            this.y -= 1.8;
            this.body.setVelocityX(this.walkVelocity);
        }
        //UP LEFT
        if(this.cursors.up.isDown&&!this.directionRight){
            this.anims.play("playerupleft", true);
            this.y -= 1.8;
        }
        //DOWN RIGHT
        if(this.cursors.down.isDown&&this.directionRight){
            this.anims.play("playerdown", true);
            this.y += 1.8;
        }
        //DOWN LEFT
        if(this.cursors.down.isDown&&!this.directionRight){
            this.anims.play("playerdownleft", true);
            this.y += 1.8;
          
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.shoot();
        }
       
    }

    fireFlare(){
        const flare = new Flare(this.scene,this.x-10,this.y+20)
        this.scene.flareGroup.add(flare);
        
    }

    getPlayerX() {
        return this.x;
    }
    getPlayerY() {
        return this.y;
    }

    shoot() {
        if (this.playerTurnUp)  {
            this.ShootingPatterns.shoot(this.x + 30, this.y-20, 'laser', this.playerYTurnUp,this.right);
            
        } 
        else if (this.playerTurnDown) {
            this.ShootingPatterns.shoot(this.x + 30, this.y+10, 'laser', this.playerYTurnDown,this.right);
        }
        else if(this.playerLeftTurnUp&&!this.playerTurnUp) {
            this.ShootingPatterns.shoot(this.x - 30, this.y-20, 'laser', this.playerYTurnUp,this.right);
        }
         else if(this.playerLeftTurnDown&&!this.playerTurnDown){
             this.ShootingPatterns.shoot(this.x - 30, this.y+10, 'laser', this.playerYTurnDown,this.right);
         }

        else if(!this.right){
            this.ShootingPatterns.shoot(this.x - 30, this.y-10, 'laser', 0,this.right);
        }
        else if(this.right){
            this.ShootingPatterns.shoot(this.x +30, this.y-10, 'laser', 0,this.right);
        }
      

    }

    destroy() {
        this.dead = true;
        this.body.enable = false;
       
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
        this.anims.play("playerexplosion", true);
        new Explosion(this.scene, this.x, this.y, explosionRad);
        
        this.destroy();


    }

}