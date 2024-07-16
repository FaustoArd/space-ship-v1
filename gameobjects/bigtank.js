export default class BigTank extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene, x, y, "bigtank");
        this.name = "bigtank";
        this.scene = scene;
       
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.scene.add.existing(this);
        this.body.setCollideWorldBounds(true);

        this.init();

    }

    init(){
        this.scene.anims.create({
            key:"bigtankidle",
            frames: this.scene.anims.generateFrameNumbers("bigtank",{
                start:0,
                end: 0,
            }),
            frameRate:5,
            repeat:-1
        });
        this.scene.anims.create({
            key:"bigtankopen",
            frames: this.scene.anims.generateFrameNumbers("bigtank",{
                start:1,
                end: 2,
            }),
            frameRate:5,
            repeat:-1
        });

        this.scene.anims.create({
            key:"bigtankFullopen",
            frames: this.scene.anims.generateFrameNumbers("bigtank",{
                start:3,
                end: 3,
            }),
            frameRate:5,
            repeat:-1
        });


    }

    update(bigTankEnabled,playerX){
        if(bigTankEnabled){
            this.anims.play("bigtankFullopen", true);
            return false;
        }else{
            if(this.x - playerX < 400){
                this.anims.play("bigtankopen", true);
                return true;
            }
               
        }
        
    }

    destroy(){
        this.dead = true;
        this.body.enable = false;
    }


}