var title = {
    create: function() {
        var gameTitle = game.add.sprite(0, 0, 'mainBG');
        var bt_start = game.add.button(WIDTH / 2, 500, 'bt_start', this.gameStart, this)
        bt_start.anchor.setTo(0.5, 0.5);
    },

    gameStart: function() {
        this.game.state.start('Game');
    }
}


/// 게임 메인화면
// var title = {
//     create: function() {
//         var bg_title = game.add.sprite(0, 0, 'bg_title');
//         var bt_play = game.add.button(CANVAS_WIDTH / 2, 500, 'bt_play', this.gameStart, this);
//         bt_play.anchor.setTo(0.5, 0.5);
//     },

//     gameStart: function() {
//         game.state.start('Game');
//     }
// }