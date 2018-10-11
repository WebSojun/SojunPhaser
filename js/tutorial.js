var tutorial = function(game) {}

tutorial.prototype = {
    create: function() {
        var tutorialBG = this.game.add.sprite(WIDTH / 2, HEIGHT / 2, 'tutorial');
        tutorialBG.anchor.setTo(0.5, 0.5);

        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
        if(Game.jumpButton.isDown) {
            this.game.state.start('InGame');
        }
    }
}