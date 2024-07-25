import Star from "./star";
import BigTank from "./bigtank";
import FlareReward from './rewards';
import Destroyer from "./destroyer";
import EnemyShip from "./enemyship";
import Asteroid from './asteroid';

export default class FoeGenerator{
    constructor(scene){
        this.scene= scene;
        this.waveFoes = [];
        this.generateStars();
        this.generateBigTanks();
        this.generateFlareRewards();
        this.generateDestroyer();
        this.generateEnemyShips();
        this.generateAsteroidFields();
        this.activeWave = false;
        this.waves = 0;
      
    }

    generateStars(){
        this.generateEvent1 = this.scene.time.addEvent({
            delay: 0,
            callback: () => this.star(),
            callbackScope : this,
            loop:false,
        });
    }

    generateBigTanks(){
      this.generateEvent2 = this.scene.time.addEvent({
        delay:0,
        callback: () => this.bigTank(),
        callbackScope: this,
        loop:false,
      });
    }

    generateFlareRewards(){
      this.generateEvent3 = this.scene.time.addEvent({
        delay:0,
        callback:() => this.flareReward(),
        callbackScope: this,
        loop:false,
      });
    }

   generateEnemyShips(){
    this.generateEvent4 = this.scene.time.addEvent({
      delay:1000,
      callback: ()=> this.createEnemy(),
      callbackScope: this,
      loop:0,
    });
    }


    generateDestroyer(){
      this.generateEvent5 = this.scene.time.addEvent({
        delay:0,
        callback:()=> this.destroyer(),
        callbackScope: this,
        loop:false,
      });
    }

     generateAsteroidFields(){
       this.generateEvent7 = this.scene.time.addEvent({
         delay:6000,
         callback:()=> this.generateAsteroids(),
         callbackScope:this,
         repeat:10,
       })
     }

    asteroidsXPlace = 1300;
    generateAsteroids(){
      this.generateEvent6 = this.scene.time.addEvent({
        delay:50,
        callback: () => this.asteroids(this.asteroidsXPlace),
        callbackScope: this,
        repeat:20,
      });
      this.asteroidsXPlace += Phaser.Math.Between(500,1000);
}

    

    bigTankXPlace= 1500;
    bigTank(){
      for(var i= 0;i<10;i++){
        const bigTank =  new BigTank(this.scene,this.bigTankXPlace, 560,"bigTank");
        this.scene.foeGroup.add(bigTank);
        this.bigTankXPlace += 800;
      }

    
    }
    starXPlace = 1500;
    star(){
      for(var i = 0;i<15 ; i++){
        const star = new Star(this.scene,this.starXPlace, Phaser.Math.Between(200, 500), "star", 0, 0);
        this.scene.foeGroup.add(star );
        this.starXPlace += Phaser.Math.Between(300, 600)
      }
}

//scene,x,y ,type= "asteroid", playerName, velocityX, velocityY

asteroids(asteroidsXPlace){
  const asteroid = new Asteroid(this.scene,this.asteroidsXPlace,Phaser.Math.Between(10,590),"asteroid", "player", -300,0,Phaser.Math.Between(8,15));
  this.scene.asteroidGroup.add(asteroid);
  
}

destroyer(){
  const destroyer = new Destroyer(this.scene,10000,300);
    this.scene.foeGroup.add(destroyer);
}

flareReward(){
  for(var i = 0;i<10; i++){
    const flareReward = new FlareReward(this.scene,Phaser.Math.Between(2000,10000), Phaser.Math.Between(200,530));
    this.scene.rewardGroup.add(flareReward);
  }
}

eneyShipStartPlace=  1300;
createEnemy(){
  for(var i=0;i<10;i++){
    const enemyShip = new EnemyShip(this.scene,this.eneyShipStartPlace,150);
    this.scene.foeWaveGroup.add(enemyShip);
    this.eneyShipStartPlace += 500;
  }
 
}

// enemyWave(){
//   this.createPath();
//   const x =1500; //Phaser.Math.Between(64, this.scene.width -200);
//   const y =300 //Phaser.Math.Between(-1,1) > 0 ? 1 : -1;
//   Array(3).fill().forEach((_,i) => this.addToWave(i));
//   this.activeWave = true;
// }

// addToWave(i) {
//   const foe = new EnemyShip(
//     this.scene,
//     Phaser.Math.Between(2000, 3000),
//     300,
//     "enemyship"
//   );
//   this.scene.tweens.add({
//     targets: foe,
//     z: 1,
//     ease: "Linear",
//     duration: 12000,
//     repeat: 3,
//     delay: i * 100,
//   });
//   this;
//   this.scene.foeWaveGroup.add(foe);
// }

// createPath() {
//   this.waves++;
//   if (this.waves === 3) this.finishScene();
//   const start = 3000;
//   this.path = new Phaser.Curves.Path(start, 0);

//   this.path.lineTo(start,-600);

//   let max = 2;
//   let h = 4000 / max;

//    for (let i = 0; i < max; i++) {
//      if (i % 2 === 0) {
      
//        this.path.lineTo(start, -50 + h * (i + 1));
//      } else {
//        this.path.lineTo(start -3000, 50 + h * (i + 1));
//      }
//    }

//  // this.path.lineTo(start, this.scene.height + 50);
//   this.graphics = this.scene.add.graphics();
//   this.graphics.lineStyle(0, 0xffffff, 0); // for debug
// }


    add() {
      const star = new Star( this.scene, Phaser.Math.Between(32, this.scene.width - 32),);
      this.scene.foeGroup.add(star);
    }

    stop() {
        clearInterval(this.generationIntervalId);
        this.scene.foeGroup.children.entries.forEach((foe) => {
          if (foe === null || !foe.active) return;
          foe.destroy();
        });
      }

      finishScene(){
        this.generateEvent1.destroy();
      }

    

      update(bigTankEnabled,player) {
        // console.log("playerx",player.x);
        // if(this.path){
        //   this.path.draw(this.graphics);
        // }
        // this.scene.foeWaveGroup.children.entries.forEach((foe) => {
        //   if (foe === null || !foe.active) return;
        //   let t = foe.z;
        //   let vec = foe.getData("vector");
        //   this.path.getPoint(t, vec);
        //   foe.setPosition(vec.x, 300);
        //   //foe.shadow.setPosition(vec.x - 20, vec.y + 20);
        //   foe.setDepth(foe.y);
        // });

          this.scene.foeGroup.children.entries.forEach((foe) =>{
           if(foe.name==="star"){
          foe.update();
           }
           if(foe.name==="bigtank"){
           return foe.update(bigTankEnabled,player);
           }

          });

          this.scene.foeWaveGroup.children.entries.forEach((foe)=>{
            foe.update();
          });


    
        
        
        // this.scene.foeGroup.children.entries.forEach((foe) => {
        //   if (foe === null || !foe.active || foe.y > this.scene.width /2)
        //     //foe.destroy();
        //   foe.update();
        // });
      }
      
}
  // this.scene.foeWaveGroup.children.entries.forEach((foe) => {
          //   if (foe === null || !foe.active) return;
          //   let t = foe.z;
          //   let vec = foe.getData("vector");
          //   this.path.getPoint(t, vec);
          //   foe.setPosition(vec.x, vec.y);
          //   foe.shadow.setPosition(vec.x + 20, vec.y + 20);
          //   foe.setDepth(foe.y);
          // });
    
          // if (this.activeWave && this.checkIfWaveDestroyed()) {
          //   this.activeWave = false;
          //   this.scene.spawnShake();
          //   this.path.destroy();
          // }