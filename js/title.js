var title = {
    create: function () {
        var gameTitle = game.add.sprite(0, 0, 'mainBG');
        var bt_start = game.add.button(WIDTH / 2, 500, 'bt_start', this.gameStart, this)
        bt_start.anchor.setTo(0.5, 0.5);
    },

    gameStart: function () {
        this.game.state.start('Game');
    }
}