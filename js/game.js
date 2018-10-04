var game = new Phaser.Game(800,600,Phaser.Auto)

var Game = {
    preload: function(){
        game.load.image('BG','../asset/background/background.png');
        game.load.image('Obstacle','../asset/sprites/Obstacle.png')
        game.load.spritesheet('Player','../asset/sprites/RunP.png',55,64,12);
    },
    create: function(){
        this.BG = game.add.image(0,0,'BG')
        this.Player = game.add.sprite(100,100,'Player');
        this.Obstacle = game.add.image(500,100,'Obstacle');
        this.RunAnim = Player.animations.add('Run')
        Player.animations.play('Run',20,true);
    },
    update: function(){
        
    }
}
game.state.add('Game',Game);

game.state.start('Game');