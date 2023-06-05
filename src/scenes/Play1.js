class Play1 extends Phaser.Scene{
    constructor(){
        super("play1Scene");
    }
    preload(){
        this.load.image('parkinglot', './assets/parkinglot.png');
    }

    create(){
        const cam1 = this.cameras.main.setViewport(0, 0, 760, 600).setBackgroundColor("#94979e");
        this.background = this.add.tileSprite(60, 60, 626, 416, 'parkinglot').setOrigin(0,0);
        
    }
}