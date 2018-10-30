
//  Util
var rand = function (min, max) {
    return Math.floor((Math.random() * max) + min)
};

const WIDTH = 800;
const HEIGHT = 600;

var preload = {
    preload: function () {
        //  Image
        game.load.image('button', 'asset/sprites/bt_start.png');
        game.load.image('mainBG', 'asset/background/mainMenu.png');

        game.load.image('BG', 'asset/background/BackGround.png');
        game.load.image('BG2','asset/background/BackGround2.png');

        game.load.spritesheet('Player', 'asset/sprites/RunP.png', 55, 64, 12);
        game.load.image('Obstacle', 'asset/sprites/Obstacle.png');
        game.load.image('Floor', 'asset/sprites/Fllllor.png');
        game.load.image('hp', 'asset/sprites/hp.png');

        game.load.image('gameOverBG', 'asset/background/gameOverBG.png');

        //  Audio
        game.load.audio('BGM', 'asset/sound/bgm.mp3'); 
        game.load.image('Potion','asset/sprites/potion.png');
    },

    create: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.state.start("title");
    }
}