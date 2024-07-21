import Phaser from 'phaser';
import Player from "../gameobjects/player";
import Generator from '../gameobjects/generator';
import FoeGenerator from '../gameobjects/foegenerator';



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
    playerDead = false;

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
        this.addPlayer();
        this.addShots();
        this.addStars();
        this.addBigTankMissiles();
        this.addFlares();
        this.addScores();
        this.addBlackHoles();
        this.addBigTankDestroyed();
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
    addStars() {
        this.foeGroup = this.add.group();
        this.foeWaveGroup = this.add.group();
        this.foes = new FoeGenerator(this);
    }

    addBlackHoles(){
        this.blackHoleGroup = this.add.group();
    }

    addBigTankDestroyed(){
        this.bigTankDestroyedGroup = this.add.group();
    }

    addShots() {
        this.shotsLayer = this.add.layer();
        this.shots = this.add.group();
    }

    addBigTankMissiles() {
        this.bigTankMissileGroup = this.add.group();
    }

    addFlares() {
        this.flareGroup = this.add.group();
    }

    update() {

        if (this.playerDead) return;
        this.recyclePlatform();
        this.player.update();


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
        // this.physics.add.overlap(
        //     this.player,
        //     this.bigTank,
        //     this.playerExplode,
        //     () => {
        //         return true;
        //     },
        //     this
        // );
        this.physics.add.collider(
            this.player,
            this.platformGroup,
            this.playerExplode,
            () => {
                return true;
            },
            this
        );

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
            this.player,
            this.blackHoleGroup,
            this.playerExplode,
            () => {
                return true;
            },
            this
        );
        this.physics.add.overlap(
            this.shots,
            this.blackHoleGroup,
            this.shootBlackHoleSuccesful,
            () => {
                return true;
            },
            this
        );

        this.physics.add.overlap(
            this.player,
            this.bigTankMissileGroup,
            this.playerMissileExplode,
            () => {
                return true;
            },
            this
        );
        this.physics.add.overlap(
            this.foeGroup,
            this.bigTankMissileGroup,
            this.starMissileExplode,
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
            this.bigTankDestroyedGroup,
            this.shootBigTankDestroyedSuccesfull,
            () => {
                return true;
            },
            this
        );
        this.physics.add.overlap(
            this.player,
            this.bigTankDestroyedGroup,
            this.playerExplode,
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
        this.physics.add.overlap(
            this.bigTankMissileGroup,
            this.flareGroup,
            this.flareMissileExplode,

            () => {
                return true;
            },
            this
        );
        this.physics.add.overlap(
            this.player,
            this.flareGroup,
            this.playerExplode,

            () => {
                return true;
            },
            this
        );


        this.physics.world.on("worldbounds", this.onWorldBounds);
    }

    flareMissileExplode(bigtank_missile, flare) {
        bigtank_missile.explode();
    }

    playerExplode() {
        console.log("player explode");
        this.player.explode();
        this.playerDead = true;
    }
    playerMissileExplode(player, bigtank_missile) {
        this.player.explode();
        this.playerDead = true;
        bigtank_missile.explode();
    }

    starMissileExplode(foe, bigtank_missile) {
        if (foe.name === 'star') {
            foe.explode();
            bigtank_missile.explode();
           
        }

    }

    missileExplode(bigtank_missile) {
        bigtank_missile.explode();

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
    shootBigTankDestroyedSuccesfull(shot,bigTankDestroyed){
       shot.destroy();
    }
    shootBlackHoleSuccesful(shot){
        shot.destroy();
    }

    shotStarSuccessfull(shot, foe) {
        console.log("shot star!!!")
        foe.explode();
        shot.destroy();
        this.updateScore("player",foe.points);

    }

    addScores() {
        this.scores = {
            player: {},
        };
        this.scores['player']["scoreText"] = this.add.bitmapText(150, 16, "wendy", String(this.registry.get("score_player"))
            .padStart(6, "0"), 50).setOrigin(0.5).setScrollFactor(0);


    }

    updateScore(playerName, points = 0) {
        const score = +this.registry.get("score_" + playerName) + points;
        this.registry.set("score_" + playerName, score);
        this.scores["player"]["scoreText"].setText(String(score).padStart(6, "0")
        );

        this.tweens.add({
            targets: this.scores["player"]["scoreText"],
            duration: 200,
            tint: {from: 0x000ff, to: 0xffffff},
            scale: {from: 1.2, to: 1},
            repeat: 2,
        });
    }

    onWorldBounds(body, t) {
        const name = body.gameObject.name.toString();
        if (["foeshot", "shot"].includes(name)) {
            // body.gameObject.shadow.destroy();
            body.gameObject.destroy();
        }
    }






}