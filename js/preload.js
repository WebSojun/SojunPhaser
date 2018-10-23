
//  Util
var rand = function (min, max) {
    return Math.floor((Math.random() * max) + min)
};

const WIDTH = 800;
const HEIGHT = 600;

var preload = {
    preload: function () {
        game.load.image('bt_start', 'asset/sprites/bt_start.png');
        game.load.image('mainBG', 'asset/background/mainMenu.png');

        game.load.image('BG', 'asset/background/BG.png');

        game.load.spritesheet('Player', 'asset/sprites/RunP.png', 55, 64, 12);
        game.load.image('Obstacle', 'asset/sprites/Obstacle.png');
        game.load.image('Floor', 'asset/background/Floor.png');
    },

    create: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.state.start("title");
    }
}