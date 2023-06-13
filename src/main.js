/* 
Made by:
Arya Miryala
Brennen Tsang

Five Phaser's major components:
1) Arcade Physics used in second and third scene
2) Camera
3) Tilemap 
4) Timer used in second scene
5) Matter Physics used in first scene
6) Text objects

Beer Bottle: <a href='https://pngtree.com/so/Pixel'>Pixel png from pngtree.com/</a>
Arrows: <a href='https://pngtree.com/so/Vector'>Vector png from pngtree.com/</a> */
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
    scene: [Menu, PlayTitle, Play1Title, Play1, Play2Title, Play2, Play3Title, Play3, Credit]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyI, keyR, keyM, keyArrowR, keyC; 

//set UI sizes
let borderUISize = game.config.height / 15; 
let borderPadding = borderUISize / 3; 