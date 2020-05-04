class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }
  preload() {
    this.load.image('game_background', './assets/background.png')
    this.load.image('button', './assets/button.png')
    this.load.image('gameover', './assets/gameoverScene.png')
    this.load.image('pins', './assets/pin.png')
    this.load.image('titleScreen', './assets/titleScene.png')
    this.load.audio('title_bgm', './assets/bgm1.wav')
    this.load.audio('ingame_bgm', './assets/bgm3.wav')
    this.load.audio('pageflip', './assets/menu_click.wav')

    this.load.image('controls', './assets/controlScene.png')
    this.load.image('rules', './assets/rules.png')
  }



  create()
  {
    game.sound.stopAll(); 
    this.bgm = game.sound.add('title_bgm');
        this.bgm.loop = true;
        this.bgm.play();


    let menuConfig = {
      fontFamily: 'Courier',
      fontSize: '18px',
      color: '#000000',
      align: 'right',
      padding: {
          top: 5,
          bottom: 5,
      },
      fixedWidth: 0
    }
    
    this.add.tileSprite(0, 0, 1000, 1000, 'titleScreen').setOrigin(0,0)


    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keySPACE= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  }


  update()
  {
    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
      this.bgm.stop();
      this.scene.start("playScene");   

    
    }
    if(Phaser.Input.Keyboard.JustDown(keyRIGHT))
    {
      this.scene.start("controlScene");
    }


  }

}
