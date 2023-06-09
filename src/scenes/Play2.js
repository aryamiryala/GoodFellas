class Play2 extends Phaser.Scene{
    constructor(){
        super("play2Scene");
    }

    preload(){
        this.load.path = './assets/'

        this.load.image('tilesetImage', 'bar_tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON', 'map.json');

    }
    create(){

        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');

        //add layers
        //const bgLayer = map.createLayer('background', tileset, 0, 0)

    }
    update(){

    }
}