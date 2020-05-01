class Menu extends Phaser.Scene {

    constructor() {
          super("menuScene");
          
      }
      preload() {
        this.load.image('yarn', './assets/yarn2_small.png');
        this.load.image('platimage', './assets/plat2_small.png');
        this.load.image('explosive', './assets/y1.png');
      }
      create() {
        
        
        this.Platformspeed = 200;
       
        this.ship02 = new Platform(this,0,'platimage');
        this.physics.world.gravity.y = 2600;
        this.ship02.x = 320;
        this.ship02.y = 290;
        this.playerGroup = this.add.group({
          runChildUpdate: true    // make sure update runs on group children
      });
      this.pinGroup = this.add.group({
        runChildUpdate: true    // make sure update runs on group children
    });
    this.buttonGroup = this.add.group({
      runChildUpdate: true    // make sure update runs on group children
  });
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
      this.time.addEvent({ delay: 500, callback: hueShift , loop: true });
      let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
    }

      // 60-second play clock
      scoreConfig.fixedWidth = 0;
      this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
          this.add.text(game.config.width/2, game.config.height/2 + 64+64, '(F) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
          this.gameOver = true;
      }, null, this);

      {
        console.log('create');
        this.initialTime = game.settings.gameTimer/1000;
    
        text = this.add.text(32, 32, 'Time: ' + formatTime(this.initialTime));
    
        timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true});
    }

      }
      addPlatform() {
        let plat = new Platform(this, this.Platformspeed,'platimage');     // create new barrier
        this.platformGroup.add(plat);                         // add it to existing group
    }
    addPlayer(){
      let player = new Player(this,320, 240, 'yarn',this.input.keyboard.createCursorKeys(),originalTexture);
      this.playerGroup.add(player);
    }
    update() {

      
     

   }

  }

  var text;
  var timedEvent;
  function formatTime(seconds){
          //min
          minutes = Math.floor(seconds/60);
          //secs
          partInSeconds = seconds%60;
          //add left zeroes to secs
          partInSeconds = partInSeconds.toString().padStart(2, '0');
          //returns time
          return `${minutes}:${partInSeconds}`;
     
  }

  function onEvent () {
    if (!this.gameOver) {
    this.initialTime -= 1; //one sec
    text.setText('Time: ' + formatTime(this.initialTime));
} else {
    this.clock = false;
}
}
function hueShift ()
{
  this.originalTexture  = this.textures.get('explosive').getSourceImage();
var pixels = context.getImageData(0, 0, this.originalTexture.width, this.originalTexture.height);

for (i = 0; i < pixels.data.length / 4; i++)
{
    processPixel(pixels.data, i * 4, 0.1);
}

context.putImageData(pixels, 0, 0);
originalTexture.refresh();
}