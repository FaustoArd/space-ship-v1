import './style.css'
import Phaser from "phaser";
import BootLoader from './scenes/bootloader';
import Splash from './scenes/splash';
import Game from './scenes/game';

const config = {
    width: 1200,
    height : 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,

    },
    autoRound: false,
    parent: "contenedor",
    physics:{
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: false,
        },
    },
    scene: [BootLoader,Splash,Game]
}
const game = new Phaser.Game(config);