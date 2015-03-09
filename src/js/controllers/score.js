var Score = require('../text/score');

var ScoreController = function(game) {
  this.game = game;
  this.NAMES = ['bob'];

  this._currentName = '';
  this._score = 0;
  this._highScore = 0;

  var _y = 10;

  //UI
  this.letters = new Score(this.game, 10, _y, "Name: ", this._currentName);
  this.score = new Score(this.game, 200, _y, "Score: ", this._score);
  this.highScore = new Score(this.game, 400, _y, "High score: ", this._highScore);
}

  ScoreController.prototype.searchStringInArray = function(str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
  };

  ScoreController.prototype.letterCaught = function(letter) {
    this._currentName += letter;
    this.checkValidity();
  };

  ScoreController.prototype.checkValidity = function() {
    var isValid = this.searchStringInArray(this._currentName, this.NAMES);
    var isFound = this.NAMES.indexOf(this._currentName);

    if(isValid !== -1) {
      this.letters.updateScore(this._currentName);
    } else {
      this.clearName();
    }

    if(isFound !== -1) {
      this._score += 100;
      this.score.updateScore(this._score);
      this.clearName();
    }
  };

  ScoreController.prototype.clearName = function(value) {
    this._currentName = "";
    this.letters.updateScore(this._currentName);
  };

  ScoreController.prototype.updateScore = function(value) {
    this._score = value;

    if(this._highScore < this._score) {
      this._highScore = this._score;
    }
  };

module.exports = ScoreController;
