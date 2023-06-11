class Play2 extends Phaser.Scene{
    constructor(){
        super("play2Scene");
    }

    preload(){
        this.load.path = './assets/'
       
        this.load.spritesheet('spider', 'spider.png', {
            frameWidth: 40, 
            frameHeight: 40,
            margin: 20
        })

        this.load.image('tilesetImage', 'bar_tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON', 'map.json');

    }
    create(){
    


        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('bar_tileset', 'tilesetImage');

        //add layers
        const bgLayer = map.createLayer('background', tileset, 0, 0)
        const terrainLayer = map.createLayer('terrain', tileset, 0, 0)

        this.spider = this.physics.add.sprite(102, 102, 'spider', 0, 0)

        this.anims.create({
            key: 'forward', 
            frameRate: 8, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('spider', { start: 0, end: 4})
        })

        //this.spider.play("forward")


    }
    update(){

    }
}