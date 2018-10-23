var Game = {
    create: function () {
        //  Set game physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1400;
        //#endregion
        //#region Add Keyboard
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //#endregion
        //#region Add Sprite
        this.BG1 = game.add.sprite(0, 0, 'BG');
        this.BG2 = game.add.sprite(WIDTH, 0, 'BG');
        this.Player = game.add.sprite(100, 100, 'Player');
        this.Floor = game.add.sprite(0, 475, 'Floor');
        //#endregion
        //#region Add PlayerAnim
        this.Run = this.Player.animations.add('Run')
        this.Player.animations.play('Run', 20, true);
        //#endregion
        //#region Set collider
        this.physics.enable([this.Player, this.Floor], Phaser.Physics.ARCADE);

        this.Floor.body.allowGravity = false;
        this.Floor.body.checkCollision.up = true;
        this.Floor.body.immovable = true;

        this.Player.body.collideWorldBounds = true;
        this.Player.body.setSize(20, 32, 5, 32);

        //#endregion
        this.ObsGroup = game.add.group();
        this.ObsGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.ObsGroup.enableBody = true;
    },

    BG_effect: function () {
        let BG_speed = 5;
        this.BG1.x -= BG_speed;
        this.BG2.x -= BG_speed;
        if (this.BG2.x <= 0) {
            this.BG1.x = 0;
            this.BG2.x = WIDTH;
        }
    },


    update: function () {
        Game.BG_effect();

        this.pushObs();
        this.ObsGroup.subAll('x', 5);
        

        if (game.physics.arcade.collide(Game.Player, Game.Floor) && Game.jumpButton.isDown) {
            Game.Player.body.velocity.y = -500;
        }

        //  사 망        
        if(game.physics.arcade.collide(Game.Player,this.ObsGroup)){
            game.state.start('gameOver');
        }

    },

    pushObs: function () {
        if (rand(1, 20) == 1) {
            this.ObsGroup.create(800, 460, 'Obstacle');
            this.ObsGroup.setAll('body.allowGravity', false);
            this.ObsGroup.setAll('body.immovable', true);
        }
    },
}