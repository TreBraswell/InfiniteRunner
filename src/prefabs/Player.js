// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x,y,plat,cursor) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y, plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.updates = .1;
        this.size = 5;
        this.jumps = 1;
        this.jumping = false;
        this.speed = 200;
        this.JUMP_VELOCITY = -700;
        this.scene = scene;
        this.setCollideWorldBounds(true);
        this.cursors = cursor;

    }

    update() {
        if(this.cursors.left.isDown) {
            this.rotation -=  this.updates;
            this.body.setVelocityX(-this.speed);
        } else if(this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
            this.rotation +=  this.updates;
        } else {
            // set acceleration to 0 so DRAG will take over
            this.body.setVelocityX(0);
      
        }
    
        // check if player is grounded
        this.isGrounded = this.body.touching.down;
        // if so, we have jumps to spare 
        if(this.isGrounded) {
           this.jumps = 1;
          this.jumping = false;
        } 
          // allow steady velocity change up to a certain key down duration
          // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
      if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(this.cursors.up, 150)) {
          
        this.body.velocity.y = this.JUMP_VELOCITY;
          this.jumping = true;
      }
        // finally, letting go of the UP key subtracts a jump
       if(this.jumping && Phaser.Input.Keyboard.UpDuration(this.cursors.up)) {
          this.jumps--;
          this.jumping = false;
        }
        if(this.size==10)
        {
            explode();
        }
        
    }
    explode()
    {
        game.settings.platformspeed = 200;
        
    }
}