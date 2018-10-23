var Game = {
    create: function() {
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
        
        //  Set colliderPlayer
        this.physics.enable(this.Player, Phaser.Physics.ARCADE);
        //this.Player.body.bounce.y = 0.2;
        this.Player.body.collideWorldBounds = true;
        this.Player.body.setSize(20, 32, 5, 32);

        this.ObsList = [];
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
        for(let i=0; i<this.ObsList.length;i++){
            this.ObsList[i].x-=5;
        }
        if(Game.jumpButton.isDown && Game.Player.body.onFloor()){
            Game.Player.body.velocity.y = -550;
        }
    },

    pushObs: function(){
        if(rand(1,20) == 1){
            let obs = game.add.sprite(800,460,'Obstacle');
            // this.physics.enable(this.obs, Phaser.Physics.ARCADE);
            // obs.body.collideWorldBounds = true;
            // obs.body.setSize(0, 0, 32, 32);
            Game.ObsList.push(obs)
        }
    }
}


//  Utility
var rand = function(min,max){
    return Math.floor((Math.random()*max) + min)
};