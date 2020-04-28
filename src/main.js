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
}
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,    
}


// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT,keyPrev,keyNext,keyB, keySPACE;
var controlpage
function update()
{
    game.mousedown = game.input.activePointer.leftButton.isDown;
    console.log(game.mousedown);
}
