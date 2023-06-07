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
        this.load.image('truck', './assets/truck.png');
        this.load.image('minitruck', './assets/Mini_truck.png');
        this.load.image('car', './assets/Car.png');
        this.load.image('bush', './assets/bush.png');
        this.load.image('nothing', './assets/transparent.png');


    }

    create(){
        //set background color for scene 
        const cam1 = this.cameras.main.setViewport(0, 0, 760, 650).setBackgroundColor("#93969d");
        this.background = this.add.tileSprite(60, 110, 626, 416, 'parkinglot').setOrigin(0,0);
        //car positions (possibly make prefab if there is time for the bodies)
        this.audi = this.matter.add.sprite(230, 390, 'audi').setScale(0.75);
        this.audi2 = this.matter.add.sprite(230, 390, 'audi').setScale(0.75);
        var audi_body = this.matter.bodies.rectangle(230, 440, 70, 170);
        var audi_body2 = this.matter.bodies.rectangle(420, 210, 70, 160);
        
        this.blackviper = this.matter.add.sprite(325, 300, 'blackviper').setScale(0.75);
        var blackviper_body = this.matter.bodies.rectangle(420, 440, 70, 150);

        this.taxi = this.matter.add.sprite(520, 350, 'taxi').setScale(0.75);
        var taxi_body = this.matter.bodies.rectangle(510, 450, 70, 170);
        
        this.mvan = this.matter.add.sprite(135, 60, 'minivan').setScale(0.75);
        var mvan_body = this.matter.bodies.rectangle(230, 210, 70, 150);

        this.truck = this.matter.add.sprite(135, 60, 'truck').setScale(0.75);
        var truck_body = this.matter.bodies.rectangle(330, 210, 70, 150);

        this.minitruck = this.matter.add.sprite(135, 60, 'minitruck').setScale(0.75);
        var minitruck_body = this.matter.bodies.rectangle(520, 200, 70, 150);

        this.player = this.matter.add.sprite(620, 440, 'car').setScale(0.75);
        var player_body = this.matter.bodies.rectangle(350, 70, 160, 70);

        //used to check for correct parking
        this.Win = this.matter.add.sprite(325, 370, 'nothing').setScale(0.1);
        var nothing_body = this.matter.bodies.rectangle(325, 360, 100, 5);
        
        //add bush
        this.bush = this.matter.add.sprite(120, 70, 'bush').setScale(1.1);
        var bush_body = this.matter.bodies.rectangle(370, 325, 390, 70);

        //set world bounds
        this.matter.world.setBounds(0, 0, 760, 650);

        this.gameWon = false;
        this.gameOver = false;
        this.stop = false;

        //car hitbox for collision
        this.audi.setExistingBody(audi_body);
        this.audi2.setExistingBody(audi_body2);
        this.blackviper.setExistingBody(blackviper_body);
        this.taxi.setExistingBody(taxi_body);
        this.mvan.setExistingBody(mvan_body);
        this.truck.setExistingBody(truck_body);
        this.minitruck.setExistingBody(minitruck_body);
        this.player.setExistingBody(player_body);
        this.bush.setExistingBody(bush_body);
        this.Win.setExistingBody(nothing_body);

        //makes car harder to move
        this.player.setFrictionAir(0.08);
        this.player.setFixedRotation();

        //makes bush stay still
        this.bush.setStatic(true);

        //collide with any cars == game lost
        this.player.setOnCollideWith(this.audi, pair => {
            this.gameOver = true;
        })

        this.player.setOnCollideWith(this.audi2, pair => {
            this.gameOver = true;
        })
        
        this.player.setOnCollideWith(this.blackviper, pair => {
            this.gameOver = true;
        })

        this.player.setOnCollideWith(this.taxi, pair => {
            this.gameOver = true;
        })

        this.player.setOnCollideWith(this.mvan, pair => {
            this.gameOver = true;
        })

        this.player.setOnCollideWith(this.truck, pair => {
            this.gameOver = true;
        })

        this.player.setOnCollideWith(this.minitruck, pair => {
            this.gameOver = true;
        })

        this.player.setOnCollideWith(this.bush, pair => {
            this.gameOver = true;
        })

        //park fully inside parking spot = game win
        this.player.setOnCollideWith(this.Win, pair => {
            this.gameWon = true;
        })

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
        //Check for game win
        if (this.gameWon == true){
            this.gameWonScreen();
            if (Phaser.Input.Keyboard.JustDown(keyR)){
                this.scene.restart();
            }
            if (Phaser.Input.Keyboard.JustDown(keyM)){
                this.scene.start("menuScene");
            }
        }

        //Check for game lost
        if (this.gameOver == true && this.stop == false)
        {
            this.gameLost();
        }
        if (this.gameOver == true && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if (this.gameOver == true && Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene");
        }

        //If game is still on going
        //Movement for player
        if(keyLEFT.isDown && 0 < this.player.x && this.gameOver == false) { //car goes left
            this.player.setAngularVelocity(-0.015);
        }
        if (keyRIGHT.isDown && this.player.x < 760 && this.gameOver == false) {  //car goes right
            this.player.setAngularVelocity(0.015);
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

    gameLost(){
        let textConfig = {
            fontSize: '30px',
            fill: '#ffffff',
            fontFamily: '"Georgia"',
            strokeThickness: 5,
            stroke: 'black',
    
        };

        this.stop = true;
        this.gameOver = true;
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (M) to Menu', textConfig).setOrigin(0.5);
        console.log('bruh');
        
    }

    gameWonScreen(){
        let textConfig = {
            fontSize: '30px',
            fill: '#ffffff',
            fontFamily: '"Georgia"',
            strokeThickness: 5,
            stroke: 'black',
    
        };

        this.add.text(game.config.width/2, game.config.height/2, 'GOOD JOB HENRY', textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'To be continued...', textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press (R) to Restart or (M) to Menu', textConfig).setOrigin(0.5);
        
    }
}