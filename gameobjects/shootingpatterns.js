import Shot from '../gameobjects/shot';

export default class ShootingPatterns{
    constructor(scene,name){
        this.scene = scene;
        this.name= name;
        this.shootingMethods = {
            laser: this.single.bind(this),
        }
    }

    shoot(x,y,type,playerTurnY){
        this.shootingMethods[type](x,y, type,playerTurnY);
    }

    single(x, y, type,playerTurnY){
        this.scene.shots.add(new Shot(this.scene, x, y, type, this.name,500,playerTurnY));
    }
}