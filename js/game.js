var game = new Phaser.Game(800,600,Phaser.Auto)

var Game = {
    preload: function(){
        game.load.spritesheet('Player','../asset/sprites/RunP.png',55,70,12);
    },
    create: function(){
        var Player = game.add.sprite(100,100,'Player');
        var RunAnim = Player.animations.add('Run')
        Player.animations.play('Run',20,true);
    },
    update: function(){
        
    }
}
game.state.add('Game',Game);

game.state.start('Game');