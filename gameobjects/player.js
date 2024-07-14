export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, health = 10){
        super(scene,x,y, "ship");
        this.setOrigin(0.5);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.spaceBar = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        );
        this.right = true;
        this.body.setGravity(100);
        this.body.setSize(48,60);
        this.init();
        this.jumping = false;
        this.building = false;
        this.falling = false;
        this.mjolnir = false;
        this.walkVelocity = 200;
        this.invincible =false;
        this.health = health;
        this.dead = false;
        this.body.setAllowGravity(false) ;

        this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        console.log("cursors: ",this.cursors)
    }

    init(){
        this.scene.anims.create({
            key:"playeridle",
            frames: this.scene.anims.generateFrameNumbers("ship",{
                start:0,
                end:0,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.anims.create({
            key:"playermove",
            frames: this.scene.anims.generateFrameNumbers("ship",{
                start:0,
                end:0,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.anims.create({
            key:"playerdown",
            frames: this.scene.anims.generateFrameNumbers("ship",{
                start:1,
                end:1,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.anims.create({
            key:"playerup",
            frames: this.scene.anims.generateFrameNumbers("ship",{
                start:2,
                end:2,
            }),
            frameRate: 3,
            repeat: -1,
        });
       
    }

    update(){
        if(this.cursors.up.isDown){
            console.log("!!!!")
            this.anims.play("playerup", true);
            this.velocityX = this.walkVelocity;
        }else if(this.cursors.down.isDown){
            this.anims.play("playerdown", true);
            this.velocityX = this.walkVelocity;
        }

        else if(this.cursors.right.isDown){
            this.anims.play("playermove")
            this.velocityX = this.walkVelocity;
        }
    }


}