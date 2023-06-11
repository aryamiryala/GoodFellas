class Play2 extends Phaser.Scene{
    constructor(){
        super({
            key: "play2Scene",
            physics: {
                arcade: {
                    debug: true
                }
            }
        });

        this.VEL = 100
    }

    preload(){
        this.load.path = './assets/'
       
        this.load.spritesheet('spider', 'spider.png', {
            frameWidth: 40, 
            frameHeight: 43,
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

        //animation for spider
        this.anims.create({
            key: 'forward', 
            frameRate: 8, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('spider', { start: 0, end: 3})
        })

        this.anims.create({
            key: 'right', 
            frameRate: 8, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('spider', { start: 4, end: 7})
        })

        this.anims.create({
            key: 'left', 
            frameRate: 8, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('spider', { start: 8, end: 11})
        })

        this.anims.create({
            key: 'backward', 
            frameRate: 8, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('spider', { start: 12, end: 15})
        })

        //this.spider.play("forward")
        
        
        //set world collision
        this.spider.body.setCollideWorldBounds(true)

        //cameras
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setZoom(3.5);

        this.cameras.main.startFollow(this.spider, true, 0.25, 0.25);

        //keys for control
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);


    }
    update(){
        this.direction = new Phaser.Math.Vector2(0)

        if(keyLEFT.isDown){
            this.direction.x = -1
            this.spider.play("left")

        }
        else if(keyRIGHT.isDown){
            this.direction.x = 1
            this.spider.play("right")
        }
        if(keyUP.isDown){
            this.direction.y = -1
            this.spider.play("backward")

        }
        else if(keyDOWN.isDown){
            this.direction.y = 1
            this.spider.play("forward")
        }
        this.direction.normalize()
        this.spider.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)

    }
}