function getRandom() {
	return Math.floor((Math.random() * 100) + 1);
}

(function() {
	var app = angular.module('game', []);
	app.controller('GameController', function($scope, $timeout) {
		
		this.state = 1; // start screen
		this.numGuess = 0;
		this.answer = getRandom();
		this.flash = '';

		this.setState = function(newState) {
			this.state = newState;
			this.numGuess = 0;
			
			if(newState == 3) { // flash screen
				$timeout(function() {
					$scope.game.state = 2; // go back to guessing
				}, 2500);
			}

			if(newState == 4) { // won
				$timeout(function() {
					$scope.game.resetGame();
				}, 2500);
			}
		};

		this.guess = function() {
			var parsedGuess = parseInt(this.numGuess);
			// guessing logic
			if(parsedGuess == this.answer) {
				this.flash = 'You got it!';
				this.setState(4);
			} else if (parsedGuess < this.answer) {
				this.flash = 'Too low.';
				this.setState(3);
			} else if (parsedGuess > this.answer) {
				this.flash = 'Too high.';
				this.setState(3);
			}
		};

		this.resetGame = function() {
			this.state = 1;
			this.numGuess = 0;
			this.answer = getRandom();
			this.flash = '';
		};
	});
})();
