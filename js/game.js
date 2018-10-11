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
        


    },

    create: function(){
        //  Set game physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 800;

        //  Keyboard
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //  Add BG
        this.BG1 = game.add.sprite(0, 0, 'BG');
        this.BG2 = game.add.sprite(WIDTH, 0, 'BG');

        /// Add player
        this.Player = game.add.sprite(100,100,'Player');
        this.Run = this.Player.animations.add('Run')
        this.Player.animations.play('Run',20,true);
        
        //  Set collider
        this.physics.enable(this.Player, Phaser.Physics.ARCADE);
        //this.Player.body.bounce.y = 0.2;
        this.Player.body.collideWorldBounds = true;
        this.Player.body.setSize(20, 32, 5, 16);

        this.ObsList = [];
        this.BigList = [];
        this.SmallList = [];
        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

        game.add.text(30, 20, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
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
        this.pushBig();
        this.pushSmall();
        for(let i=0; i<this.ObsList.length;i++){
            this.ObsList[i].x-=5;
        }
        
       
    
        if(Game.jumpButton.isDown && Game.Player.body.onFloor()){
            Game.Player.body.velocity.y = -550;
        }
    },

    pushObs: function(){
        if(rand(1,20) == 1){
            let obs = game.add.image(800,460,'Obstacle');
            Game.ObsList.push(obs)
            
        }
    },
    
    pushBig: function(){
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

    
}
game.state.add('Game',Game);

game.state.start('Game');


//  Utility
var rand = function(min,max){
    return Math.floor((Math.random()*max) + min)
};