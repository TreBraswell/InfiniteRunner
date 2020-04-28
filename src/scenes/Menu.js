class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }
  preload() {
    this.load.image('game_background', './assets/background.png')
    this.load.image('button', './assets/button.png')
    this.load.image('controls', './assets/controlScene.png')
    this.load.image('gameover', './assets/gameoverScene.png')
    this.load.image('pins', './assets/pin.png')
    this.load.image('titleScreen', './assets/titleScene.png')


  }



  create()
  {

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

    controlpage = this.add.tileSprite(0, 0, 1000, 1000, 'controls').setOrigin(0,0);
    controlpage.alpha =  false;

    this.add.text(100, 200, 'Press LEFT to start', menuConfig).setOrigin(0,0);
    this.add.text(100, 300, 'Press RIGHT for CONTROLS', menuConfig).setOrigin(0,0);

    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

  }


  update()
  {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 60000, 

      }
      this.scene.start("playScene");   
    
    }

    if(Phaser.Input.Keyboard.JustDown(keyRIGHT))
    {
      controlpage.alpha = true;


    }
  }

}