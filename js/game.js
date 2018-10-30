var score = 0;
var hp = [];


function DestroyP(PotionGroup){
    PotionGroup.destroy();
}

var Game = {
    create: function () {
        score = 0;
        //#region Set game physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1400;
        //#endregion
        //#region Add Keyboard
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //#endregion
        //#region Add Sprite
        this.BG1 = game.add.sprite(0, 0, 'BG');
        this.BG2 = game.add.sprite(WIDTH, 0, 'BG');

        this.BG3 = game.add.sprite(0, 0, 'BG2');
        this.BG4 = game.add.sprite(WIDTH, 0, 'BG2');
        this.BG3.alpha = 0;
        this.BG4.alpha = 0;

        this.Player = game.add.sprite(100, 100, 'Player');
        this.Floor1 = game.add.sprite(0, 475, 'Floor');
        this.Floor2 = game.add.sprite(0, 475, 'Floor');
        //#endregion
        //#region Add PlayerAnim
        this.Run = this.Player.animations.add('Run')
        this.Player.animations.play('Run', 20, true);
        //#endregion
        //#region Set collider
        this.physics.enable([this.Player, this.Floor1, this.Floor2], Phaser.Physics.ARCADE);

        this.Floor1.body.allowGravity = false;
        this.Floor1.body.checkCollision.up = true;
        this.Floor1.body.immovable = true;

        this.Floor2.body.allowGravity = false;
        this.Floor2.body.checkCollision.up = true;
        this.Floor2.body.immovable = true;

        this.Player.body.collideWorldBounds = true;
        this.Player.body.setSize(20, 32, 5, 32);

        //#endregion
        //#region Setting Group
        this.ObsGroup = game.add.group();
        this.ObsGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.ObsGroup.enableBody = true;

        this.PotionGroup = game.add.group();
        this.PotionGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.PotionGroup.enableBody = true;

        //#endregion
        //#region Set Font&Text
        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

        game.add.text(30, 20, "SCORE: ", textStyle_Key);
        textValue = game.add.text(90, 18, score, textStyle_Value);
        //#endregion

        this.PlayerHp = 3;
        this.GodTime = 2;
        this.PlayerTime = 0;

        let w = 60;
        for (let i = 0; i < this.PlayerHp; i++) {
            hp[i] = game.add.sprite((WIDTH - w) - w * i, w, 'hp');
            hp[i].anchor.setTo(0.5, 0.5);
        }
    },

    //배경, 바닥 이동
    BG_effect: function () {
        let BG_speed = 3;
        this.BG1.x -= BG_speed;
        this.BG2.x -= BG_speed;

        this.BG3.x -= BG_speed;
        this.BG4.x -= BG_speed;


        this.Floor1.x -= 5;
        this.Floor2.x -= 5;

        if (this.Floor2.x <= 0) {
            this.Floor1.x = 0;
            this.Floor2.x = WIDTH;
        }

        if (this.BG2.x <= 0) {
            this.BG1.x = 0;
            this.BG2.x = WIDTH;

            this.BG3.x = 0;
            this.BG4.x = WIDTH;
        }

        if (score >= 30) {
            let aspeed = 0.01;
            if (this.BG1.alpha > 0) {
                this.BG1.alpha -= aspeed;
                this.BG2.alpha -= aspeed;

                this.BG3.alpha += aspeed;
                this.BG4.alpha += aspeed;
            }
        }
    },

    update: function () {
        this.PlayerTime += 1.0 / 60.0;
        Game.BG_effect();

        this.pushObs();
        this.Collide();

        this.viewScore();

        if (this.PlayerHp <= 0) {
            game.state.start('gameOver');
        }
        this.ObsGroup.subAll('x', 6);
        this.PotionGroup.subAll('x',10);
        this.SpawnPotion();
    },

    //충돌 처리
    Collide: function () {
        if (game.physics.arcade.collide(Game.Player, [Game.Floor1, Game.Floor2]) && Game.jumpButton.isDown) {
            Game.Player.body.velocity.y = -500;
        }
        //장애물 충돌
        if (game.physics.arcade.collide(Game.Player, this.ObsGroup) && this.PlayerTime > this.GodTime) {
            Game.PlayerHp -= 1;
            hp[Game.PlayerHp].kill();
            this.PlayerTime = 0;
            this.Player.alpha = 0.2;
        }
        //포션 충돌
        Game.PotionGroup.forEach(function(Potion) {
            if(game.physics.arcade.collide(Game.Player,Potion)){
                Potion.destroy();
                
                if(Game.PlayerHp < 3){
                    Game.PlayerHp++;
                    hp[Game.PlayerHp-1].reset((WIDTH - 60 * Game.PlayerHp), 60);
                    
                }
            }
        })        

        
        if (this.PlayerTime >= this.GodTime) {
            this.Player.alpha = 1;
        }

        this.viewScore();

        if (this.PlayerHp <= 0) {
            game.state.start('gameOver');
        }
    },

    //장애물 소환
    pushObs: function () {
        if (rand(1, 50 / (score / 150.0) - 50) == 1) {
            this.ObsGroup.create(800, 457, 'Obstacle');
            this.ObsGroup.setAll('body.allowGravity', false);
            this.ObsGroup.setAll('body.immovable', true);
        }
    },

    //점수 출력
    viewScore: function () {
        function addScore() {
            score += 0.1;
        }
        addScore();
        let intScore = parseInt(score);
        textValue.setText(intScore);
    },

    SpawnPotion: function(){
        if(rand(1,300) == 1){
            this.PotionGroup.create(800, 440, 'Potion');
            this.PotionGroup.setAll('body.allowGravity', false);
            this.PotionGroup.setAll('body.immovable', true);
            
        }
    }
}