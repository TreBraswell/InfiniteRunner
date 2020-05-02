class PinPlatform extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, velocity,plat,prevx,prevy) {
        var tempy = Phaser.Math.Between(0, game.config.height);
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width, Phaser.Math.Between(0, game.config.height), plat); 
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
    }

    update() {
        // destroy paddle if it reaches the left edge of the screen
    }
}