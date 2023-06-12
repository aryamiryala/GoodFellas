// Arya Miryala
// Brennen Tsang
// Arcade Physics and Matter Physics used
// Camera, tilemap, and timer used in second scene

// Beer Bottle: <a href='https://pngtree.com/so/Pixel'>Pixel png from pngtree.com/</a>
let config = {
    type: Phaser.CANVAS, 
    render: {
      pixelArt: true
    },
    width: 760, 
    height: 650,
    physics: {
        default: 'matter',
        matter: {
          gravity: { y: 0 },
          debug: false
        }

    }, 
    scene: [Menu, PlayTitle, Play1Title, Play1, Play2Title, Play2, Play3Title, Play3]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyI, keyR, keyM; 

//set UI sizes
let borderUISize = game.config.height / 15; 
let borderPadding = borderUISize / 3; 