var preload = function(game) {}

preload.prototype = {
    preload: function() {
        var loadingBar = this.add.sprite(WIDTH / 2, HEIGTH / 2, 'loading');
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);
        
        game.load.image('mainBG', 'asset/background/mainMenu.png');
        game.load.image('tutorialBG', 'asset/background/tutorial.png');
        game.load.image('BG', 'asset/background/BG.png');

        game.load.spritesheet('Player','asset/sprites/RunP.png',55,64,12);
        game.load.image('Obstacle','asset/sprites/Obstacle.png');
    },

    create: function() {
        this.game.state.start('Title');
    }
}