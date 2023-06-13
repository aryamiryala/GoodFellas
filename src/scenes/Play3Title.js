class Play3Title extends Phaser.Scene{
    constructor(){
        super("play3TitleScene");
    }
    preload(){
        this.load.image('title', './assets/title.png');
        this.load.audio('sfx_background', './assets/background.mp3');
    }
    
    create(){
        this.background= this.add.tileSprite(60, -10, 640, 480, 'title').setOrigin(0,0);

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
            fontSize: '18px', 
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
        This scene is similar to the second scene. 
        However Spider is walking at a slower pace because Tommy shoots him in the foot. 
        Your objective in this scene is to try and deliver drinks to Tommy before the time runs out. 
        In this scene you get less time on the clock and Spider moves slower. 
        To simulate Tommy killing Spider in the movie, this level is difficult to beat
        Get the drink from the drink bar and deliver it to Tommy before time runs out.
        IMPORTANT! ! ! : Use the W, A, S, D to move around as Spider. 
        Good Luck!!! 
        `;

        this.add.text(370, 420, mssg , mssgConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/1.2, 'Press -> to play the scene', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/1.1, 'Press <- to go back to scene select', menuConfig).setOrigin(0.5);
      

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);



    }
    update(){
       //this.background.tilePositionX -= 2; 
        
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
           
           
              this.scene.start("play3Scene");    
              this.backgroundSong.destroy();  

        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
           
           
              this.scene.start("playTitleScene");    
              this.backgroundSong.destroy();  

        }


    }

}