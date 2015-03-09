var Block = require('../sprites/block');

var Blocks = function (game, count, y, rate, velocity) {
  rate = rate || 100;
  this.game = game;

  Phaser.Group.call(this, game);
  game.add.existing(this);
  
  this.enableBody = true;

  // create blocks
  for (var i = 0; i < count; i++) {
    this.add(new Block(
      game,
      -100,
      y,
      velocity
    ));
  }

  this.timer = game.time.events.loop(rate, this.addBlock, this); 
} 

Blocks.prototype = Object.create(Phaser.Group.prototype);
Blocks.prototype.constructor = Blocks;


Blocks.prototype.addBlock = function() {
  // Get the first dead pipe of our group
  var block = this.getFirstDead();
  block.revive();
};


module.exports = Blocks;
