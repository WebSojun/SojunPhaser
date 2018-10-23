const WIDTH = 800;
const HEIGHT = 600;

var preload = {
    preload: function() {
        game.load.image('bt_start', 'asset/sprites/bt_start.png');
        game.load.image('mainBG', 'asset/background/mainMenu.png');
        
        game.load.image('BG', 'asset/background/BG.png');

        game.load.spritesheet('Player','asset/sprites/RunP.png',55,64,12);
        game.load.image('Obstacle','asset/sprites/Obstacle.png');
    },

    create: function() {
        this.game.state.start('Title');
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.setScreenSize();
        this.game.state.start("title");
    }
}