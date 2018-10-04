//  #const
const WIDTH = 800;
const HEIGHT = 600;

var game = new Phaser.Game(WIDTH, HEIGHT,Phaser.Auto)

var Game = {
    preload: function(){
        game.load.image('background', '../asset/background/background.jpg');
        game.load.spritesheet('Player','../asset/sprites/RunP.png',57,80,12);
    },

    background_effect : function() {
        let background_speed = 5;
        background1.x -= background_speed;
        background2.x -= background_speed;
        if (background2.x <= 0) {
            background1.x = 0;
            background2.x = WIDTH;
        }
    },

    create: function(){
        //  Add background
        var background1 = game.add.sprite(0, 0, 'background');
        var background2 = game.add.sprite(WIDTH, 0, 'background');

        //  Add player
        var Player = game.add.sprite(100,100,'Player');
        var Run = Player.animations.add('Run')
        Player.animations.play('Run',20,true);
    },

    update: function(){
        background_effect();
    },
}
game.state.add('Game',Game);

game.state.start('Game');