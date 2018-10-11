var title = function(game) {}

title.prototype = {
    create: function() {
        var gameTitle = this.game.add.sprite(WIDTH / 2, HEIGHT / 2, 'mainMenu');
        gameTitle.anchor.setTo(0.5, 0.5);

        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
        if(Game.jumpButton.isDown) {
            this.game.state.start('Tutorial');
        }
    }
}