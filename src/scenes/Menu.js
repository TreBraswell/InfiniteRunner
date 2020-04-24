class Menu extends Phaser.Scene {
  
    constructor() {
          super("menuScene");
      }
      preload() {
        this.load.image('yarn', './assets/yarn.png');
        this.load.image('platimage', './assets/plat.png');
      }
      create() {
        this.Platformspeed = 200;
        this.jumps = 1;
        this.jumping = false;
        this.ship02 = new Platform(this,0,'platimage');
        this.physics.world.gravity.y = 2600;
        this.ship02.x = 320;
        this.ship02.y = 290;
        this.speed = 200;
        this.JUMP_VELOCITY = -700;
        //how fast our ball rotates
        this.updates = .1;
        this.player = this.physics.add.image(320, 240, 'yarn');
        this.player.setCollideWorldBounds(true);  
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider( this.player,this.ship02);
      this.platformGroup = this.add.group({
          runChildUpdate: true    // make sure update runs on group children
      });
      this.addPlatform();
      this.physics.add.collider( this.player,this.platformGroup);
      }
      addPlatform() {
        let plat = new Platform(this, this.Platformspeed,'platimage');     // create new barrier
        this.platformGroup.add(plat);                         // add it to existing group
    }
    update() {
      //checks if its down make it so the hold is true
      if(this.cursors.left.isDown) {
        this.player.rotation -=  this.updates;
        this.player.body.setVelocityX(-this.speed);
    } else if(this.cursors.right.isDown) {
        this.player.body.setVelocityX(this.speed);
        this.player.rotation +=  this.updates;
    } else {
        // set acceleration to 0 so DRAG will take over
        this.player.body.setVelocityX(0);
  
    }

    // check if player is grounded
    this.player.isGrounded = this.player.body.touching.down;
    // if so, we have jumps to spare 
    if(this.player.isGrounded) {
       this.jumps = 1;
      this.jumping = false;
    } 
      // allow steady velocity change up to a certain key down duration
      // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
  if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(this.cursors.up, 150)) {
      
    this.player.body.velocity.y = this.JUMP_VELOCITY;
      this.jumping = true;
  }
    // finally, letting go of the UP key subtracts a jump
   if(this.jumping && Phaser.Input.Keyboard.UpDuration(this.cursors.up)) {
      this.jumps--;
      this.jumping = false;
    }

   }

  }