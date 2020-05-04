class Rules extends Phaser.Scene {
    constructor() {
        super("ruleScene");
    }



    preload() {
        this.load.image('rules', './assets/rules.png')

  
    }


    create()
    {
        this.add.tileSprite(0, 0, 1000, 1000, 'rules').setOrigin(0,0);
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
  
            this.scene.start("controlScene");   
          }
    }

}