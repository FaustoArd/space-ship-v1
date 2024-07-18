import Phaser from 'phaser';
import Player from "../gameobjects/player";
import Generator from '../gameobjects/generator';
import FoeGenerator from '../gameobjects/foegenerator';
import Foe from '../gameobjects/foe';
import BigTank from '../gameobjects/bigtank';


const gameOptions = {
    platformStartSpeed: 0,
    spawnRange: [100, 350],
    platformSizeRange: [1200, 1200],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    jumps: 2
}

const bigTankPositions = [1000, 1700, 2800];

export default class Game extends Phaser.Scene {

    bigTankEnabled = false;
    bigTankDestroyed = false;
    playerDead= false;

    constructor() {
        super({ key: "game" });
        this.player = null;
       // this.bigTank = null;
        this.foe = null;
        this.score = 0;
        this.scoreText = null;
        this.stars;
    }

    init(data) {
        this.name = data.name;
        this.number = data.number;
    }

    preload() { }


    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;
        this.cameras.main.setBackgroundColor(0x000000);
        this.add.tileSprite(0, 0, 683 * 10, 768, "landscape").setOrigin(0.5);
        this.cameras.main.setBounds(0, 0, 20920 * 2, 20080 * 2);
        this.physics.world.setBounds(0, 0, 20920 * 2, 20080 * 2);
        this.lights.enable();
        this.lights.setAmbientColor(0x666666);
        this.bigTankEnabled = false;
        // this.createMap();
        this.addPlayer();
       // this.addBigTank();
      
        this.addShots();
       // this.addStar();
        this.addStars();
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05
            , 0, 240);
        this.physics.world.enable([this.player]);

        this.generator = new Generator(this);

        this.platformGroup = this.add.group({
            removeCallback: function (platform) {
                platform.scene.platformPool.add(platform)
            }
        });
        this.platformPool = this.add.group({

            removeCallback: function (platform) {
                platform.scene.platformGroup.add(platform);
            }
        });

        this.addPlatform(20000, this.width);
         //this.addFoes();
        this.addColliders();
       
       
    }
 addPlatform(platformWidth, posX) {
        let platform;
        if (this.platformPool.getLength()) {
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;


            this.platformPool.remove(platform);
        }
        else {
            platform = this.physics.add.sprite(posX, this.height * 0.8, "platform");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed);
            platform.setGravity(0);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    }

    addPlayer() {
        this.player = new Player(this, this.center_width, this.center_height, 0);
    }

    addBigTank() {
        this.bigTank = new BigTank(this, 1500, 580);


    }
   

    addStar(){
        this.foe = new Foe(this,this.player.getPlayerX()+500,350);
    }


    addStars() {
        this.foeGroup = this.add.group();
        this.foeWaveGroup = this.add.group();
        this.foes = new FoeGenerator(this);

    }

   

    addShots() {
        this.shotsLayer = this.add.layer();
        this.shots = this.add.group();
    }

    update() {
    
        if(this.playerDead) return;
        this.recyclePlatform();
        this.player.update();
      // this.foe.update();
       // if (this.number === 3 && this.player.y > 1500) this.restartScene();
        //this.bigTankEnabled = this.bigTank.update(this.bigTankEnabled, this.player.x);

    }

    recyclePlatform() {
        let minDistance = this.width;
        this.platformGroup.getChildren().forEach(function (platform) {
            let platformDistance = this.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if (platform.x < - platform.displayWidth / 2) {
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);

        // adding new platforms
        if (minDistance > this.nextPlatformDistance) {
            var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, this.width + nextPlatformWidth / 2);
        }
    }

    restartScene() {
        this.time.delayedCall(
            1000,
            () => {

                this.scene.start("game", { name: "STAGE", number: this.number });
            },
            null,
            this
        );
    }



    addColliders() {
        this.physics.add.overlap(
            this.player,
            this.bigTank,
            this.playerExplode,


            () => {
                return true;
            },
            this
        );
        this.physics.add.collider(
            this.player,
            this.platformGroup,
            this.playerExplode,


            () => {
                return true;
            },
            this
        );
        // this.physics.add.overlap(
        //     this.player,
        //     this.platformGroup,
        //     this.playerExplode,


        //     () => {
        //         return true;
        //     },
        //     this
        // );

        this.physics.add.overlap(
            this.player,
            this.foeGroup,
            this.playerExplode,


            () => {
                return true;
            },
            this
        );

        this.physics.add.overlap(
            this.shots,
            this.bigTank,
            this.shootBigTanksuccesfull,

            () => {
                return true;
            },
            this
        );
        this.physics.add.overlap(
            this.shots,
            this.platformGroup,
            this.shotPlatformSuccesfull,

            () => {
                return true;
            },
            this
        );
        this.physics.add.overlap(
            this.shots,
            this.foeGroup,
            this.shotStarSuccessfull,

            () => {
                return true;
            },
            this
        );
        this.physics.world.on("worldbounds", this.onWorldBounds);
    }

    playerExplode(){
        console.log("player explode")
        this.player.explode();
        this.playerDead = true;
    }

    shotPlatformSuccesfull(foe) {
      foe.destroy();

    }

    shootBigTanksuccesfull(shot, bigTank) {
        this.bigTankEnabled = false;
        const point = this.lights.addPointLight(shot.x, shot.y, 0xffffff, 10, 0.7);
        bigTank.explode();
        shot.destroy();


    }

    shotStarSuccessfull(shot,foe){
        console.log("shot star!!!")
       foe.explode();
       shot.destroy();

    }

    onWorldBounds(body, t) {
        const name = body.gameObject.name.toString();
        if (["foeshot", "shot"].includes(name)) {
           // body.gameObject.shadow.destroy();
            body.gameObject.destroy();
        }
    }


}