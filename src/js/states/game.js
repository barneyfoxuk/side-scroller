var Player = require('../sprites/player');

var Blocks = require('../groups/blocks');
var Letters = require('../groups/letters');

var ScoreController = require('../controllers/score');


var Game = function (options) {
  this.testentity = null;
};

module.exports = Game;

Game.prototype = {

  create: function () {

    // Set the physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Controllers
    this.scoreController = new ScoreController(this.game);

    //world
    this.ceiling = new Blocks(this.game, 30, 50);
    this.floor = new Blocks(this.game, 30, this.game.height - 50);
    this.danger = new Blocks(this.game, 30, 'random', 400);

    //Characters
    this.player = new Player(this.game, 10, 10);
    this.letters = new Letters(this.game, 10);
  },

  update: function () {
    // If the bird is out of the world (too high or too low), call the 'restartGame' function
    if (this.player.inWorld == false)
        this.restartGame(); 

    // If the bird overlap any pipes, call 'restartGame'
    this.game.physics.arcade.overlap(this.player, this.ceiling, this.restartGame, null, this);
    this.game.physics.arcade.overlap(this.player, this.floor, this.restartGame, null, this);

    // If the bird overlap any pipes, call 'restartGame'
    this.game.physics.arcade.overlap(this.player, this.letters, this.letterCaught, null, this);   
  },

  letterCaught: function(player, letter) {
    letter.caught();
    this.scoreController.letterCaught(letter.value);  
  },

  restartGame: function() {
    // Start the 'main' state, which restarts the game
    this.game.state.start('Menu');
  }
};
