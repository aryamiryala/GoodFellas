class Play1Title extends Phaser.Scene{
    constructor(){
        super("play1TitleScene");
    }
    preload(){
        this.load.image('title', './assets/title.png');
        this.load.audio('sfx_background', './assets/background.mp3');
    }
    
    create(){
        this.background= this.add.tileSprite(60, 0, 640, 480, 'title').setOrigin(0,0);

         //add music, set volume, play it
         this.backgroundSong = this.sound.add('sfx_background', {volume: 0.5});   
         this.backgroundSong.loop = true; 

         this.backgroundSong.play();

        
        let menuConfig = {
            fontFamily: 'Georgia', 
            fontSize: '28px', 
            backgroundColor: 'transparent',
            color: 'white',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };

        let mssgConfig = {
            fontFamily: 'Georgia', 
            fontSize: '20px', 
            backgroundColor: 'transparent',
            color: '#A4DFF3',
            align: 'center',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };

        const mssg = `
        This scene depicts of Henry as a child parking people's cadillacs. 
        Your objective in this scene is to try and park the car in the open parking space. 
        Because Henry was a kid in this scene and doesn't know how to drive properly 
        it will be harder in this game to manuever the car.
        If bumped into another car or the border of the screen, you automatically lose. 
        IMPORTANT! ! ! : Use the arrow keys to move the car. 
        Good Luck!!! 
        `;

        this.add.text(370, 450, mssg , mssgConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/1.2, 'Press -> to play the scene', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/1.1, 'Press <- to go back to scene select', menuConfig).setOrigin(0.5);
      

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);



    }
    update(){
       //this.background.tilePositionX -= 2; 
        
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
           
           
              this.scene.start("play1Scene");    
              this.backgroundSong.destroy();  

        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
           
           
              this.scene.start("playTitleScene");    
              this.backgroundSong.destroy();  

        }


    }

}