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
            frameHeight: 42,
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
        this.forward = true;

        this.anims.create({
            key: 'right', 
            frameRate: 8, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('spider', { start: 4, end: 7})
        })
        this.right = false;

        this.anims.create({
            key: 'left', 
            frameRate: 8, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('spider', { start: 8, end: 11})
        })
        this.left = false;

        this.anims.create({
            key: 'backward', 
            frameRate: 8, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('spider', { start: 12, end: 15})
        })
        this.backward = false;

        this.anims.create({
            key: 'idle', 
            frameRate: 8, 
            frames: this.anims.generateFrameNumbers('spider', { start: 0, end: 0})
        })

        this.spider.play("forward")
        
        
        //set world collision
        this.spider.body.setCollideWorldBounds(true)

        //cameras
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

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
            if (this.left == false && keyUP.isUp && keyDOWN.isUp){
                this.spider.play("left")
                this.left = true;
                this.right = false;
                this.forward = false;
                this.backward = false;
            }
        }
        else if(keyRIGHT.isDown){
            this.direction.x = 1
            if (this.right == false && keyUP.isUp && keyDOWN.isUp){
                this.spider.play("right")
                this.left = false;
                this.right = true;
                this.forward = false;
                this.backward = false;
            }
        }
        if(keyUP.isDown){
            this.direction.y = -1
            if (this.backward == false){
                this.spider.play("backward")
                this.left = false;
                this.right = false;
                this.forward = false;
                this.backward = true;
            }
        }
        else if(keyDOWN.isDown){
            this.direction.y = 1
            if (this.forward == false){
                this.spider.play("forward")
                this.left = false;
                this.right = false;
                this.forward = true;
                this.backward = false;
            }
        }

        if (keyDOWN.isUp && keyUP.isUp && keyRIGHT.isUp && keyLEFT.isUp){
            this.spider.stop();
            this.left = false;
            this.right = false;
            this.forward = false;
            this.backward = false;
        }
        this.direction.normalize()
        this.spider.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)

    }
}