class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.image('background', './assets/background.png');
        this.load.audio('sfx_background', './assets/background.mp3');

    }
    
    create(){
        this.background= this.add.tileSprite(60, 50, 640, 480, 'background').setOrigin(0,0);

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
       

        //this.add.text(game.config.width/2, game.config.height/1.9, 'Press I for instructions', menuConfig).setOrigin(0.5);
    
        this.add.text(game.config.width/2, game.config.height/1.2, 'Press -> to start game', menuConfig).setOrigin(0.5);
      

        //define keys
    
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);



    }
    update(){
       //this.background.tilePositionX -= 2; 
        
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
           
            // this.sound.play('sfx_select');
              this.scene.start("playTitleScene");  
              this.backgroundSong.destroy();  
        }
        if (Phaser.Input.Keyboard.JustDown(keyI)) {
           
            // this.sound.play('sfx_select');
              this.scene.start("instructionScene");    
        }


    }

}