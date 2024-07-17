import ShootingPatterns from '../gameobjects/shootingpatterns';



export default class Player extends Phaser.Physics.Arcade.Sprite {
    playerYTurnUp = -300;
    playerYTurnDown = 300;
    playerTurnUp = false;
    playerTurnDown = false;
    constructor(scene, x, y, health = 10) {
        super(scene, x, y, "ship");
        this.setOrigin(0.5);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.spaceBar = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        );
        this.right = true;
        this.body.setGravity(1);
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
            key: "playerdown",
            frames: this.scene.anims.generateFrameNumbers("ship", {
                start: 1,
                end: 1,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "playerup",
            frames: this.scene.anims.generateFrameNumbers("ship", {
                start: 2,
                end: 2,
            }),
            frameRate: 3,
            repeat: -1,
        });

    }

    update() {
        this.playerTurnUp = false;
        this.playerTurnDown = false;
        this.velocityX = this.walkVelocity;
        if (this.cursors.up.isDown) {
            this.anims.play("playerup", true);
            this.y -= 1.8;
            this.playerTurnUp = true;
            this.playerTurnDown = false;

        } else if (this.cursors.down.isDown) {
            this.anims.play("playerdown", true);
            this.y += 1.8;
            this.playerTurnUp = false;
            this.playerTurnDown = true;

        }
        else if (this.cursors.right.isDown) {
            this.right = true;
            this.flipX = this.body.velocity.x < 0;
            this.body.setVelocityX(this.walkVelocity);
            this.anims.play("playermove")

        } else if (this.cursors.left.isDown) {
            this.anims.play("playermove", true);
            this.body.setVelocityX(0);
        } else {
            this.anims.play("playermove", true);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.shoot();
        }
    }

    getPlayerX() {
        return this.x;
    }

    shoot() {
        if (this.playerTurnUp)  {
            this.ShootingPatterns.shoot(this.x + 30, this.y-20, 'laser', this.playerYTurnUp);
        } else if (this.playerTurnDown) {
            this.ShootingPatterns.shoot(this.x + 30, this.y+10, 'laser', this.playerYTurnDown);
        } else {
            this.ShootingPatterns.shoot(this.x + 30, this.y-10, 'laser', 0);
        }

    }

}