
class Play extends Phaser.Scene {
  
    constructor() {
          super("playScene");
          
      }
      preload() {
        this.load.image('explosive', './assets/y.png');
        this.load.image('explosive2', './assets/y2.png');
        this.load.image('button', './assets/button.png');
        this.load.image('pin', './assets/pin_small1.png');
        this.load.image('yarn', './assets/yarn2_small.png');
        this.load.image('platimage', './assets/plat2_small.png');
        this.load.image('pinplat', './assets/pin.png');
        this.load.audio('gameover', './assets/death.wav');
        this.load.audio('jump_sfx', './assets/jump.wav');
        this.load.audio('collectbutton', './assets/collectbutton.wav');
        this.load.audio('pinhit2', './assets/pinhit_2.wav');
        this.load.audio('pinhit1', './assets/pinhit.wav');
      }
      create() {
        this.spawnplatformwhen = game.config.width;
        this.spawnpp = 0;
        this.pinGroup = this.add.group({
          runChildUpdate: true    // make sure update runs on group children
        });
        this.buttonGroup = this.add.group({
           runChildUpdate: true    // make sure update runs on group children
        });
        this.pinplatformGroup = this.add.group({
           runChildUpdate: true    // make sure update runs on group children
        });
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
      this.physics.add.collider(this.platformGroup,this.playerGroup);

      this.gameOver = false;
      this.explosiontimer = 0;

      this.difficultyTimer = this.time.addEvent({
      delay: 1000,
      callback: this.timerBump,
      callbackScope: this,
      loop: true


    });

    let menuConfig = {
      fontFamily: 'Courier',
      fontSize: '60px',
      color: '#FFFFFF',
      align: 'right',
      padding: {
          top: 5,
          bottom: 5,
      },
      fixedWidth: 0
    }

    this.timerText = this.add.text(10, 10, this.timers, menuConfig).setOrigin(0,0);
    this.prevtime= -1;
  }
      
   addPlatform() {
        let plat = new Platform(this, this.Platformspeed,'platimage',this.spawnplatformwhen);     // create new barrier
        this.spawnpp++;
        //if we should spawn an pin platform
        if(this.spawnpp%4==0)
        {
          if(Phaser.Math.Between(0,1)>=.5)
          {
            this.addPinPlatform(this,this.Platformspeed,'pinplat',plat.x,plat.y);
          }
          else
          {
            this.addPin(this,this.Platformspeed,'pin',plat.x,plat.y);
          }
          
        }
        else if(this.spawnpp%3==0)
        {
          this.addButton(this,this.Platformspeed,'button',plat.x,plat.y);
        }
        this.platformGroup.add(plat);                         // add it to existing group
    }
    addPlayer(){
      this.player = new Player(this,320, 240, 'yarn',this.input.keyboard.createCursorKeys(),'explosive','explosive2');
      this.playerGroup.add(this.player);
    }
    addPin(a,b,c,d,e){
      let pin = new Pin(a,b,c,d,e);
      this.pinGroup.add(pin);
    }
    addButton(a,b,c,d,e){
      let button = new Button(a,b,c,d,e);
      this.buttonGroup.add(button);
    }
    addPinPlatform(a,b,c,d,e){
        let Pin  = new PinPlatform(a,b,c,d,e);
        this.pinplatformGroup.add(Pin);
    }

    update() {
      if(this.timers%3==0&&this.timers!=this.prevtime)
      {
        console.log("printing");
        this.prevtime = this.timers;
        this.addPlatform();

      
      }
      if(this.player.exploding)
      {
        this.Platformspeed = 600;
        this.spawnplatformwhen = game.config.width;
      }
      this.physics.add.overlap( this.pinplatformGroup,this.playerGroup,function(pin, player){
        this.pin2  = game.sound.add('pinhit2');
        this.pin2.play();
        pin.destroy();
        player.decreasesize(1);

    });
    this.physics.add.overlap( this.buttonGroup,this.playerGroup,function(button, player){
      this.buttonsound  = game.sound.add('collectbutton');
      this.buttonsound.play();
      button.destroy();
      player.increasesize();

  });
  this.physics.add.overlap( this.pinGroup,this.playerGroup,function(pin, player){
    this.pin1  = game.sound.add('pinhit1');
    this.pin1.play();
    pin.destroy();
    player.decreasesize(0);

});
this.physics.add.overlap( this.pinplatformGroup,this.pinplatformGroup,function(plat1, plat2){
  let platformHeight = 103;
  let platformWidth = 300;
  plat1.x = Phaser.Math.Between(game.config.width+platformWidth+50,game.config.width+platformWidth+game.config.width);
  plat1.y = Phaser.Math.Between(platformHeight/2, game.config.height - platformHeight/2);
  /*plat2.x = Phaser.Math.Between(game.config.width+platformWidth+50,game.config.width+platformWidth+game.config.width);
  plat2.y = Phaser.Math.Between(platformHeight/2, game.config.height - platformHeight/2);*/
});
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
  console.log(this.player.exploding);
  console.log(this.player.explosiontimer);
  if(this.player.exploding==true)
  {
    this.timers++;
    this.timers++;
    this.timers++;
    this.timers++;
    this.timers++;
    this.timers++;
    this.timers++;
    this.timers++;
  this.player.increasetimer();
  this.player.decreasesize();
  }
  this.timers++;
}
hitSprite (sprite1, sprite2) {
}

  }









