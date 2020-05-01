
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
var newTexture;
var context; 
var originalTexture;
let game = new Phaser.Game(config);
function preload() 
{
    this.load.image('dude', './assets/yarn2_small.png');
}
function create()
{
    game.input.mouse.capture = true;
    /*originalTexture = this.textures.get('dude').getSourceImage();

    newTexture = this.textures.createCanvas('dudeNew', originalTexture.width, originalTexture.height);

    context = newTexture.getSourceImage().getContext('2d');

    context.drawImage(originalTexture, 0, 0);

    this.add.image(100, 100, 'dude');
    this.add.image(200, 100, 'dudeNew');

    this.time.addEvent({ delay: 500, callback: hueShift , loop: true });*/
}
function hueShift ()
{
    /*var pixels = context.getImageData(0, 0, originalTexture.width, originalTexture.height);

    for (i = 0; i < pixels.data.length / 4; i++)
    {
        processPixel(pixels.data, i * 4, 0.1);
    }

    context.putImageData(pixels, 0, 0);

    newTexture.refresh();*/
}
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,    
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
function processPixel (data, index, deltahue)
{
    /*var r = data[index];
    var g = data[index + 1];
    var b = data[index + 2];

    var hsv = Phaser.Display.Color.RGBToHSV(r, g, b);

    var h = hsv.h + deltahue;

    var rgb = Phaser.Display.Color.HSVToRGB(h, hsv.s, hsv.v);

    data[index] = rgb.r;
    data[index + 1] = rgb.g;
    data[index + 2] = rgb.b;*/
}