class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }
    preload() {

        this.load.image('hiScore', './assets/hiScore.png')
        this.load.image('hiBackground', './assets/GOHI.png')
  
    }


    create()
    {
        game.state.gameOver = false
        game.state.played_death= false

        this.add.tileSprite(0, 0, 1000, 1000, 'gameover').setOrigin(0,0)

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '80px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
          }

        if(game.persist.isNew)
        {


        
            game.persist.isNew = false;
            this.add.tileSprite(0, 0, 1000, 1000, 'hiBackground').setOrigin(0,0)
            this.add.text(600, 170, game.persist.highScore, menuConfig).setOrigin(0,0)
            
            this.add.image(490, 10, 'hiScore').setOrigin(0,0);
        }
        else if (!game.persist.isNew)
        {
            this.add.text(600, 170, game.persist.currScore, menuConfig).setOrigin(0,0);
        }



        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    }



    update()
    {

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("playScene");   
          
          }
      
          if(Phaser.Input.Keyboard.JustDown(keyM))
          {
            this.scene.start("menuScene");   
      
      
          }

    }

}