// Spaceship prefab
class Platform extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, velocity,plat) {
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
        this.velocity = velocity;
    }

    update() {
        // override physics sprite update()
        super.update();

        // add new barrier when existing barrier hits center X
        if(this.newPlatform&& this.x < this.width/2) {
            this.newPlatform = false;
            // call parent scene method from this context
            this.scene.addPlatform(this.parent, this.velocity);
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}