var should = require('should'),
	sinon = require('sinon'),
    Game = require('../../config/socket/game.js');


describe('Game Constructor', function() {
	var game,
		id = 1,
		socket = sinon.stub();

	before(function() {
		game = new Game(id, socket);
	});

	describe('Game properties', function() {

		it('should check for properties of the constructor', function() {
			(game).should.have.property('czar');
			(game).should.have.property('players');
			(game.payload).should.be.a('function');
		});

		it('should return an object with properties when payload is invoked', function() {
			var data = game.payload();

			(data).should.have.property('gameWinner');
			(data).should.have.property('table');
			(data).should.have.property('winningCard');
		});

		it('should test that _findPlayerIndexBySocket was called once', function() {
			var player = "John Doe",
				_findPlayerIndexBySocketStub = sinon.stub(game, '_findPlayerIndexBySocket');

			game.getPlayer(player);

			sinon.assert.calledOnce(_findPlayerIndexBySocketStub);
			_findPlayerIndexBySocketStub.restore();
		});

		it('should test that sendUpdate method was called once', function() {
			var winner = 'Dave Scot',
				sendUpdateStub = sinon.stub(game, 'sendUpdate');

			game.stateEndGame(winner);

			sinon.assert.calledOnce(sendUpdateStub);
			sendUpdateStub.restore();
		});
	});
});