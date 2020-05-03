class PinPlatform extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, velocity,plat,x,y) {
        var tempy = Phaser.Math.Between(0, game.config.height);
        // call Phaser Physics Sprite constructor
        super(scene, x, y-40, plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(-velocity);            // make it go!
        this.setImmovable();                    
        this.newPlatform = true;                 // custom property to control barrier spawning
        this.body.setAllowGravity(false);
        this.scene = scene;
        this.text = plat;
        this.velocity = velocity;
        this.body.setSize(80,80,80,80);
    }

    update() {
        if(game.state.gameOver)
        {
            this.alpha = false
            this.destroy();
        }
        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -200) {
            this.destroy();
        }
    }
}