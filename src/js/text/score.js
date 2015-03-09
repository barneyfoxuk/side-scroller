var Score = function (game, x, y, prefix, score) {
  this.game = game;
  this.prefix = prefix || "";

  Phaser.Text.call(this, game, x, y, this.prefix + score, { font: "20px Arial", fill: "#ffffff" });
  game.add.existing(this);
}

Score.prototype = Object.create(Phaser.Text.prototype);
Score.prototype.constructor = Score;


Score.prototype.updateScore = function(value) {
  this.text = this.prefix + value;
};

module.exports = Score;
