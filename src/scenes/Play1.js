class Play extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.image('background', './assets/parkinglot.png');
        game.config.backgroundColor = "#a1a2a6";
    }
}