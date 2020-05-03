// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x,y,plat,cursor,explosive,explosive2) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y, plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.updates = .1;
        this.size = 5;
        this.jumps = 1;
        this.scaleof = 1.0;
        //explosion timer
        this.explosiontimer = 0;
        this.scalechange = .08; 
        this.jumpchange = 20;
        this.onCollide = true;
        this.changespeed = 20; 
        this.jumping = false;
        this.speed = 400;
        this.exploding = false;
        this.differnce = 2;
        this.JUMP_VELOCITY = -700;
        this.scene = scene;
        this.cursors = cursor;


        this.scoreConfig = {
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
        //taken from phaser example
        var particles1 = scene.add.particles(explosive);
       this.trail = particles1.createEmitter({ 
        x: 100,
        y: 100,
        quantity: 1,
        frequency: 20,
        angle: { min: 150, max: 190 },
        speed: -400,
        gravityX: 100,
        lifespan: { min: 500, max: 1000 },
    });
            

    }

    update() {
        if(!this.exploding)
        {
            this.trail.setVisible(false);
        }
        if(this.explosiontimer >= 5)
        {
            this.exploding = false;
            this.body.velocity.y = 0 ;
            this.explosiontimer = 0;
            this.body.setAllowGravity(true);
            this.body.collideWorldBounds = false;
            this.JUMP_VELOCITY = -700;
            this.explosiontimer = 0;
        }
    this.trail.setPosition(this.x-10, this.y);
        if(game.state.gameOver)
        {
            this.alpha = false
            this.destroy();
        }
        else{

        if(this.y > game.config.height - 36)
        {
            game.state.gameOver = true;
        }
        if(this.cursors.left.isDown && !game.state.gameOver) {
            this.rotation -=  this.updates;
            this.body.setVelocityX(-this.speed);
        } else if(this.cursors.right.isDown &&  !game.state.gameOver) {
            this.body.setVelocityX(this.speed);
            this.rotation +=  this.updates;
        } else if (!game.state.gameOver){
            // set acceleration to 0 so DRAG will take over
            this.body.setVelocityX(0);
      
        }
    
        // check if player is grounded
        this.isGrounded = this.body.touching.down;
        // if so, we have jumps to spare 
        if(this.isGrounded ) {
           this.jumps = 1;
          this.jumping = false;
        } 
          // allow steady velocity change up to a certain key down duration
          // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
        if(this.cursors.up.isDown&& this.exploding)
        {
              this.body.velocity.y += -this.JUMP_VELOCITY;
        }
        if(Phaser.Input.Keyboard.DownDuration(this.cursors.up, 150)&& this.exploding)
        {
            this.body.velocity.y = this.JUMP_VELOCITY;
        }
        if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(this.cursors.up, 150) && !game.state.gameOver&&!this.exploding ) {
          
        this.body.velocity.y = this.JUMP_VELOCITY;
          this.jumping = true;
          
      }
        // finally, letting go of the UP key subtracts a jump
       if(this.jumping && Phaser.Input.Keyboard.UpDuration(this.cursors.up)&&!this.exploding) {
        this.jump_sfx = game.sound.add('jump_sfx'); 
        this.jump_sfx.play()
          this.jumps--;
          this.jumping = false;
        }
        if(this.size==10)
        {
            this.explodeyarn();
        }
    }

    }
    explodeyarn()
    {
        //this.body.setAllowGravity(false);
        this.JUMP_VELOCITY = -400;
        //this.explosiontimer = 0;
        this.trail.setVisible(true);
    }
    gameover()
    {
        this.scene.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
        this.scene.add.text(game.config.width/2, game.config.height/2 + 64+64, '(F) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5);
    }
    increasesize()
    {
        this.scaleof+= this.scalechange;
        this.setScale(this.scaleof);
        this.speed -= this.changespeed;
        this.JUMP_VELOCITY += this.jumpchange; 
        this.size++;
    }
    decreasesize(amount)
    {
        if(amount == 1)
        {
            this.scaleof-= this.scalechange;
        }
        this.scaleof-= this.scalechange;
        this.setScale(this.scaleof);
        this.speed += this.changespeed;
        this.size--;
        this.JUMP_VELOCITY -= this.jumpchange; 
    }
    increasetimer()
    {
        
      this.explosiontimer=this.explosiontimer+1 ;
      console.log(this.explosiontimer);
    }
}