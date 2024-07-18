import Foe from "./foe";

export default class FoeGenerator{
    constructor(scene){
        this.scene= scene;
        this.waveFoes = [];
        this.generate();
        this.activeWave = false;
        this.waves = 0;
      
    }

    generate(){
        this.generateEvent1 = this.scene.time.addEvent({
            delay: 750,
            callback: () => this.star(),
            callbackScope : this,
            loop:true,
        })
    }

    star(){
        this.scene.foeGroup.add(
          new Foe(this.scene, Phaser.Math.Between(1000, 20000), Phaser.Math.Between(200, 550), "star", 0, 0)
        );
    }
    add() {
      const foe = new Foe( this.scene, Phaser.Math.Between(32, this.scene.width - 32),);
      this.scene.foeGroup.add(foe);
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

    

      update() {
        if (this.path) {
          this.path.draw(this.graphics);
    
          this.scene.foeWaveGroup.children.entries.forEach((foe) => {
            if (foe === null || !foe.active) return;
            let t = foe.z;
            let vec = foe.getData("vector");
            this.path.getPoint(t, vec);
            foe.setPosition(vec.x, vec.y);
            foe.shadow.setPosition(vec.x + 20, vec.y + 20);
            foe.setDepth(foe.y);
          });
    
          if (this.activeWave && this.checkIfWaveDestroyed()) {
            this.activeWave = false;
            this.scene.spawnShake();
            this.path.destroy();
          }
        }
        this.scene.foeGroup.children.entries.forEach((foe) => {
          if (foe === null || !foe.active || foe.y > this.scene.width /2)
            //foe.destroy();
          foe.update();
        });
      }
      
}