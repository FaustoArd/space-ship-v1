import FoeShot from './foeshot';
import Explosion from './explosion';
const TYPES = {
    enemyship: {points: 1000, lives: 1},
}

export default class EnemyShip extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,name="enemyship", velocityX = 0,velocityY = 0){
        super(scene,x,y,name);
        this.name = name;
        this.points = TYPES[name].points;
        this.lives = TYPES[name].lives;
        this.id = Math.random();
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setCircle(19);
        this.body.setOffset(12,12);
        this.body.setVelocityX(velocityX);
        this.setData("vector", new Phaser.Math.Vector2());

        this.init();
    }

    init(){
        this.scene.anims.create({
            key: "enemyship",
            frames: this.scene.anims.generateFrameNumbers("enemyship", {
                start: 1,
                end: 1,
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.play("enemyship", true);
        }

        update(){
            let shot = new FoeShot(this.scene,this.x,this.y,"foe", this.name);
            this.scene.foeShots.add(shot);
            this.scene.physics.moveTo(
                shot,
                this.scene.player.x,
                this.scene.player.y,
                300
              );
        }

    
}