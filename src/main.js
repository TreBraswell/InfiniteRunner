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
    scene: [ Menu ],
};

let game = new Phaser.Game(config);
function create()
{
    game.input.mouse.capture = true;
}
game.settings = {
    platformspeed: 5  
}

// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT,keyPrev,keyNext,keyB;
const platformHeight = 250;
const platformWidth = 250;
const diff = 100;

function update()
{
    game.mousedown = game.input.activePointer.leftButton.isDown;
    console.log(game.mousedown);
}
