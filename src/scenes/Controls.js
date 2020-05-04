class Controls extends Phaser.Scene {
    constructor() {
        super("controlScene");
    }



    preload() {
        this.load.image('controls', './assets/controlScene.png')

  
    }


    create()
    {
        this.flip = game.sound.add('pageflip');
        this.add.tileSprite(0, 0, 1000, 1000, 'controls').setOrigin(0,0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }


    update()
    {

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
  
            this.scene.start("playScene");   

          }
          if(Phaser.Input.Keyboard.JustDown(keyLEFT))
          {
            this.flip.play();
            this.scene.start("menuScene");   
          }
          if(Phaser.Input.Keyboard.JustDown(keyRIGHT))
          {
            this.flip.play();
            this.scene.start("ruleScene");   
          }
    }

}