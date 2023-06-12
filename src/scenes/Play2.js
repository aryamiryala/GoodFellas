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

        this.load.image('tommy', 'tommy.png')

        

        this.load.image('tilesetImage', 'bar_tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON', 'map.json');
        this.load.image('beer', 'Beer_Bottle.png');
        this.load.image('nothingness', 'transparent.png')

    }
    create(){

        this.clock = 3000/100; 

        this.gameOver = false; 
    


        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('bar_tileset', 'tilesetImage');

        //add layers
        const bgLayer = map.createLayer('background', tileset, 0, 0)
        const terrainLayer = map.createLayer('terrain', tileset, 0, 0)
        const drinkLayer = map.createLayer('drink', tileset, 0, 0)

        //get different spawn locations for tommy
        const tommySpawn1 = map.findObject('spawn1', obj => obj.name === 'tommySpawn1')
        const tommySpawn2 = map.findObject('spawn2', obj => obj.name === 'tommySpawn2')
        const tommySpawn3 = map.findObject('spawn3', obj => obj.name === 'tommySpawn3')
        const tommySpawn4 = map.findObject('spawn4', obj => obj.name === 'tommySpawn4')
        const tommySpawn5 = map.findObject('spawn5', obj => obj.name === 'tommySpawn5')
        const tommySpawn6 = map.findObject('spawn6', obj => obj.name === 'tommySpawn6')

        //put all possible spawns in an array 
        const tommySpawn = [tommySpawn1, tommySpawn2, tommySpawn3, tommySpawn4, tommySpawn5, tommySpawn6]
        //randomize spawn location 
        const randomSpawn = tommySpawn[Math.floor(Math.random()*tommySpawn.length)];

        //Timer
        this.timeText = this.add.text(10, 10, 'Time: ', {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: '"Georgia"',
            strokeThickness: 10,
            stroke: 'black',
        });
  
        let timeConfig = {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: '"Georgia"',
            strokeThickness: 5,
            stroke: 'black',
  
        };

        this.timer = this.time.addEvent({delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });
        this.timeValue = this.add.text(70, 10, this.clock, timeConfig);



        
        //stops generating the gameover or game won text
        this.stop = false;
        
        //add sprites 
        this.spider = this.physics.add.sprite(102, 102, 'spider', 0, 0)
        this.spider.body.setSize(30, 40, true);
        this.tommy = this.physics.add.sprite(randomSpawn.x, randomSpawn.y, 'tommy', 0, 0).setScale(0.20)


        this.empty = this.physics.add.sprite(350, 30, 'nothingness').setScale(0.2);
        this.empty.body.setSize(970, 350, true);
        this.spawndrink = false;

        // overlap between player and drink cabinet
        this.physics.add.overlap(this.spider, this.empty, this.DrinkPickUp, null, this);


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

        this.spider.play("idle")
        
        
        //set world collision
        this.spider.body.setCollideWorldBounds(true)

        //enable collision 
        terrainLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(this.spider, terrainLayer);

        drinkLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(this.spider, drinkLayer);

        

        //cameras
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setZoom(2);

        this.cameras.main.startFollow(this.spider, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)

        //keys for control
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);


    }
    update(){

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart(); 
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene");
        }
        //Player movement
        this.direction = new Phaser.Math.Vector2(0)

        if (this.stop == false && this.gameOver == false){
            this.physics.add.overlap(this.spider, this.tommy, this.gameWonScreen, null, this);
        }

        if(this.gameOver == false){
            this.timeValue.text = this.clock; 

            // Bottle follows above the player once they collect the drink
            if (this.spawndrink == true){
                this.bottle.x = this.spider.x + 10
                this.bottle.y = this.spider.y
            }
            
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
            this.timeText.x = this.spider.body.position.x - 35
            this.timeText.y = this.spider.body.position.y - 25
            this.timeValue.x = this.spider.body.position.x + 25
            this.timeValue.y = this.spider.body.position.y - 25
        }
        else{
            this.spider.setVelocity(0, 0)
        }

        
    }
    updateTimer(){
        let textConfig = {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: '"Georgia"',
            strokeThickness: 5,
            stroke: 'black',
    
        };

        this.clock--; 
        
        if(this.clock == 0){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', textConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press (R) to Restart or (M) to Menu', textConfig).setOrigin(0.5);
            this.gameOver = true;

        }
        


    }
    gameWonScreen(){
        if (this.gameOver == false){
            this.cameras.main.setZoom(1);
            let textConfig = {
                fontSize: '20px',
                fill: '#ffffff',
                fontFamily: '"Georgia"',
                strokeThickness: 5,
                stroke: 'black',
        
            };
    
            this.stop = true;
            this.gameOver = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GOOD JOB SPIDER', textConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'You live this time...', textConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (M) to Menu', textConfig).setOrigin(0.5);
        }
    }

    DrinkPickUp(){
        if (this.spawndrink == false){
            this.bottle = this.physics.add.sprite(this.spider.x, this.spider.y - 42, 'beer').setScale(0.1);
            this.spawndrink = true;
        }
    }
}