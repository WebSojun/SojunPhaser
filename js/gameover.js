var gameOver = {
    create: function () {
        var gameTitle = game.add.sprite(0, 0, 'gameOverBG');
        var bt_restart = game.add.button(WIDTH / 2, 500, 'button', this.restart, this)
        bt_restart.anchor.setTo(0.5, 0.5);
    },

    restart: function () {
        this.game.state.start('Game');
    }
}