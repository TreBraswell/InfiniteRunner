let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu ],
};

let game = new Phaser.Game(config);
function create()
{
    game.input.mouse.capture = true;
}
game.settings = {
    spaceshipSpeed: 3   
}

// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT,keyPrev,keyNext,keyB;
function update()
{
    game.mousedown = game.input.activePointer.leftButton.isDown;
    console.log(game.mousedown);
}
