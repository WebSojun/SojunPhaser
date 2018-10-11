//  System variable
const WIDTH = 800;
const HEIGHT = 600;

var jumpButton;


var game = new Phaser.Game(WIDTH, HEIGHT,Phaser.Auto)

var Game = {
    preload: function(){
        game.load.image('BG', '../asset/background/BG.png');
        game.load.image('Obstacle','../asset/sprites/Obstacle.png')
        game.load.spritesheet('Player','../asset/sprites/RunP.png',55,64,12);
    },

    create: function(){
        //  Set game physics
        this.physics.startSystem(Phaser.physics.ARCADE);
        game.physics.arcade.gravity.y = 250;

        //  Keyboard
        this.jumpButton = game.input.Keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        //  Add BG
        this.BG1 = game.add.sprite(0, 0, 'BG');
        this.BG2 = game.add.sprite(WIDTH, 0, 'BG');

        /// Add player
        this.Player = game.add.sprite(100,100,'Player');
        this.Run = this.Player.animations.add('Run')
        this.Player.animations.play('Run',20,true);
        this.Obstacle = game.add.image(500,100,'Obstacle');
        
        //  Set collider
        this.physics.enable(Player, Phaser.physics.ARCADE);
        player.body.bounce.y = 0.2;
        player.body.collideWorldBounds = true;
        player.body.setSize(20, 32, 5, 16);
    },

    BG_effect: function() {
        let BG_speed = 5;
        this.BG1.x -= BG_speed;
        this.BG2.x -= BG_speed;
        if (this.BG2.x <= 0) {
            this.BG1.x = 0;
            this.BG2.x = WIDTH;
        }
    },

    playerMove: function() {
        if (Game.jumpButton.isDown && Game.Player.body.onFloor() && game.time.now > jumpTimer) {
            Game.Player.body.velocity.y = -250;
            jumpTimer = game.time.now + 750;
        }
    },

    update: function(){
        Game.BG_effect();
        Game.playerMove();
    },
}
game.state.add('Game',Game);

game.state.start('Game');