import Phaser from 'phaser';
import Player from "../gameobjects/player";
import Generator from '../gameobjects/generator';

const gameOptions = {
    platformStartSpeed: 0,
    spawnRange: [100, 350],
    platformSizeRange: [1200, 1200],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    jumps: 2
}

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
        this.player = null;
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
      // this.createMap();
        this.addPlayer();
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05
            , 0, 240);
        this.physics.world.enable([this.player]);
        this.generator = new Generator(this);
        this.addColliders();
        this.platformGroup = this.add.group({
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });
        this.platformPool = this.add.group({
            
                removeCallback: function(platform){
                    platform.scene.platformGroup.add(platform);
                }
            });

            this.addPlatform(20000, this.width );

        // this.platforms = this.physics.add.staticGroup();
        // this.platforms.create(600, 702, 'platform1')
        // .setScale(3.12).refreshBody();
       // this.backgrounds= this.physics.add.staticGroup();
       // this.backgrounds.create(850,555,'background1');
     

    }

    addPlatform(platformWidth, posX){
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
           
           
            this.platformPool.remove(platform);
        }
        else{
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

    update() {
        this.recyclePlatform();
    
        this.player.update();
        if (this.number === 3 && this.player.y > 1500) this.restartScene();
    }

    recyclePlatform(){
        let minDistance = this.width;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = this.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
 
        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
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

    createMap() {
       
         this.tileMap = this.make.tilemap({
             key: "scene" + this.number,
             tileWidth: 64,
             tileHeight: 64,
         });
       // console.log(this.tileMap);
        // this.platform = this.tileMap.createLayer(
        //     "scene" + this.number,
        //     this.tileSet
        // );
       // this.tileSetBg = this.tileMap.addTilesetImage("background");
       
        //this.tileMap.createLayer("background", this.tileSetBg);
     
    }

    addColliders(){
        this.physics.add.collider(
            this.player,
            this.backgrounds,
           
        )
    }


}