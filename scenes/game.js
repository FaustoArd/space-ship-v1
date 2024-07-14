import Phaser from 'phaser';
import Player from "../gameobjects/player";
export default class Game extends Phaser.Scene{
    constructor(){
        super({key: "game"});
        this.player = null;
        this.score = 0;
        this.scoreText = null;
    }

    init(data){
        this.name = data.name;
        this.number = data.number;
    }

    preload(){}


    create(){
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width /2;
        this.center_height = this.height /2;
       this.cameras.main.setBackgroundColor(0x000000);
        this.add.tileSprite(0,0,683 *10, 768, "landscape").setOrigin(0.5);

        this.cameras.main.setBounds(0, 0, 20920 * 2, 20080 * 2);
        this.physics.world.setBounds(0, 0, 20920 * 2, 20080 * 2);
        this.addPlayer();
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 0, 240);
        this.physics.world.enable([this.player]);
     
    }

    addPlayer(){
       
        this.player = new Player(this, this.center_width, this.center_height,0);
    }

    update(){
        this.player.update();
    }


}