//  System variable
const WIDTH = 800;
const HEIGHT = 600;

var jumpButton;
var score;

var game = new Phaser.Game(WIDTH, HEIGHT,Phaser.Auto)

var Game = {
    preload: function(){
        game.load.image('BG', '../asset/background/BG.png');
        game.load.image('Obstacle','../asset/sprites/Obstacle.png')
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

        this.Floor.body.allowGravity = false;
        this.Floor.body.checkCollision.up = true;
        this.Floor.body.immovable = true;

        this.Player.body.collideWorldBounds = true;
        this.Player.body.setSize(20, 32, 5, 16);
        this.Player.body.y = 430

        //#endregion
        this.ObsList = [];
        this.ObsGroup = game.add.group();
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
        Game.BG_effect();

        this.pushObs();
       // this.pushBig();
        //this.pushSmall();
        // for(let i=0; i<this.ObsList.length;i++){
        //     this.ObsGroup[i].x-=5;
        // }
        this.ObsGroup.subAll('x',5);
        game.physics.arcade.collide(Game.Player,Game.Floor);

        if(Game.Player.body.touching.down && Game.jumpButton.isDown){
            Game.Player.body.velocity.y = -500;
        }

    },

    pushObs: function(){
        if(rand(1,20) == 1){
            this.ObsGroup.create(800,460,'Obstacle');
        }
    },
    
    /*pushBig: function(){
        if(rand(1,20) == 1){
            let blocke = game.add.image(800,460,'BigBlock');
            Game.BigList.push(blocke)
        }
    },
    
    pushSmall: function(){
        if(rand(1,20) == 1){
            let blocke = game.add.image(800,460,'SmallBlock');
            Game.SmallList.push(blocke)
            
        }
    }
*/
    
}
game.state.add('Game',Game);

game.state.start('Game');


//  Utility
var rand = function(min,max){
    return Math.floor((Math.random()*max) + min)
};