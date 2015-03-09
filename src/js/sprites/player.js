var Player = function (game, x, y) {
  this.game = game;
  var x = x || 30;
  var y = y || 30;
  this._isFlying = false;

  Phaser.Sprite.call(this, game, x, y, 'player');
  game.add.existing(this);

  this.create();
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;


/*
 * Methods
 */

Player.prototype.create = function() {
  var that = this;

  // Add gravity to the player to make it fall
  this.game.physics.arcade.enable(this);
  this.body.gravity.y = 500;

  // event listeners
  var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  spaceKey.onDown.add(this.startFlying, this);
  this.game.input.onDown.add(this.startFlying, this);
  spaceKey.onUp.add(this.stopFlying, this);
  this.game.input.onUp.add(this.stopFlying, this);    
};

Player.prototype.jump = function(ammount) {
  ammount = ammount || -(this.body.gravity.y / 5);
  this.body.velocity.y += ammount;
};

Player.prototype.startFlying = function() {
  this.jump(-100);
  this._isFlying = true;
};

Player.prototype.stopFlying = function() {
  this._isFlying = false;
};

Player.prototype.update = function() {
  if(this._isFlying === true) {
    this.jump(this.body.gravity.y / -33.3);
  }
};

module.exports = Player;
