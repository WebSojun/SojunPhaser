//  System variable
const WIDTH = 800;
const HEIGHT = 600;

var jumpButton;
var score;

var game = new Phaser.Game(WIDTH, HEIGHT,Phaser.Auto)

var Game = {
    preload: function(){
        game.load.image('BG', '../asset/background/BG.png');
        game.load.image('Obstacle','../asset/sprites/Obstacle.png');
        game.load.image('BigBlock','../asset/blocks/High.png');
        game.load.image('SmallBlock','../asset/blocks/Low.png');
        game.load.spritesheet('Player','../asset/sprites/RunP.png',55,64,12);
        game.load.image('Floor', '../asset/background/Floor.png');
    },

    create: function(){
        //#region Set physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1400;
        //#endregion
        //#region Add Keyboard
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //#endregion
        //#region Add Sprite
        this.BG1 = game.add.sprite(0, 0, 'BG');
        this.BG2 = game.add.sprite(WIDTH, 0, 'BG');
        this.Player = game.add.sprite(100,100,'Player');
        this.Floor = game.add.sprite(0,475,'Floor');
        //#endregion
        //#region Add PlayerAnim
        this.Run = this.Player.animations.add('Run')
        this.Player.animations.play('Run',20,true);
        //#endregion
        //#region Set collider
        this.physics.enable([this.Player, this.Floor], Phaser.Physics.ARCADE);

        this.Floor.body.checkCollision.up = true;
        this.Floor.body.immovable = true;
        this.Floor.body.allowGravity = false;

        this.Player.body.collideWorldBounds = true;
        this.Player.body.setSize(20, 32, 5, 16);

        //#endregion
        //#region Setting ObsGroup
        this.ObsGroup = game.add.group();
        this.ObsGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.ObsGroup.enableBody = true;
        //#endregion
        this.PlayerHp = 3;
        this.GodTime = 1;
        this.PlayerTime = 0;
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


    update: function(){
        this.PlayerTime += 1.0/60.0;
        Game.BG_effect();

        this.pushObs();
        if(game.physics.arcade.collide(Game.Player,Game.Floor) && Game.jumpButton.isDown){
            Game.Player.body.velocity.y = -500;
        }

        if(game.physics.arcade.collide(Game.Player,this.ObsGroup) && this.PlayerTime > this.GodTime){
            Game.PlayerHp -= 1;
            this.PlayerTime = 0;
        }

        if(this.PlayerHp <= 0){
            game.state.start('TEMP');
        }
        this.ObsGroup.subAll('x',5);
    },

    //장애물 소환
    pushObs: function(){
        if(rand(1,100) == 1){
            this.ObsGroup.create(800,460,'Obstacle');
            this.ObsGroup.setAll('body.allowGravity', false);
            this.ObsGroup.setAll('body.immovable', true);

        }
    },
    
}

var TEMP = {
    preload:function(){},
    create:function(){},
    update:function(){}
}

game.state.add('Game',Game);
game.state.add('TEMP',TEMP);
game.state.start('Game');


//  Utility
var rand = function(min,max){
    return Math.floor((Math.random()*max) + min)
};