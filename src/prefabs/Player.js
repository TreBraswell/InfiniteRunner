// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x,y,plat,cursor,explosive) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y, plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.updates = .1;
        this.size = 5;
        this.jumps = 1;
        this.scaleof = 1.0;
        this.scalechange = .009; 
        this.jumpchange = 10;
        this.changespeed = 10; 
        this.jumping = false;
        this.speed = 400;
        this.differnce = 2;
        this.JUMP_VELOCITY = -700;
        this.scene = scene;
        this.cursors = cursor;
        var particles = scene.add.particles(explosive);
        this.explosion = particles.createEmitter({
            x: 1000,
            y: 3000,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 600,
            gravityY: 800,
            quantity:10

        });
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
        var particles1 = scene.add.particles(explosive);
        this.trail = particles1.createEmitter({
            "active":true,
            "blendMode":0,
            "collideBottom":true,
            "collideLeft":true,
            "collideRight":true,
            "collideTop":true,
            "deathCallback":null,
            "deathCallbackScope":null,
            "emitCallback":null,
            "emitCallbackScope":null,
            "follow":null,
            "frequency":0,
            "gravityX":-1000,
            "gravityY":0,
            "maxParticles":200,
            "name":"",
            "on":true,
            "particleBringToTop":true,
            "radial":true,
            "timeScale":1,
            "trackVisible":false,
            "visible":true,
            "accelerationX":0,
            "accelerationY":0,
            "angle":{"min":-110,"max":-70},
            "alpha":1,
            "bounce":0,
            "delay":0,
            "lifespan":{"min":500,"max":900},
            "maxVelocityX":10000,"maxVelocityY":100,
            "moveToX":0,
            "moveToY":0,
            "quantity":1,
            "rotate":0,
            "scaleX":1,
            "scaleY":1,
            "tint":0,
            "x":0,
            "y":0,
            "speed":400});

    }

    update() {
        if(this.x<0||this.y>=game.config.height)
        {
            this.gameover();
        }
        this.trail.setPosition(this.x, this.y);
        this.explosion.setPosition(this.x, this.y);
        if(this.size == 5)
        {
            this.explodeyarn();
            this.size = 4;
        }
        if(this.cursors.left.isDown) {
            this.decreasesize();
            this.rotation -=  this.updates;
            this.body.setVelocityX(-this.speed);
        } else if(this.cursors.right.isDown) {
            this.increasesize();
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
            this.explodeyarn();
        }
        
    }
    explodeyarn()
    {
        game.settings.platformspeed = 10;
        this.explosion.explode();
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
    decreasesize()
    {
        this.scaleof-= this.scalechange;
        this.setScale(this.scaleof);
        this.speed += this.changespeed;
        this.size--;
        this.JUMP_VELOCITY -= this.jumpchange; 
    }
    
}