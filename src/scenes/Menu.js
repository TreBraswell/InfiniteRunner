class Menu extends Phaser.Scene {
  
    constructor() {
          super("menuScene");
           var timer1 = 0;
      }
      preload() {
        this.load.image('yarn', './assets/yarn.png');
      }
      create() {
        //how fast our ball rotates
        this.updates = .1;
        this.player = this.add.image(320, 240, 'yarn');
        //keys
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);       

        this.holdleft = false;
      }
    update() {
      //checks if its down make it so the hold is true
      if(Phaser.Input.Keyboard.JustDown(this.keyLEFT)|| this.holdleft)
      {
        this.rotateleft();
        this.holdleft = true;
      }
      //if its up it is no longer holding
      if(Phaser.Input.Keyboard.JustUp(this.keyLEFT))
      {
        this.holdleft = false;
      }
    //checks if its down make it so the hold is true
      if(Phaser.Input.Keyboard.JustDown(this.keyRIGHT)||this.holdright)
      {
        this.rotateright();
        this.holdright = true;
      }
      //checks if its down make it so the hold is true
      if(Phaser.Input.Keyboard.JustUp(this.keyRIGHT))
      {
        this.holdright = false;
      }

   }
    rotateright()
    {
        this.player.rotation +=  this.updates;
    }
    rotateleft()
    {
        this.player.rotation -=  this.updates;
    }
  }