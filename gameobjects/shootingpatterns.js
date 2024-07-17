import Shot from '../gameobjects/shot';

export default class ShootingPatterns{
    constructor(scene,name){
        this.scene = scene;
        this.name= name;
        this.shootingMethods = {
            laser: this.single.bind(this),
        }
    }

    shoot(x,y,type,playerTurnY,playerLeft){
        
        this.shootingMethods[type](x,y, type,playerTurnY,playerLeft);
    }

    single(x, y, type,playerTurnY,playerLeft){
        console.log("SIngle: ", playerLeft)
        if(playerLeft){
            this.scene.shots.add(new Shot(this.scene, x, y, type, this.name,500,playerTurnY));
        }else{
        this.scene.shots.add(new Shot(this.scene, x, y, type, this.name,-500,playerTurnY));
        }
    }
}