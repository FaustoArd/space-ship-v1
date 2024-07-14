export default class Bootloader extends Phaser.Scene {

    constructor() {
        super({ key: "bootloader" });
    }

    preload() {
        this.createBars();
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

        this.load.audio("music1", "assets/sounds/music1.mp3");
        this.load.image("landscape", "assets/images/landscape.png");
        this.load.audio("shoot", "assets/sounds/shoot.mp3");
        this.load.image("platform1","assets/images/platform1.png");

        this.load.spritesheet("star", "assets/images/star.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.spritesheet("ship"," assets/images/space_ship.png",{
            frameWidth: 64,
            frameHeight: 64,
        });

        this.registry.set("score", 0);
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