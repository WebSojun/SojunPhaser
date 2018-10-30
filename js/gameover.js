var gameOver = {
    create: function () {
        var gameTitle = game.add.sprite(0, 0, 'gameOverBG');
        var bt_restart = game.add.button(WIDTH / 2, 500, 'button', this.restart, this)

        this.style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
        this.gameOverScore = game.add.text(WIDTH / 2, 165, '당신의 점수는: ' + parseInt(score) + '입니다', this.style);
        this.gameOverScore.anchor.setTo(0.5, 0.5);

        bt_restart.anchor.setTo(0.5, 0.5);
    },

    restart: function () {
        this.game.state.start('Game');
    }
}