export default class Bootloader extends Phaser.Scene {

    constructor() {
        super({ key: "bootloader" });
    }

    preload() {
        this.createBars();
        this.setLoadEvents();
        this.loadFonts();
        this.loadImages();
        this.loadAudios();
        this.loadSpriteSheets();
        this.setRegistry();
        


      

    
   
        

      
       

      


      
    }

    loadImages(){
        this.load.image("landscape", "assets/images/landscape.png");
        this.load.image("platform", "assets/images/platform1.png");
    }

    loadFonts(){
        this.load.bitmapFont(
            "wendy",
            "assets/fonts/wendy.png",
            "assets/fonts/wendy.xml"

        );
      
    }

    loadSpriteSheets(){
        this.load.spritesheet("star", "assets/images/star.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.spritesheet("blackhole", "assets/images/blackhole.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.spritesheet("ship", "assets/images/space_ship.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("ship", "assets/images/space_ship.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.spritesheet("bigtank", "assets/images/bigtank.png", {
            frameWidth: 64,
            frameHeight: 96,
        });
        
        this.load.spritesheet("bigtankdestroyed", "assets/images/bigtankdestroyed1.png", {
            frameWidth: 64,
            frameHeight: 96,
        });


        this.load.spritesheet("bigtank_missile", "assets/images/bigtank_missile.png", {
            frameWidth: 8,
            frameHeight: 16,
        });

        this.load.spritesheet("flare", "assets/images/flare.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.spritesheet("flarereward", "assets/images/flare_reward.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("destroyer", "assets/images/destroyer.png", {
            frameWidth: 256,
            frameHeight: 40,
        });


    }

    setLoadEvents(){
        this.load.on(
            "progress",
            function (value) {
                this.progressBar.clear();
                this.progressBar.fillStyle(0xf0937, 1);
                this.progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16
                );
            },
            this
        );

        this.load.on(
            "complete",
            () => {
                this.scene.start("splash");
            },
            this
        );
    }

    loadAudios(){
            this.load.audio("explosion1", "assets/sounds/explosion1.mp3");
          this.load.audio("explosion2", "assets/sounds/explosion2.mp3");
         this.load.audio("explosion3", "assets/sounds/explosion3.mp3");
          this.load.audio("shot1", "assets/sounds/shot.mp3");
           this.load.audio("flare1", "assets/sounds/flare1.mp3");
           this.load.audio("missilelaunch1", "assets/sounds/missilelaunch1.mp3");

           Array(2).fill(0).forEach((_,i)=>{
            this.load.audio(`song${i+1}`,`assets/sounds/song${i+1}.mp3` );
           });
      
    }

    setRegistry(){
        this.registry.set("score_player", 0);
       // this.registry.set("score", 0);
       // this.registry.set("gravity",0);
    }

    createBars() {
        this.loadBar = this.add.graphics();
        this.loadBar.fillStyle(0xca6702, 1);
        this.loadBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        this.progressBar = this.add.graphics();

    }
}