/*Tre Braswell, Eric Suzuki, and Ixel Camacho
Game Title: Yarny
5-3-20
Tre:Technically Interesting: I created a scaling feature that scaled the texture atlas depending on whether the player collected the button or a pin. The different sizes had different collision and velocity. I think this is technically interesting because i had to learn about scale and managing prefabs assets in between scenes.
Ixel:Visual Style: Soft and charming theme with a hint of anime style to the character; the simple art captures adorableness, making you root for the yarn boy. Every art asset created is related to a color palette of dark and bright purple shades with the concept of sewing and yarn. The music, also, is created to make a childhood atmosphere with musical, fun sound effects. 
 
Few sounds were taken from online : jump sound https://freesound.org/people/Lefty_Studios/sounds/369515/, game over sound https://freesound.org/people/themusicalnomad/sounds/253886/, pageflip sound freesound.org
*/let config = {
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
    scene: [ Menu, Play, Controls, Rules, GameOver ],
};

let game = new Phaser.Game(config);
function create()
{
    game.input.mouse.capture = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
}
game.settings = {
    platformspeed: 200,
    gameTimer: 60000,    
}


// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT,keyPrev,keyNext,keyB, keySPACE;
let timer;
let keyR, keyM


game.state = {
    gameOver: false,
    played_death: false,
    collectedButton: false,
    hitPin: false,
    health: 3
    
}

game.persist = {
    highScore: 0,
    currScore: 0,
    buttonScore: 0,

    isNew: false    // this is handled in the Play.js, so we need info carried over from Play to GameOver Scene

}

var controlpage
function update()
{
    game.mousedown = game.input.activePointer.leftButton.isDown;
    console.log(game.mousedown);
}
