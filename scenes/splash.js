export default class Splash extends Phaser.Scene{
    constructor(){
        super({ key: "splash"});
    }

    create(){
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width /2;
        this.center_height = this.height /2;

        this.cameras.main.setBackgroundColor(0x000000);
        this.input.keyboard.on("keydown-SPACE", () => this.startGame(), this);
        this.input.keyboard.on("keydown-ENTER", () => this.startGame(), this);
       // this.playMusic();

    }

    startGame() {
      if (this.theme) this.theme.stop();
      this.scene.start("game", {
        next: "game",
        name: "STAGE",
        number: 0,
        time: 30,
      });
    }

    playMusic(theme = "music1") {
        this.theme = this.sound.add(theme);
        this.theme.stop();
        this.theme.play({
          mute: false,
          volume: 1,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 0,
        });
      }
}