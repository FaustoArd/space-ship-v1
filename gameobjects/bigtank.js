import Explosion from "./explosion";

export default class BigTank extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "bigtank");
        this.name = "bigtank";
        this.scene = scene;
        this.id = Math.random();
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.scene.add.existing(this);
        this.body.setCollideWorldBounds(true);

        this.init();

    }

    init() {
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
            repeat: -1
        });

        this.scene.anims.create({
            key: "bigtankFullopen",
            frames: this.scene.anims.generateFrameNumbers("bigtank", {
                start: 3,
                end: 3,
            }),
            frameRate: 5,
            repeat: -1
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


    }

    update(bigTankEnabled, playerX) {
       if(this.dead)return;
        if (bigTankEnabled) {
            this.anims.play("bigtankFullopen", true);
            return false;
        } else {
            if (this.x - playerX < 400 ) {
                this.anims.play("bigtankopen", true);
                return true;
            }
            return false;

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

        new Explosion(this.scene, this.x, this.y, explosionRad);
        this.anims.play("bigtankdestroyed", true);
        this.destroy();


    }


}