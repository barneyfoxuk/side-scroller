var Letter = function (game, x, y, letter) {
  this.game = game;
  this.value = letter;

  Phaser.Sprite.call(this, game, x, y, 'letter_' + letter);
  game.add.existing(this);

  this.create();
}

Letter.prototype = Object.create(Phaser.Sprite.prototype);
Letter.prototype.constructor = Letter;


Letter.prototype.create = function() {
  this.game.physics.arcade.enable(this);
  this.body.velocity.x = -400; 

  // Kill the block when it's no longer visible 
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
};

Letter.prototype.revive = function() {
  // Set the new position of the block 
  this.reset(this.game.width,  (Math.random() * (this.game.height - 50)));
  this.body.velocity.x = -400; 
}

Letter.prototype.caught = function() {
  this.kill();
}

module.exports = Letter;
