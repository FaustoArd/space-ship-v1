import Phaser from 'phaser';
import Player from "../gameobjects/player";
import Generator from '../gameobjects/generator';
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
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(600, 702, 'platform1')
        .setScale(3.12).refreshBody();
       // this.backgrounds= this.physics.add.staticGroup();
       // this.backgrounds.create(850,555,'background1');
        this.generator = new Generator(this);
        this.addColliders();

    }

    addPlayer() {
        this.player = new Player(this, this.center_width, this.center_height, 0);
    }

    update() {
       
        this.player.update();
        if (this.number === 3 && this.player.y > 1500) this.restartScene();
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