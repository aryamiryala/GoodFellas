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
        this.load.image('truck', './assets/truck.png')
        this.load.image('minitruck', './assets/Mini_truck.png')
        this.load.image('car', './assets/Car.png');
        this.load.image('bush', './assets/bush.png');


    }

    create(){
        //set background color for scene 
        const cam1 = this.cameras.main.setViewport(0, 0, 760, 600).setBackgroundColor("#93969d");
        this.background = this.add.tileSprite(60, 60, 626, 416, 'parkinglot').setOrigin(0,0);
        //car positions
        this.audi = this.matter.add.sprite(230, 390, 'audi').setScale(0.75);
        var audi_body = this.matter.bodies.rectangle(230, 390, 100, 150);
        
        this.blackviper = this.matter.add.sprite(325, 300, 'blackviper').setScale(0.75);
        var blackviper_body = this.matter.bodies.rectangle(420, 390, 70, 150);

        this.taxi = this.matter.add.sprite(520, 350, 'taxi').setScale(0.75);
        var taxi_body = this.matter.bodies.rectangle(510, 400, 70, 170);
        
        this.mvan = this.matter.add.sprite(135, 60, 'minivan').setScale(0.75);
        var mvan_body = this.matter.bodies.rectangle(230, 160, 70, 150);

        this.truck = this.matter.add.sprite(135, 60, 'truck').setScale(0.75);
        var truck_body = this.matter.bodies.rectangle(330, 160, 70, 150);

        this.minitruck = this.matter.add.sprite(135, 60, 'minitruck').setScale(0.75);
        var minitruck_body = this.matter.bodies.rectangle(520, 150, 70, 150);

        this.player = this.matter.add.sprite(620, 440, 'car').setScale(0.75);
        var player_body = this.matter.bodies.rectangle(50, 80, 70, 150);
        this.player.setFixedRotation();

        //add bush
        this.bush = this.matter.add.sprite(120, 70, 'bush').setScale(1.1);
        var bush_body = this.matter.bodies.rectangle(370, 275, 390, 70);

        //set world bounds
        this.matter.world.setBounds(0, 0, 760, 600);


    
        this.gameOver = false;

        //car hitbox for collision
        this.audi.setExistingBody(audi_body);
        this.blackviper.setExistingBody(blackviper_body);
        this.taxi.setExistingBody(taxi_body);
        this.mvan.setExistingBody(mvan_body);
        this.truck.setExistingBody(truck_body);
        this.minitruck.setExistingBody(minitruck_body);
        this.player.setExistingBody(player_body);
        this.bush.setExistingBody(bush_body);

        // this.blackviper.body.setSize(110, 216, true);
        // this.taxi.body.setSize(110, 216, true);
        // this.mvan.body.setSize(110, 216, true);
        // this.player.body.setSize(110, 216, true);
        // this.bush.body.setSize(200, 50, true);

        //arrow key for control
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        
    }

    update(){
        this.player.angle = 90;
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

        if(keyLEFT.isDown && 0 < this.player.x && this.gameOver == false) { //car goes left
            this.player.setAngularVelocity(-0.01);
        }
        if (keyRIGHT.isDown && this.player.x < 700 && this.gameOver == false) {  //car goes right
            this.player.setAngularVelocity(0.01);
        }
        if (keyUP.isDown && 0 < this.player.y && this.gameOver == false) { //car goes forward
            this.player.thrust(0.01);
        }
        if (keyDOWN.isDown && this.player.y < 660 && this.gameOver == false) { //car goes back
            this.player.thrust(-0.01);
        }
        
        // this.matter.add.overlap(this.player, this.audi, gameLost, null, this);
        // this.matter.add.overlap(this.player, this.blackviper, gameLost, null, this);
        // this.matter.add.overlap(this.player, this.taxi, gameLost, null, this);
        // this.matter.add.overlap(this.player, this.mvan, gameLost, null, this);
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