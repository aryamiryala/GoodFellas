let config = {
    type: Phaser.CANVAS, 
    width: 760, 
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          //debug: true
        }

    },
    backgroundColor: "#a1a2a6",
    scene: [Menu]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyI, keyR, keyM; 

//set UI sizes
let borderUISize = game.config.height / 15; 
let borderPadding = borderUISize / 3; 