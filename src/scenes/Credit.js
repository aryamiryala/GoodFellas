class Credit extends Phaser.Scene{
    constructor(){
        super("creditScene");
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
        Developed by: Arya Miryala and Brennan Tsang

        Built with: Phaser 3, Javascript, Github, Tiled

        Assets: 
        Beer Bottle: https://pngtree.com/so/Pixel
        Arrows: https://pngtree.com/so/Vector
        Tommy: https://pngtree.com/freepng/pixel-art-character-wearing-suit_7964693.html
        

    
        `;

        this.add.text(370, 450, mssg , mssgConfig).setOrigin(0.5);


        this.add.text(game.config.width/2, game.config.height/1.2, 'Press <- to go back to menu', menuConfig).setOrigin(0.5);
      

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);



    }
    update(){
       //this.background.tilePositionX -= 2; 
        
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
           
           
              this.scene.start("menuScene");    
              this.backgroundSong.destroy();  

        }


    }

}