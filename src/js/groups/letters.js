var Letter = require('../sprites/letter');

var Letters = function (game, count) {
  this.game = game;
  var count = count || 3;
  this.ALPHABET = ['b', 'o'];

  Phaser.Group.call(this, game);
  game.add.existing(this);
  
  this.enableBody = true;
  
  // create blocks
  for (var i = 0; i < count; i++) {
    this.add(new Letter(
      game,
      -100,
      (Math.random() * (game.height - 150))+ 50,
      this.ALPHABET[ i % this.ALPHABET.length ]
    ));
  }

  this.timer = game.time.events.loop(2000, this.addLetter, this);
} 

Letters.prototype = Object.create(Phaser.Group.prototype);
Letters.prototype.constructor = Letters;


Letters.prototype.addLetter = function() {
  // Get the first dead pipe of our group
  var letter = this.getFirstDead();
  letter.revive();
};


module.exports = Letters;
