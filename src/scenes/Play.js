
class Play extends Phaser.Scene {
  
    constructor() {
          super("playScene");
          
      }
      preload() {
        this.load.image('yarn', './assets/yarn2_small.png');
        this.load.image('platimage', './assets/plat2_small.png');

        this.load.audio('gameover', './assets/death.wav')
      }
      create() {
        


        this.bgm = game.sound.add('ingame_bgm');
        this.bgm.loop = true;
        this.bgm.play();
        this.timers = 0 // this is the time variable that is changing when seconds is called

        this.background = this.add.tileSprite(0, 0, 1000, 1000, 'game_background').setOrigin(0, 0);
        this.Platformspeed = 200;
        this.ship02 = new Platform(this,0,'platimage');
        this.physics.world.gravity.y = 2600;
        this.ship02.x = 320;
        this.ship02.y = 290;
        this.playerGroup = this.add.group({
          runChildUpdate: true    // make sure update runs on group children
      });

      this.platformGroup = this.add.group({
          runChildUpdate: true    // make sure update runs on group children
      });
      this.platformGroup.add(this.ship02);
      this.addPlayer();
      this.addPlatform();
      this.physics.add.collider( this.platformGroup,this.playerGroup);


      this.gameOver = false;


    this.difficultyTimer = this.time.addEvent({
      delay: 1000,
      callback: this.timerBump,
      callbackScope: this,
      loop: true


    });

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
    

    this.timerText = this.add.text(100, 200, this.timers, menuConfig).setOrigin(0,0);


      }
      addPlatform() {
        let plat = new Platform(this, this.Platformspeed,'platimage');     // create new barrier
        this.platformGroup.add(plat);                         // add it to existing group
    }
    addPlayer(){
      let player = new Player(this,320, 240, 'yarn',this.input.keyboard.createCursorKeys());
      this.playerGroup.add(player);
    }
    update() {

      if (!game.state.gameOver)
      this.background.tilePositionX +=4;


      this.timerText.text = this.timers

      if (game.state.gameOver)
      {
        this.bgm.stop();
        
        if(!game.state.played_death)
        {
        this.deathSound = game.sound.add('gameover');
        this.deathSound.play();
        game.state.played_death = true;
      }

        if(this.timers > game.persist.highScore)
        {
          
          game.persist.isNew = true;
          game.persist.highScore = this.timers
        }

        this.time.delayedCall(3000, () => { this.scene.start('gameoverScene'); });
      }
  


      //destroy all platforms and then have a smoother death animation
      
      //this.gameOver = true;

      
     

   }
   timerBump()
{
  this.timers++;
}

  }









