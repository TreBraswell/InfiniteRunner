let config = {
    type: Phaser.CANVAS,
    width: 840,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play, GameOver ],
};

let game = new Phaser.Game(config);
function create()
{
    game.input.mouse.capture = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
}
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,    
}


// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT,keyPrev,keyNext,keyB, keySPACE;
let timer;
let keyR, keyM

game.state = {
    gameOver: false,
    played_death: false
}

game.persist = {
    highScore: 0,
    isNew: false    // this is handled in the Play.js, so we need info carried over from Play to GameOver Scene

}

var controlpage
function update()
{
    game.mousedown = game.input.activePointer.leftButton.isDown;
    console.log(game.mousedown);
}
