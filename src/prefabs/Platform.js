// Spaceship prefab
class Platform extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, velocity,plat,prevx,prevy) {
        // call Phaser Physics Sprite constructor
        let platformHeight = 103;
        let platformWidth = 300;
        var tempx = Phaser.Math.Between(game.config.width+platformWidth+50,game.config.width+platformWidth+game.config.width);
        var tempy = Phaser.Math.Between(platformHeight/2, game.config.height - platformHeight/2);
        while((tempy<(prevy+platformHeight))&&tempy>(prevy-platformHeight))
        {
            tempy = Phaser.Math.Between(platformHeight/2, game.config.height - platformHeight/2);
        }
        while((tempx<(prevx+platformWidth))&&tempx>(prevx-platformWidth))
        {
            tempx = Phaser.Math.Between(game.config.width+platformWidth+50,game.config.width+platformWidth+game.config.width);
        }
        super(scene,  tempx, tempy , plat); 
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
        if(game.state.gameOver)
        {
            this.destroy()
        }
    
        // override physics sprite update()
        super.update();

        // add new barrier when existing barrier hits center X
        if(this.newPlatform&& this.x < game.config.width) {
            this.newPlatform = false;
            // call parent scene method from this context
            this.scene.addPlatform(this.parent, this.velocity,this.text,this.x,this.y);
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -200) {
            this.destroy();
        }
    }
}