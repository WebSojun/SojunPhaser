//  System variable
const WIDTH = 800;
const HEIGHT = 600;


var boot = function(game) {}

boot.prototype = {
    preload: function() {
        this.game.load.image("loading", 'asset/sprite/loading.gif');
    },

    create: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setScreenSize();
        this.game.state.start("Preload");
    }
}