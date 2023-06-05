class Play1 extends Phaser.Scene{
    constructor(){
        super("play1Scene");
    }
    preload(){
        this.load.image('parkinglot', './assets/parkinglot.png');
        this.load.image('audi', './assets/audi.png');
        this.load.image('blackviper', './assets/black_viper.png');
        this.load.image('taxi', './assets/taxi.png');
        this.load.image('minivan', './assets/Mini_van.png');
        this.load.image('car', './assets/Car.png');


    }

    create(){
        const cam1 = this.cameras.main.setViewport(0, 0, 760, 600).setBackgroundColor("#93969d");
        this.background = this.add.tileSprite(60, 60, 626, 416, 'parkinglot').setOrigin(0,0);
        //car positions
        this.audi = this.physics.add.sprite(135, 290, 'audi').setOrigin(0,0).setScale(0.75);
        this.blackviper = this.physics.add.sprite(325, 300, 'blackviper').setOrigin(0,0).setScale(0.75);
        this.taxi = this.physics.add.sprite(420, 300, 'taxi').setOrigin(0,0).setScale(0.75);
        this.mvan = this.physics.add.sprite(135, 60, 'minivan').setOrigin(0,0).setScale(0.75);
        this.player = this.physics.add.sprite(620, 440, 'car').setOrigin(0,0).setScale(0.75);
        this.gameOver = false;

        //car hitbox for collision
        this.audi.body.setSize(110, 216, true);
        this.blackviper.body.setSize(110, 216, true);
        this.taxi.body.setSize(110, 216, true);
        this.mvan.body.setSize(110, 216, true);
        this.player.body.setSize(110, 216, true);

        //arrow key for control
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        
    }

    update(){
        if (this.gameOver == true)
        {
            this.gameDone();
        }
        if (this.gameOver == true && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if (this.gameOver == true && Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene");
        }

        if(keyLEFT.isDown && 0 < this.player.x && this.gameOver == false) { 
            this.player.x -= 5;
        }
        if (keyRIGHT.isDown && this.player.x < 700 && this.gameOver == false) { 
            this.player.x += 5;
        }
        if (keyUP.isDown && 0 < this.player.y && this.gameOver == false) {
            this.player.y -= 5;
        }
        if (keyDOWN.isDown && this.player.y < 660 && this.gameOver == false) {
            this.player.y += 5;
        }
        
        this.physics.add.overlap(this.player, this.audi, gameLost, null, this);
        this.physics.add.overlap(this.player, this.blackviper, gameLost, null, this);
        this.physics.add.overlap(this.player, this.taxi, gameLost, null, this);
        this.physics.add.overlap(this.player, this.mvan, gameLost, null, this);
    }

    gameDone(){
        let textConfig = {
            fontSize: '30px',
            fill: '#ffffff',
            fontFamily: '"Georgia"',
            strokeThickness: 5,
            stroke: 'black',
    
        };

        this.gameOver = true;
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (M) to Menu', textConfig).setOrigin(0.5);
        
    }
}

function gameLost(){
    this.gameOver = true;
}