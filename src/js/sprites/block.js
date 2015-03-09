var Block = function (game, x, y, velocity) {
  this.game = game;
  this.velocity = velocity;

  if (y === 'random') {
    y = (Math.random() * (game.height - 200)) + 100;
  }

  this._y = y;

  Phaser.Sprite.call(this, game, x, y, 'block');
  game.add.existing(this);

  this.create();
}

Block.prototype = Object.create(Phaser.Sprite.prototype);
Block.prototype.constructor = Block;


Block.prototype.create = function() {
  this.game.physics.arcade.enable(this);
  this.body.velocity.x = this.velocity; 

  // Kill the block when it's no longer visible 
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
};

Block.prototype.revive = function() {
  // Set the new position of the block 
  this.reset(this.game.width, this._y);
  this.body.velocity.x = this.velocity; 
}

module.exports = Block;
