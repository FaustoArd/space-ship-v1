import Star from "./star";
import BigTank from "./bigtank";
import FlareReward from './rewards';

export default class FoeGenerator{
    constructor(scene){
        this.scene= scene;
        this.waveFoes = [];
        this.generateStars();
        this.generateBigTanks();
        this.generateFlareRewards();
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
      })
    }

    bigTankXPlace= 1500;
    bigTank(){
      for(var i= 0;i<10;i++){
        const bigTank =  new BigTank(this.scene,this.bigTankXPlace, 560,"bigTank");
        this.scene.foeGroup.add(bigTank);
        this.bigTankXPlace += 800;
      }

    
    }
    starXPlace = 1200;
    star(){
      for(var i = 0;i<15 ; i++){
        const star = new Star(this.scene,this.starXPlace, Phaser.Math.Between(200, 500), "star", 0, 0);
        this.scene.foeGroup.add(star );
        this.starXPlace += 600
      }
}
flareReward(){
  for(var i = 0;i<10; i++){
    const flareReward = new FlareReward(this.scene,Phaser.Math.Between(2000,15000), Phaser.Math.Between(200,530));
    this.scene.rewardGroup.add(flareReward);
  }
}

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
      
          this.scene.foeGroup.children.entries.forEach((foe) =>{
           if(foe.name==="star"){
         foe.update();
           }
           if(foe.name==="bigtank"){
           return foe.update(bigTankEnabled,player);
           }

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