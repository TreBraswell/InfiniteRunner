class Menu extends Phaser.Scene {
  
    constructor() {
          super("menuScene");
           var timer1 = 0;
      }
      preload() {
        this.load.image('yarn', './assets/yarn.png');
      }
      create() {
        this.updates = 3;
        this.player = this.add.image(320, 240, 'yarn');
          // display menu text

      }
    update() {
        this.rotate();
        }
    rotate()
    {
        this.player.rotation +=  this.updates;
    }
  }