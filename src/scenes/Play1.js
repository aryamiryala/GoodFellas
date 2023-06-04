class Play1 extends Phaser.Scene{
    constructor(){
        super("play1Scene");
    }
    preload(){
        this.load.image('background', './assets/parkinglot.png');
    }

    create(){
        game.config.backgroundColor = "#a1a2a6";
    }
}