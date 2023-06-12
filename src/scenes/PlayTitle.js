class PlayTitle extends Phaser.Scene{
    constructor(){
        super("playTitleScene");
    }
    preload(){
        this.load.image('title', './assets/title.png');
        this.load.audio('sfx_background', './assets/background.mp3');
    

    }
    
    create(){
        this.background= this.add.tileSprite(60, 60, 640, 480, 'title').setOrigin(0,0);
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
       

        this.add.text(game.config.width/2, game.config.height/6.5, 'Press up arrow to play scene 1', menuConfig).setOrigin(0.5);
    
        this.add.text(game.config.width/2, game.config.height/1.6, 'Press down arrow to play scene 2', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/1.3, 'Press -> to play scene 3', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/1.1, 'Press <- to go back to menu', menuConfig).setOrigin(0.5);

    
      

        //define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);



    }
    update(){
       //this.background.tilePositionX -= 2; 
        
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
           
            // this.sound.play('sfx_select');
              this.scene.start("play1TitleScene");  
              this.backgroundSong.destroy();  
  
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
           
            // this.sound.play('sfx_select');
              this.scene.start("play2TitleScene");    
              this.backgroundSong.destroy();  

        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
           
            // this.sound.play('sfx_select');
              this.scene.start("play3TitleScene");    
              this.backgroundSong.destroy();  

        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
           
            // this.sound.play('sfx_select');
              this.scene.start("menuScene");    
              this.backgroundSong.destroy();  

        }


    }

}