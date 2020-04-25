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
      this.physics.add.collider( this.platformGroup,this.playerGroup);
      }
      addPlatform() {
        let plat = new Platform(this, this.Platformspeed,'platimage');     // create new barrier
        this.platformGroup.add(plat);                         // add it to existing group
    }
    addPlayer(){
      let player = new Player(this,320, 240, 'yarn',this.input.keyboard.createCursorKeys());
      this.playerGroup.add(player);  
    }
    update() {
      
     

   }

  }