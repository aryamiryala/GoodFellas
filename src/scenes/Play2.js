class Play2 extends Phaser.Scene{
    constructor(){
        super("play2Scene");
    }

    preload(){
        //this.load.path = './assets/'

        this.load.image('tilesetImage', './assets/bar_tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON', './assets/map.json');

    }
    create(){
    


        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('bar_tileset', 'tilesetImage');

        //add layers
        const bgLayer = map.createLayer('background', tileset, 0, 0)
        const terrainLayer = map.createLayer('terrain', tileset, 0, 0)


    }
    update(){

    }
}