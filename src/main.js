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
    scene: [Menu, PlayTitle, Play1Title, Play1, Play2]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyI, keyR, keyM; 

//set UI sizes
let borderUISize = game.config.height / 15; 
let borderPadding = borderUISize / 3; 