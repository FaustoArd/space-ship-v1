import Shot from '../gameobjects/shot';

export default class ShootingPatterns{
    constructor(scene,name){
        this.scene = scene;
        this.name= name;
        this.shootingMethods = {
            laser: this.single.bind(this),
        }
    }

    shoot(x,y,type){
        this.shootingMethods[type](x,y, type);
    }

    single(x, y, type){
        this.scene.shots.add(new Shot(this.scene, x, y, type, this.name));
    }
}