
class Play extends Phaser.Scene {
  
    constructor() {
          super("playScene");
          this.tempx = 0;
          this.tempy = 0;
          
      }
      preload() {
        this.load.image('explosive', './assets/y.png');
        this.load.image('explosive2', './assets/y2.png');
        this.load.image('button', './assets/button.png');
        this.load.image('pin', './assets/pin_small1.png');
        this.load.image('yarn', './assets/yarn2_small.png');
        this.load.image('platimage', './assets/platfinal.png');
        this.load.image('pinplat', './assets/pin.png');
        this.load.audio('gameover', './assets/death.wav');
        this.load.audio('jump_sfx', './assets/jump.wav');
        this.load.audio('collectbutton', './assets/collectbutton.wav');
        this.load.audio('pinhit2', './assets/pinhit_2.wav');
        this.load.audio('pinhit1', './assets/pinhit.wav');
        this.load.audio('boom', './assets/poof1.wav');

  this.load.atlas('yarn_atlas', './assets/yarn2_small.png', './assets/yarn1.json');


         //  Just a few images to use in our underwater scene
       this.load.image('yarn', './assets/yarn_spritesheet.png');


       this.load.image('timetext', './assets/time.png')
       this.load.image('heart','./assets/heart.png')
       this.load.image('buttontext', './assets/button_text.png')




      }
      create() {
       
        game.sound.stopAll(); 
        this.yarn = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'yarn_atlas', 'yarn_right').setScale(0);




        this.buttonCounter = 0;
        this.playthesound= false;
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
        this.boom1 = game.sound.add('boom');
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



    this.heart1 = this.add.image(10, 400, 'heart').setOrigin(0,0);
    this.heart2 = this.add.image(50, 400, 'heart').setOrigin(0,0);
    this.heart3 = this.add.image(90, 400, 'heart').setOrigin(0,0);


    this.add.image(10, 10, 'timetext').setOrigin(0,0)
    this.add.image(500,10,'buttontext').setOrigin(0,0)
this.bcText = this.add.text(580, 10, this.buttonCounter, menuConfig).setOrigin(0,0);
    this.timerText = this.add.text(100, 10, this.timers, menuConfig).setOrigin(0,0);
    this.prevtime= -1;
  }
      
   addPlatform() {
        this.plat = new Platform(this, this.Platformspeed,'platimage',this.spawnplatformwhen);     // create new barrier
        this.spawnpp++;
        //if we should spawn an pin platform
        if(this.spawnpp%3==0)
        {
          if(Phaser.Math.Between(0,1)>=.5)
          {
            this.addPinPlatform(this,this.Platformspeed,'pinplat',this.plat.x,this.plat.y);
          }
          else
          {
            this.addPin(this,this.Platformspeed,'pin',this.plat.x,this.plat.y);
          }
          
        }
        else if(this.spawnpp%2==0)
        {
          this.addButton(this,this.Platformspeed,'button',this.plat.x,this.plat.y);
        }
        this.platformGroup.add(this.plat);                         // add it to existing group
    }
    addPlayer(){
      this.player = new Player(this,320, 240, 'yarn_atlas',this.input.keyboard.createCursorKeys(),'explosive','explosive2', this.yarn,'yarn_atlas','yarn_right',this.boom1);
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
      this.checkoverlap();
      if(this.timers%1==0&&this.timers!=this.prevtime)
      {
        this.prevtime = this.timers;
        this.addPlatform();

      
      }
      if(this.player.exploding)
      {
        this.Platformspeed = 600;
        if(this.playthesound == false)
        {
          this.boom1.play();
          this.playthesound = true;
        }
        this.spawnplatformwhen = game.config.width;
      }
      this.physics.add.overlap( this.pinplatformGroup,this.playerGroup,function(pin, player){
        this.pin2  = game.sound.add('pinhit2');
        this.pin2.play();
        pin.destroy();
        player.decreasesize(1);
        game.state.health--;
        game.state.hitPin = true;

    });
    this.physics.add.overlap( this.buttonGroup,this.playerGroup,function(button, player){
      this.buttonsound  = game.sound.add('collectbutton');
      this.buttonsound.play();
      button.destroy();
      player.increasesize();
      game.state.collectedButton = true;

      // increase button count

  });
  this.physics.add.overlap( this.pinGroup,this.playerGroup,function(pin, player){
    this.pin1  = game.sound.add('pinhit1');
    this.pin1.play();
    pin.destroy();
    player.decreasesize(0);
    game.state.health--;
    game.state.hitPin = true;

    // decrease hp we have 3 hp



});

this.physics.add.overlap( this.pinplatformGroup,this.pinplatformGroup,function(plat1, plat2){
  let platformHeight = 103;
  let platformWidth = 300;
  plat1.x = Phaser.Math.Between(game.config.width+platformWidth+50,game.config.width+platformWidth+game.config.width);
  plat1.y = Phaser.Math.Between(platformHeight/2, game.config.height - platformHeight/2);
  plat2.x = Phaser.Math.Between(game.config.width+platformWidth+50,game.config.width+platformWidth+game.config.width);
  plat2.y = Phaser.Math.Between(platformHeight/2, game.config.height - platformHeight/2);
});
if(game.state.hitPin)
{
  if(game.state.health == 2)
  {
    this.heart3.destroy()
  }
  if(game.state.health == 1)
  {
    this.heart2.destroy()
  }
  if(game.state.health == 0)
  {
    this.heart1.destroy()
  }


  game.state.hitPin = false
}
if(game.state.health == 0)
{
  game.state.gameOver = true;
}

      if (!game.state.gameOver)
      this.background.tilePositionX +=4;


      this.timerText.text = this.timers





      if(game.state.collectedButton)
      {
        this.buttonCounter ++;
        this.bcText.text = this.buttonCounter;
        game.state.collectedButton = false;
      }

      if (game.state.gameOver)
      {
        this.bgm.stop();
        
        if(!game.state.played_death)
        {
        this.deathSound = game.sound.add('gameover');
        this.deathSound.play();
        game.state.played_death = true;
      }

      game.persist.currScore =this.buttonCounter * 50 + this.timers *10  

        if(game.persist.currScore > game.persist.highScore)
        {
          
          game.persist.isNew = true;
          game.persist.highScore = game.persist.currScore
          
        }
        game.persist.currScore = this.timers

        this.time.delayedCall(3000, () => { this.scene.start('gameoverScene'); });
      }
  


      //destroy all platforms and then have a smoother death animation
      
      //this.gameOver = true;

      
     

   }
   timerBump()
{

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
  else
  {
  this.playthesound = false;
  }
  this.timers++;
}
hitSprite (sprite1, sprite2) {
}
checkoverlap()
{
  
}
  }









